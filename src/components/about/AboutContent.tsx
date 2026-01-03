import { Component, onMount } from 'solid-js';
import { gsap } from 'gsap';
import { useI18n } from '../../contexts/I18nContext';

const AboutContent: Component = () => {
    const { t } = useI18n();
    let paragraph1Ref: HTMLParagraphElement | undefined;
    let paragraph2Ref: HTMLParagraphElement | undefined;
    let paragraph3Ref: HTMLParagraphElement | undefined;

    onMount(() => {
        // Paragraphs animation with delay
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
                ease: "power2.out",
                delay: 0.8
            }
        );
    });

    return (
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
    );
};

export default AboutContent;
