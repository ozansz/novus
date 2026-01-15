# **NOVUS: Product Requirements Document (PRD)**

**Version:** 1.1 (Standalone)
**Target Platform:** iOS (Expo React Native)
**Architecture:** Standalone Expo Managed Workflow
**Philosophy:** High-Performance Utility. "The Upgrade."

## **1. Executive Summary & Product Philosophy**

### **1.1. The Vision**

NOVUS is a **"Event-Based Style Discovery Tool"** for men.
Unlike browsing-based fashion apps, NOVUS is built to **solve** specific sartorial problems. Users view style as a utility—a lever to secure a better job, a second date, or respect in a meeting. NOVUS uses Generative AI to provide the "correct answer" to the question: *"What do I wear to X?"*

### **1.2. The User Psychology (The "Why")**

The NOVUS architecture targets the "Optimization Mindset":

1. **Efficiency:** Men want fewer options, but higher quality accuracy. "Don't show me 50 shirts. Show me the *best* 3."
2. **Risk Aversion:** Men are often concerned about looking "stupid" or "trying too hard." The AI acts as a safety validation layer.
3. **Visualization:** Men struggle to visualize fit. Seeing clothes on *their* specific build (e.g., "Bulky," "Lean," "Dad Bod") is the primary value driver.

### **1.3. Success Metrics**

* **Speed-to-Solution:** Time from opening app to generating a usable look < 60 seconds.
* **"Credit" Utilization:** Rate of token spend on high-res generations.
* **Repeat Contexts:** Frequency of users returning for specific high-stakes events (Dates, Interviews).

## **2. Technical Architecture**

### **2.1. Tech Stack (Strict Constraints)**

* **Framework:** React Native (Expo SDK 50+).
* **Navigation:** `expo-router` (Stack-heavy architecture).
* **State Management:** `zustand` (Global store for user preferences and credits).
* **Animation:** `react-native-reanimated` v3 (Sharp, physics-based transitions).
* **Feedback:** `expo-haptics` (Crucial: The app must feel "mechanical" and responsive).

### **2.2. Data Models**

**Store: `useNovusStore**`

* `biometrics`: Object containing:
* `height`: Integer (cm)
* `weight`: Float (kg)
* `buildArchetype`: String ('Ectomorph', 'Mesomorph', 'Endomorph', 'Frame_XL')
* `faceData`: String (URI of the uploaded/captured selfie). Nullable.
* `styleVector`: Object (e.g., `{'streetwear': 0.8, 'suit_and_tie': 0.1}`).

**Store: `useCreditStore**`

* `credits`: Integer (Default: 50).
* `status`: String ('ROOKIE' | 'PRIME').

## **3. The Onboarding Flow (The "Setup")**

*Design Note:* The onboarding is framed as "Calibrating the System." It is fast, text-heavy, and direct.

### **3.1. Page 1: Mission Select (Context)**

* **Route:** `/onboarding/mission-select`
* **Header:** "DEFINE OBJECTIVE"
* **UI:** 2x2 Grid of High-Contrast Cards.
* **Content:**
* *Mission 1:* "Date Night" (Bar/Leather).
* *Mission 2:* "Boardroom" (Suit/Office).
* *Mission 3:* "Active Duty" (Gym/Tech).
* *Mission 4:* "Night Ops" (Street/Neon).
* **Action:** Tap to select -> Confirm -> Instant transition.

### **3.2. Page 2: The Calibration (Swipe)**

* **Route:** `/onboarding/calibration`
* **Header:** "CALIBRATE STYLE"
* **UI:** Swipeable Card Stack (Tinder logic, Industrial design).
* **Content:** 10 images of men in the context selected in Page 1.
* **Interaction:**
* Swipe Right: "Accept" (Green overlay).
* Swipe Left: "Discard" (Red overlay).

### **3.3. Page 3: Vertical Metrics (Height)**

* **Route:** `/onboarding/height`
* **Header:** "VERTICAL METRICS"
* **UI:** Vertical Ruler Slider on the right edge.
* **Interaction:** Scroll to adjust height (CM).
* **Feedback:** Haptic tick on every unit change.

### **3.4. Page 4: Mass Metrics (Weight)**

* **Route:** `/onboarding/weight`
* **Header:** "MASS CALIBRATION"
* **UI:** Horizontal Dial/Ruler at the bottom.
* **Interaction:** Swipe to adjust weight (KG).

### **3.5. Page 5: Frame Architecture (Body Type)**

* **Route:** `/onboarding/archetype`
* **Header:** "SKELETAL FRAME"
* **UI:** Snap Carousel of 5 distinct body types.
* **Visuals:** High-contrast wireframes (Ectomorph, Mesomorph, Endomorph, Frame_XL).

### **3.6. Page 6: Facial Identification (Optional)**

* **Route:** `/onboarding/face-id`
* **Header:** "BIOMETRIC SCAN"
* **UI:** Camera viewfinder with target grid.
* **Actions:**
* Primary: "Capture/Upload" (Enables Face Swap).
* Secondary: "Skip Biometric Protocol" (Enables Anonymous Mode).

### **3.7. Page 7: Processing (The Terminal)**

* **Route:** `/onboarding/processing`
* **Visual:** Black screen. Green terminal text scrolling rapidly.
* **Text Sequence:**
* `> COMPILING VERTICAL & MASS METRICS...`
* `> MAPPING SKELETAL VECTORS...`
* `> ENCRYPTING BIOMETRIC DATA...`
* `> SYSTEM READY.`

### **3.8. Page 8: The Result**

* **Route:** `/onboarding/result`
* **Visual:** High-res GenAI image of the user (Face Swapped) looking successful in the chosen context.
* **Overlay:** "SYSTEM READY" + "50 CREDITS ADDED."
* **CTA:** "ENTER NOVUS."

## **4. Core Features (The Main Tabs)**

### **4.1. Tab 2: DISCOVER (Feed)**

**Goal:** Efficient inspiration. "Discover what other successful men are wearing."

* **Layout:** `FlashList` (Strict single-column or 2-column grid). No staggered masonry.
* **Content:** Curated feed of high-performance looks.
* **The "Blueprint" Feature:**
* Clicking an image reveals an overlay drawing lines to items: "Oxford Shirt," "Chino (Slim)," "Chelsea Boot."
* **CTA:** "SIMULATE ON ME (5 CREDITS)".
* **Result:** User sees themselves in that exact outfit instantly.

### **4.2. Tab 3: LAB (Creation)**

**Goal:** The Problem Solver. "I have a wedding in Italy. What do I wear?"

* **Interface:** "Command Center" UI.
* **Input 1: Protocol (Event).** Dropdown.
* **Input 2: Variables (Weather/Time).** Toggle switches (Day/Night, Hot/Cold).
* **Input 3: Aggression.** Slider (Conservative <-> Bold).
* **Action Button:** "RUN SIMULATION (10 CREDITS)".
* **Output:** Generates 3 distinct options:
1. *The Safe Bet.*
2. *The Upgrade.*
3. *The Statement.*

### **4.3. Tab 3: LOGS (History)**

**Goal:** Reference.

* **Layout:** List View sorted by Date.
* **Metaphor:** "Mission Logs."
* **Folders:** "Business," "Dates," "Travel."
* **Feature:** Long-press to "Re-run" a generation with slight variations.

### **4.4. Tab 4: ID (Profile)**

**Goal:** Asset Management.

* **Display:** User's Avatar + "NOVUS PRIME" status.
* **Stats:** "Styles Analyzed," "Simulations Run."
* **Credit Store:** "Reload Credits."
* **Packages:** "Starter Pack," "Pro Pack," "Executive Pack."

## **5. The Economy (Credits)**

* **Currency:** "Credits" (Internal virtual currency).
* **Pricing Structure:**
* **Simulate (Feed):** 5 Credits.
* **Run Lab (New Generation):** 10 Credits.
* **Subscription: NOVUS PRIME**
* *Price:* $14.99/mo.
* *Perks:* 500 Credits/mo, 4K Upscaling, Priority Server Access.
