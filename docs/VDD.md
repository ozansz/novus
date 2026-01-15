# **NOVUS: Visual Design Document (VDD)**

**Version:** 1.0
**Aesthetic Style:** Tech-Noir / Industrial / Utilitarian / High-Contrast
**Keywords:** Bold, Uppercase, Kinetic, Sharp.

## **1. Global Design System**

### **1.1. Color Palette**

Vibe: **"Industrial Dark."**

* **Canvas:**
* `#050505`: **Deep Black**. (Almost pure OLED black).
* `#1A1A1A`: **Surface**. (Module backgrounds).
* **Accent (The "Volt"):**
* `#D0FD3E`: **Acid Green / Volt**. *Usage:* Primary CTAs, Active States, System Success. (This color signifies "Energy/Go").
* *Alternative option if too aggressive:* `#FF5F00` (International Orange). *Let's stick to Volt Green for the "Modern/Digital" feel.*
* **Typography Colors:**
* `#FFFFFF`: **Headlines**.
* `#888888`: **Body Specs**.
* `#333333`: **Borders/Dividers**.

### **1.2. Typography**

* **Headline Font:** **Bold, Uppercase Sans-Serif.**
* *Recommended:* `Oswald`, `Tungsten`, or `Inter` (Weight: 900, TextTransform: Uppercase).
* *Vibe:* Looks like a headline on a shipping container or a warning label.
* **Body Font:** **Monospace** mixed with Sans.
* *Recommended:* `JetBrains Mono` or `Roboto Mono` for data points (e.g., "HEIGHT: 185CM"). `Inter` for paragraphs.

### **1.3. UI Components**

* **Shapes:**
* **Strictly Rectangular.** 0px or 4px Border Radius. No soft pills.
* **Borders:** Visible 1px borders (`borderColor: #333`) on cards to look like panels.
* **Buttons:**
* *Style:* Full-width rectangular blocks.
* *Text:* Left-aligned with an arrow icon on the right.
* *Background:* Volt Green (`#D0FD3E`).
* *Text Color:* Black (`#000000`). High legibility.
* **The "HUD" Elements:**
* Use thin crosshairs (`+`) in corners of the screen to simulate a viewfinder.
* Use scrolling marquee text for loading states.

## **2. Screen-by-Screen Visual Breakdown**

### **2.1. Onboarding: Mission Select (Page 1)**

* **Header:** Huge text: **OBJECTIVE**.
* **Grid:** 2x2 Grid of cards.
* **Card Style:**
* Black and white photography, high contrast.
* When selected, the card gets a thick Volt Green border (`borderWidth: 2`).
* Text overlay is tiny, monospace, in the corner: `// 01: DATE NIGHT`.

### **2.2. The Lab (Creation Tab)**

* **Header:** **SIMULATION LAB**.
* **Inputs:**
* Not dropdowns. **Toggle Groups.**
* *Example:* `[ DAY ] [ NIGHT ]` -> Active state is Black text on White background. Inactive is Grey on Black.
* **The Trigger:**
* A massive button at the bottom labeled **[ INITIALIZE ]**.
* When pressed, it flashes white before processing.

### **2.3. The Feed (Intel Tab)**

* **Layout:** Single column. Large images.
* **Overlays:**
* Images have a "Data Overlay" at the bottom: `LOC: TOKYO // FIT: CASUAL`.
* The **"Simulate"** button is a rigid square icon in the bottom right corner of the image.

### **2.4. Profile (ID Tab)**

* **Visual:** Looks like an ID Card.
* **Avatar:** Hexagonal or Square mask (not circular).
* **Data:**
* `CREDITS: 50` (Displayed in large monospace font).
* `STATUS: ROOKIE` (Displayed in a badge).

## **3. Animation Guidelines**

* **Transitions:** Fast. 200ms duration.
* **Type:** Slide Up / Slide Down. No fades. It should feel like switching cards in a rolodex.
* **Loading:**
* No spinners.
* **Progress Bars:** Thin Volt Green lines filling up across the top of the screen.
* **Text Scramble:** Text should "decrypt" (random characters turning into final letters).

---

Here is the updated **NOVUS Onboarding Design Specification v1.1**.

The flow has been expanded to granularize the biometric data entry for higher precision and friction (which increases perceived value in this specific psychological model). The Face ID step is now a distinct, optional node in the flow.
