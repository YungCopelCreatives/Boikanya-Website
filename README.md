# 🌿 Boikanya Biokinetics Website

[![Website](https://img.shields.io/badge/Website-Live-green?style=for-the-badge)](https://boikanyabiokinetics.co.za)

Welcome to **Boikanya Biokinetics** official website repository!  
This project represents the online presence of Boikanya, a professional biokinetics and wellness practice dedicated to helping clients **reclaim the way they move**.

---

## ✨ Features

- Modern, **minimalistic design** with soothing color palette
- Interactive sections:
  - What We Do
  - Our Services
  - Team & Expertise
  - Contact & Map
- Responsive layout for **desktop, tablet & mobile**
- Smooth animations & hover effects
- Service showcase with **iconography** for easy navigation
- Integration-ready for future booking & appointment systems

---

## 🎨 Design

**Colors**: Soft Green, Military Green, White  
**Fonts**: Rounded, friendly fonts for a welcoming feel  
**Style**: Clean, artistic, user-friendly  

---

## 🛠 Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript  
- **Animations:** Subtle fade-ins, hover interactions  
- **Responsive Frameworks:** Flexbox & Grid  
- **Version Control:** Git + GitHub  

---

## 📂 Project Structure

```text
Boikanya-Website/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   └── (all website images)
└── README.md

## Pages

- `index.html` — Home: the two paths (Biokinetics and Wellness)
- `biokinetics.html` — Biokinetics, including medical aid
- `wellness.html` — Wellness programmes (workplaces, communities, groups, youth, events)
- `legal.html` — Privacy Policy, POPIA notice, Terms and Cancellation Policy

## Shared header and footer

The header, footer and shared `<head>` assets are kept in `tools/layout.py`.
Edit them there and run `python3 tools/layout.py` to update every page.

## Settings that need account IDs

`js/site-config.js` holds the Google Analytics / Google Ads tag IDs, the Kit form ID
for the email signup and an optional Kit blog URL. Each feature stays off until its value is filled in.
