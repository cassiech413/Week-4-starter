import { useState } from 'react';
import { Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, sizes } from '../constants/theme';

/**
 * Props: value, onChangeText, placeholder
 * Shows a clear (✕) button when there is text. Return dismisses the keyboard.
 */
export default function SearchBar({ value, onChangeText, placeholder = 'Search trails' }) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={[styles.wrap, focused && styles.focused]}>
      <Ionicons name="search" size={20} color={colors.textSecondary} accessibilityElementsHidden importantForAccessibility="no" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        style={styles.input}
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="never"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        accessibilityLabel="Search trails"
        accessibilityRole="search"
      />
      {value.length > 0 && (
        <Pressable
          onPress={() => onChangeText('')}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          hitSlop={8}
          style={styles.clear}
        >
          <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgCard,
    borderRadius: radius.search,
    borderWidth: 1,
    borderColor: colors.border,
    paddingLeft: 16,
    paddingRight: 4,
    minHeight: 48,
  },
  focused: { borderColor: colors.primary },
  input: {
    flex: 1,
    fontSize: 17,
    color: colors.textPrimary,
    paddingHorizontal: 10,
    paddingVertical: 10,
    ...(Platform.OS === 'web' ? { outlineStyle: 'none' } : null), // the pill border shows focus instead
  },
  clear: {
    width: sizes.minTouch,
    height: sizes.minTouch,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
