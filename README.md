# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## App privacy policies and terms

Add the app slug to the registry in `src/legal/build.ts`, then add
`privacy.md` and `terms.md` to `src/legal/<slug>/`. Start each document with
its title as an H1. Include the app's platform publishers, privacy and
support contacts, data handling, ads, purchases, and related terms as applicable.

Run `pnpm run build` followed by `pnpm run test:legal` to check the built legal
URLs. The build writes a static directory index for each page at
`/<slug>/privacy/` and `/<slug>/terms/`. App links can use the slashless URLs.

## Published routes

The GitHub Pages build emits directory indexes with canonical URLs from
`src/site/metadata.ts`. It also publishes `public/robots.txt`, the generated
sitemap and the custom 404. Keep in-app links on the trailing-slash URLs.

When the public `VITE_POSTER_API_URL` is set, the build paginates the published
blog index and emits an article entry for each published ID. The blog
continues to fetch live content. New or unpublished article URLs are reflected
after the next Pages build, which runs nightly or can be triggered manually
after an article update. A configured API failure stops the build so an outage
does not replace the published article entries with an empty set. Local builds
without a Poster URL can still build the rest of the site.

Run `pnpm run test:routes` to check static routing, metadata, the paginated
article feed and the sitemap with a local Poster fixture.
