"use client";

import { Column, Heading, Text } from "@once-ui-system/core";
import { type ComponentProps, useRef } from "react";
import { gsap, REDUCED_MOTION, useGsapContext } from "@/hooks/useGsapContext";

interface GalleryTitleProps extends ComponentProps<typeof Column> {
  text: string;
}

export function GalleryTitle({ text, ...flex }: GalleryTitleProps) {
  const scope = useRef<HTMLDivElement>(null);
  const words = text.split(/\s+/).filter(Boolean);

  useGsapContext(scope, () => {
    const mm = gsap.matchMedia();
    mm.add(`not ${REDUCED_MOTION}`, () => {
      gsap.from("[data-gallery-word]", {
        yPercent: 110,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
      });
    });
    return () => mm.revert();
  });

  return (
    <Column ref={scope} fillWidth {...flex}>
      <Heading as="h1" variant="display-strong-l" wrap="balance" aria-label={text}>
        {words.map((word, index) => (
          // Each word sits in a clipping mask so it slides up from below the baseline.
          <Text
            key={`${word}-${index}`}
            as="span"
            aria-hidden="true"
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "top",
              paddingBottom: "0.08em",
              marginRight: index < words.length - 1 ? "0.25em" : undefined,
            }}
          >
            <Text as="span" data-gallery-word style={{ display: "inline-block" }}>
              {word}
            </Text>
          </Text>
        ))}
      </Heading>
    </Column>
  );
}
