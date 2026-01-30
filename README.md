## 🚀 Project Overview

**LeadCore** is a full-width, conversion-optimized agency portfolio designed to showcase services, case studies, pricing, and thought leadership content while supporting lead capture and admin-managed content.

This project emphasizes:

* Strong visual rhythm & spacing
* Clean SaaS-style UI
* Dynamic case studies & blog system
* Admin panel for content management
* SEO-friendly routing
* Fast load times

---

## 🎯 Goals & Objectives

* Present the agency as **premium, trustworthy, and results-driven**
* Convert visitors into leads via strategic CTAs
* Enable non-technical content updates through admin panel
* Maintain strict design consistency across all pages
* Ensure scalable architecture for future growth

---

## 🧱 Tech Stack

* **Framework:** Antigravity
* **Frontend:** Antigravity UI system
* **CMS:** Built-in Antigravity collections
* **Routing:** Dynamic slug-based routing
* **Styling:** Token-based spacing & layout system
* **Deployment:** Antigravity hosting (or compatible platform)

---

## 🧩 Core Features

### Marketing Pages

* Homepage (conversion-focused hero & sections)
* Services
* Pricing
* Process
* About
* Contact
* Blog
* Case Studies (listing + detail pages)

### Dynamic Content

* Case Studies (slug-based dynamic pages)
* Blog posts
* Image & media management
* Published/unpublished content control

### Admin Panel

* Add/edit/delete:

  * Blog posts
  * Case studies
  * Images
  * Page content
* Draft & publish workflows

### UX & Design System

* Full-width background sections (100vw)
* Centered content containers
* Consistent spacing & padding tokens
* Unified button, card, and form styles
* Mobile-first responsive behavior

---

## 📐 Layout & Spacing System

### Container Rules

* Max content width: `1200px`
* Wide desktop: `1320px`
* Background sections span full viewport width
* Horizontal padding:

  * Desktop: `24px`
  * Tablet: `20px`
  * Mobile: `16px`

### Vertical Rhythm

* Section spacing:

  * Desktop: `120px`
  * Tablet: `96px`
  * Mobile: `72px`
* Internal section padding:

  * Desktop: `96px`
  * Tablet: `72px`
  * Mobile: `56px`

---

## 🧭 Routing Structure

```text
/
├─ /services
├─ /pricing
├─ /process
├─ /about
├─ /contact
├─ /blog
│  └─ /blog/{slug}
├─ /case-studies
│  └─ /case-studies/{slug}
└─ /admin
```

* Case studies and blog posts use **dynamic slug-based routing**
* Invalid slugs return a clean 404
* Unpublished content is hidden from public routes

---

## 🗂 Case Study Data Model

Each case study includes:

* Title
* Slug (unique)
* Hero image
* Client name
* Industry
* Services provided
* Summary
* Problem
* Solution
* Results
* Metrics (optional)
* Gallery images
* Published status

---

## ✅ Quality Standards

* No hardcoded routes for dynamic content
* No inconsistent spacing between sections
* No content touching viewport edges
* No duplicate navigation items
* No inconsistent button styles

---

## 📈 Success Criteria

* Smooth, calm, premium scrolling experience
* All CTAs function correctly
* Case studies & blogs load dynamically without errors
* Improved perceived quality without overdesign
* Easy content updates via admin panel

---

## 🛠 Development Status

* [x] Information architecture
* [x] Spacing & layout system defined
* [x] Case study routing fixed
* [ ] Homepage UI polish
* [ ] Component-level consistency pass
* [ ] Performance optimization
* [ ] SEO & analytics integration

---

## 📄 License

This project is proprietary and intended for internal and client use only.
All rights reserved.
