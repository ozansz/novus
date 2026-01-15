from PIL import Image
from io import BytesIO
import json
import requests
import fal_client
import os

# MODEL = "fal-ai/bytedance/seedream/v4.5"
MODEL = "fal-ai/flux-2"

def on_queue_update(update):
    if isinstance(update, fal_client.InProgress):
        for log in update.logs:
            print(log["message"])

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
                "image_size": "portrait_4_3",
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
    scenario=it[2]
    vibe_tags=it[3]
    const_file += f"    {{name: \"{name}\", scenario: \"{scenario}\", vibe_tags: {vibe_tags}}},\n"

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
