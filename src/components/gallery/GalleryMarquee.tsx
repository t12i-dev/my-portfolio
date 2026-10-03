import { Row, Text } from "@once-ui-system/core";
import { type ComponentProps, Fragment } from "react";

interface GalleryMarqueeProps extends ComponentProps<typeof Row> {
  items: string[];
}

/**
 * Pure CSS ticker. The track holds two identical groups and moves by -50%,
 * so the loop is seamless. Animation and hover pause live in custom.css.
 */
export function GalleryMarquee({ items, ...flex }: GalleryMarqueeProps) {
  if (items.length === 0) return null;

  const group = (copy: number) => (
    <Row
      key={copy}
      as="ul"
      aria-hidden={copy > 0 ? "true" : undefined}
      gap="32"
      paddingRight="32"
      vertical="center"
      style={{ flexShrink: 0, listStyle: "none", margin: 0, paddingLeft: 0 }}
    >
      {items.map((item, index) => (
        <Fragment key={`${item}-${index}`}>
          <Text
            as="li"
            variant="display-default-xs"
            onBackground="neutral-strong"
            style={{ whiteSpace: "nowrap" }}
          >
            {item}
          </Text>
          <Text as="li" aria-hidden="true" variant="display-default-xs" onBackground="brand-weak">
            ✦
          </Text>
        </Fragment>
      ))}
    </Row>
  );

  return (
    <Row
      data-gallery-marquee-root
      fillWidth
      overflow="hidden"
      paddingY="20"
      borderTop="neutral-alpha-weak"
      borderBottom="neutral-alpha-weak"
      {...flex}
    >
      <Row data-gallery-marquee style={{ width: "max-content" }}>
        {group(0)}
        {group(1)}
      </Row>
    </Row>
  );
}
