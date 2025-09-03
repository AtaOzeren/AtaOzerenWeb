import { Title } from "@solidjs/meta";
import { useI18n } from "~/contexts/I18nContext";
import AnimatedBackground from "~/components/AnimatedBackground";

export default function About() {
  const { t, locale } = useI18n();

  return (
    <main class="min-h-screen relative overflow-hidden pt-20">
      <Title>{t('about.title')} - {t('hero.name')}</Title>

      {/* Animated Background Layer */}
      <AnimatedBackground variant="dark" intensity="high" />

      {/* Content overlay */}
      <div class="relative z-10 container mx-auto px-6 py-12">
        <div class="max-w-4xl mx-auto">

          {/* About Content */}
          <div class="bg-white/10 backdrop-blur-sm rounded-lg shadow-2xl p-8 mb-12 border border-white/20">
            <div class="prose prose-lg max-w-none">
              <p class="text-white leading-relaxed mb-6">
                {t('about.content.paragraph1')}
              </p>
              <p class="text-white leading-relaxed mb-6">
                {t('about.content.paragraph2')}
              </p>
              <p class="text-white leading-relaxed">
                {t('about.content.paragraph3')}
              </p>
            </div>
          </div>          {/* Technologies Section */}
          <div class="bg-white/10 backdrop-blur-sm rounded-lg shadow-2xl p-8 border border-white/20">
            <h2 class="text-2xl md:text-3xl font-bold text-white mb-6">
              {t('about.technologies')}
            </h2>
            <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
              {/* JavaScript */}
              <div class="flex flex-col items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors duration-300 border border-white/20">
                <svg class="w-12 h-12 text-yellow-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3h18v18H3V3zm16.525 13.707c-.131-.821-.403-1.237-.987-1.237-.637 0-.987.843-.987 1.237v2.366c0 .394.35 1.237.987 1.237.584 0 .856-.416.987-1.237V16.47c.131.821.403 1.237.987 1.237.637 0 .987-.843.987-1.237V14.47c0-.394-.35-1.237-.987-1.237-.584 0-.856.416-.987 1.237zM10.5 14.47c0-.394-.35-1.237-.987-1.237-.584 0-.856.416-.987 1.237v2.366c0 .394.35 1.237.987 1.237.637 0 .987-.843.987-1.237V14.47z" />
                </svg>
                <span class="text-sm font-medium text-white">JavaScript</span>
              </div>

              {/* React */}
              <div class="flex flex-col items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors duration-300 border border-white/20">
                <svg class="w-12 h-12 text-blue-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89zM7.37 16.15c.69 0 1.38-.59 1.38-1.29 0-.7-.69-1.3-1.38-1.3s-1.38.6-1.38 1.3c0 .7.69 1.29 1.38 1.29zm9.26 0c.69 0 1.38-.59 1.38-1.29 0-.7-.69-1.3-1.38-1.3s-1.38.6-1.38 1.3c0 .7.69 1.29 1.38 1.29zM12 2.16c-5.49 0-9.94 4.45-9.94 9.94 0 5.49 4.45 9.94 9.94 9.94s9.94-4.45 9.94-9.94S17.49 2.16 12 2.16zm6.85 13.61c-.39.39-1.03.39-1.42 0-.39-.39-.39-1.03 0-1.42.39-.39 1.03-.39 1.42 0 .39.39.39 1.03 0 1.42zm-6.85-1.42c-.69 0-1.38.59-1.38 1.29 0 .7.69 1.29 1.38 1.29s1.38-.59 1.38-1.29c0-.7-.69-1.29-1.38-1.29z" />
                </svg>
                <span class="text-sm font-medium text-white">React</span>
              </div>

              {/* React Native */}
              <div class="flex flex-col items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors duration-300 border border-white/20">
                <svg class="w-12 h-12 text-blue-500 mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <span class="text-sm font-medium text-white">React Native</span>
              </div>

              {/* SQL */}
              <div class="flex flex-col items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors duration-300 border border-white/20">
                <svg class="w-12 h-12 text-green-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M8 8l8 8" />
                  <path d="M16 8l-8 8" />
                </svg>
                <span class="text-sm font-medium text-white">SQL</span>
              </div>

              {/* Python */}
              <div class="flex flex-col items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors duration-300 border border-white/20">
                <svg class="w-12 h-12 text-yellow-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span class="text-sm font-medium text-white">Python</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
