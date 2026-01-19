## 2024-05-22 - Bracketed Button Accessibility
**Learning:** The app's design system uses bracketed text (e.g., `[ INITIALIZE ]`) for buttons. This creates noise for screen readers. `TouchableOpacity` was used without roles.
**Action:** Replaced with `Pressable` + `accessibilityRole="button"` and `accessibilityLabel` that matches the core text (without brackets). This ensures clean announcement while maintaining the aesthetic.
