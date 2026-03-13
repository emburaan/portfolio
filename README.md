# Portfolio Website — KPM (Clean Architecture)
> Android Developer · Deloitte Consultant · Japanese Ink Wash Aesthetic

## Project Structure

```
portfolio-kmp/
├── src/
│   ├── index.html                   # Entry point
│   ├── styles/
│   │   └── main.css                 # Ink wash design system
│   ├── scripts/
│   │   └── main.js                  # UI interactions & animations
│   └── core/                        # Clean Architecture layers
│       ├── domain/                  # ← Innermost: pure business logic
│       │   ├── model/
│       │   │   └── entities.js      # Developer, Project, Skill, SkillGroup, ContactMessage
│       │   ├── repository/
│       │   │   └── interfaces.js    # PortfolioRepository, ContactRepository (contracts)
│       │   └── usecase/
│       │       └── usecases.js      # Get*, SendContactMessage use cases
│       ├── data/                    # ← Middle: implements domain contracts
│       │   ├── datasource/
│       │   │   └── localDataSource.js   # Static data; swap for API/CMS
│       │   └── repository/
│       │       └── repositoryImpl.js    # Implements domain repository interfaces
│       └── di/
│           └── container.js         # Dependency injection — wires all layers
└── public/                          # Static assets (images, icons, fonts)
```

## Clean Architecture Layers

```
┌──────────────────────────────────────────┐
│           PRESENTATION LAYER             │  ← HTML + CSS + main.js
│        (index.html, styles, scripts)     │
└────────────────────┬─────────────────────┘
                     │ calls use cases via DI
┌────────────────────▼─────────────────────┐
│              DI CONTAINER                │  ← core/di/container.js
└────────────────────┬─────────────────────┘
                     │ wires
┌────────────────────▼─────────────────────┐
│              DOMAIN LAYER                │  ← core/domain/
│  Entities · Repositories (interfaces)   │
│            · Use Cases                  │
└────────────────────┬─────────────────────┘
                     │ implemented by
┌────────────────────▼─────────────────────┐
│               DATA LAYER                 │  ← core/data/
│   DataSources · Repository Impls        │
└──────────────────────────────────────────┘
```

### Dependency Rule
> Dependencies only point **inward** — outer layers know about inner layers, never the reverse.

- `data/` depends on `domain/` (implements its interfaces)
- `di/` depends on both `data/` and `domain/` (wires them)
- `presentation` (HTML/JS) depends on `di/` (uses assembled use cases)
- `domain/` has **zero dependencies** on any other layer

## Design System — Ink Wash (Sumi-e)

| Token             | Value       | Usage                    |
|-------------------|-------------|--------------------------|
| `--ink-black`     | `#1a1714`   | Primary text, headings   |
| `--rice-paper`    | `#f5f0e8`   | Main background          |
| `--accent-red`    | `#8b2020`   | Highlights, hover states |
| `--accent-gold`   | `#9a7c42`   | Secondary accents        |
| Font Display      | Shippori Mincho | Headings             |
| Font Body         | Cormorant Garamond | Body text          |
| Font JP           | Noto Serif JP | Japanese characters    |

## How to Run

```bash
# Serve locally (any static server)
npx serve src/
# or
python3 -m http.server 3000 --directory src/
```

## Customization Guide

1. **Your name**: Replace `Your Name` in `index.html` and `localDataSource.js`
2. **Projects**: Edit `getProjectsData()` in `localDataSource.js`
3. **Contact**: Replace email/GitHub/LinkedIn links in `index.html` and `localDataSource.js`
4. **Photo**: Replace `.portrait-placeholder` div with an `<img>` tag
5. **Real contact form**: Swap `MockContactDataSource` with an EmailJS or Formspree integration
