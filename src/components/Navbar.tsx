import { Component, createSignal, onMount } from 'solid-js';

const Navbar: Component = () => {
    const [isScrolled, setIsScrolled] = createSignal(false);

    onMount(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <nav class={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled() ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
            }`}>
            <div class="container mx-auto px-6">
                <div class="flex items-center justify-center h-16">
                    {/* Logo */}
                    <button
                        onClick={scrollToTop}
                        class={`text-xl font-bold transition-colors duration-300 ${isScrolled() ? 'text-gray-800' : 'text-white'
                            }`}
                    >
                        Ata Özeren
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
