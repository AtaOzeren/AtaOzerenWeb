import { Component } from 'solid-js';

const Hero: Component = () => {
    return (
        <section id="home" class="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white flex items-center justify-center">
            <div class="container mx-auto px-6 text-center">
                <div class="mb-8">
                    <h1 class="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Ata Özeren
                    </h1>
                    <p class="text-xl md:text-2xl text-red-500 mb-4 max-w-2xl mx-auto">
                        Web Developer & Software Engineer
                    </p>
                    <p class="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
                        Modern web teknolojileri ile kullanıcı dostu ve performanslı uygulamalar geliştiriyorum.
                    </p>
                    {/* Tailwind CSS Test Elements */}
                    <div class="flex flex-wrap justify-center gap-4 mb-8">
                        <div class="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
                            ✅ Tailwind CSS Çalışıyor!
                        </div>
                        <div class="bg-yellow-500 text-black px-4 py-2 rounded-lg shadow-lg hover:bg-yellow-400 transition-colors">
                            🎨 Renkler
                        </div>
                        <div class="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg hover:scale-105 transform transition-transform">
                            🚀 Animasyonlar
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
