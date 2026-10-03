"use client";

import { Button, IconButton, useToast } from "@once-ui-system/core";
import type { ComponentProps } from "react";

type SocialButtonProps =
  | ({ type?: "button" } & ComponentProps<typeof Button>)
  | ({ type: "icon" } & ComponentProps<typeof IconButton>);

/**
 * Link button for social items. For `mailto:` links it also copies the address
 * to the clipboard, shows a toast and opens the mail app.
 */
export const SocialButton = ({ type = "button", href, ...rest }: SocialButtonProps) => {
  const { addToast } = useToast();

  const isMail = href?.startsWith("mailto:");

  const handleClick = async () => {
    if (!href || !isMail) return;
    const email = href.replace("mailto:", "");
    // Open the mail app directly; Once UI drops onClick on buttons that have an href.
    window.location.href = href;
    try {
      await navigator.clipboard.writeText(email);
      addToast({ variant: "success", message: "Email copied to clipboard" });
    } catch (err) {
      console.error("Failed to copy: ", err);
      addToast({ variant: "danger", message: "Failed to copy email" });
    }
  };

  return type === "icon" ? (
    <IconButton
      {...(rest as ComponentProps<typeof IconButton>)}
      href={isMail ? undefined : href}
      onClick={isMail ? handleClick : undefined}
    />
  ) : (
    <Button
      {...(rest as ComponentProps<typeof Button>)}
      href={isMail ? undefined : href}
      onClick={isMail ? handleClick : undefined}
    />
  );
};
