import { Title, Meta } from "@solidjs/meta";
import { useI18n } from "~/contexts/I18nContext";
import Hero from "~/components/Hero";

export default function Home() {
  const { t } = useI18n();

  return (
    <>
      <Title>{t('hero.name')} - {t('hero.title')}</Title>
      <Meta name="description" content={t('hero.description') || "Modern web solutions for your business."} />
      <Meta property="og:title" content={`${t('hero.name')} - ${t('hero.title')}`} />
      <Meta property="og:description" content={t('hero.description') || "Modern web solutions for your business."} />
      <Hero />
    </>
  );
}
