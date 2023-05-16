[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/_2xjYeZK)

# Genesis Case

Case requirements defined [here](https://mixolydian-polonium-8c0.notion.site/Front-End-School-2-0-c0a2ae89311645e2bdd48b770868ba09).

## Getting Started

> **Note:** To simplify local deployment file .env is removed from .gitignore

### Cloning the repo

```bash
git clone git@github.com:perhamik/genesis-case.git perhamik-genesis-case
cd perhamik-genesis-case
```

### Running locally

#### Using docker:

```bash
docker build -t hw-1 . && docker run --name perhamik-case -dp 3000:3000 hw-3
# OR through yarn
yarn docker
```

#### Using yarn:

```bash
yarn install && yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project structure

```bash
│
├─public/
├─server/
│   │── ...
│   └── server.ts #Express Server (Middleware between API and App) - solves CORS issue
│
└─src/
    │
    ├─── api/
    │     └── index.ts #contains api requests and related methods
    │
    ├─── components/
    │     │── Course/
    │     │       │── index.tsx  # Course Component (Homepage)
    │     │       │── List/ ── index.tsx
    │     │       └── Item/
    │     │             │─── index.tsx
    │     │             │─── ItemImage.tsx
    │     │             └─── ItemStats/
    │     │                    │─── index.tsx
    │     │                    └─── Rating.tsx
    │     │
    │     │── Header/ ── index.tsx
    │     └── Lesson/
    │           │── context.tsx #local context
    │           │── index.tsx
    │           │── utils.tsx #local helpers
    │           │── Info/ ── index.tsx
    │           │── List/ ── index.tsx
    │           └── Video/ ── index.tsx
    │
    │
    ├─── pages/
    │     │── course/
    │     │     └── [...id].tsx #dynamic route to catch all path
    │     │
    │     │── _app.tsx #custom App
    │     │── _document.tsx #custom Document
    │     │── 404.tsx #custom Error Page
    │     └── index.tsx #Home page
    │
    ├─── services/
    │     │── api.ts
    │     │── const.ts #global definitions
    │     │── index.ts
    │     │── previews.ts #getters for images URL's
    │     └── store.ts
    │
    │
    ├─── types/
    │     │── api.ts #core types provided by the API
    │     └── index.ts
    │
    └─── utils/
          │── delay.ts #time-based callbacks
          │── timeTransform.ts #string formating
          └── index.ts
```
