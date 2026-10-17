import { useRouter, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import AcademyApp from "./app";
import { Loading } from "./ui";

const PAGES = new Set(["library", "pricing", "about", "login", "signup", "privacy", "terms", "support", "demo", "resources", "dashboard", "onboarding", "tutor", "progress", "account", "business"]);
const DETAILS = new Set(["learn", "courses", "assessment"]);

function known(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return true;
  const [head] = parts;
  if (DETAILS.has(head)) return parts.length === 2;
  return PAGES.has(head) && parts.length === 1;
}

export function AcademyShell() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const router = useRouter();
  const { user, isPending } = useCurrentUserState();
  const head = pathname.split("/").filter(Boolean)[0] ?? "";

  useEffect(() => {
    if (head === "sign-in" || head === "signin-with-chatgpt") void router.navigate({ href: "/login", replace: true });
    if (head === "sign-up" || head === "signup-alias") void router.navigate({ href: "/signup", replace: true });
  }, [head, router]);

  if (isPending) {
    return (
      <div className="academy">
        <Loading label="Opening the Academy…" />
      </div>
    );
  }

  if (!known(pathname) && head !== "sign-in" && head !== "sign-up") {
    return (
      <main className="academy not-found" id="main">
        <span className="eyebrow">FLESHSESH ACADEMY</span>
        <h1>That page isn’t on the campus.</h1>
        <p>The lesson, module or path may have moved. Your saved learning is unchanged.</p>
        <a className="button primary" href="/">Back to the Academy</a>
      </main>
    );
  }

  const identity = user ? { name: user.displayName || "Learner", email: user.primaryEmail || "" } : null;
  return <AcademyApp route={pathname || "/"} identity={identity} />;
}
