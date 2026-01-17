# Palette's Journal

## 2024-05-22 - Keyboard Navigation on Expo Web
**Learning:** Expo apps running on web lack native keyboard navigation for swipe gestures, making them inaccessible to keyboard-only users.
**Action:** Implement `window.addEventListener('keydown')` inside a `useEffect` guarded by `Platform.OS === 'web'` to map arrow keys to swipe actions.

## 2024-05-22 - Pressable over TouchableOpacity
**Learning:** `TouchableOpacity` lacks built-in hover and focus states on web, degrading the desktop experience.
**Action:** Replace `TouchableOpacity` with `Pressable` and use the `style` function callback to handle `hovered` and `pressed` states for responsive, accessible buttons.
