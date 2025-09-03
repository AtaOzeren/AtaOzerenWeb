import { Title } from "@solidjs/meta";
import { useI18n } from "~/contexts/I18nContext";
import AnimatedBackground from "~/components/AnimatedBackground";
import { onMount } from "solid-js";
import gsap from "gsap";

export default function About() {
  const { t, locale } = useI18n();

  let paragraph1Ref: HTMLParagraphElement | undefined;
  let paragraph2Ref: HTMLParagraphElement | undefined;
  let paragraph3Ref: HTMLParagraphElement | undefined;

  onMount(() => {
    const paragraphs = [paragraph1Ref, paragraph2Ref, paragraph3Ref].filter(Boolean) as HTMLParagraphElement[];
    gsap.fromTo(paragraphs,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out"
      }
    );
  });

  return (
    <main class="min-h-screen relative overflow-hidden pt-20">
      <Title>{t('about.title')} - {t('hero.name')}</Title>

      {/* Animated Background Layer */}
      <AnimatedBackground variant="dark" intensity="high" />

      {/* Content overlay */}
      <div class="relative z-10 container mx-auto px-6 py-12">
        <div class="max-w-4xl mx-auto">

          {/* About Content */}
          <div >
            <div class="prose prose-xl max-w-none">
              <p ref={el => paragraph1Ref = el} class="text-white leading-relaxed mb-6">
                {t('about.content.paragraph1')}
              </p>
              <p ref={el => paragraph2Ref = el} class="text-white leading-relaxed mb-6">
                {t('about.content.paragraph2')}
              </p>
              <p ref={el => paragraph3Ref = el} class="text-white leading-relaxed">
                {t('about.content.paragraph3')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
