// Tiny app-wide toast ("Logged out (demo)", etc.).
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from '../components/Toast';

const ToastContext = createContext({ showToast: () => {} });

export function ToastProvider({ children }) {
  const [message, setMessage] = useState(null);
  const timer = useRef(null);
  const insets = useSafeAreaInsets();

  const showToast = useCallback((text, duration = 2600) => {
    clearTimeout(timer.current);
    setMessage(text);
    timer.current = setTimeout(() => setMessage(null), duration);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      <View style={styles.fill}>
        {children}
        <Toast message={message} bottom={insets.bottom + 72} />
      </View>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);

const styles = StyleSheet.create({ fill: { flex: 1 } });
