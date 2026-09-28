import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius, type } from '../constants/theme';

/** Props: title, onPress, disabled, accessibilityHint, icon (optional element) */
export default function PrimaryButton({ title, onPress, disabled = false, accessibilityHint, icon }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      {icon}
      <Text style={type.button}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 54,
    borderRadius: radius.button,
    backgroundColor: colors.cta,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 20,
    shadowColor: colors.cta,
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.99 }] },
  disabled: { backgroundColor: colors.disabled, shadowOpacity: 0, elevation: 0 },
});
