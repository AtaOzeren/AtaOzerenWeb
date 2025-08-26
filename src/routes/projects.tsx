import { Component } from 'solid-js';
import { THEME } from '../constants';
import Navbar from '../components/Navbar';
import AnimatedBackground from '../components/AnimatedBackground';

const Projects: Component = () => {
    return (
        <>
            {/* Navbar */}
            <Navbar />

            {/* Projects Page Content */}
            <main class="min-h-screen relative overflow-hidden">
                {/* Animated Background */}
                <AnimatedBackground variant="dark" intensity="high" />

                {/* Content overlay - Boş içerik */}
                <div class={`relative z-10 container mx-auto ${THEME.spacing.containerPadding} pt-20`}>
                    {/* İçerik buraya eklenecek */}
                </div>
            </main>
        </>
    );
};

export default Projects;
