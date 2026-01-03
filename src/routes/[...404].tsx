import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import { useI18n } from "~/contexts/I18nContext";
import AnimatedBackground from "~/components/AnimatedBackground";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <main class="min-h-screen relative overflow-hidden flex items-center justify-center">
      <Title>404 Not Found</Title>
      <HttpStatusCode code={404} />

      {/* Animated Background Layer */}
      <AnimatedBackground variant="dark" intensity="high" />

      {/* Content overlay */}
      <div class="relative z-10 text-center px-6">
        <h1 class="text-5xl md:text-7xl font-bold text-white mb-8 tracking-wider">
          404 Not Found
        </h1>

        <div class="mb-8 flex justify-center">
          <img
            src="/404-not-found/404-not-found-cat.gif"
            alt="404 Not Found Cat"
            class="rounded-xl shadow-2xl max-w-full w-auto h-64 md:h-80 object-contain border-4 border-white/10"
          />
        </div>

        <p class="text-white/60 text-lg md:text-xl mb-10 max-w-lg mx-auto">
          {t('common.error') || "Oops! The page you are looking for does not exist."}
        </p>

        <a
          href="/"
          class="inline-flex items-center px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-white/20"
        >
          {t('nav.home')}
        </a>
      </div>
    </main>
  );
}
