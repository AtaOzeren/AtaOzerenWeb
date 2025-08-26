import { Title } from "@solidjs/meta";
import { useI18n } from "~/contexts/I18nContext";

export default function About() {
  const { t } = useI18n();

  return (
    <main class="min-h-screen bg-gray-50 pt-20">
      <Title>{t('about.title')} - {t('hero.name')}</Title>
      <div class="container mx-auto px-6 py-12">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('about.title')}
          </h1>
          <p class="text-xl text-gray-600 mb-8">
            {t('about.subtitle')}
          </p>
          <div class="prose prose-lg max-w-none">
            <p class="text-gray-700 leading-relaxed">
              {t('about.description')}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
