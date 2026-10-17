import { createFileRoute } from "@tanstack/react-router";
import { AcademyShell } from "@/components/academy/shell";

export const Route = createFileRoute("/")({ component: AcademyShell });
