import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageFilter

out_dir = 'public/images/cards'
os.makedirs(out_dir, exist_ok=True)

W, H = 840, 460

def draw_icon_college(draw, cx, cy, color):
    # Dynamic soundwaves and microphone
    for r in [28, 44, 60]:
        draw.arc([cx - r, cy - r, cx + r, cy + r], start=210, end=330, fill=color, width=3)
    # Mic capsule
    draw.rounded_rectangle([cx - 9, cy - 20, cx + 9, cy + 8], radius=6, outline=color, width=3)
    # Mic body
    draw.line([(cx, cy + 8), (cx, cy + 30)], fill=color, width=4)
    draw.line([(cx - 12, cy + 30), (cx + 12, cy + 30)], fill=color, width=3)

def draw_icon_arena(draw, cx, cy, color):
    # Stadium radiating spotlight beams & bowl
    draw.line([(cx, cy + 12), (cx - 48, cy - 44)], fill=color, width=3)
    draw.line([(cx, cy + 12), (cx, cy - 54)], fill=color, width=3)
    draw.line([(cx, cy + 12), (cx + 48, cy - 44)], fill=color, width=3)
    draw.arc([cx - 56, cy - 8, cx + 56, cy + 44], start=0, end=180, fill=color, width=3)
    draw.arc([cx - 40, cy - 2, cx + 40, cy + 34], start=0, end=180, fill=color, width=3)

def draw_icon_wedding(draw, cx, cy, color):
    # Royal Palace Crown
    draw.line([(cx - 38, cy + 20), (cx + 38, cy + 20)], fill=color, width=3)
    points = [
        (cx - 38, cy + 20),
        (cx - 32, cy - 12),
        (cx - 16, cy + 6),
        (cx, cy - 24),
        (cx + 16, cy + 6),
        (cx + 32, cy - 12),
        (cx + 38, cy + 20)
    ]
    draw.line(points, fill=color, width=3)
    for px, py in [(cx - 32, cy - 12), (cx, cy - 24), (cx + 32, cy - 12)]:
        draw.ellipse([px - 5, py - 5, px + 5, py + 5], fill=color)

def draw_icon_club(draw, cx, cy, color):
    # Vinyl turntable & glowing equalizer
    draw.ellipse([cx - 38, cy - 38, cx + 38, cy + 38], outline=color, width=3)
    draw.ellipse([cx - 22, cy - 22, cx + 22, cy + 22], outline=color, width=2)
    draw.ellipse([cx - 8, cy - 8, cx + 8, cy + 8], fill=color)
    # Equalizer
    eq_x = cx + 55
    bar_heights = [20, 36, 50, 28, 44, 18]
    for i, bh in enumerate(bar_heights):
        bx = eq_x + (i * 10)
        draw.line([(bx, cy + 22), (bx, cy + 22 - bh)], fill=color, width=5)

def draw_icon_meet(draw, cx, cy, color):
    # VIP Emblem with 8-point Star
    draw.ellipse([cx - 42, cy - 42, cx + 42, cy + 42], outline=color, width=2)
    draw.ellipse([cx - 35, cy - 35, cx + 35, cy + 35], outline=color, width=3)
    pts = []
    for i in range(16):
        r = 28 if i % 2 == 0 else 12
        angle = i * (math.pi / 8) - (math.pi / 2)
        pts.append((cx + int(r * math.cos(angle)), cy + int(r * math.sin(angle))))
    draw.polygon(pts, outline=color, fill=(216, 174, 86))

def draw_icon_corporate(draw, cx, cy, color):
    # Classical enterprise pediment & pillars
    draw.polygon([(cx - 42, cy - 6), (cx, cy - 30), (cx + 42, cy - 6)], outline=color, width=3)
    draw.rectangle([cx - 44, cy - 6, cx + 44, cy], fill=color)
    for col_x in [cx - 32, cx - 11, cx + 11, cx + 32]:
        draw.line([(col_x, cy), (col_x, cy + 28)], fill=color, width=5)
    draw.rectangle([cx - 46, cy + 28, cx + 46, cy + 34], fill=color)

def draw_icon_brand(draw, cx, cy, color):
    # Film Clapperboard with star
    draw.rectangle([cx - 36, cy - 8, cx + 36, cy + 30], outline=color, width=3)
    draw.polygon([(cx - 38, cy - 26), (cx + 34, cy - 14), (cx + 32, cy - 6), (cx - 40, cy - 18)], outline=color, width=2)
    for sx, sy in [(-24, -20), (-8, -16), (8, -12), (24, -8)]:
        draw.line([(cx + sx, cy + sy - 5), (cx + sx + 6, cy + sy + 5)], fill=color, width=3)
    pts = []
    for i in range(10):
        r = 11 if i % 2 == 0 else 4
        angle = i * (math.pi / 5) - (math.pi / 2)
        pts.append((cx + int(r * math.cos(angle)), cy + 10 + int(r * math.sin(angle))))
    draw.polygon(pts, fill=color)


def create_split_card(
    filename,
    qazi_img_path,
    bg_img_path,
    badge_text,
    title_line1,
    title_line2,
    subtitle_text,
    spec1,
    spec2,
    icon_type,
    watermark_text,
    qazi_crop_box=None
):
    card = Image.new('RGB', (W, H), (14, 12, 10))

    # 1. Background real event photo
    if os.path.exists(bg_img_path):
        bg = Image.open(bg_img_path).convert('RGB')
        bg_ratio = bg.width / bg.height
        target_ratio = W / H
        if bg_ratio > target_ratio:
            new_w = int(bg.height * target_ratio)
            left = (bg.width - new_w) // 2
            bg = bg.crop((left, 0, left + new_w, bg.height))
        else:
            new_h = int(bg.width / target_ratio)
            top = (bg.height - new_h) // 2
            bg = bg.crop((0, top, bg.width, top + new_h))
        bg = bg.resize((W, H), Image.Resampling.LANCZOS)
        # Deep luxury tint
        dark_solid = Image.new('RGB', (W, H), (10, 9, 8))
        bg = Image.blend(bg, dark_solid, 0.70)
        card.paste(bg, (0, 0))

    # 2. Process Qazi Photo
    if os.path.exists(qazi_img_path):
        qazi = Image.open(qazi_img_path).convert('RGB')
        if qazi_crop_box:
            qazi = qazi.crop(qazi_crop_box)
        else:
            qw, qh = qazi.size
            qazi = qazi.crop((0, 0, qw, int(qh * 0.72)))

        target_h = H
        target_w = int(qazi.width * (target_h / qazi.height))
        if target_w > int(W * 0.54):
            target_w = int(W * 0.54)
        qazi_resized = qazi.resize((target_w, target_h), Image.Resampling.LANCZOS)

        # Enhance contrast slightly
        enhancer = ImageEnhance.Contrast(qazi_resized)
        qazi_resized = enhancer.enhance(1.10)

        # Mask for blending
        mask = Image.new('L', (target_w, target_h), 255)
        blend_zone = int(target_w * 0.38)
        for x in range(blend_zone):
            alpha = int(255 * (x / blend_zone))
            for y in range(target_h):
                mask.putpixel((x, y), alpha)
        pos_x = W - target_w

        card.paste(qazi_resized, (pos_x, 0), mask)

    # 3. Vignette on outer edges & dark backing on text side
    overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ov_draw = ImageDraw.Draw(overlay)
    
    # Text side dark backing for 100% crisp typography
    for x in range(int(W * 0.65)):
        factor = 1.0 - (x / (W * 0.65))
        alpha = int(235 * (factor ** 0.82))
        ov_draw.line([(x, 0), (x, H)], fill=(10, 9, 8, alpha))
    
    # Right edge vignette so grey studio walls blend cleanly
    for x in range(W - 90, W):
        alpha = int(200 * ((x - (W - 90)) / 90))
        ov_draw.line([(x, 0), (x, H)], fill=(10, 9, 8, alpha))

    # Top & bottom subtle rim vignette
    for y in range(45):
        alpha = int(160 * (1.0 - y / 45))
        ov_draw.line([(0, y), (W, y)], fill=(10, 9, 8, alpha))
    for y in range(H - 45, H):
        alpha = int(160 * ((y - (H - 45)) / 45))
        ov_draw.line([(0, y), (W, y)], fill=(10, 9, 8, alpha))

    card = Image.alpha_composite(card.convert('RGBA'), overlay).convert('RGB')

    # 4. Draw Typography & Custom Graphic Theme
    draw = ImageDraw.Draw(card)

    try:
        font_badge = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 14)
        font_title = ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf', 29)
        font_sub = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 14)
        font_spec = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 14)
        font_stamp = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 12)
        font_watermark = ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf', 56)
    except:
        font_badge = font_title = font_sub = font_spec = font_stamp = font_watermark = ImageFont.load_default()

    tx = 42
    icon_cx = 365
    icon_cy = 345

    # Draw subtle background watermark text
    draw.text((tx, 272), watermark_text, fill=(38, 32, 25), font=font_watermark)

    # Draw the subtle graphic icon for this event format
    gold_icon_color = (216, 174, 86)
    if icon_type == 'college':
        draw_icon_college(draw, icon_cx, icon_cy, gold_icon_color)
    elif icon_type == 'arena':
        draw_icon_arena(draw, icon_cx, icon_cy, gold_icon_color)
    elif icon_type == 'wedding':
        draw_icon_wedding(draw, icon_cx, icon_cy, gold_icon_color)
    elif icon_type == 'club':
        draw_icon_club(draw, icon_cx, icon_cy, gold_icon_color)
    elif icon_type == 'meet':
        draw_icon_meet(draw, icon_cx, icon_cy, gold_icon_color)
    elif icon_type == 'corporate':
        draw_icon_corporate(draw, icon_cx, icon_cy, gold_icon_color)
    elif icon_type == 'brand':
        draw_icon_brand(draw, icon_cx, icon_cy, gold_icon_color)

    # 1. Badge Pill
    badge_w = int(draw.textlength(badge_text, font=font_badge)) + 28
    draw.rounded_rectangle([tx, 36, tx + badge_w, 66], radius=5, fill=(42, 33, 18), outline=(216, 174, 86), width=1)
    draw.text((tx + 14, 42), badge_text, fill=(245, 215, 145), font=font_badge)

    # 2. Main Title Line 1 & Line 2
    draw.text((tx, 84), title_line1, fill=(255, 255, 255), font=font_title)
    if title_line2:
        draw.text((tx, 122), title_line2, fill=(216, 174, 86), font=font_title)
        line_y = 172
    else:
        line_y = 138

    # Gold divider line
    draw.line([(tx, line_y), (tx + 120, line_y)], fill=(216, 174, 86), width=3)
    draw.ellipse([(tx + 126, line_y - 4), (tx + 134, line_y + 4)], fill=(216, 174, 86))

    # 3. Subtitle / Theme Hook
    draw.text((tx, line_y + 16), subtitle_text, fill=(216, 174, 86), font=font_sub)

    # 4. Specifications
    draw.text((tx, line_y + 46), '• ' + spec1, fill=(240, 235, 225), font=font_spec)
    draw.text((tx, line_y + 74), '• ' + spec2, fill=(240, 235, 225), font=font_spec)

    # 5. Bottom Verified Badge
    draw.rounded_rectangle([tx, 382, tx + 245, 414], radius=4, fill=(24, 20, 15), outline=(80, 65, 38), width=1)
    draw.text((tx + 13, 390), 'OFFICIAL ARTIST CLEARANCE', fill=(195, 150, 65), font=font_stamp)

    # Subtle metallic outer rim
    draw.rectangle([(0, 0), (W-1, H-1)], outline=(65, 52, 35), width=1)

    out_path = os.path.join(out_dir, filename)
    card.save(out_path, quality=95)
    print('Generated:', out_path)


# Generate All 7 Cards with DIVERSE, AUTHENTIC REAL PHOTOS OF QAZI
cards_config = [
    {
        'filename': 'card-01-college-fest.jpg',
        'qazi_img_path': 'public/images/qazi-mic-black.jpg',
        'bg_img_path': 'public/images/events/fest_2.jpg',
        'badge_text': '01 • CAMPUS HEADLINER',
        'title_line1': 'COLLEGE FEST',
        'title_line2': '& STAR NIGHT',
        'subtitle_text': 'HIGH-OCTANE VOCAL & CROWD ANTHEMS',
        'spec1': '90-Min Live Concert Headline Set',
        'spec2': 'Sing-Along Youth Anthems & Council VIP',
        'icon_type': 'college',
        'watermark_text': 'CAMPUS',
        'qazi_crop_box': (0, 0, 680, 720)
    },
    {
        'filename': 'card-02-arena-concert.jpg',
        'qazi_img_path': 'public/images/qazi-salman-biggboss.jpg',
        'bg_img_path': 'public/images/events/arena_3.jpg',
        'badge_text': '02 • STADIUM SCALE',
        'title_line1': 'STADIUM ARENA',
        'title_line2': '& WORLD TOURS',
        'subtitle_text': 'MONUMENTAL MULTI-CITY CONCERTS',
        'spec1': '5,000 – 50,000+ Fans Stadium Production',
        'spec2': 'L-Acoustics K1 Audio & DMX Pyrotechnics',
        'icon_type': 'arena',
        'watermark_text': 'STADIUM',
        'qazi_crop_box': (80, 140, 480, 780)
    },
    {
        'filename': 'card-03-luxury-wedding.jpg',
        'qazi_img_path': 'public/images/qazi-brown-jacket.jpg',
        'bg_img_path': 'public/images/events/indian_wedding_2.jpg',
        'badge_text': '03 • PRIVATE LUXURY',
        'title_line1': 'ROYAL SANGEET',
        'title_line2': '& LUXURY WEDDING',
        'subtitle_text': 'BESPOKE OPULENT CELEBRATIONS',
        'spec1': 'Curated Romantic & High-Energy Setlist',
        'spec2': 'VIP Family Stage Dedicated Moments',
        'icon_type': 'wedding',
        'watermark_text': 'PALACE',
        'qazi_crop_box': (80, 180, 540, 760)
    },
    {
        'filename': 'card-04-nightclub-party.jpg',
        'qazi_img_path': 'public/images/qazi-mic-black.jpg',
        'bg_img_path': 'public/images/events/club_1.jpg',
        'badge_text': '04 • HIGH ENERGY NIGHTLIFE',
        'title_line1': 'CLUBS & LOUNGES',
        'title_line2': '& AFTERPARTIES',
        'subtitle_text': 'LATE-NIGHT ELECTRONIC SUFI SETS',
        'spec1': 'Hybrid DJ + Live Vocal Rockstar Rig',
        'spec2': 'VIP Table Interludes & Explosive Drops',
        'icon_type': 'club',
        'watermark_text': 'CLUB',
        'qazi_crop_box': (100, 30, 580, 620)
    },
    {
        'filename': 'card-05-vip-meet.jpg',
        'qazi_img_path': 'public/images/qazi-white-shirt.jpg',
        'bg_img_path': 'public/images/events/vip-meet.jpg',
        'badge_text': '05 • 1-ON-1 EXCLUSIVE',
        'title_line1': 'MEET QAZI',
        'title_line2': 'IN PERSON',
        'subtitle_text': 'PRIVATE VIP GREEN ROOM ACCESS',
        'spec1': 'Candid Masterclass & Conversation',
        'spec2': 'Signed Memorabilia & Bespoke Acoustic Song',
        'icon_type': 'meet',
        'watermark_text': 'VIP PASS',
        'qazi_crop_box': (120, 80, 560, 680)
    },
    {
        'filename': 'card-06-corporate-gala.jpg',
        'qazi_img_path': 'public/images/qazi-salman-hug.jpg',
        'bg_img_path': 'public/images/events/gala_stage_real.jpg',
        'badge_text': '06 • ENTERPRISE PRESTIGE',
        'title_line1': 'CORPORATE GALA',
        'title_line2': '& GLOBAL CONCLAVE',
        'subtitle_text': 'LEADERSHIP SUMMITS & AWARDS NIGHTS',
        'spec1': 'Sophisticated Thematic Repertoire & Billing',
        'spec2': 'Punctual Stage Run-Order & Keynote Headliner',
        'icon_type': 'corporate',
        'watermark_text': 'SUMMIT',
        'qazi_crop_box': (180, 160, 640, 780)
    },
    {
        'filename': 'card-07-brand-collab.jpg',
        'qazi_img_path': 'public/images/qazi-brown-jacket.jpg',
        'bg_img_path': 'public/images/events/brand_2.jpg',
        'badge_text': '07 • BRAND AMBASSADOR',
        'title_line1': 'BRAND COLLAB',
        'title_line2': '& ENDORSEMENTS',
        'subtitle_text': 'TVC SHOOTS • DIGITAL ADS • CAMPAIGN FACE',
        'spec1': 'Official Brand Ambassador Media Rights',
        'spec2': 'Commercial Video Shoots & Viral Social Repertoire',
        'icon_type': 'brand',
        'watermark_text': 'CAMPAIGN',
        'qazi_crop_box': (60, 160, 520, 720)
    }
]

for conf in cards_config:
    create_split_card(**conf)

print('All 7 cards successfully regenerated with diverse photos and luxury graphics!')
