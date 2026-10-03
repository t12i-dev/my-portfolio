"use client";

import { Column, MasonryGrid, Media, Row, Text } from "@once-ui-system/core";
import { useRef } from "react";
import { gallery } from "@/resources";
import { gsap, REDUCED_MOTION, ScrollTrigger, useGsapContext } from "@/hooks/useGsapContext";
import styles from "./Gallery.module.scss";

export default function GalleryView() {
  const scope = useRef<HTMLDivElement>(null);

  useGsapContext(scope, () => {
    const items = gsap.utils.toArray<HTMLElement>("[data-gallery-item]");
    const mm = gsap.matchMedia();

    mm.add({ motion: `not ${REDUCED_MOTION}`, desktop: "(min-width: 768px)" }, (context) => {
      const { motion, desktop } = context.conditions as { motion: boolean; desktop: boolean };
      // Reduced motion: no reveal, no parallax, everything stays visible.
      if (!motion) return;

      for (const item of items) {
        gsap.from(item, {
          opacity: 0,
          y: 60,
          duration: 0.9,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: { trigger: item, start: "top 85%", once: true },
        });

        const layer = item.querySelector<HTMLElement>("[data-gallery-parallax]");
        if (!desktop || !layer) continue;

        // Scale up so the ±10% travel never reveals an empty edge.
        gsap.set(layer, { scale: 1.2 });
        gsap.fromTo(
          layer,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      }
    });

    // Image loads change the masonry height, so recalculate trigger positions.
    let timer: number | undefined;
    const refresh = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    };
    const pending = Array.from(scope.current?.querySelectorAll("img") ?? []).filter(
      (img) => !img.complete,
    );
    for (const img of pending) img.addEventListener("load", refresh, { once: true });
    window.addEventListener("load", refresh);
    refresh();

    return () => {
      mm.revert();
      window.clearTimeout(timer);
      window.removeEventListener("load", refresh);
      for (const img of pending) img.removeEventListener("load", refresh);
    };
  });

  return (
    <MasonryGrid ref={scope} columns={2} s={{ columns: 1 }}>
      {gallery.images.map((image, index) => (
        <Column
          key={image.src}
          data-gallery-item
          className={styles.item}
          fillWidth
          radius="m"
          overflow="hidden"
        >
          <Column data-gallery-parallax fillWidth>
            <Column data-gallery-zoom className={styles.zoom} fillWidth>
              {/* No `enlarge`: its fixed overlay breaks inside transformed parents. */}
              <Media
                priority={index < 10}
                sizes="(max-width: 560px) 100vw, 50vw"
                aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "3 / 4"}
                src={image.src}
                alt={image.alt}
              />
            </Column>
          </Column>
          {image.caption && (
            <Row
              className={styles.caption}
              position="absolute"
              bottom="0"
              left="0"
              fillWidth
              paddingX="20"
              paddingTop="40"
              paddingBottom="16"
              pointerEvents="none"
            >
              <Text variant="label-default-m" onBackground="neutral-strong">
                {image.caption}
              </Text>
            </Row>
          )}
        </Column>
      ))}
    </MasonryGrid>
  );
}
