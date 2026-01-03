import { Component } from 'solid-js';

type SimpleIconProps = {
    icon: any;
    size?: number;
    class?: string;
};

const SimpleIcon: Component<SimpleIconProps> = (props) => {
    const { icon, size = 24, class: className = "" } = props;
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            class={className}
            fill="currentColor"
        >
            <path d={icon.path} />
        </svg>
    );
};

export default SimpleIcon;
