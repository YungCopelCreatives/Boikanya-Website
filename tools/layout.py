#!/usr/bin/env python3
"""Keep the shared <head> assets, header and footer identical on every page.

Each page has three marked blocks:
    <!-- site-head:start --> ... <!-- site-head:end -->      (inside <head>)
    <!-- site-header:start --> ... <!-- site-header:end -->  (top of <body>)
    <!-- site-footer:start --> ... <!-- site-footer:end -->  (end of <body>)

Edit the templates below, then run from the repository root:
    python3 tools/layout.py
The active menu item comes from data-nav="..." on the page's <body> tag.
"""
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent

SOCIAL = {
    "instagram": "https://www.instagram.com/boikanyamovement",
    "tiktok": "https://www.tiktok.com/@boikanyamovement",
    "facebook": "https://www.facebook.com/share/1HrLLc6GAB/",
    "linkedin": "https://www.linkedin.com/in/duduetsangkeokame",
}

HEAD = """<!-- site-head:start -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet">
        <link href="{p}css/site.css" rel="stylesheet">
        <script src="{p}js/site-config.js"></script>
        <script src="{p}js/site.js" defer></script>
        <!-- site-head:end -->"""

NAV = [
    ("home", "Home", "index.html", []),
    ("biokinetics", "Biokinetics", "biokinetics.html", [
        ("What is Biokinetics?", "biokinetics.html#what"),
        ("Orthopaedic rehabilitation", "services/orthopaedic-rehabilitation.html"),
        ("Neurological rehabilitation", "services/neurological-rehabilitation.html"),
        ("Chronic conditions", "services/management-of-chronic-conditions.html"),
        ("Pre &amp; post natal care", "services/pre-post-natal-care.html"),
        ("Fitness assessment", "services/fitness-assessment.html"),
        ("Medical aid", "biokinetics.html#medical-aid"),
    ]),
    ("wellness", "Wellness", "wellness.html", [
        ("Workplaces", "wellness.html#workplaces"),
        ("Communities", "wellness.html#communities"),
        ("Groups", "wellness.html#groups"),
        ("Youth", "wellness.html#youth"),
        ("Events", "wellness.html#events"),
    ]),
    ("about", "About", "about.html", []),
    ("resources", "Resources", "blog.html", [
        ("Blog", "@blog"),
        ("FAQ &amp; medical aid", "faq.html"),
        ("Client stories", "testimonial.html"),
    ]),
    ("contact", "Contact", "contact.html", []),
]


def href(p, target):
    if target == "@blog":
        return f'{p}blog.html" data-blog-link="1'
    return p + target


def header(p, active):
    items = []
    for key, label, target, children in NAV:
        cls = "nav-link" + (" active" if key == active else "")
        cur = ' aria-current="page"' if key == active else ""
        if children:
            sub = "\n".join(
                f'                                <li><a class="dropdown-item" href="{href(p, t)}">{l}</a></li>'
                for l, t in children
            )
            items.append(
                f'''                        <li class="nav-item dropdown">
                            <a class="{cls} dropdown-toggle" href="{p}{target}"{cur}>{label}</a>
                            <ul class="dropdown-menu">
{sub}
                            </ul>
                        </li>''')
        else:
            items.append(f'                        <li class="nav-item"><a class="{cls}" href="{p}{target}"{cur}>{label}</a></li>')
    items = "\n".join(items)
    return f"""<!-- site-header:start -->
        <header class="site-header">
            <div class="container">
                <nav class="navbar navbar-expand-lg" aria-label="Main navigation">
                    <a class="bk-brand" href="{p}index.html" aria-label="Boikanya Biokinetics and Wellness, home">
                        <span class="bk-brand-mark" aria-hidden="true">B</span>
                        <span class="bk-brand-text"><span class="bk-brand-name">BOIKANYA</span><span class="bk-brand-sub">Biokinetics | Wellness</span></span>
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#siteNav" aria-controls="siteNav" aria-expanded="false" aria-label="Open menu">
                        <i class="fas fa-bars"></i>
                    </button>
                    <div class="collapse navbar-collapse" id="siteNav">
                        <ul class="navbar-nav mx-auto">
{items}
                        </ul>
                        <div class="bk-header-actions d-flex align-items-center gap-2">
                            <div class="bk-header-social d-flex d-lg-none d-xl-flex">
                                <a href="{SOCIAL['instagram']}" target="_blank" rel="noopener" aria-label="Boikanya on Instagram"><i class="fab fa-instagram"></i></a>
                                <a href="{SOCIAL['tiktok']}" target="_blank" rel="noopener" aria-label="Boikanya on TikTok"><i class="fab fa-tiktok"></i></a>
                            </div>
                            <a class="bk-btn bk-btn-primary bk-header-cta" href="{p}appointment.html">Book a consultation</a>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
        <!-- site-header:end -->"""


def footer(p):
    return f"""<!-- site-footer:start -->
        <footer class="site-footer">
            <div class="container">
                <div class="row g-4 g-lg-5">
                    <div class="col-lg-4">
                        <a class="bk-brand mb-3" href="{p}index.html" aria-label="Boikanya Biokinetics and Wellness, home">
                            <span class="bk-brand-mark" aria-hidden="true">B</span>
                            <span class="bk-brand-text"><span class="bk-brand-name">BOIKANYA</span><span class="bk-brand-sub">Biokinetics | Wellness</span></span>
                        </a>
                        <p class="mb-0">Movement for Better Health.</p>
                        <div class="bk-footer-sides">
                            <div><strong>Boikanya Biokinetics</strong>Professional Biokinetics services.</div>
                            <div><strong>Boikanya Wellness</strong>Movement programmes for individuals, workplaces &amp; communities.</div>
                        </div>
                    </div>
                    <div class="col-6 col-lg-2">
                        <h5>Quick links</h5>
                        <ul>
                            <li><a href="{p}index.html">Home</a></li>
                            <li><a href="{p}biokinetics.html">Biokinetics</a></li>
                            <li><a href="{p}wellness.html">Wellness</a></li>
                            <li><a href="{p}about.html">About</a></li>
                            <li><a href="{p}blog.html" data-blog-link="1">Blog</a></li>
                            <li><a href="{p}faq.html">FAQ &amp; medical aid</a></li>
                            <li><a href="{p}contact.html">Contact</a></li>
                        </ul>
                    </div>
                    <div class="col-6 col-lg-3">
                        <h5>Contact</h5>
                        <ul class="bk-footer-contact">
                            <li><i class="fas fa-phone-alt"></i><a href="tel:+27671728818">067 172 8818</a></li>
                            <li><i class="far fa-envelope"></i><a href="mailto:admin@boikanya.com">admin@boikanya.com</a></li>
                            <li><i class="fas fa-map-marker-alt"></i><span>Eco-Park Virgin Active, Centurion, Gauteng</span></li>
                        </ul>
                        <div class="bk-footer-social">
                            <a href="{SOCIAL['instagram']}" target="_blank" rel="noopener" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                            <a href="{SOCIAL['tiktok']}" target="_blank" rel="noopener" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
                            <a href="{SOCIAL['facebook']}" target="_blank" rel="noopener" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                            <a href="{SOCIAL['linkedin']}" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    <div class="col-lg-3 bk-footer-legal">
                        <h5>Legal</h5>
                        <ul>
                            <li><a href="{p}legal.html#privacy">Privacy Policy</a></li>
                            <li><a href="{p}legal.html#popia">POPIA Privacy Notice</a></li>
                            <li><a href="{p}legal.html#terms">Terms &amp; Conditions</a></li>
                            <li><a href="{p}legal.html#cancellation">Cancellation Policy</a></li>
                        </ul>
                    </div>
                </div>
                <!-- Email list signup (Kit). Hidden until a Kit form ID is set in js/site-config.js -->
                <div class="bk-newsletter" data-kit-signup hidden>
                    <div class="row g-3 align-items-center">
                        <div class="col-lg-5">
                            <h5 class="mb-1">Movement notes, straight to your inbox</h5>
                            <p class="mb-0 small">Practical tips, programme news and new articles from the blog.</p>
                        </div>
                        <div class="col-lg-7">
                            <form class="d-flex flex-wrap gap-2" method="post" target="_blank" data-kit-form>
                                <label class="visually-hidden" for="kitEmail">Email address</label>
                                <input type="email" id="kitEmail" name="email_address" placeholder="Your email address" required>
                                <button type="submit" class="bk-btn">Subscribe</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="bk-footer-bottom">
                    <p>Boikanya Biokinetics services are provided within the applicable professional scope and regulatory requirements.</p>
                    <p>Individual responses to exercise vary and no specific outcome or result is guaranteed.</p>
                    <p>&copy; <span data-year>2026</span> Boikanya Biokinetics &amp; Wellness. Registered with the HPCSA and BASA.</p>
                </div>
            </div>
        </footer>
        <!-- site-footer:end -->"""


def prefix_for(path):
    depth = len(path.relative_to(ROOT).parts) - 1
    return "../" * depth


def sync(path):
    text = path.read_text(encoding="utf-8")
    if "<!-- site-header:start -->" not in text:
        return False
    p = prefix_for(path)
    m = re.search(r'<body[^>]*data-nav="([a-z]*)"', text)
    active = m.group(1) if m else ""
    blocks = {
        "site-head": HEAD.format(p=p),
        "site-header": header(p, active),
        "site-footer": footer(p),
    }
    new = text
    for name, html in blocks.items():
        new = re.sub(
            rf"<!-- {name}:start -->.*?<!-- {name}:end -->",
            lambda _m: html,
            new,
            flags=re.S,
        )
    if new != text:
        path.write_text(new, encoding="utf-8")
        return True
    return False


if __name__ == "__main__":
    changed = [str(f.relative_to(ROOT)) for f in sorted(ROOT.rglob("*.html"))
               if "node_modules" not in f.parts and sync(f)]
    print("Updated:", ", ".join(changed) if changed else "nothing")
