import { useEffect, useRef } from 'react';
import { AccessibilityInfo, Animated, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/theme';

/** Props: message (string | null), bottom (px from screen bottom). Announced to screen readers. */
export default function Toast({ message, bottom = 100 }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!message) return;
    AccessibilityInfo.announceForAccessibility?.(message);
    opacity.setValue(0);
    Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: true }).start();
  }, [message, opacity]);

  if (!message) return null;
  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.wrap, { bottom, opacity }]}
      accessibilityLiveRegion="polite"
    >
      <View style={styles.toast}>
        <Text style={styles.text}>{message}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 0, right: 0, alignItems: 'center' },
  toast: {
    backgroundColor: colors.textPrimary,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 24,
    maxWidth: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  text: { color: '#FFFFFF', fontSize: 15, fontWeight: '600', textAlign: 'center' },
});
