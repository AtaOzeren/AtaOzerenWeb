import { Component } from 'solid-js';

interface AnimatedBackgroundProps {
    variant?: 'dark' | 'light' | 'gradient';
    intensity?: 'low' | 'medium' | 'high';
}

const AnimatedBackground: Component<AnimatedBackgroundProps> = (props) => {
    const variant = () => props.variant || 'dark';
    const intensity = () => props.intensity || 'high';

    // Gradient configurations based on variant
    const getGradient = () => {
        switch (variant()) {
            case 'light':
                return 'bg-gradient-to-br from-white via-gray-200 to-gray-500';
            case 'gradient':
                return 'bg-gradient-to-br from-black via-gray-600 to-white';
            default: // dark
                return 'bg-gradient-to-br from-black via-gray-800 to-gray-300';
        }
    };

    // Shape configurations based on intensity
    const getShapeOpacity = () => {
        switch (intensity()) {
            case 'low':
                return { black: 20, white: 8 };
            case 'medium':
                return { black: 35, white: 12 };
            default: // high
                return { black: 60, white: 15 };
        }
    };

    const opacity = getShapeOpacity();

    return (
        <div class={`absolute inset-0 ${getGradient()}`}>
            {/* Floating shapes */}
            <div class="absolute inset-0">
                {/* Large moving shapes */}
                <div
                    class="absolute w-96 h-96 rounded-full blur-3xl animate-pulse"
                    style={`background-color: rgba(0, 0, 0, ${opacity.black / 100}); animation: float1 20s ease-in-out infinite; top: -10%; left: -10%;`}
                />
                <div
                    class="absolute w-80 h-80 rounded-full blur-2xl animate-pulse"
                    style={`background-color: rgba(255, 255, 255, ${opacity.white / 100}); animation: float2 25s ease-in-out infinite; top: 20%; right: -10%;`}
                />
                <div
                    class={`absolute w-64 h-64 rounded-full blur-xl animate-pulse`}
                    style={`background-color: rgba(0, 0, 0, ${Math.round(opacity.black * 0.9) / 100}); animation: float3 30s ease-in-out infinite; bottom: 10%; left: 20%;`}
                />
                <div
                    class="absolute w-72 h-72 rounded-full blur-2xl animate-pulse"
                    style={`background-color: rgba(255, 255, 255, ${Math.round(opacity.white * 0.8) / 100}); animation: float4 22s ease-in-out infinite; bottom: -5%; right: 15%;`}
                />

                {/* Additional shapes */}
                <div
                    class="absolute w-48 h-48 rounded-full blur-2xl"
                    style={`background-color: rgba(0, 0, 0, ${Math.round(opacity.black * 0.8) / 100}); animation: float1 18s ease-in-out infinite; top: 40%; right: 30%;`}
                />
                <div
                    class="absolute w-56 h-56 rounded-full blur-xl"
                    style={`background-color: rgba(0, 0, 0, ${Math.round(opacity.black * 0.75) / 100}); animation: float3 24s ease-in-out infinite; top: 70%; left: 60%;`}
                />

                {/* Extra shapes for high intensity */}
                {/* Extra shapes for high intensity */}
                {intensity() === 'high' && (
                    <>
                        <div
                            class="absolute w-80 h-80 rounded-full blur-3xl"
                            style={`background-color: rgba(0, 0, 0, ${Math.round(opacity.black * 0.67) / 100}); animation: float2 26s ease-in-out infinite; top: 5%; left: 40%;`}
                        />
                        <div
                            class="absolute w-60 h-60 rounded-full blur-2xl"
                            style={`background-color: rgba(0, 0, 0, ${Math.round(opacity.black * 0.58) / 100}); animation: float4 20s ease-in-out infinite; bottom: 30%; right: 40%;`}
                        />
                        <div
                            class="absolute w-44 h-44 rounded-full blur-xl"
                            style={`background-color: rgba(0, 0, 0, ${Math.round(opacity.black * 0.75) / 100}); animation: float1 14s ease-in-out infinite; top: 80%; left: 15%;`}
                        />
                    </>
                )}

                {/* Smaller moving elements */}
                {/* Smaller moving elements */}
                <div
                    class={`absolute w-32 h-32 rounded-full blur-lg`}
                    style={`background-color: rgba(0, 0, 0, ${Math.round(opacity.black * 0.5) / 100}); animation: float5 15s ease-in-out infinite; top: 60%; left: 10%;`}
                />
                <div
                    class={`absolute w-24 h-24 rounded-full blur-md`}
                    style={`background-color: rgba(255, 255, 255, ${Math.round(opacity.white * 0.6) / 100}); animation: float6 18s ease-in-out infinite; top: 30%; left: 70%;`}
                />
                <div
                    class={`absolute w-40 h-40 rounded-full blur-lg`}
                    style={`background-color: rgba(0, 0, 0, ${Math.round(opacity.black * 0.6) / 100}); animation: float2 16s ease-in-out infinite; top: 10%; left: 50%;`}
                />
            </div>
        </div>
    );
};

export default AnimatedBackground;
