"""Génère les visuels de marque du projet (favicon, apple-touch-icon, og-image).

Outil de développement, à lancer depuis la racine du projet :

    pip install pillow
    python scripts/make-brand-assets.py

Pillow n'est pas une dépendance du projet : il n'est requis que pour
régénérer public/ après un changement de charte. Les polices référencées
ci-dessous sont celles de Windows ; adapter les chemins sur un autre système.
"""

from PIL import Image, ImageDraw, ImageFont

AMBER = (231, 176, 8)
DARK = (20, 20, 20)
PANEL = (23, 23, 23)
WHITE = (255, 255, 255)
GREY = (180, 180, 180)

BOLD = r"C:\Windows\Fonts\segoeuib.ttf"
REGULAR = r"C:\Windows\Fonts\segoeui.ttf"

# Le glyphe reprend l'icône « Building » du logo du site : un bâtiment de
# 16x20 unités sur une grille de 24, avec ses rangées de fenêtres.
def draw_building(draw, x, y, size, colour, width):
    """Dessine le glyphe dans un carré de `size` px, coin haut-gauche en (x, y)."""
    u = size / 24.0  # une unité de la grille d'origine

    def px(a, b):
        return (x + a * u, y + b * u)

    # Corps du bâtiment
    draw.rounded_rectangle(
        [px(4, 2), px(20, 22)], radius=2 * u, outline=colour, width=width
    )
    # Porte
    draw.line([px(9, 22), px(9, 18)], fill=colour, width=width)
    draw.line([px(9, 18), px(15, 18)], fill=colour, width=width)
    draw.line([px(15, 18), px(15, 22)], fill=colour, width=width)

    # Fenêtres : points sur 3 colonnes et 3 rangées
    r = max(width * 0.6, 1.1)
    for col in (8, 12, 16):
        for row in (6, 10, 14):
            cx, cy = px(col, row)
            draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=colour)


def draw_building_solid(draw, x, y, size, colour, hole):
    """Variante pleine du glyphe, pour les petites tailles.

    Le tracé filaire se referme en dessous de ~32 px : les fenêtres se bouchent
    et l'icône devient une tache. Une silhouette pleine avec fenêtres évidées
    reste lisible jusqu'à 16 px.
    """
    u = size / 24.0

    def px(a, b):
        return (x + a * u, y + b * u)

    draw.rounded_rectangle([px(4, 2), px(20, 22)], radius=2.5 * u, fill=colour)

    # Fenêtres évidées : 3 colonnes sur 3 rangées.
    r = 1.15 * u
    for col in (8, 12, 16):
        for row in (6.5, 11):
            cx, cy = px(col, row)
            draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=hole)

    # Porte évidée
    draw.rounded_rectangle([px(10, 15.5), px(14, 22)], radius=0.6 * u, fill=hole)


def rounded_icon(size, radius_ratio=0.22, supersample=8):
    """Icône carrée : fond sombre arrondi + bâtiment ambre, rendue en suréchantillonnage."""
    s = size * supersample
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([0, 0, s - 1, s - 1], radius=int(s * radius_ratio), fill=PANEL)
    inset = s * 0.13
    draw_building_solid(d, inset, inset, s - 2 * inset, AMBER, PANEL)
    return img.resize((size, size), Image.LANCZOS)


def build_favicon(path):
    """ICO multi-tailles : chaque système pioche la résolution qui lui convient."""
    sizes = [16, 32, 48, 64]
    images = [rounded_icon(s) for s in sizes]
    images[-1].save(path, format="ICO", sizes=[(s, s) for s in sizes])
    print("favicon.ico   ->", path)


def build_apple_touch(path, size=180):
    """iOS ignore la transparence et applique ses propres coins : fond plein."""
    icon = rounded_icon(size, radius_ratio=0.0)
    out = Image.new("RGB", (size, size), PANEL)
    out.paste(icon, (0, 0), icon)
    out.save(path, format="PNG", optimize=True)
    print("apple-touch   ->", path)


def build_og_image(path, w=1200, h=630):
    """Image de partage social (Open Graph / Twitter card)."""
    img = Image.new("RGB", (w, h), DARK)
    d = ImageDraw.Draw(img)

    # Liseré ambre à gauche
    d.rectangle([0, 0, 11, h], fill=AMBER)

    # Aplat discret en haut à droite, pour éviter une image totalement plate
    d.polygon([(w, 0), (w, 300), (w - 430, 0)], fill=(28, 25, 16))

    # Glyphe, rendu à part pour bénéficier du suréchantillonnage
    glyph_size = 108
    glyph = Image.new("RGBA", (glyph_size * 8, glyph_size * 8), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glyph)
    draw_building(gd, 0, 0, glyph_size * 8, AMBER, int(glyph_size * 8 * 0.030))
    glyph = glyph.resize((glyph_size, glyph_size), Image.LANCZOS)
    img.paste(glyph, (90, 140), glyph)

    wordmark = ImageFont.truetype(BOLD, 96)
    tagline = ImageFont.truetype(REGULAR, 40)

    x, y = 90, 300
    d.text((x, y), "BTP", font=wordmark, fill=WHITE)
    x += d.textlength("BTP", font=wordmark)
    d.text((x, y), "Location", font=wordmark, fill=AMBER)

    d.text((90, 440), "Location de matériel de chantier", font=tagline, fill=GREY)
    d.text((90, 496), "et vente de matériaux de construction", font=tagline, fill=GREY)

    img.save(path, format="PNG", optimize=True)
    print("og-image.png  ->", path)


if __name__ == "__main__":
    build_favicon("public/favicon.ico")
    build_apple_touch("public/apple-touch-icon.png")
    build_og_image("public/og-image.png")
