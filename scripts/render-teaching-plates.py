"""Classroom plates for the anatomy and desire lessons. Line diagrams only."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1280, 720
S = 2
SW, SH = W * S, H * S

PLUM = (26, 15, 31)
INK = (42, 24, 48)
IVORY = (248, 247, 247)
CORAL = (244, 147, 131)
LILAC = (189, 164, 239)
MUTED = (122, 98, 118)

SERIF = "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf"
SERIF_B = "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf"
SERIF_I = "/usr/share/fonts/truetype/liberation/LiberationSerif-Italic.ttf"
SANS = "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"
SANS_B = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"


def font(path, size):
    return ImageFont.truetype(path, size * S)


def backdrop():
    img = Image.new("RGB", (SW, SH), PLUM)
    glow = Image.new("RGBA", (SW, SH), (0, 0, 0, 0))
    g = ImageDraw.Draw(glow)
    g.ellipse((SW - 980 * S, -420 * S, SW + 280 * S, 760 * S), fill=(244, 147, 131, 38))
    g.ellipse((-480 * S, SH - 640 * S, 720 * S, SH + 280 * S), fill=(189, 164, 239, 28))
    glow = glow.filter(ImageFilter.GaussianBlur(70 * S))
    out = Image.alpha_composite(img.convert("RGBA"), glow)
    vignette = Image.new("RGBA", (SW, SH), (0, 0, 0, 0))
    v = ImageDraw.Draw(vignette)
    v.rectangle((0, 0, SW, 28 * S), fill=(0, 0, 0, 70))
    v.rectangle((0, SH - 28 * S, SW, SH), fill=(0, 0, 0, 80))
    return Image.alpha_composite(out, vignette)


def text(draw, xy, value, fnt, fill, anchor="lt"):
    draw.text((xy[0] * S, xy[1] * S), value, font=fnt, fill=fill, anchor=anchor)


def wrap(draw, value, fnt, width):
    lines, line = [], ""
    for word in value.split():
        trial = word if not line else f"{line} {word}"
        if draw.textlength(trial, font=fnt) <= width * S and line:
            line = trial
        elif draw.textlength(word, font=fnt) <= width * S and not line:
            line = word
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def rounded_card(base, box, radius=22):
    x0, y0, x1, y1 = [v * S for v in box]
    card = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(card)
    d.rounded_rectangle((x0, y0 + 8 * S, x1, y1 + 10 * S), radius * S, fill=(0, 0, 0, 60))
    card = card.filter(ImageFilter.GaussianBlur(6 * S))
    base.alpha_composite(card)
    d = ImageDraw.Draw(base)
    d.rounded_rectangle((x0, y0, x1, y1), radius * S, fill=IVORY)


def stroke_ellipse(draw, box, width=3, fill=None, outline=INK):
    draw.ellipse([c * S for c in box], outline=outline, width=width * S, fill=fill)


def stroke_arc(draw, box, start, end, width=3, fill=INK):
    draw.arc([c * S for c in box], start=start, end=end, fill=fill, width=width * S)


def line(draw, a, b, width=2, fill=LILAC):
    draw.line([(a[0] * S, a[1] * S), (b[0] * S, b[1] * S)], fill=fill, width=width * S)


def leader(draw, origin, elbow, label, fnt, anchor="lm"):
    line(draw, origin, elbow, width=2, fill=(158, 122, 196))
    dot(draw, origin, 3.5, INK)
    if anchor == "mb":
        text(draw, elbow, label, fnt, INK, anchor="mb")
    else:
        nudge = 8 if anchor == "lm" else -8
        text(draw, (elbow[0] + nudge, elbow[1]), label, fnt, INK, anchor=anchor)


def dot(draw, xy, r, fill):
    x, y = xy
    draw.ellipse(((x - r) * S, (y - r) * S, (x + r) * S, (y + r) * S), fill=fill)


def vulva(draw):
    """Frontal schematic. Outline only, no skin tone. Labels stay inside the card."""
    cx, cy = 300, 400
    stroke_ellipse(draw, (cx - 58, cy - 100, cx + 58, cy + 100), width=4)
    stroke_ellipse(draw, (cx - 28, cy - 72, cx + 28, cy + 78), width=3)
    stroke_arc(draw, (cx - 20, cy - 90, cx + 20, cy - 54), 200, 340, width=3)
    dot(draw, (cx, cy - 58), 5, INK)
    dot(draw, (cx, cy - 26), 3.2, CORAL)
    stroke_ellipse(draw, (cx - 11, cy - 2, cx + 11, cy + 28), width=3)
    line(draw, (cx - 8, cy + 78), (cx + 8, cy + 78), width=3, fill=INK)
    label = font(SANS, 16)
    leader(draw, (cx - 50, cy - 24), (214, 330), "Labia majora", label, "rm")
    leader(draw, (cx + 6, cy - 58), (400, 318), "Clitoris", label)
    leader(draw, (cx + 4, cy - 26), (400, 356), "Urethra", label)
    leader(draw, (cx + 11, cy + 12), (400, 396), "Vaginal opening", label)


def penis_sprite():
    """Resting lateral schematic on its own layer. Outline only."""
    layer = Image.new("RGBA", (280 * S, 150 * S), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rounded_rectangle((10 * S, 42 * S, 170 * S, 98 * S), 26 * S, outline=INK, width=4 * S)
    d.ellipse((150 * S, 24 * S, 246 * S, 116 * S), outline=INK, width=4 * S)
    d.arc((174 * S, 40 * S, 224 * S, 100 * S), 250, 70, fill=INK, width=3 * S)
    d.line((206 * S, 58 * S, 206 * S, 80 * S), fill=CORAL, width=3 * S)
    return layer.rotate(12, resample=Image.BICUBIC, expand=True)


def form_plate():
    base = backdrop()
    draw = ImageDraw.Draw(base)
    text(draw, (64, 46), "BODIES  ·  ANATOMY  ·  A VOCABULARY", font(SANS_B, 15), CORAL)
    text(draw, (64, 78), "Words for structures.", font(SERIF_B, 48), IVORY)
    text(draw, (64, 138), "Not a test of identity, desire or consent.", font(SERIF_I, 26), LILAC)

    rounded_card(base, (48, 196, 616, 648))
    rounded_card(base, (664, 196, 1232, 648))
    draw = ImageDraw.Draw(base)
    text(draw, (72, 216), "FIG 1", font(SANS_B, 13), CORAL)
    text(draw, (72, 236), "Vulva — the external region", font(SERIF_B, 24), INK)
    vulva(draw)
    note = font(SANS, 16)
    for i, line_text in enumerate([
        "The vagina is an internal canal.",
        "It is not another name for the vulva.",
        "Outer line: labia majora. Inner line: labia minora.",
        "The urethral opening is separate.",
    ]):
        text(draw, (72, 548 + i * 24), line_text, note, MUTED)

    text(draw, (688, 216), "FIG 2", font(SANS_B, 13), CORAL)
    text(draw, (688, 236), "Penis and scrotum — external", font(SERIF_B, 24), INK)
    for i, line_text in enumerate([
        "Resting view. The prostate is internal.",
        "The scrotum holds the testes.",
        "The urethra carries urine, and semen",
        "at a different time.",
    ]):
        text(draw, (688, 278 + i * 22), line_text, note, MUTED)
    bx, by = 790, 430
    line(draw, (bx - 28, by - 28), (bx - 28, by + 150), width=3, fill=INK)
    draw.rounded_rectangle((bx * S, by * S, (bx + 148) * S, (by + 42) * S), radius=18 * S, outline=INK, width=4 * S)
    stroke_ellipse(draw, (bx + 124, by - 14, bx + 196, by + 56), width=4)
    line(draw, (bx + 172, by + 12), (bx + 172, by + 30), width=3, fill=CORAL)
    stroke_ellipse(draw, (bx - 6, by + 52, bx + 70, by + 128), width=4)
    stroke_ellipse(draw, (bx + 16, by + 72, bx + 48, by + 108), width=2, outline=MUTED)
    label = font(SANS, 16)
    leader(draw, (bx + 70, by + 4), (bx + 70, by - 36), "Shaft", label, "mb")
    leader(draw, (bx + 176, by - 8), (bx + 214, by - 36), "Glans", label)
    leader(draw, (bx + 172, by + 21), (bx + 220, by + 36), "Urethra", label)
    leader(draw, (bx + 36, by + 120), (bx + 110, by + 150), "Scrotum", label)

    text(draw, (64, 678), "Bodies can differ from both drawings. A diagram is not a standard, a gender or a yes.", font(SANS, 16), (232, 214, 224))
    return base.convert("RGB").resize((W, H), Image.Resampling.LANCZOS)


def icon_ring(draw, cx, cy):
    stroke_ellipse(draw, (cx - 16, cy - 16, cx + 16, cy + 16), width=3, outline=CORAL)
    dot(draw, (cx, cy), 4, CORAL)


def icon_wave(draw, cx, cy):
    pts = []
    for i in range(33):
        x = cx - 22 + i * 1.4
        y = cy + (8 if (i // 8) % 2 == 0 else -8) * (0.5 if i % 8 < 4 else -0.5)
        # simpler sine
    import math
    pts = [(cx - 26 + i * 1.7, cy + math.sin(i / 4.2) * 8) for i in range(32)]
    draw.line([(x * S, y * S) for x, y in pts], fill=CORAL, width=3 * S)


def icon_gap(draw, cx, cy):
    line(draw, (cx - 18, cy - 12), (cx - 8, cy - 12), width=3, fill=CORAL)
    line(draw, (cx - 18, cy + 12), (cx - 8, cy + 12), width=3, fill=CORAL)
    line(draw, (cx - 18, cy - 12), (cx - 18, cy + 12), width=3, fill=CORAL)
    line(draw, (cx + 8, cy - 12), (cx + 18, cy - 12), width=3, fill=CORAL)
    line(draw, (cx + 8, cy + 12), (cx + 18, cy + 12), width=3, fill=CORAL)
    line(draw, (cx + 18, cy - 12), (cx + 18, cy + 12), width=3, fill=CORAL)


def fabric_plate():
    base = backdrop()
    draw = ImageDraw.Draw(base)
    text(draw, (64, 48), "DESIRE  ·  AROUSAL  ·  CONSENT", font(SANS_B, 15), CORAL)
    text(draw, (64, 82), "Three different things.", font(SERIF_B, 48), IVORY)
    text(draw, (64, 146), "None of them can stand in for the others.", font(SERIF_I, 26), LILAC)

    cards = [
        (48, "01", "Desire", icon_ring, [
            "Interest in sexual activity.",
            "It can be high, low or absent.",
            "It can change across a life.",
            "It cannot be demanded.",
        ]),
        (448, "02", "Arousal", icon_wave, [
            "A bodily response.",
            "It can happen without interest.",
            "It is not a decision.",
            "It is not evidence of consent.",
        ]),
        (848, "03", "Consent", icon_gap, [
            "A freely communicated choice.",
            "It needs room to be real.",
            "It can be paused or withdrawn.",
            "Only this one is a yes.",
        ]),
    ]
    for x, num, title, icon, lines in cards:
        rounded_card(base, (x, 214, x + 384, 620))
    draw = ImageDraw.Draw(base)
    body = font(SANS, 20)
    for x, num, title, icon, lines in cards:
        text(draw, (x + 28, 240), num, font(SANS_B, 14), CORAL)
        icon(draw, x + 318, 268)
        text(draw, (x + 28, 278), title, font(SERIF_B, 36), INK)
        for i, line_text in enumerate(lines):
            text(draw, (x + 28, 360 + i * 46), line_text, body, INK)

    text(draw, (64, 662), "A comparison is not a target. If a change worries you, talk with a clinician — not an advertisement.", font(SANS, 16), (232, 214, 224))
    return base.convert("RGB").resize((W, H), Image.Resampling.LANCZOS)


if __name__ == "__main__":
    form_plate().save("/workspace/artifacts/frames/form-plate.png", optimize=True)
    fabric_plate().save("/workspace/artifacts/frames/fabric-plate.png", optimize=True)
    print("wrote plates")
