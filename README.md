# Onboarding Form

A 4-step onboarding form built with React and TypeScript.

## Setup

```bash
git clone https://github.com/crystal4000/Onboarding-Form.git
cd Onboarding-Form
npm install
npm run dev
```

Runs at `http://localhost:5173`.

## Libraries

- **React Hook Form + Zod** — form state and validation. Keeps validation logic clean and co-located with the schema.
- **Zustand** — shared form state across steps with built-in localStorage persistence via the persist middleware.
- **shadcn/ui + Tailwind** — accessible, unstyled-by-default components that are easy to customize without fighting the library.
- **react-phone-input-2** — handles phone input with country code selection and auto-fills the country field.
- **Framer Motion** — step transition animations.

## Time Spent

~3 hours

## Known Trade-offs

- Country list comes from the restcountries API — if the request fails, the dropdown will be empty with no fallback.
- Phone validation is lenient by design. The library formats numbers differently per country so strict digit-count validation would cause false negatives.
- No backend — form submission is simulated with a timeout.
