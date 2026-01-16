from PIL import Image
from io import BytesIO
import json
import requests
import fal_client
import os
import re
import hashlib

# MODEL = "fal-ai/bytedance/seedream/v4.5"
MODEL = "fal-ai/flux-2"

def on_queue_update(update):
    if isinstance(update, fal_client.InProgress):
        for log in update.logs:
            print(log["message"])

def sanitize_garment_description(description: str) -> str:
    """
    Sanitize garment description to avoid content policy violations.
    Replaces problematic terms with safe alternatives.
    """
    # Replace "nude" with "beige" or "skin-tone" to avoid content policy issues
    # Use word boundaries to avoid replacing "nudged" etc.
    description = re.sub(r'\bnude\b', 'beige', description, flags=re.IGNORECASE)
    description = re.sub(r'\bnude-colored\b', 'beige-colored', description, flags=re.IGNORECASE)
    description = re.sub(r'\bnude-tone\b', 'skin-tone', description, flags=re.IGNORECASE)
    
    # Replace "mary jane" (flagged due to potential drug reference) with "T-strap" or "strap shoes"
    # Handle various forms: "mary jane", "Mary Jane", "mary-jane", etc.
    # Mary Jane shoes are characterized by a strap across the instep, so "T-strap" is appropriate
    description = re.sub(r'\bmary\s*jane\b', 'T-strap', description, flags=re.IGNORECASE)
    description = re.sub(r'\bmary-jane\b', 'T-strap', description, flags=re.IGNORECASE)
    
    # Replace "studs" when it might refer to jewelry (could be flagged)
    # Only replace if it's clearly jewelry context, not structural studs
    description = re.sub(r'\bsubtle\s+studs\s+or\s+no\s+jewelry\b', 'minimal jewelry', description, flags=re.IGNORECASE)
    description = re.sub(r'\bstuds\s+or\s+no\s+jewelry\b', 'minimal jewelry', description, flags=re.IGNORECASE)
    description = re.sub(r'\bsubtle\s+studs\b', 'small stud earrings', description, flags=re.IGNORECASE)
    # Handle standalone "studs" in jewelry context (when followed by "for security" or similar)
    description = re.sub(r'\bstuds\s+for\s+security\b', 'small earrings for security', description, flags=re.IGNORECASE)
    
    return description

def get_cache_key(content: str) -> str:
    """Generate a cache key from content"""
    return hashlib.md5(content.encode()).hexdigest()

with open('styles_v3.json') as fp:
    data = json.load(fp)

d = list(filter(lambda x: "male" in x["audience"], data["styles"]))
dd = [(s['name'], s['looks'][0]['items'], s['looks'][0]['scenario'], s['looks'][0]['vibe_tags']) for s in d]

prompts = [(it[0], "Ultra-realistic, full-body fashion photograph of a 20-year-old white American man exuding cool {style} confidence. He wears {clothes}. Neutral expression, natural pose. Shallow depth of field, f8 bokeh background, subject in sharp focus.".format(style=it[0], clothes=", ".join(it[1]))) for it in dd]

if not os.path.exists("styles"):
    os.makedirs("styles")

    for it in prompts:
        result = fal_client.subscribe(
            MODEL,
            arguments={
                "prompt": it[1],
                # "image_size": "portrait_4_3",
                "image_size": "square_hd",
                "num_images": 1,
                "enable_safety_checker": True
            },
            with_logs=True,
            on_queue_update=on_queue_update,
        )

        image = Image.open(BytesIO(requests.get(result["images"][0]["url"]).content))
        image.save(f"styles/{it[0]}.jpg")

        print(f"Saved {it[0]}")

os.system("cp -r styles ../assets/styles")

const_file = """
export const SeedStyles = [
"""

for it in dd:
    name=it[0]
    items=it[1]
    scenario=it[2]
    vibe_tags=it[3]

    item_images = [f"require('../assets/garments/{get_cache_key(sanitize_garment_description(item))}.jpg')" for item in items]

    const_file += f"    {{name: \"{name}\", scenario: \"{scenario}\", vibe_tags: {vibe_tags}, items: {items}, item_images: [{', '.join(item_images)}] }},\n"

const_file += "];"

with open("../constants/SeedStyles.ts", "w") as fp:
    fp.write(const_file)

# Generate StyleImages.ts
style_images_content = "export const StyleImages: Record<string, any> = {\n"

for it in dd:
    name = it[0]
    # Replace spaces with underscores for the filename to match our convention
    filename = name.replace(" ", "_")
    
    # Check if we should rename the file locally if it hasn't been done
    if os.path.exists(f"styles/{name}.jpg") and name != filename:
        os.rename(f"styles/{name}.jpg", f"styles/{filename}.jpg")
        print(f"Renamed {name}.jpg to {filename}.jpg")

    style_images_content += f"    \"{name}\": require('../assets/styles/{filename}.jpg'),\n"

style_images_content += "};\n"

with open("../constants/StyleImages.ts", "w") as fp:
    fp.write(style_images_content)
