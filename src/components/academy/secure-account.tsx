import { useState, type FormEvent } from "react";
import { useRouter } from "@tanstack/react-router";
import { ArrowRight, LogOut, ShieldCheck } from "lucide-react";
import { GROK_PROVIDERS, authClient, signIn, signOut } from "@/lib/auth/client";
import { hasGateSessionMarker } from "@/lib/auth/gate-session-marker";
import { useSyncExternalStore } from "react";

const BLOCKED = new Set(["password", "password1", "password123", "12345678", "123456789", "qwerty123", "fleshsesh", "academy123", "letmein1"]);

function destination(mode: "login" | "signup") {
  const fallback = mode === "login" ? "/dashboard" : "/onboarding";
  if (typeof window === "undefined") return fallback;
  const next = new URLSearchParams(window.location.search).get("next");
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.includes("\\") || next.includes("://")) return fallback;
  if (next.startsWith("/api") || next.startsWith("/login") || next.startsWith("/signup") || next.startsWith("/sign-")) return fallback;
  return next;
}

function rememberBearer(response: Response) {
  const token = response.headers.get("set-auth-token");
  if (!token) return;
  try {
    sessionStorage.setItem("grok-auth.bearer-token", token);
  } catch {
    /* private mode */
  }
}

function passwordProblem(password: string, email: string) {
  if (password.length < 10 || password.length > 128) return "Use a password between 10 and 128 characters.";
  if (!/[a-z]/i.test(password) || !/\d/.test(password)) return "Include at least one letter and one number.";
  if (password.toLowerCase() === email.toLowerCase() || BLOCKED.has(password.toLowerCase())) return "Choose a password that isn’t easy to guess.";
  return "";
}

export function SecureAccountForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const next = destination(mode);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    const trimmed = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Enter a valid email address.");
      return;
    }
    const weak = passwordProblem(password, trimmed);
    if (weak) {
      setError(weak);
      return;
    }
    if (mode === "signup" && password !== confirm) {
      setError("Those passwords don’t match.");
      return;
    }
    if (mode === "signup" && (name.trim().length < 1 || name.trim().length > 80)) {
      setError("Add a name or nickname for your account.");
      return;
    }
    setBusy(true);
    setError("");
    const fetchOptions = { onSuccess(ctx: { response: Response }) { rememberBearer(ctx.response); } };
    const result = mode === "signup"
      ? await authClient.signUp.email({ email: trimmed, password, name: name.trim(), callbackURL: next, fetchOptions })
      : await authClient.signIn.email({ email: trimmed, password, callbackURL: next, fetchOptions });
    if (result.error) {
      setBusy(false);
      setError(result.error.message || (mode === "signup" ? "That account could not be created." : "Those sign-in details were not accepted."));
      return;
    }
    await authClient.getSession();
    await router.navigate({ href: next });
    setBusy(false);
  }

  return (
    <form onSubmit={submit} className="secure-account">
      {mode === "signup" && (
        <label className="field">
          Name or nickname
          <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" maxLength={80} required />
        </label>
      )}
      <label className="field">
        Email
        <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" inputMode="email" required />
      </label>
      <label className="field">
        Password
        <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} minLength={10} required />
        <small>{mode === "signup" ? "At least 10 characters, with a letter and a number. It is hashed and never saved with your lessons." : "Use the password for this Academy account."}</small>
      </label>
      {mode === "signup" && (
        <label className="field">
          Confirm password
          <input value={confirm} onChange={(event) => setConfirm(event.target.value)} type="password" autoComplete="new-password" minLength={10} required />
        </label>
      )}
      {error && <p className="notice error" role="alert">{error}</p>}
      <button className="button primary full" type="submit" disabled={busy}>
        <ShieldCheck size={18} />
        {busy ? "Checking your account…" : mode === "login" ? "Sign in securely" : "Create my secure account"}
        <ArrowRight size={17} />
      </button>
      <div className="auth-divider" />
      <p className="small-text">Or continue with a provider. The Academy never sees that provider’s password.</p>
      <div className="secure-providers">
        {GROK_PROVIDERS.map((provider) => (
          <button key={provider.providerId} type="button" className="button outline full" disabled={busy} onClick={() => { void signIn(provider.providerId, { callbackURL: next }); }}>
            Continue with {provider.label}
          </button>
        ))}
      </div>
    </form>
  );
}

function subscribeCookie() {
  return () => {};
}

export function AcademySignOut() {
  const gate = useSyncExternalStore(subscribeCookie, hasGateSessionMarker, () => false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  if (gate) return <p className="small-text">You’re signed in with your Grok account for this visit.</p>;
  return (
    <div>
      <button
        className="button outline"
        type="button"
        disabled={busy}
        onClick={() => {
          setBusy(true);
          setError("");
          void signOut()
            .then(() => { window.location.assign("/"); })
            .catch(() => { setBusy(false); setError("Sign-out didn’t finish. Please try again."); });
        }}
      >
        <LogOut size={16} />
        {busy ? "Signing out…" : "Sign out"}
      </button>
      {error && <p className="small-text" role="alert">{error}</p>}
    </div>
  );
}
