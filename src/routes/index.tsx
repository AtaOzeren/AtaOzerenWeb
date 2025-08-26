import { Title } from "@solidjs/meta";
import { useI18n } from "~/contexts/I18nContext";
import Hero from "~/components/Hero";

export default function Home() {
  const { t } = useI18n();

  return (
    <>
      <Title>{t('hero.name')} - {t('hero.title')}</Title>
      <Hero />
    </>
  );
}
