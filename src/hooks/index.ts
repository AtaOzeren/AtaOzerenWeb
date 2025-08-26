import { createSignal, onCleanup, onMount } from 'solid-js';
import { APP_CONFIG } from '../constants';

// Scroll detection hook
export function useScrolled(threshold: number = APP_CONFIG.scrollThreshold) {
    const [isScrolled, setIsScrolled] = createSignal(false);

    onMount(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > threshold);
        };

        window.addEventListener('scroll', handleScroll);

        onCleanup(() => {
            window.removeEventListener('scroll', handleScroll);
        });
    });

    return isScrolled;
}

// Local storage hook with error handling
export function useLocalStorage(key: string, defaultValue: string) {
    const getValue = (): string => {
        try {
            if (typeof window !== 'undefined') {
                const saved = localStorage.getItem(key);
                return saved ?? defaultValue;
            }
        } catch (error) {
            console.warn(`localStorage read failed for key "${key}":`, error);
        }
        return defaultValue;
    };

    const setValue = (value: string): void => {
        try {
            if (typeof window !== 'undefined') {
                localStorage.setItem(key, value);
            }
        } catch (error) {
            console.warn(`localStorage write failed for key "${key}":`, error);
        }
    };

    return { getValue, setValue };
}

// Browser language detection
export function getBrowserLanguage(): string {
    try {
        if (typeof window !== 'undefined') {
            return navigator.language.toLowerCase();
        }
    } catch (error) {
        console.warn('Browser language detection failed:', error);
    }
    return APP_CONFIG.defaultLanguage;
}
