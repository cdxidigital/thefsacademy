import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { useRouter as useTanStackRouter, useRouterState } from "@tanstack/react-router";

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children?: ReactNode;
};

/** Drop-in for the campus's previous router links. Keeps in-app navigation client-side. */
export default function Link({ href, children, onClick, target, ...rest }: LinkProps) {
  const router = useTanStackRouter();
  function click(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (target && target !== "_self") return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    if (!href.startsWith("/") || href.startsWith("//")) return;
    event.preventDefault();
    void router.navigate({ href });
  }
  return (
    <a href={href} target={target} {...rest} onClick={click}>
      {children}
    </a>
  );
}

export function useRouter() {
  const router = useTanStackRouter();
  return {
    push: (href: string) => {
      void router.navigate({ href });
    },
    replace: (href: string) => {
      void router.navigate({ href, replace: true });
    },
  };
}

export function useSearchParams() {
  const search = useRouterState({ select: (state) => state.location.searchStr });
  return new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
}
