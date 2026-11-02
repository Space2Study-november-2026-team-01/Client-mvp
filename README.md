# SpaceToStudy

<img src="https://raw.githubusercontent.com/ita-social-projects/SpaceToStudy-Client/develop/spacetostudy-thumbnail.jpg" alt="SpaceToStudy" title="SpaceToStudy">

SpaceToStudy is a platform where experts share knowledge and students learn from them. You can find a course, find a tutor, or offer tutoring and receive feedback.

![Node.js](https://img.shields.io/badge/node-22%20LTS-339933)
![Vite](https://img.shields.io/badge/vite-4-646cff)
![License](https://img.shields.io/badge/license-MIT-blue)

---

- [Installation](#installation)
  - [Required to install](#required-to-install)
  - [Clone](#clone)
  - [Setup](#setup)
  - [How to run locally](#how-to-run-locally)
  - [Docker](#docker)
- [Usage](#usage)
  - [How to run tests](#how-to-run-tests)
- [Documentation](#documentation)
  - [Rules and guidelines](#rules-and-guidelines)
  - [Testing](#testing)
  - [CI](#ci)
- [Contributing](#contributing)
  - [Git flow](#git-flow)
  - [Issue flow](#issue-flow)
- [Teams](#teams)
  - [Development team](#development-team)
  - [DevOps team](#devops-team)
  - [Designer team](#designer-team)
  - [BA team](#ba-team)
  - [QC team](#qc-team)
- [FAQ](#faq)
- [License](#license)

---

## Installation

### Required to install

- Node.js 22 LTS (see `.nvmrc`)
- npm 10, which ships with Node.js 22
- Docker Engine and Docker Compose, only if you run the production image

Node.js 18 from the original starter is end-of-life. CI, Docker, and `.nvmrc` all use Node.js 22. The current application toolchain (Vite 4, Vitest 0.34, ESLint 8) is the generation that runs on this line. Node.js 26 is the newest LTS and needs a separate toolchain upgrade.

### Clone

Clone this repository to your machine.

### Setup

```shell
npm install
npm rebuild esbuild
```

`esbuild` is the only dependency install script, and it is listed in `allowScripts`. npm 10 runs it during install. npm 12 (Node.js 24) skips it until that entry is present, so `npm rebuild esbuild` downloads the binary if `npm start` then says esbuild is missing.

Copy the environment template and fill in the values you need:

```shell
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

`.env` is gitignored. These variables are read by Vite from `import.meta.env`:

| Variable                    | Purpose                  |
| --------------------------- | ------------------------ |
| `VITE_API_BASE_PATH`        | Backend API base URL     |
| `VITE_GMAIL_CLIENT_ID`      | Google sign-in client id |
| `VITE_APP_IMG_URL`          | Public image host        |
| `VITE_APP_IMG_USER_URL`     | User photo host          |
| `VITE_APP_TINY_MCE_API_KEY` | TinyMCE API key          |

### How to run locally

1. Open a terminal in the repository root.
2. Run `npm start`.
3. Open http://localhost:3000.

The dev server is Vite. With an empty `.env` the shell still opens; API calls, Google sign-in, images, and the editor stay inactive until those values are set.

### Docker

The image is a multi-stage build: Node.js 22 compiles the Vite app, nginx 1.30.6 serves `dist`.

```shell
npm run docker:up
```

Open http://localhost:8080. Compose reads `.env` when it is present and passes the `VITE_*` values as build arguments. Vite inlines them, so changing `.env` requires a rebuild:

```shell
docker compose up --build
```

`npm run docker:build` only builds the image and tags it `spacetostudy-client`.

---

## Usage

### How to run tests

```shell
npm test
```

That runs Vitest once with coverage. Lint and check formatting with:

```shell
npm run lint
npm run format:check
```

`npm run lint:fix` and `npm run format` apply the automatic fixes. Prettier owns formatting. ESLint owns correctness and is not wired to run Prettier.

---

## Documentation

### Rules and guidelines

- State
  - Redux Toolkit lives under `src/redux`. Prefer slice files over a separate action/reducer pair per entity.
  - Connected UI belongs in `containers`. Presentational UI belongs in `components`.
- Routing
  - Each route screen belongs in `pages`. Pieces used only by that screen stay next to it.
- Configuration
  - Runtime configuration is the `.env` file described above. Only `VITE_`-prefixed names are exposed to the client.
  <!-- Students: replace YOUR_PROJECT_URL and YOUR_CONTACT_EMAIL in the English and Ukrainian cookie-policy translation files. -->
  - Cookie policy copy still has `YOUR_PROJECT_URL` and `YOUR_CONTACT_EMAIL` in `src/constants/translations/en/cookie-policy-page.json` and `src/constants/translations/ua/cookie-policy-page.json`.
- Styles
  - Style components with MUI (`@mui/material`) and Emotion. Do not add `@material-ui` or `makeStyles`.
- Components
  - A component folder exports from `index`, keeps the component in a `.tsx` or `.jsx` file, and keeps styles beside it.
- Language
  - New code is TypeScript. The path alias `~` points at `src/`.

### Testing

Tests are Vitest plus Testing Library, in `src/tests`. Coverage is written to `src/tests/coverage` (v8 provider).

Order for component tests:

1. Stateless components reused in several places
2. Components that render other components and have no Redux connection
3. Components with local state and no Redux connection
4. Components connected to Redux

Do not test third-party libraries, constants, static CSS, or a child component while you are testing its parent.

Cover props (defaults and overrides), conditions, state before and after an event, and events with and without arguments. Snapshot tests lock presentational markup; update them with `npm test -- -u` only when the UI change is intentional.

There is no Redux Saga layer in this repository. Reducer and action tests are plain function tests: default state, then the next state for each action.

Cypress selectors, when you add end-to-end tests, use `data-cy`.

### CI

`.github/workflows/main.yaml` runs on `main` and `develop` for pushes and pull requests.

- `lint-and-test` installs with `npm ci` on the Node.js version from `.nvmrc`, then lints and tests.
- `docker` builds the production image and does not push it.
- SonarQube runs only when the `SONAR_TOKEN` secret exists. Set `sonar.projectKey`, `sonar.organization`, and `sonar.projectName` in `sonar-project.properties` before enabling the scan.

---

## Contributing

Discuss the change in an issue before opening a pull request. Pull requests target `develop`.

<!-- Students: replace the names below with your frontend and backend GitHub repositories. -->

There are two GitHub projects: **YOUR_FRONTEND_REPO** for the frontend and **YOUR_BACKEND_REPO** for the backend.

Link each pull request to an issue. Branch names start with the task type (`feature`, `bugfix`, or `test`), the task number, and a short description, for example `feature/125/create-admin-panel`.

Pull request titles start with `#xxx-yyy`, for example `#125-createAdminPanel`.

### Git flow

`main`, `develop`, and `feature` branches are in use. Feature branches merge into `develop`. Only a release merges into `main`.

1. Clone the repository, or create a branch from `develop`.
2. Commit on that branch.
3. Open a pull request back into `develop`.

### Issue flow

1. Open **Issues** and choose **New issue**.
2. Add a name and description, then set the assignee, labels, and project. A user story links to its tasks, and those tasks link back to the story.
3. Move the issue on the project board when its status changes.

---

## FAQ

- **Which Node.js version should I use?**
  - Node.js 22 LTS. `nvm use` or `fnm use` reads `.nvmrc`.
- **Where is the dev server?**
  - http://localhost:3000 after `npm start`.
- **Where is the Docker server?**
  - http://localhost:8080 after `npm run docker:up`.
- **CI fails on SonarQube.**
  - The scan is skipped until `SONAR_TOKEN` is set. After you add the secret, point `sonar-project.properties` at your own SonarQube Cloud project.

---

#### License

- **[MIT license](http://opensource.org/licenses/mit-license.php)**

<!-- Students: replace the year, URL, and organization name with your own. -->

- Copyright YEAR © <a href="YOUR_PROJECT_URL" target="_blank">YOUR_ORGANIZATION</a>.

[MIT](https://choosealicense.com/licenses/mit/)
