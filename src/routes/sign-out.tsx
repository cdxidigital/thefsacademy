import { createFileRoute, Link } from "@tanstack/react-router";
import { AcademySignOut } from "@/components/academy/secure-account";

export const Route = createFileRoute("/sign-out")({ component: SignOutPage });

function SignOutPage() {
  return (
    <main className="academy page-section" id="main">
      <span className="eyebrow">YOUR ACCOUNT</span>
      <h1>Leave this session?</h1>
      <p>Signing out does not delete your lessons or progress. You can sign in again whenever you like.</p>
      <div className="secure-providers">
        <AcademySignOut />
        <Link to="/" className="button outline">Stay in the Academy</Link>
      </div>
    </main>
  );
}
