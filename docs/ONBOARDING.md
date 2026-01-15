# **NOVUS: Onboarding Design Specification (v1.1)**

**Module:** User Onboarding & Calibration
**Design System:** Industrial / Utilitarian / High-Contrast
**Tech:** React Native (Expo), Reanimated, Haptics
**Tone:** "System" Voice (No friendly greetings; pure utility).

## **1. Global UI Overlay**

*Applied to all onboarding screens.*

* **Corners:** Thin crosshairs (`+`) in all 4 corners (`color: #333333`).
* **Top Status Bar:**
* Left: `SYS_READY` (Tiny, JetBrains Mono, Green dot).
* Right: `V.1.0` (Grey).
* **Progress Indicator:** A thin Volt Green line (`height: 2px`) at the very top of the screen that grows from 0% to 100% as the user progresses through the 7 screens.

## **2. Screen-by-Screen Breakdown**

### **Screen 1: Mission Select (Context)**

**Route:** `/onboarding/mission-select`
**Goal:** Define the user's primary optimization target.

* **Header (Top 15%):**
* **Title:** `DEFINE OBJECTIVE` (Font: Oswald, Uppercase, 32px, White).
* **Subtext:** `SELECT PRIMARY OPTIMIZATION PROTOCOL.` (Font: JetBrains Mono, 12px, Color: #888).
* **Body (Middle 70% - 2x2 Grid):**
* *Component:* TouchableOpacity Cards. 0px Radius. 1px Border (`#333`).
* *Active State:* Thick Border (`#D0FD3E` - Volt Green).
* **Cards:**
1. `DATE_NIGHT` (Visual: Dim bar, leather).
2. `BOARDROOM` (Visual: High-rise office, suit).
3. `ACTIVE_DUTY` (Visual: Urban gym, tech-fleece).
4. `NIGHT_OPS` (Visual: Neon street, layered).
* **Footer (Bottom 15%):**
* **Button:** Full width, rectangular.
* **Label:** `[ CONFIRM PROTOCOL ]` (Black text on Volt Green).
* *Action:* Navigates to Screen 2.

### **Screen 2: The Calibration (Swipe)**

**Route:** `/onboarding/calibration`
**Goal:** Rapidly build a style vector based on the context selected in Screen 1.

* **Header:**
* **Title:** `CALIBRATE STYLE`
* **Counter:** `IMG_01 / 10` (Right aligned, Monospace).
* **Body (The Deck):**
* *Component:* Swipeable Card Stack.
* *Visual:* Full bleed image of a model in the selected context.
* *Interactions:*
* **Swipe Right:** Green Overlay + Text `[ ACCEPT ]`. *Haptic: Heavy Impact.*
* **Swipe Left:** Red Overlay + Text `[ DISCARD ]`. *Haptic: Light Impact.*
* **Footer:**
* `X` (Discard) and `CHECK` (Accept) buttons for accessibility.

### **Screen 3: Vertical Metrics (Height)**

**Route:** `/onboarding/height`
**Goal:** Input height with precision.

* **Header:**
* **Title:** `VERTICAL METRICS`
* **Subtext:** `CALIBRATE HEIGHT DATA.`
* **Body (The Ruler):**
* *Visual:* A distinct **Vertical Ruler** running along the right edge of the screen.
* *Interaction:* User scrolls the screen (or drags a slider) up and down.
* *Center Display:* A large number in the center of the screen.
* Font: `Oswald` (Bold), 64px.
* Text: `185`
* Unit: `CM` (Small, next to the number).
* *Haptics:* A "tick" vibration for every cm scrolled.
* **Footer:**
* **Button:** `[ CONFIRM HEIGHT ]`

### **Screen 4: Mass Metrics (Weight)**

**Route:** `/onboarding/weight`
**Goal:** Input weight.

* **Header:**
* **Title:** `MASS CALIBRATION`
* **Subtext:** `INPUT CURRENT BODY WEIGHT.`
* **Body (The Scale):**
* *Visual:* A **Horizontal Dial/Ruler** at the bottom third of the screen.
* *Center Display:*
* Text: `82.5`
* Unit: `KG`
* *Interaction:* Horizontal swipe to adjust value.
* *Haptics:* Heavy "thud" vibration for every whole number, light tick for decimals.
* **Footer:**
* **Button:** `[ CONFIRM WEIGHT ]`

### **Screen 5: Frame Architecture (Body Type)**

**Route:** `/onboarding/archetype`
**Goal:** Identify build for garment fitting.

* **Header:**
* **Title:** `SKELETAL FRAME`
* **Subtext:** `SELECT MATCHING ARCHETYPE.`
* **Body (The Carousel):**
* *Component:* Full-screen width carousel (Snap to center).
* *Content:* 5 distinct cards. Each card features a high-contrast wireframe or silhouette of a male body.
* *Archetypes:*
1. **ECTOMORPH:** (Narrow shoulders, lean).
2. **MESOMORPH:** (Athletic, V-taper).
3. **ENDOMORPH:** (Broad core, stocky).
4. **FRAME_XL:** (Heavy build).
* *Active State:* The center item is white (`#FFF`). Inactive items are dark grey (`#333`).
* **Footer:**
* **Button:** `[ CONFIRM BUILD ]`

### **Screen 6: Facial Identification (Camera)**

**Route:** `/onboarding/face-id`
**Goal:** Capture face for GenAI face-swapping (Optional).

* **Header:**
* **Title:** `BIOMETRIC SCAN`
* **Subtext:** `REQUIRED FOR FACE-SWAP SIMULATIONS.`
* **Body (The Viewfinder):**
* *Visual:* A live camera feed or an upload placeholder.
* *Overlay:* A square targeting box (`borderWidth: 1`, `borderColor: #D0FD3E`) with corner brackets.
* *Text Overlay:* `ALIGN EYES TO GRID` (Blinking text).
* **Primary Action (Bottom Center):**
* **Button:** `[ CAPTURE / UPLOAD ]` (Large Volt Green button).
* *On Success:* Image freezes, turns green-monochrome, and displays `SCAN COMPLETE`.
* **Secondary Action (Bottom Text):**
* **Button:** Text-only link.
* **Text:** `> SKIP BIOMETRIC PROTOCOL`
* **Color:** `#666666` (Dark Grey).
* *Logic:* If skipped, the app will generate "Headless" or "Generic Model" images in the future.

### **Screen 7: Processing (The Terminal)**

**Route:** `/onboarding/processing`
**Goal:** Mask API latency, build hype, transition to app.

* **Visual:** Pure Black Screen (`#000000`).
* **Animation:** Matrix-style scrolling text (Green `#D0FD3E`). Rapid speed.
* **Logic:** Text varies slightly based on Screen 6 (Face ID).
* **Text Sequence (1.2s per line):**
1. `> ESTABLISHING SECURE CONNECTION...`
2. `> COMPILING VERTICAL & MASS METRICS...`
3. `> MAPPING SKELETAL VECTORS...`
4. *(If Face Uploaded)*: `> ENCRYPTING BIOMETRIC DATA...`
5. *(If Face Skipped)*: `> SKIPPING FACIAL RECOGNITION... ANONYMOUS MODE ACTIVE.`
6. `> ALLOCATING 50 CREDITS...`
7. `> SYSTEM READY.`
* **Haptics:** A rapid ticking vibration (like a hard drive writing data).
### **Screen 8: The Result (Payoff)**

**Route:** `/onboarding/result`
**Goal:** The "Wow" moment.

* **Background:** High-res GenAI image of the user (or a headless model if face skipped) wearing a high-tier outfit based on Mission (Screen 1) + Body Type (Screen 5).
* **Effect:** Slow zoom-in (Ken Burns effect).
* **Overlay (HUD Style):**
* **Top Left:** `SIMULATION_COMPLETE`
* **Center:** `+50 CREDITS ADDED` (Flashes in Volt Green).
* **Primary CTA (Bottom):**
* **Button:** `[ ENTER NOVUS ]`
* **Action:** Navigates to `(tabs)/feed`.
