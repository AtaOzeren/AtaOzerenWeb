import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import { useI18n } from "~/contexts/I18nContext";
import AnimatedBackground from "~/components/AnimatedBackground";
import { createSignal, Show } from "solid-js";
import { Gamepad } from "lucide-solid";
import Button from "~/components/Button";

export default function NotFound() {
  const { t } = useI18n();
  const [isPlaying, setIsPlaying] = createSignal(false);

  return (
    <main class="min-h-screen relative overflow-hidden flex items-center justify-center p-6">
      <Title>404 Not Found</Title>
      <HttpStatusCode code={404} />

      {/* Animated Background Layer */}
      <AnimatedBackground variant="dark" intensity="high" />

      {/* Content Container */}
      <div class="relative z-10 container mx-auto max-w-6xl">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Column: Text & Actions */}
          <div class="text-center lg:text-left order-2 lg:order-1">
            <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              404 Not Found
            </h1>

            <p class="text-white/70 text-lg md:text-xl mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              {t('notFound.doomMessage').split('DOOM').map((part, i, arr) => (
                <>
                  {part}
                  {i < arr.length - 1 && (
                    <span class="inline-flex items-center text-red-400 font-bold mx-1">
                      DOOM
                      <Gamepad size={20} class="ml-1" />
                    </span>
                  )}
                </>
              ))}
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                variant="ata-black"
                href="/"
              >
                {t('nav.home')}
              </Button>

              <Button
                variant="ata-trans"
                onClick={() => setIsPlaying(true)}
                class="!border-red-600/50 !text-red-400 hover:!bg-red-600 hover:!text-white flex items-center gap-2"
              >
                <Gamepad size={20} />
                Play DOOM
              </Button>
            </div>
          </div>

          {/* Right Column: GIF or Game */}
          <div class="order-1 lg:order-2 flex justify-center w-full">
            <div class="relative w-full aspect-[4/3] max-w-xl bg-black/40 rounded-xl border-4 border-white/10 overflow-hidden shadow-2xl backdrop-blur-sm">
              <Show when={!isPlaying()} fallback={
                <iframe
                  src="https://archive.org/embed/doom-play"
                  class="w-full h-full border-0"
                  allowfullscreen
                />
              }>
                <div class="w-full h-full flex flex-col items-center justify-center p-6">
                  <img
                    src="/404-not-found/404-not-found-cat.gif"
                    alt="404 Not Found Cat"
                    class="max-w-full max-h-[70%] object-contain rounded-lg mb-4"
                  />

                </div>
              </Show>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
