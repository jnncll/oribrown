import { useCallback, useEffect, useRef, useState } from 'react';

export function useLocalStorage<T>(key: string, initial: T) {
  const initialRef = useRef(initial);
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) as T : initial;
    } catch {
      return initial;
    }
  });

  const save = useCallback(
    (next: T): boolean => {
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        return false;
      }
      setValue(next);
      return true;
    },
    [key]
  );

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== key) return;
      try {
        setValue(e.newValue ? JSON.parse(e.newValue) as T : initialRef.current);
      } catch {

        // ignore malformed values
      }};
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key]);

  return [value, save] as const;
}