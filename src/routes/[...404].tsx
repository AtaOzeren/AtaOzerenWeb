import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import { useI18n } from "~/contexts/I18nContext";
import { THEME } from "~/constants";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <main class={`min-h-screen ${THEME.colors.background.page} pt-20 flex items-center justify-center`}>
      <Title>404 - {t('common.error')}</Title>
      <HttpStatusCode code={404} />

      <div class="text-center">
        <h1 class={`text-6xl font-bold ${THEME.colors.text.dark} mb-4`}>404</h1>
        <h2 class={`text-2xl font-semibold ${THEME.colors.text.muted} mb-6`}>
          Sayfa Bulunamadı / Page Not Found
        </h2>
        <p class={`text-lg ${THEME.colors.text.muted} mb-8 max-w-md mx-auto`}>
          Aradığınız sayfa mevcut değil. Ana sayfaya dönebilirsiniz.
        </p>

        <a
          href="/"
          class={`inline-block px-6 py-3 bg-gradient-to-r ${THEME.colors.primary.gradient} text-white rounded-lg font-semibold hover:${THEME.colors.primary.gradientHover} transition-all duration-300 shadow-lg`}
        >
          {t('nav.home')}
        </a>
      </div>
    </main>
  );
}
