import { Component, JSX } from 'solid-js';
import { THEME, ANIMATIONS } from '../constants';

type ButtonVariant = 'ata-black' | 'ata-trans';

interface ButtonProps {
    variant: ButtonVariant;
    children: JSX.Element | string;
    href?: string;
    onClick?: () => void;
    class?: string;
    disabled?: boolean;
    'aria-label'?: string;
}

const Button: Component<ButtonProps> = (props) => {
    const getVariantStyles = (): string => {
        const baseStyles = THEME.buttons.base;
        const variantStyles = THEME.buttons.variants[props.variant] || '';
        const scaleEffect = props.variant === 'ata-black' ? ANIMATIONS.hover.scale : '';

        return `${baseStyles} ${variantStyles} ${scaleEffect}`.trim();
    };

    const combinedStyles = () => {
        const variantStyles = getVariantStyles();
        const customStyles = props.class || '';
        const disabledStyles = props.disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

        return `${variantStyles} ${customStyles} ${disabledStyles}`.trim();
    };

    // Eğer href varsa link olarak render et
    if (props.href) {
        return (
            <a
                href={props.href}
                class={combinedStyles()}
                aria-label={props['aria-label']}
            >
                {props.children}
            </a>
        );
    }

    // Yoksa button olarak render et
    return (
        <button
            onClick={props.onClick}
            class={combinedStyles()}
            disabled={props.disabled}
            aria-label={props['aria-label']}
        >
            {props.children}
        </button>
    );
};

export default Button;
