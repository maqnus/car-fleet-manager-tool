# Car Fleet Manager Tool

Dette prosjektet er satt opp for å administrere bilflåter. Koden er konfigurert til å automatisk deploye til Vercel når endringer pushes til `main`-branchen.

Du kan se og teste resultatet her: [Car Fleet Manager Tool](https://car-fleet-manager-tool.vercel.app/)

## Teknologi

Dette er en Next.js-applikasjon som bruker [designsystemet.no](https://designsystemet.no) for komponenter og [aksel.nav.no](https://aksel.nav.no) for layout. Enhetstester er implementert med [Vitest](https://vitest.dev). Prosjektet benytter også [@tanstack/react-query](https://tanstack.com/query/latest) for effektiv håndtering av serverstate og caching.

## Kom i gang

1. Klon dette repositoriet.
2. Installer avhengigheter med `npm install`.
3. Start utviklingsserveren med `npm run dev`.

## Deployment

Deploy skjer automatisk til Vercel ved push til `main`. Ingen manuell handling er nødvendig.

## Planer

Jeg planlegger å legge inn e2e-tester ved hjelp av [Playwright](https://playwright.dev).
