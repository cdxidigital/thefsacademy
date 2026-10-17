import { createFileRoute } from "@tanstack/react-router";

async function dispatch({ request }: { request: Request }) {
  const { handleAcademyRequest } = await import("@/lib/academy/service");
  return handleAcademyRequest(request);
}

export const Route = createFileRoute("/api/$")({
  server: {
    handlers: {
      GET: dispatch,
      POST: dispatch,
    },
  },
});
