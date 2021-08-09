# Frontend Project Structure

- [eslint/](../eslint/): [ESLint](./tooling.md#linting) configuration files split up by environment.
- [jest/](../jest/): [Jest](./testing.md) configuration files for unit/integration/E2E tests.
  - [e2e.config.js](../jest/e2e.config.js): Jest configuration file for E2E tests.
  - [playwright.setup.ts](../jest/playwright.setup.ts): Setup file to configure Playwright settings for E2E tests.
  - [setupTests.ts](../jest/setupTests.ts): Setup file to configure mocks for unit / integration tests.
  - [test.config.js](../jest/test.config.js): Jest configuration file for unit / integration tests.
- [plop-templates/](../plop-templates/): Directory containing template files for [Plop](./tooling.md#plop-generator)
- [public/](../public/): [Static assets](https://nextjs.org/docs/basic-features/static-file-serving) accessible from the browser.
- [src/](../src/): The source directory 💻
  - [components/](../src/components): React components.
  - [components/common/](../src/components/common): Shared common components.
    - [icons/](../src/components/common/icons): [Icon components](./architecture.md#icons).
    - [animations.tsx](../src/components/common/animations.tsx): Components used for animation.
    - [media.tsx](../src/components/common/media.tsx): Components used for media queries.
  - [context/](../src/context): Global state management.
  - [fixtures/](../src/fixtures): Fixture data used for testing and mocking.
  - [hooks/](../src/hooks): Shared [React hooks](https://reactjs.org/docs/hooks-intro.html).
  - [pages/](../src/pages): [Next.js pages](./architecture.md#pages).
  - [utils/](../src/utils): Shared utility functions.
- [test/](../test/): Directory containing all E2E tests.
- [.babelrc.js](../babelrc.js): Configuration file for [customizing Next.js babel settings](https://nextjs.org/docs/advanced-features/customizing-babel-config).
- [.eslintrc.js](../.eslintrc.js): Configuration file for ESLint
- [.lintstagedrc.yml](../.lintstagedrc.yml): Configuration file for [lint-staged](./tooling.md#linting)
- [.nvmrc](../.nvmrc): Current node.js version used for [nvm](https://github.com/nvm-sh/nvm).
- [.prettierrc.yml](../.prettierrc.yml): Configuration file for [prettier](./tooling.md#linting)
- [.stylelintrc.yml](../.stylelintrc.yml): Configuration file for [Stylelint](./tooling.md#linting)
- [Dockerfile](../Dockerfile): [Dockerfile](https://docs.docker.com/engine/reference/builder/) for building a production image of napari hub.
- [mock-server.js](../mock-server.js): Server used for [mocking the hub backend](./tooling.md#development-mode).
- [modules.d.ts](../modules.d.ts): Type definitions for modules that don't export type definitions.
- [next-env.d.ts](../next-env.d.ts): Global type definitions for Next.js
- [next.config.js](../next.config.js): Configuration [file](https://nextjs.org/docs/api-reference/next.config.js/introduction) for Next.js.
- [package.json](../package.json): Project configuration [file](https://docs.npmjs.com/cli/v7/configuring-npm/package-json)
- [plopfile.js](../plopfile.js): Configuration file for [Plop](./tooling.md#plop-generator).
- [postcss.config.js](../postcss.config.js): Configuration file for [PostCSS](https://nextjs.org/docs/advanced-features/customizing-postcss-config).
- [tailwind.config.js](../tailwind.config.js): Configuration file for [Tailwind](https://tailwindcss.com/docs/configuration).