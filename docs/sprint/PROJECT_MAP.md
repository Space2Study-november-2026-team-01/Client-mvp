# Карта проєкту

- Дата складання: 2026-11-18
- Коміт: 557e65829ee56ce1ca65e1dfdd534317a422bb8c (557e658)
- Гілка: develop
- Репозиторій: C:\Users\oshuty\Desktop\Client-mvp

## Як читати цю карту

Це клієнтський репозиторій. Шлях у тексті — файл у `C:\Users\oshuty\Desktop\Client-mvp`. Формат посилання: `шлях/до/файлу` — `Назва.символ`.

Тема коміту, з якого зібрана карта: `fix(home-page): fix Send a Request item styling in How it works block (#55) (#6)` (`git log -1 --format=%s`).

Твердження без слова «Припущення:» спирається на відкритий файл або на пошук. «не знайдено в коді» означає, що пошук у цьому репозиторії нічого не дав; поруч указано, де шукали. Бекенд-репозиторій у цю карту не входить.

## Стек

Один застосунок, без окремих серверних модулів у цьому корені.

- Node.js 22: `package.json` — `engines.node` `>=22`; `.nvmrc` містить `22`. `README.md` називає ту саму версію для локального запуску, CI і Docker.
- Збірка і дев-сервер — Vite 4: `package.json` — залежність `vite`, скрипти `start` (`vite`), `build` (`vite build`), `serve` (`vite preview --port 3000`); конфіг `vite.config.ts` — `defineConfig`, плагіни `@vitejs/plugin-react`, `vite-plugin-svgr`, `vite-tsconfig-paths`.
- UI — React 18: `package.json` — `react`, `react-dom`; точка монтування `src/index.tsx` — `createRoot`. Стилі й компоненти Material UI 5 і Emotion: `package.json` — `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`. `README.md` прямо забороняє `@material-ui` і `makeStyles`.
- Мова — TypeScript 5: `package.json` — `typescript`; `tsconfig.json` — `strict: true`, `jsx: react-jsx`, аліас `~/*` на `src`. У `src` поруч лишаються `.jsx` і `.js` (наприклад `src/pages/tutor-profile/TutorProfile.jsx`).
- Маршрути — React Router 6: `package.json` — `react-router-dom`; `src/router/router.tsx` — `createBrowserRouter`.
- Стан і частина запитів — Redux Toolkit і RTK Query: `package.json` — `@reduxjs/toolkit`, `react-redux`; `src/redux/store.ts` — `configureStore`; `src/redux/apiSlice.ts` — `createApi`.
- Інші HTTP-виклики — Axios: `package.json` — `axios`; `src/plugins/axiosClient.ts` — `axios.create`.
- Тексти — i18next: `package.json` — `i18next`, `react-i18next`; `src/plugins/i18n.ts` — `i18n.use(initReactI18next).init`, мови `en` і `ua`.
- Тести — Vitest і Testing Library: `package.json` — скрипт `test` (`vitest --coverage`), `vitest`, `@testing-library/react`; `vitest.config.ts` — середовище `jsdom`, звіти в `src/tests/coverage`.
- Образ — Node 22 збирає Vite, nginx віддає `dist`: `Dockerfile` — стадії `build` і `runtime`. Оркестрація одного сервісу `client`: `compose.yaml`.
- Якість — ESLint, Prettier, Husky, lint-staged: `package.json` — скрипти `lint`, `format:check`, `prepare`; `eslint.config.mjs`; `.husky/pre-commit`, `.husky/pre-push`. CI: `.github/workflows/main.yaml`.

У корені репозиторію немає `pom.xml`, `build.gradle`, `requirements.txt`, `pyproject.toml`, `go.mod`, `Cargo.toml`, `composer.json`, `*.csproj`. Список знято з кореня `C:\Users\oshuty\Desktop\Client-mvp` (поруч із `package.json`, `Dockerfile`, `compose.yaml`).

## Запуск і конфігурація

Точка входу браузера: `index.html` підключає `/src/index.tsx`. `src/index.tsx` монтує `Provider` (`src/redux/store.ts` — `store`) і `RouterProvider` (`src/router/router.tsx` — `router`), потім викликає `setupInterceptors`.

Локально, за `README.md` і `package.json`:

1. Node.js 22 (`.nvmrc`), `npm install`, `npm rebuild esbuild`.
2. Скопіювати `.env.example` у `.env`.
3. `npm start` — Vite. Порт і автооткрыття: `vite.config.ts` — `server.port` `3000`, `server.open` `true`. `README.md` дає адресу http://localhost:3000.
4. Тести: `npm test`. Лінт: `npm run lint`. Формат: `npm run format:check`.
5. Прев’ю збірки: `npm run serve` (`vite preview --port 3000`).

Docker, за `README.md`, `package.json`, `Dockerfile`, `compose.yaml`:

- `npm run docker:build` збирає образ `spacetostudy-client`.
- `npm run docker:up` — `docker compose up --build`. `compose.yaml` публікує `8080:80`. `nginx.conf` — `try_files` на `/index.html`, тобто SPA-fallback.
- Аргументи збірки ті самі, що й змінні `VITE_*`. `README.md` пише, що Vite вшиває їх у бандл, тому зміна `.env` вимагає перезбірки.

Назви змінних (з `.env.example`, `README.md`, `src/vite-env.d.ts`, `Dockerfile`, `compose.yaml`; значення з `.env` не копіювались, файлу `.env` карта не читала):

- `VITE_API_BASE_PATH` — базова адреса API. Її читають `src/plugins/axiosClient.ts` — `axiosClient` (`baseURL`) і `src/redux/apiSlice.ts` — `appApi` (`baseQuery`).
- `VITE_GMAIL_CLIENT_ID` — клієнт Google-входу.
- `VITE_APP_IMG_URL` — хост публічних зображень.
- `VITE_APP_IMG_USER_URL` — хост фото користувача.
- `VITE_APP_TINY_MCE_API_KEY` — ключ редактора TinyMCE (`package.json` містить `@tinymce/tinymce-react`).

`compose.yaml` підставляє для `VITE_API_BASE_PATH` запасне значення `http://localhost:8080`, і той самий порт `8080` віддає зібраний клієнт. Локальний Vite при цьому слухає `3000` (`vite.config.ts`).

CI (`.github/workflows/main.yaml`): пуші й pull request у `main` і `develop`. Джоба `lint-and-test` ставить Node з `.nvmrc`, далі `npm ci`, `npm run lint`, `npm run format:check`, `npm test`. Джоба `docker` збирає образ і не пушить його (`push: false`). SonarQube лише якщо задано секрет `SONAR_TOKEN`. У `sonar-project.properties` ключі ще плейсхолдери `YOUR_PROJECT_KEY`, `YOUR_ORGANIZATION`, `YOUR_PROJECT_NAME`.

Хуки: `.husky/pre-commit` запускає `npm run pre-commit` (у `package.json` це lint-staged). `.husky/pre-push` запускає `npm run test`.

## Модулі

### Оболонка і маршрути

Навіщо: зібрати дерево React, тему, шапку й підвал і розвести сторінки за роллю до того, як намалюється конкретний екран.

- Маршрути: `src/router/router.tsx` — `routerConfig`, `router`. Корінь — `src/App.tsx` — `App` (тема MUI, провайдери снекбара, підтвердження і модалки). Оболонка сторінки — `src/containers/app-content/AppContent.tsx` — `AppContent`; всередині `src/containers/layout/app-header/AppHeader.tsx`, `src/containers/layout/app-main/AppMain.tsx` (хлібні крихти, `Outlet`, футер). Групи: `src/router/routes/guestRouter.tsx` — `guestRouter`; `src/router/routes/authRouter.tsx` — `authRouter`; `src/router/routes/studentRouter.tsx` — `studentRouter`; `src/router/routes/tutorRouter.tsx` — `tutorRouter`; `src/router/routes/errorRouter.tsx` — `errorRouter`. Константи шляхів: `src/router/constants/guestRoutes.ts` — `guestRoutes`; `src/router/constants/authRoutes.ts` — `authRoutes`; `src/router/constants/studentRoutes.ts` — `studentRoutes`; `src/router/constants/tutorRoutes.ts` — `tutorRoutes`; `src/router/constants/errorRoutes.ts` — `errorRoutes`; `src/router/constants/adminRoutes.ts` — `adminRoutes`.
- Бізнес-логіка: `src/router/helpers/HomeRoute.tsx` — `HomeRoute` відправляє вже відому роль на `guestRoutes[userRole]`. `src/router/helpers/PrivateRoute.tsx` — `PrivateRoute` пускає лише роль зі списку, інакше веде на `errorRoutes.authPolicy`. `src/containers/layout/app-main/AppMain.tsx` — `AppMain` один раз диспатчить `checkAuth`.
- Дані: `src/redux/store.ts` — `store` (гілки `appMain` і `appApi`); `src/redux/reducer.ts` — `mainSlice`; `src/redux/apiSlice.ts` — `appApi` (ендпоінтів у самому слайсі немає, їх доінжектюють сервіси). Репозиторіїв, моделей БД і міграцій немає: шукав імена `repository`, `migration` по `src` не як окремий шар; каталогів `migrations` / `repositories` під `src` немає.
- Сторінки: гостьова домівка, кабінети, категорії, предмети, пошук пропозицій, профіль, мої ресурси, питання, вихід, політика cookie, помилки 400/401/404/500 — див. модулі нижче і `src/pages`. Окремої сторінки адміна в `src/pages` і окремого `adminRouter` у `src/router/routes` не знайдено (пошук файлів `*admin*` у `src/pages` і `src/router/routes`).
- Тести: `src/tests/unit/router/router.spec.jsx` (увесь `describe` позначено `describe.skip`); `src/tests/unit/router/helpers/HomeRoute.spec.jsx`; `src/tests/unit/router/helpers/PrivateRoute.spec.jsx`; `src/tests/unit/components/layout/AppMain.spec.jsx`; `src/tests/unit/containers/navbar/NavBar.spec.jsx`.

Ролі в коді: `src/types/user/user-enums/user.enums.ts` — `UserRoleEnum` (`student`, `tutor`, `admin`). Рядки тих самих ролей: `src/constants/index.ts` — `student`, `tutor`, `admin`.

Підключені шляхи (зірочка — те, що реально віддає `element` у роутері):

- `/` — `HomeRoute` → гість бачить гостьову, роль редіректить на `student` / `tutor` / `admin`.
- `privacy-policy` — `src/pages/cookie-policy/CookiePolicy.jsx`.
- `student` — лише `UserRoleEnum.Student`, `src/pages/student-home/StudentHome.tsx`.
- `tutor` — лише `UserRoleEnum.Tutor`, `src/pages/tutor-home/TutorHome.tsx`.
- `categories`, `categories/subjects`, `categories/subjects/find-offers`, `user/:id`, `my-profile`, `my-resources`, `my-resources/new-question`, `my-resources/edit-question/:id` — студент або репетитор (`authRouter`).
- `logout` — `src/pages/logout/Logout.tsx`.
- `error/400`, `error/401`, `error/404`, `error/500` — `src/pages/error/*`.

### Автентифікація

Навіщо: увійти, оновити сесію за cookie, вийти, підтвердити пошту і скинути пароль, не зберігаючи пароль у клієнтському сховищі.

- Маршрути і ендпоінти: окремого шляху `/login` у `authRoutes` немає. Діалог логіна відкриває гостьова сторінка. Шляхи API зібрані в `src/constants/request.ts` — `URLs.auth`: `POST /auth/login`, `POST /auth/google-auth`, `POST /auth/signup`, `POST /auth/logout`, `GET /auth/refresh`, `POST /auth/confirm-email`, `POST /auth/forgot-password`, `PATCH /auth/reset-password/:token`. Виклики: `src/services/auth-service.ts` — `authService` (RTK Query: `signUp`, `login`, `googleAuth`, `logout`) і `AuthService` (Axios: `refresh`, `confirmEmail`, `forgotPassword`, `resetPassword`). Вихід зі сторінки: `src/pages/logout/Logout.tsx` — `Logout` викликає `useLogoutMutation` і веде на `guestRoutes.home`.
- Бізнес-логіка: `src/redux/reducer.ts` — `checkAuth` кличе `AuthService.refresh` і `setUser`; `setUser` читає JWT через `parseJwt` (`src/utils/helper-functions.tsx`) і кладе `userId`, `userRole`, `isFirstLogin`. `login` і `googleAuth` у `authService` теж диспатчать `setUser`, помилка диспатчить `logout`. UI: `src/containers/guest-home-page/login-dialog/LoginDialog.jsx` — `LoginDialog`; `src/containers/guest-home-page/login-form/LoginForm.jsx` — `LoginForm`; `src/containers/guest-home-page/google-login/GoogleLogin.jsx` — `GoogleLogin`; `src/containers/guest-home-page/google-button/GoogleButton.jsx` — `GoogleButton`; `src/containers/guest-home-page/forgot-password/ForgotPassword.jsx` — `ForgotPassword`; `src/containers/guest-home-page/reset-password/ResetPassword.jsx` — `ResetPassword`; `src/containers/email-confirm-modal/EmailConfirmModal.jsx` — `EmailConfirmModal`. Перехоплення мови і 401: `src/services/setup-interceptors.ts` — `setupInterceptors`.
- Дані: стан сесії в `mainSlice` (`src/redux/reducer.ts`). Окреме сховище браузера: `src/services/local-storage-service.ts` — `getFromLocalStorage` / `setToLocalStorage`, ключ `s2s` (`src/constants/index.ts`). Таблиць і міграцій немає (шукав каталоги міграцій у `src` — немає).
- Сторінки: форми живуть у модалках гостьової, не як окремі route-сторінки. Компонента реєстрації не знайдено: пошук `useSignUpMutation` і файлів `*signup*` / `*Signup*` у `src` дав ендпоінт `signUp`, типи `SignupParams` (`src/types/user/user-interfaces/user.interfaces.ts`), переклади `src/constants/translations/en/signup.json` і `src/constants/translations/ua/signup.json`, картинки `src/assets/img/signup-dialog/`. Виклику `useSignUpMutation` поза `src/services/auth-service.ts` немає.
- Тести: `src/tests/unit/containers/guest-home-page/login-dialog/LoginDialog.spec.jsx`; `src/tests/unit/containers/guest-home-page/login-form/LoginForm.spec.jsx`; `src/tests/unit/containers/guest-home-page/google-login/GoogleLogin.spec.jsx`; `src/tests/unit/containers/guest-home-page/forgot-password/ForgotPassword.spec.jsx`; `src/tests/unit/containers/guest-home-page/reset-password/ResetPassword.spec.jsx`; `src/tests/unit/containers/email-confirm-modal/EmailConfirmModal.spec.jsx`; `src/tests/unit/pages/logout/Logout.spec.jsx`; `src/tests/unit/redux/redux.spec.js`; `src/tests/unit/services/local-storage-service.spec.js`.

### Головні сторінки гостя, студента і репетитора

Навіщо: показати вітрину до входу і після входу дати короткий кабінет із пошуковим блоком і, на першому вході, майстром профілю.

- Маршрути: `/` і `privacy-policy` (гість); `student`; `tutor`. Див. `guestRouter`, `studentRouter`, `tutorRouter`.
- Бізнес-логіка: гостьова збирає блоки в `src/pages/guest-home-page/GuestHome.tsx` — `GuestHomePage` (вітання, «що вмієте», «як це працює», «хто ми», модалки логіна, підтвердження пошти й скидання пароля за query `confirmToken` / `resetToken`). Студент: `src/pages/student-home/StudentHome.tsx` — `StudentHome`, пошук через `FindBlock` і FAQ `src/containers/student-home-page/faq/Faq`. Репетитор: `src/pages/tutor-home/TutorHome.tsx` — `TutorHome` і той самий `FindBlock`. Перший вхід (`isFirstLogin`) відкриває `src/components/user-steps-wrapper/UserStepsWrapper.tsx`. Кроки репетитора: `src/containers/tutor-home-page/general-info-step/GeneralInfoStep.jsx`, `add-photo-step/AddPhotoStep.jsx`, `language-step`, `subjects-step`.
- Дані: роль і прапорець першого входу з `state.appMain`. Окремої моделі «домашньої сторінки» немає.
- Сторінки і компоненти: перелічені вище; навігація гостя і користувача — `src/containers/navigation-icons/`, меню акаунта — `src/containers/layout/account-menu/AccountMenu.tsx` — `AccountMenu` (пункти з `authRoutes.accountMenu`: мій профіль і вихід).
- Тести: `src/tests/unit/pages/guest-home/GuestHome.spec.jsx`; `src/tests/unit/pages/student-home/StudentHome.spec.jsx`; `src/tests/unit/pages/tutor-home/TutorHome.spec.jsx`; `src/tests/unit/containers/how-it-works/HowItWorks.spec.jsx`; `src/tests/unit/containers/navigation-icons/NavigationIcons.spec.jsx`.

### Категорії, предмети і пропозиції

Навіщо: провести користувача від категорії до предмета і далі до пропозицій репетитора чи студента. У коді зібрано типи й частина списку предметів; список категорій і список пропозицій ще заглушки.

- Маршрути: `authRoutes.categories` (`/categories`), `authRoutes.subjects` (`/categories/subjects`), `authRoutes.findOffers` (`/categories/subjects/find-offers`) у `src/router/routes/authRouter.tsx`.
- Бізнес-логіка і ендпоінти: `src/services/category-service.ts` — `categoryService.getCategories` (`GET /categories`), `getCategoriesNames` (`GET /categories/names`). `src/services/subject-service.ts` — `subjectService.getSubjects` і `getSubjectsNames` (шлях збирається як `/categories/:id` + `/subjects` або `/subjects/names`). Сторінка предметів: `src/pages/subjects/Subjects.tsx` — `Subjects` (пошук, догрузка, модалка нового предмета `src/containers/find-offer/create-new-subject/CreateNewSubject.tsx`, блок запиту `src/containers/find-offer/offer-request-block/OfferRequestBlock.tsx`). Пошук із кабінету: `src/components/find-block/FindBlock.jsx` — `FindBlock`.
- Дані: типи пропозиції `src/types/offer/interfaces/offer.interfaces.ts` — `Offer`, `GetOffersResponse`, `PriceRangeParams`, `PriceRangeResponse`; дії `src/types/offer/enums/offer.enums.ts` — `OfferActionsEnum`. Сервісу пропозицій немає: пошук `offerService`, `OfferService`, `URLs.offers` у `src` нічого не дав. У `URLs` (`src/constants/request.ts`) немає ключа `offers`. Константа `URLs.categories.priceRange` (`/price-range`) ніде, крім `request.ts`, не зустрічається (пошук `priceRange`).
- Сторінки: `src/pages/categories/Categories.tsx` — `Categories` рендерить текст `Categories`. `src/pages/find-offers/FindOffers.tsx` — `FindOffers` рендерить текст `Find offers`. Компонента деталей пропозиції немає: у `src/pages/offer-details` лежить лише `OfferDetails.styles.ts`. Пошук рядка `offer-details` у `src` знайшов імпорти перекладів `offer-details-page.json` (`src/constants/translations/en/index.ts`, `src/constants/translations/ua/index.ts`), не сторінку. Вміст styles-файлу карта не описує: файл не відкривався.
- Тести сторінок категорій, предметів і find-offers не знайдено: шукав `src/tests/unit/pages` — файлів `Categories`, `Subjects`, `FindOffers` немає. Є тест дропдауна категорій ресурсів, це інша сутність: `src/tests/unit/containers/category-dropdown/CategoryDropdown.spec.jsx`.

### Профіль

Навіщо: показати картку користувача і «мій профіль» після входу.

- Маршрути: `authRoutes.userProfile` (`user/:id`) і `authRoutes.accountMenu.myProfile` (`/my-profile`). Обидва рендерять один компонент `TutorProfile` (`src/router/routes/authRouter.tsx`). Дані чужого профілю підвантажує `src/router/constants/loaders.ts` — `userProfileLoader` через `userService.getUserById`.
- Бізнес-логіка і ендпоінти: `src/services/user-service.tsx` — `userService.getUsers` (`GET /users`), `getUserById` (`GET /users/:id?role=`), `updateUser` (`PATCH /users/:id`), `deleteUser` (`DELETE /users/:id`), `deleteUsers` (`POST /users/delete`). Сторінка: `src/pages/tutor-profile/TutorProfile.jsx` — `TutorProfile` знову кличе `getUserById` хуком `useAxios`. Блоки: `src/containers/tutor-profile/profile-info/ProfileInfo.jsx` — `ProfileInfo`; `video-presentation/VideoPresentation`; `comments-with-rating-block/CommentsWithRaitngBlock.tsx`. `URLs.users.myProfile` (`/users/myProfile`) у викликах не знайдено (пошук `URLs.users.myProfile` і `myProfile` як шлях API — збіг лише в `src/constants/request.ts`).
- Дані: тип користувача `src/types/user/user-interfaces/user.interfaces.ts`. Відповідь профілю на сторінці змішана з моком `src/pages/tutor-profile/constants.js` — `responseMock` (його ж читає блок відгуків). Окремої таблиці немає.
- Сторінки-заглушки, не підключені до роутера: `src/pages/student-profile/StudentProfile.jsx` — `StudentProfile` (текст `StudentProfile Page Placeholder`); `src/pages/edit-profile/EditProfile.tsx` — `EditProfile` (текст `EditProfile Page Placeholder`). Пошук імпортів `pages/student-profile` і `pages/edit-profile`: сторінку студента не імпортує ніхто, `EditProfile` імпортує лише свій тест.
- Тести: `src/tests/unit/pages/tutor-profile/TutorProfile.spec.jsx`; `src/tests/unit/containers/tutor-profile/ProfileInfo.spec.jsx`; `src/tests/unit/containers/tutor-profile/video-presentation/VideoPresentation.spec.jsx`; `src/tests/unit/services/user-service.spec.jsx`; `src/tests/unit/pages/edit-profile/EditProfile.spec.jsx`. Теста `StudentProfile` не знайдено (шукав `src/tests` за іменем `StudentProfile` — згадка лише очікуваного тексту в `src/tests/unit/router/router.spec.jsx`).

### Навчальні ресурси

Навіщо: дати репетитору або студенту свої питання, категорії матеріалів, уроки й квізи. Питання і категорії матеріалів доведені до списків і запитів; вкладки уроків і квізів на сторінці «мої ресурси» ще підписи.

- Маршрути: `authRoutes.myResources` — `/my-resources`, `/my-resources/new-question`, `/my-resources/edit-question/:id` (`src/router/routes/authRouter.tsx`). Сторінки уроку і квізу в цьому роутері немає (шукав `lesson` і `quiz` у `src/router` — збігів маршруту немає).
- Бізнес-логіка і ендпоінти: `src/services/resource-service.ts` — `ResourceService` і RTK-мутація `resourceService.updateResourceCategory`. Шляхи з `src/constants/request.ts` — `URLs.resources`: питання `/questions` (get/post/patch/delete), уроки `/lessons` (get/post/patch), квізи `/quizzes` (get/post/patch), вкладення `GET /attachments`, категорії матеріалів `/resources-categories` (get, `/names`, post, patch, delete). Списки: `src/containers/my-resources/questions-container/QuestionsContainer` (константи дій у `QuestionsContainer.constants.tsx`), `src/containers/my-resources/categories-container/CategoriesContainer.tsx` — видалення через `ResourceService.deleteResourceCategory`. Редактор питання: `src/pages/create-or-edit-question/CreateOrEditQuestion.tsx`. Квіз-контейнери: `src/containers/my-quizzes/create-or-edit-quiz-container/CreateOrEditQuizContainer.tsx` кличе `addQuiz` з `ResourceService`. Урок: `src/pages/create-or-edit-lesson/CreateOrEditLesson.tsx` — `CreateOrEditLesson`.
- Дані: типи `src/types/questions/interfaces/questions.interface.ts`, `src/types/my-resources/`. Файл `src/types/course/types/course.types.ts` порожній (відкривався, у ньому немає жодного рядка). Міграцій немає.
- Сторінки: `src/pages/my-resources/MyResources.tsx` — `MyResources`. Вкладки в `src/pages/my-resources/MyResources.constants.tsx` — `tabsData`: `lessons` і `quizzes` рендерять заголовок `<h4>`, `questions` рендерить `QuestionsContainer`, `categories` — `CategoriesContainer`. `src/pages/new-quiz/NewQuiz.tsx` — `NewQuiz` і `src/pages/create-or-edit-lesson/CreateOrEditLesson.tsx` у `router.tsx` / `authRouter.tsx` не підключені. Пошук імпорту `from '~/pages/new-quiz/NewQuiz'` і дефолтного експорту `CreateOrEditLesson` знайшов лише самі ці файли; ззовні імпортують їхні константи (`NewQuiz.constants`, `CreateOrEditLesson.constants`).
- Тести: `src/tests/unit/pages/my-resources/MyResources.spec.jsx`; `src/tests/unit/pages/create-or-edit-question/CreateOrEditQuestion.spec.jsx`; `src/tests/unit/containers/my-resources/QuestionsContainer.spec.jsx`; `src/tests/unit/containers/my-resources/CategoriesContainer.spec.jsx`. Теста `NewQuiz` або `CreateOrEditLesson` у `src/tests` не знайдено (пошук імен файлів `NewQuiz.spec`, `CreateOrEditLesson.spec`).

### Спільний інтерфейс, HTTP-клієнт і стан

Навіщо: не дублювати таблиці, форми, модалки й виклики API в кожній сторінці.

- Маршрути: своїх немає.
- Бізнес-логіка: хуки `src/hooks/` — форми (`use-form.tsx` — `useForm`), запити (`use-axios.tsx`), пагінація і фільтри таблиці (`src/hooks/table/`), завантаження файлів (`use-upload.jsx`). Контексти: `src/context/modal-context.tsx`, `confirm-context.tsx`, `snackbar-context.tsx`, `step-context.jsx`.
- Дані: єдиний HTTP-клієнт `src/plugins/axiosClient.ts` — `axiosClient` (`withCredentials: true`, базовий URL з `VITE_API_BASE_PATH`). RTK Query поверх того ж URL: `src/redux/apiSlice.ts` — `appApi`. Приклад, який ніхто не викликає: `src/services/example-service.ts` — `exampleService.getAll` на `URLs.example.get` (`/example`); пошук `exampleService` і `example-service` знайшов лише цей файл.
- Компоненти: каталог `src/components/` (пошук, таблиця `enhanced-table`, завантажувач файлів, редактор питання, картки, пагінація). Переклади: `src/constants/translations/en`, `src/constants/translations/ua`, збірка `src/constants/translations/index.ts`. Іконки і картинки: `src/assets` (вміст папки карта не розбирала).
- Тести: дзеркало в `src/tests/unit/components`, `src/tests/unit/hooks`, `src/tests/unit/utils`, `src/tests/unit/context`, `src/tests/unit/services`. Налаштування: `src/tests/setup-tests.js` (`vitest.config.ts` — `setupFiles`). End-to-end каталогу і згадок Cypress / `data-cy` у `src` не знайдено (пошук `data-cy`, `cypress`). `README.md` лише каже ставити `data-cy`, коли такі тести з’являться.

## Де шукати

Бекенд у цьому репозиторії — це не сервер. У колонці «Бекенд» скрізь один підсумок пошуку: контролерів, репозиторіїв БД і міграцій немає; шукав корінь (немає серверного маніфесту, окрім клієнтських `package.json` / `Dockerfile` / `compose.yaml`), `src/services` (лише HTTP-клієнт) і `src/router` (лише екрани).

| Сутність | Бекенд | Фронтенд | Дані | Тести |
| --- | --- | --- | --- | --- |
| Користувачі | не знайдено в коді (див. абзац над таблицею) | `src/services/user-service.tsx` — `userService`; `src/pages/tutor-profile/TutorProfile.jsx` — `TutorProfile` | `src/types/user/user-interfaces/user.interfaces.ts`; `URLs.users` у `src/constants/request.ts` | `src/tests/unit/services/user-service.spec.jsx` |
| Сесія і логін | не знайдено в коді | `src/services/auth-service.ts` — `authService.login`, `AuthService.refresh`; `src/redux/reducer.ts` — `checkAuth`, `setUser`; `src/containers/guest-home-page/login-dialog/LoginDialog.jsx` — `LoginDialog` | `mainSlice` у `src/redux/reducer.ts`; cookie через `withCredentials` у `src/plugins/axiosClient.ts` | `src/tests/unit/redux/redux.spec.js`; `src/tests/unit/containers/guest-home-page/login-dialog/LoginDialog.spec.jsx` |
| Реєстрація | не знайдено в коді | Ендпоінт є: `authService.signUp` (`POST /auth/signup`). Екран не знайдено (пошук `useSignUpMutation`, файлів `*Signup*`) | `SignupParams` у `src/types/user/user-interfaces/user.interfaces.ts`; переклади `src/constants/translations/en/signup.json` | не знайдено в коді (шукав `src/tests` за `signUp` / `signup` — лише фікстура `src/tests/unit/redux/redux.variables.js` — `signupUserData`, не форма) |
| Google-вхід | не знайдено в коді | `src/containers/guest-home-page/google-button/GoogleButton.jsx` — `GoogleButton`; `authService.googleAuth` | змінна `VITE_GMAIL_CLIENT_ID` (`.env.example`); шлях `URLs.auth.googleAuth` | `src/tests/unit/containers/guest-home-page/google-login/GoogleLogin.spec.jsx` |
| Підтвердження пошти і пароль | не знайдено в коді | `src/containers/email-confirm-modal/EmailConfirmModal.jsx` — `EmailConfirmModal`; `ForgotPassword.jsx`; `ResetPassword.jsx`; методи `AuthService` | `URLs.auth.confirm`, `forgotPassword`, `resetPassword` | `EmailConfirmModal.spec.jsx`, `ForgotPassword.spec.jsx`, `ResetPassword.spec.jsx` у `src/tests/unit/containers/` |
| Ролі і закриті маршрути | не знайдено в коді | `src/router/helpers/PrivateRoute.tsx` — `PrivateRoute`; `src/router/helpers/HomeRoute.tsx` — `HomeRoute` | `UserRoleEnum` у `src/types/user/user-enums/user.enums.ts` | `src/tests/unit/router/helpers/PrivateRoute.spec.jsx`; `HomeRoute.spec.jsx` |
| Пошук із кабінету | не знайдено в коді | `src/components/find-block/FindBlock.jsx` — `FindBlock`; поле на предметній: `src/components/search-autocomplete/SearchAutocomplete.tsx` | рядок запиту збирається в `FindBlock` як query `search` | `src/tests/unit/components/search-input/SearchInput.spec.jsx`; `SearchAutocomplete.spec.jsx`; окремого тесту `FindBlock` не знайдено (шукав `src/tests` за `FindBlock`) |
| Категорії навчання | не знайдено в коді | `src/pages/categories/Categories.tsx` — заглушка; сервіс `src/services/category-service.ts` — `categoryService` | `src/types/categories/`; `URLs.categories` | не знайдено в коді (немає `Categories.spec` у `src/tests/unit/pages`) |
| Предмети | не знайдено в коді | `src/pages/subjects/Subjects.tsx` — `Subjects`; `src/services/subject-service.ts` — `subjectService` | `SubjectInterface` імпортується сторінкою з `~/types`; `URLs.subjects` | не знайдено в коді (немає `Subjects.spec`); хук: `src/tests/unit/hooks/use-subjects-names.spec.jsx` |
| Пропозиції (offers) | не знайдено в коді | Заглушка `src/pages/find-offers/FindOffers.tsx` — `FindOffers`. Сторінки деталей немає (лише `src/pages/offer-details/OfferDetails.styles.ts` і переклади) | Типи `src/types/offer/interfaces/offer.interfaces.ts` — `Offer`. Сервісу й `URLs.offers` немає | не знайдено в коді (шукав `src/tests` за `FindOffers` / `Offer`) |
| Профіль і «мій профіль» | не знайдено в коді | `src/pages/tutor-profile/TutorProfile.jsx`; лоадер `src/router/constants/loaders.ts` — `userProfileLoader` | `userService.getUserById`; мок `src/pages/tutor-profile/constants.js` — `responseMock` | `TutorProfile.spec.jsx`, `ProfileInfo.spec.jsx` |
| Профіль студента і редагування профілю | не знайдено в коді | Заглушки `src/pages/student-profile/StudentProfile.jsx`, `src/pages/edit-profile/EditProfile.tsx`; у роутері не підключені | не знайдено в коді (окремої моделі edit-profile немає; шукав імпорти цих сторінок) | `src/tests/unit/pages/edit-profile/EditProfile.spec.jsx`; тесту студента немає |
| Питання | не знайдено в коді | `src/containers/my-resources/questions-container/`; `src/pages/create-or-edit-question/CreateOrEditQuestion.tsx`; `ResourceService.getQuestions` / `createQuestion` / `updateQuestion` / `deleteQuestion` | `src/types/questions/interfaces/questions.interface.ts`; `URLs.resources.questions` | `QuestionsContainer.spec.jsx`; `CreateOrEditQuestion.spec.jsx` |
| Уроки | не знайдено в коді | `src/pages/create-or-edit-lesson/CreateOrEditLesson.tsx` (не в роутері); вкладка `lessons` у `MyResources.constants.tsx` — заголовок; `ResourceService.getLesson` / `addLesson` / `editLesson` | `URLs.resources.lessons`; типи в `src/types/my-resources/` | не знайдено в коді (немає `CreateOrEditLesson.spec`) |
| Квізи | не знайдено в коді | `src/pages/new-quiz/NewQuiz.tsx` (не в роутері); `src/containers/my-quizzes/create-or-edit-quiz-container/CreateOrEditQuizContainer.tsx`; `ResourceService.getQuiz` / `addQuiz` / `editQuiz` | `URLs.resources.quizzes` | не знайдено в коді (немає `NewQuiz.spec`) |
| Категорії матеріалів | не знайдено в коді | `src/containers/my-resources/categories-container/CategoriesContainer.tsx`; `resourceService.updateResourceCategory` | `URLs.resources.resourcesCategories` | `src/tests/unit/containers/my-resources/CategoriesContainer.spec.jsx` |
| Вкладення | не знайдено в коді | `ResourceService.getAttachments`; завантажувач `src/components/file-uploader/FileUploader.tsx` | `URLs.resources.attachments` | `src/tests/unit/components/file-uploader/FileUploader.spec.jsx` |
| Адмінка | не знайдено в коді | Лише константи `src/router/constants/adminRoutes.ts` — `adminRoutes` (`students`, `admins`, `tutors`, `categories`, `complains`) і ключ `guestRoutes.admin`. Сторінок і `adminRouter` немає | не знайдено в коді (немає `URLs.admin`; шукав `src/constants/request.ts`) | Згадка в пропущеному `src/tests/unit/router/router.spec.jsx` (`describe.skip`) |
| Локалізація | не знайдено в коді | `src/plugins/i18n.ts`; JSON у `src/constants/translations/en` і `ua` | ресурси i18next, не БД | окремого каталогу тестів перекладів не знайдено (шукав `src/tests` за `i18n`) |
| Локальне сховище | не знайдено в коді | `src/services/local-storage-service.ts` | ключ `s2s` у `src/constants/index.ts` | `src/tests/unit/services/local-storage-service.spec.js` |

## Домовленості в коді

- Імена файлів: папки в `kebab-case` (`guest-home-page`, `my-resources`). Компоненти в `PascalCase` і збігаються з папкою (`FindBlock.jsx`, `TutorHome.tsx`). Сервіси — `*-service.ts` (`auth-service.ts`). Поруч зі стилями `*.styles.ts` або `*.styles.js` і з константами `*.constants.ts`. Новий код за `README.md` — TypeScript; аліас `~` вказує на `src` (`tsconfig.json`, `vite.config.ts`). Фактично поруч живуть `.jsx` і `.tsx`.
- Шари, як їх описує `README.md`: сторінка в `src/pages`, шматки лише цієї сторінки поруч із нею; підключений до стану UI в `src/containers`; презентаційний UI в `src/components`; Redux Toolkit у `src/redux` одним слайсом, без пари action/reducer на сутність. Redux Saga `README.md` заперечує; пошук `saga` по `src` збігів не дав.
- Структура пакета: один npm-пакет `sp_project_fe` (`package.json`), без workspaces. `README.md` просить експорт компонента з `index` у папці. Карта не перевіряла кожну папку на наявність `index`.
- Стиль API: усі відносні шляхи в одному об’єкті `URLs` (`src/constants/request.ts`). Два клієнти паралельно: методи Axios у `*Service` і ендпоінти RTK Query через `appApi.injectEndpoints` (так зібрані `authService` і `resourceService`). Query-параметри серіалізує `qs` (`src/plugins/axiosClient.ts`). Ідентифікатор дописується `createUrlPath` (`src/utils/helper-functions.tsx`).
- Тести: Vitest + Testing Library, файли `*.spec.jsx` / `*.spec.tsx` / `*.spec.js` під `src/tests/unit`, дзеркалять шари `components`, `containers`, `pages`, `hooks`, `services`, `router`. Моки Axios — `axios-mock-adapter` (імпорти в спеках сервісів). Порядок, що саме покривати, розписаний у `README.md` (спочатку прості компоненти, знімки оновлювати лише свідомо). Покриття v8 пишеться в `src/tests/coverage` (`vitest.config.ts`).
- Гілки і процес — з документів, не з історії гілок. `README.md`: гілки `main`, `develop`, `feature`; фіча зливається в `develop`; у `main` лише реліз; pull request цілиться в `develop`; ім’я гілки починається з `feature`, `bugfix` або `test`, далі номер і короткий опис; заголовок PR починається з `#xxx-yyy`. `CONTRIBUTING.md` і `CONTRIBUTING_UA.md`: база `develop`, перед PR має бути один коміт (зайві сквошити), пуш у форк, PR у `develop`. CI (`.github/workflows/main.yaml`) слухає `main` і `develop`. Поточна гілка робочої копії на момент карти: `develop` (`git branch --show-current`).

## Підводні камені

- Пошук із домівки веде не на пропозиції. `src/components/find-block/FindBlock.jsx` — `FindBlock` збирає адресу як `` `${authRoutes.accountMenu.myProfile.path}?search=` ``, тобто `/my-profile?search=...`, хоча маршрут списку пропозицій — `authRoutes.findOffers` (`/categories/subjects/find-offers`).
- Категорії і пропозиції не зібрані. `src/pages/categories/Categories.tsx` і `src/pages/find-offers/FindOffers.tsx` показують статичний текст. Сервісу оферів і ключа `URLs.offers` немає. Типи `Offer` і `GetOffersResponse` ніхто, крім оголошення й бареля `src/types/index.ts`, не імпортує (пошук `GetOffersResponse`, `PriceRangeParams`, `enrolledUsers`). Сторінки деталей немає, є стилі без імпортів і JSON перекладів.
- Профіль малює мок поруч із живим запитом. `src/pages/tutor-profile/TutorProfile.jsx` бере `responseMock` з `src/pages/tutor-profile/constants.js` для відгуків і окремо вантажить користувача через `userService.getUserById`. Той самий мок читає `src/containers/tutor-profile/comments-with-rating-block/constants.ts`. У моку зашиті імена й пошта; у карту їх не копіюю.
- Адмінки в застосунку немає, але роль є. `UserRoleEnum.Admin` і `guestRoutes.admin` існують, `HomeRoute` перейде на маршрут ролі, якщо в токені `admin`. Файла роутера й сторінок адміна немає. `adminRoutes` використаний у `src/tests/unit/router/router.spec.jsx`, і цей файл цілком під `describe.skip`. Тест чекає текст `Hello Admin!` і `studentTable.studentsTab`.
- Пропущений роутер-тест розходиться з константами. Той самий `router.spec.jsx` читає `studentRoutes.accountMenu.myProfile` і `studentRoutes.findTutor`. У `src/router/constants/studentRoutes.ts` є лише `navBar` (`categories`, `howItWorks`, `faq`). `myProfile` і `logout` лежать у `authRoutes.accountMenu`. Очікуваний текст `StudentProfile Page Placeholder` відповідає заглушці, яку роутер не рендерить: `/my-profile` віддає `TutorProfile`.
- Квіз посилається на файл, якого немає. `src/pages/new-quiz/NewQuiz.constants.tsx` імпортує `ViewQuizContainer` з `~/containers/my-quizzes/view-quiz-container/ViewQuizContainer`. Каталогу `view-quiz-container` під `src/containers/my-quizzes` немає (є `create-or-edit-quiz-container`, `quiz-settings-container`, два view питань). Сама сторінка `NewQuiz` у роутер не входить. `src/components/tab-navigation/TabNavigation.tsx` імпортує тип `QuizTabsData` з цього файла. Припущення: без `verbatimModuleSyntax` у `tsconfig.json` імпорт лише типу зітреться і відсутній модуль не завантажиться з `TabNavigation`; пряме відкриття `NewQuiz.constants` цей модуль вимагає.
- Видалення категорії матеріалів зібране без слеша. `URLs.resources.resourcesCategories.delete` у `src/constants/request.ts` дорівнює `'resources-categories'`, сусідні шляхи починаються з `/`. `ResourceService.deleteResourceCategory` передає це в `createUrlPath`, який лише склеює рядок (`src/utils/helper-functions.tsx`).
- Реєстрація є в API-шарі і не знайдена в UI. `useSignUpMutation` експортується з `src/services/auth-service.ts` і більше ніде не викликається. Окремої signup-сторінки чи діалога в `src/containers` і `src/pages` немає (є переклади й svg).
- Перехоплювач відповіді не збігається з тим, як його викликають. `src/index.tsx` викликає `setupInterceptors(store)`, а `src/services/setup-interceptors.ts` — `setupInterceptors` оголошена без параметрів. Гілка повтору дивиться на `error.code === 'UNAUTHORIZED'`, не на HTTP-статус. У `catch` викликається `authService.endpoints.logout.initiate()` без `dispatch`. Припущення: для Axios код помилки і статус відповіді — різні поля, тож ця гілка може не ловити 401.
- Заглушки уроків і квізів на живій сторінці. `tabsData` у `src/pages/my-resources/MyResources.constants.tsx`: вкладки `lessons` і `quizzes` — це `<h4>`, тоді як `CreateOrEditLesson`, `ResourceService.addLesson` / `addQuiz` і контейнери `src/containers/my-quizzes/` уже написані і в цей таб не вставлені.
- Мертві або ніким не імпортовані шматки (пошук імпортів по `src`, окрім власного файла і тестів, де зазначено): `src/services/example-service.ts` — `exampleService`; ключі `URLs.example`, `URLs.users.myProfile`, `URLs.categories.priceRange`; сторінки `StudentProfile` і `EditProfile` (другу імпортує лише її spec); `src/pages/offer-details/OfferDetails.styles.ts` (імпортів рядка `offer-details` зі стилів немає). `src/types/course/types/course.types.ts` порожній.
- Роз’їзд імен. `package.json` — ім’я `sp_project_fe`; `README.md` — SpaceToStudy; `index.html` — `<title>Space2Study</title>` і description «Web site created using create-react-app», хоча збірка — Vite (`vite.config.ts`). Опечатки в іменах: `CommentsWithRaitngBlock`, тест `ComentsBlock.spec.jsx`, тип `MyResoursesTabsData`, у роутер-тесті поле стану `loding`.
- Плейсхолдери документації, не код логіки. `README.md` каже, що в `src/constants/translations/en/cookie-policy-page.json` і `ua/cookie-policy-page.json` лишились `YOUR_PROJECT_URL` і `YOUR_CONTACT_EMAIL` (самі JSON карта не відкривала). `sonar-project.properties` містить `YOUR_PROJECT_KEY`. `CONTRIBUTING.md` лишає `YOUR_BACKEND_REPOSITORY_URL`.
- TODO і FIXME у коді не знайдено. Пошук рядка `TODO|FIXME` по репозиторію (поза `node_modules`) дав збіг лише в інструкції `.agents/skills/project-map/SKILL.md`, не в `src`.

## Межі карти

- Не читались `node_modules`, `dist`, `build`, `vendor`, `coverage`, `.git`, `src/tests/coverage`.
- Не відкривався кожен файл у `src/components` і `src/assets`. Шари описані за точкою входу, роутером, сервісами, сторінками `src/pages` і пошуком імпортів.
- Секрети з `.env` не копіювались. Назви змінних узяті з `.env.example`, `README.md`, `src/vite-env.d.ts`, `Dockerfile`, `compose.yaml`.
- Бекенд-репозиторій не відкривався і в шляхах карти не фігурує.
- Застосунок не запускався: карта зібрана з файлів і пошуку, без перевірки екрана в браузері.
