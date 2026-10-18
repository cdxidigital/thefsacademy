import type { LessonRecord } from "./content";

const themes = {
  consent: { video: "/media/teachings/consent.mp4", poster: "/images/teachings/consent.webp", image: "/images/academy-hero.webp", caption: "A shape is not a signal. Consent is a choice." },
  listen: { video: "/media/teachings/listen.mp4", poster: "/images/teachings/listen.webp", image: "/images/boundaries.webp", caption: "Room between two sides. That is where an answer lives." },
  form: { video: "/media/teachings/form.mp4", poster: "/images/teachings/form.webp", image: "/images/bodies.webp", caption: "Different forms. A diagram is not a standard to match." },
  fabric: { video: "/media/teachings/fabric.mp4", poster: "/images/teachings/fabric.webp", image: "/images/wellbeing.webp", caption: "A pause, not a target. Desire is not a score." },
  care: { video: "/media/teachings/care.mp4", poster: "/images/teachings/care.webp", image: "/images/wellbeing.webp", caption: "Care is information and pace, not a performance." },
  together: { video: "/media/teachings/together.mp4", poster: "/images/teachings/together.webp", image: "/images/connection.webp", caption: "Almost meeting is not a yes. Agreements are spoken." },
} as const;

const moduleTheme: Record<string, keyof typeof themes> = {
  C01: "consent", C02: "listen", C03: "form", C04: "fabric", C05: "care", C06: "together",
  C07: "form", C08: "care", C09: "listen", C10: "care", C11: "care", C12: "together",
  E01: "fabric", E02: "form", E03: "together", E04: "listen", E05: "consent", E06: "care",
};

export type LessonTeaching = {
  beats: string[];
  spoken: string;
  video: string;
  poster: string;
  image: string;
  caption: string;
};

function sentence(paragraph: string) {
  const clean = paragraph.replace(/\s*\[[A-Za-z0-9,\s]+\]/g, "").replace(/\s+/g, " ").trim();
  const first = clean.split(/(?<=[.!?])\s+/)[0] ?? "";
  if (first.length < 28) return "";
  if (first.length <= 150) return first;
  const cut = first.slice(0, 142);
  const pause = Math.max(cut.lastIndexOf(","), cut.lastIndexOf(";"), cut.lastIndexOf(":"));
  const base = (pause > 50 ? cut.slice(0, pause) : cut.replace(/\s+\S*$/, "")).replace(/[,:;]$/, "");
  return `${base}.`;
}

export function lessonBeats(lesson: Pick<LessonRecord, "content" | "objectives">) {
  const beats = lesson.content.split(/\n\n+/).map(sentence).filter(Boolean).slice(0, 3);
  if (beats.length >= 2) return beats;
  return (lesson.objectives ?? []).slice(0, 3).map((item) => item.replace(/\.$/, "") + ".");
}

export function lessonTeaching(lesson: Pick<LessonRecord, "id" | "title" | "moduleId" | "content" | "objectives">): LessonTeaching {
  const theme = themes[moduleTheme[lesson.moduleId] ?? "consent"];
  const beats = lessonBeats(lesson);
  return {
    beats,
    spoken: `${lesson.title}. ${beats.join(" ")}`,
    video: theme.video,
    poster: theme.poster,
    image: theme.image,
    caption: theme.caption,
  };
}
