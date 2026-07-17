"use client";

import { useEffect } from "react";

type Props = { to: string };

export function RedirectPage({ to }: Props) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return null;
}
