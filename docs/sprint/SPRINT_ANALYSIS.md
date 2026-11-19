# Аналіз карток спринта

- Дата: 2026-11-18
- Джерело карток: GitHub Space2Study-november-2026-team-01/Issues, лейбл «sprint 3», лише лейбл Frontend part (16 карток)
- Карта проєкту: docs/sprint/PROJECT_MAP.md, коміт 557e65829ee56ce1ca65e1dfdd534317a422bb8c
- Бекенд, якщо на нього є посилання: BackEnd-mvp, карта коміт 2343e752257705db91305167ccde897712fad675. Бекенд-картки того самого лейбла лежать в BackEnd-mvp/docs/sprint/SPRINT_ANALYSIS.md

Бекенд-картки того самого лейбла розібрані в `C:\Users\oshuty\Desktop\BackEnd-mvp\docs\sprint\SPRINT_ANALYSIS.md`. Тексти #138 і #128 прочитані командою `gh issue view`.

Карта клієнта і код тут не розходяться: екрана реєстрації немає, `signUp` є. Карта бекенду і код не розходяться: моделі `Subject` і маршруту категорій навчання немає, є лише `resources-categories`. Деталі в картках, які це чіпають.

## Картка: #44 (SP: 2) Create a pop up window with sign up fields.

### Суть і критерії приймання

Користувач натискає «Become a student» або «Become a tutor», і з’являється форма реєстрації. Картка скопійована з `ita-social-projects/Space2Study-node-Client-mvp#83`.

Критерії з картки:

- The pop-up window must contain all the elements in accordance with the mockup.
- The clicking elements must be disabled for now.

### Питання до власника продукту

У тексті немає переліку елементів, лише зображення макету. Які саме елементи вважати повним набором? Ключі `Client-mvp/src/constants/translations/en/signup.json` (заголовок student/tutor, згода, Google, «вже є акаунт», тексти про лист підтвердження) у картці не названі критерієм.

### Що вже є в коді

Карта клієнта (розділ «Автентифікація») каже: екрана реєстрації немає, ендпоінт `signUp` є. Код це підтверджує.

- `Client-mvp/src/services/auth-service.ts` — `authService.signUp` (`POST /auth/signup`), хук `useSignUpMutation`. Пошук `useSignUpMutation` у `Client-mvp/src` знайшов лише цей файл.
- `Client-mvp/src/types/user/user-interfaces/user.interfaces.ts` — `SignupParams` (`firstName`, `lastName`, `email`, `password`, `confirmPassword`, `role`), `SignupResponse` (`userId`, `userEmail`).
- `Client-mvp/src/constants/request.ts` — `URLs.auth.signup` = `/auth/signup`.
- Переклади: `Client-mvp/src/constants/translations/en/signup.json` і `Client-mvp/src/constants/translations/ua/signup.json`. Картинки: `Client-mvp/src/assets/img/signup-dialog/student.svg`, `tutor.svg` (файли є в дереві; вміст svg не відкривався).
- Компонента форми реєстрації не знайдена. Пошук `useSignUpMutation` і файлів `*signup*` / `*Signup*` у `Client-mvp/src` дав сервіс, типи, переклади й svg, не діалог.
- Кнопки з потрібними підписами вже є, але форму не відкривають. `Client-mvp/src/constants/translations/en/guest-home-page.json` — `whatCanYouDo.learn.actionLabel` = `Become a student`, `teach.actionLabel` = `Become a tutor`. `Client-mvp/src/containers/guest-home-page/WhatCanYouDo.tsx` — `WhatCanYouDo` передає в `InfoCard` `action={() => {}}`. `Client-mvp/src/containers/guest-home-page/how-it-works/HowItWorks.tsx` — `HowItWorks` передає ті самі підписи в `CardsWithButton`. `Client-mvp/src/containers/guest-home-page/cards-with-button/CardsWithButton.tsx` — `AppButton` без `onClick`.
- Зразок діалога: `Client-mvp/src/containers/guest-home-page/login-dialog/LoginDialog.jsx` — `LoginDialog`. Оболонка модалки: `Client-mvp/src/context/modal-context.tsx` — `openModal`; `Client-mvp/src/components/popup-dialog/PopupDialog.tsx` — `PopupDialog`. У `PopupDialog` іконка `CloseIcon` без `onClick`, у `Dialog` немає `onClose`.
- Бекенд уже приймає реєстрацію: `BackEnd-mvp/src/routes/index.js` монтує `/auth`; схема `BackEnd-mvp/src/validation/schemas/signup.js` — `signupValidationSchema`; `BackEnd-mvp/src/services/auth.js` — `authService.signup(role, firstName, lastName, email, password, language)` повертає `userId` і `userEmail`. Поля `confirmPassword` у цій функції немає.

### Що треба зробити

- База даних: змін не потрібно. У `Client-mvp` бази немає. Картка не просить нове поле; користувача вже створює бекенд.
- Бекенд: змін не потрібно. `POST /auth/signup` уже є, а критерій вимикає клікабельні елементи, тож відправка форми в цю картку не входить.
- API: змін не потрібно. Клієнтський шлях і типи вже є. Виклик `useSignUpMutation` ця картка не вмикає.
- Фронтенд: попап із елементами макету, відкриття з «Become a student» / «Become a tutor», клікабельні елементи всередині вимкнені. Зразок оболонки — `LoginDialog` і `openModal`.
- Тести: новий spec попапа. Карта називає зразок `Client-mvp/src/tests/unit/containers/guest-home-page/login-dialog/LoginDialog.spec.jsx`; цей spec у проході не відкривався.
- Документація: змін не потрібно. Картка не просить документів.

### Складність

Припущення: M. Новий екран за зразком `LoginDialog`, один шар (фронтенд). Перелік елементів сидить у макеті, не в тексті критеріїв.

### Тип роботи

Індивідуальна. Зміна в гостьових діалогах і в обробниках двох кнопок однієї вітрини. Поділ кнопки й форми додасть узгодження тієї самої модалки.

### Залежності

Немає. Картка не посилається на іншу картку цього спринту. Ендпоінт реєстрації вже в коді, не в картках цього спринту.

## Картка: #45 (SP: 1) Implement the validation for all the fields on the form

### Суть і критерії приймання

Валідація полів форми sign-up. Текст починається з «After #83». Картка скопійована з `ita-social-projects/Space2Study-node-Client-mvp#81`. User story у тілі: #55.

Критерії з картки:

- "First Name" and "Last Name" fields must receive a string in a range from 2 to 15 symbols.
- The email field must be for emails.
- Password must contain at least one alphabetic and one numeric character.
- The "Confirm Password" field must be connected with the "Password" field.

### Питання до власника продукту

Діапазон імені 2–15 не збігається з уже написаними правилами. `BackEnd-mvp/src/consts/validation.js` — `MIN_NAME_LENGTH` 1, `MAX_NAME_LENGTH` 30; те саме в `BackEnd-mvp/src/validation/schemas/signup.js`. `Client-mvp/src/utils/validations/common.ts` — `nameField` відхиляє довжину понад 30 і нелітерні символи, мінімуму 2 немає. Пароль у тому ж файлі (`password`) вимагає літеру й цифру і ще довжину 8–25; картка довжину не називає. Яке правило показувати на формі?

### Що вже є в коді

Форми sign-up немає (див. #44). Валідатори є:

- `Client-mvp/src/utils/validations/login.js` — `email`, `password`, `firstName`, `lastName`, `confirmPassword` (порожнє поле або `passwordsDontMatch`, якщо значення не дорівнює `data.password`).
- `Client-mvp/src/utils/validations/common.ts` — `nameField`, `email`, `password`.
- `Client-mvp/src/hooks/use-form.tsx` — `useForm` викликає `validations[key]`. Його використовує `LoginDialog`, не форма реєстрації.
- `Client-mvp/src/types/user/user-interfaces/user.interfaces.ts` — `SignupParams` уже містить `confirmPassword`. `BackEnd-mvp/src/services/auth.js` — `authService.signup` цей аргумент не приймає.

### Що треба зробити

- База даних: змін не потрібно. Картка про перевірку полів форми.
- Бекенд: змін не потрібно за текстом картки. Розбіжність довжини імені з схемою signup лишається питанням до власника продукту, не зміною цієї картки.
- API: змін не потрібно. Окремого контракту валідації картка не додає.
- Фронтенд: правила з критеріїв на полях форми sign-up. Зразок — `login.js` і `useForm`. Форми ще немає.
- Тести: spec цих правил. Окремого тесту signup-валідації не шукався поіменно; пошук екрана реєстрації його не показав.
- Документація: змін не потрібно. Картка не просить документів.

### Складність

Припущення: S. Один шар, зразки валідаторів уже є. Нова сутність не з’являється. Без форми з #44 правила нікуди вішати.

### Тип роботи

Індивідуальна. Це функції перевірки в модулі форми. Окремий виконавець на кожне поле лише розмножить одні й ті самі `validations`.

### Залежності

Припущення: #44. Артефакт — попап реєстрації з полями First Name, Last Name, email, Password, Confirm Password. Текст #45 починається з «After #83». #44 у цьому репозиторії скопійована з `Space2Study-node-Client-mvp#83` (рядок у тілі #44). Номер #83 — старий номер копії, не номер картки в `Space2Study-november-2026-team-01/Issues`, на який спирається цей зв’язок.

## Картка: #43 (SP: 1) Confirmation pop-up window.

### Суть і критерії приймання

Вікно підтвердження за макетом, коли користувач закриває sign-up. Картка скопійована з `ita-social-projects/Space2Study-node-Client-mvp#84`.

Критерії з картки:

- If a user clicks on the close button in the sign-up the pop-up window must appear.
- The pop-up window must not appear if the user clicks outside the sign-up form.
- The pop-up window must disappear if user click on the area of the sign-up form

### Питання до власника продукту

немає

### Що вже є в коді

Форми sign-up і її кнопки закриття немає (див. #44).

- `Client-mvp/src/components/confirm-dialog/ConfirmDialog.tsx` — `ConfirmDialog`: хрестик і `onClose` викликають `onDismiss`. Тобто клік поза цим діалогом його закриває. Це не правило з критеріїв (підтвердження не має з’являтися від кліку поза формою sign-up, і має зникати від кліку по області форми).
- `Client-mvp/src/context/confirm-context.tsx` — `ConfirmationDialogProvider` відкриває цей діалог.
- `Client-mvp/src/components/popup-dialog/PopupDialog.tsx` — хрестик без обробника. Пошук виклику `openDialog` з форми реєстрації: форми немає, тож і виклику немає.

### Що треба зробити

- База даних: змін не потрібно. Це вікно підтвердження, не дані.
- Бекенд: змін не потрібно. Запит картка не описує.
- API: змін не потрібно.
- Фронтенд: підтвердження на хрестику форми sign-up з трьома правилами кліку. Зразок діалога — `ConfirmDialog`, але його `onClose` треба не копіювати як є.
- Тести: три правила кліку. Зразок тесту карта називає `Client-mvp/src/tests/unit/components/confirm-dialog/ConfirmDialog.spec.jsx`; файл у проході не відкривався.
- Документація: змін не потрібно.

### Складність

Припущення: M. Нове вікно за зразком `ConfirmDialog`, один шар. Правила кліку зі зразком не збігаються, форми sign-up ще немає.

### Тип роботи

Індивідуальна. Один діалог і кнопка закриття тієї самої форми. Ділити показ вікна і правила кліку немає сенсу.

### Залежності

#44. Артефакт — кнопка закриття форми реєстрації. Критерії прив’язані до неї дослівно. У коді цієї форми немає.

## Картка: #21 (SP: 1) Create email confirmation info pop-up

### Суть і критерії приймання

Інформаційний попап підтвердження пошти за макетом. Картка скопійована з `ita-social-projects/Space2Study-node-Client-mvp#109`. Окремого речення, коли вікно відкривається, у тексті немає.

Критерії з картки:

- If a user clicks on the close button the pop-up window must disappear.
- The pop-up window must not disappear if the user clicks on the outside area.

### Питання до власника продукту

Коли вікно з’являється? Це не той самий екран, що вже існуючий `EmailConfirmModal`: той відкривається з query `confirmToken` і викликає `POST /auth/confirm-email` (див. нижче). Чи #21 — це інфо «лист надіслано» після реєстрації (такі рядки вже лежать у `signup.json` і ніким не читаються)?

### Що вже є в коді

`EmailConfirmModal` і ця картка описують різну поведінку. Їх не злито.

- `Client-mvp/src/containers/email-confirm-modal/EmailConfirmModal.jsx` — `EmailConfirmModal`. Пропси `confirmToken` і `openModal`. На монтуванні кличе `AuthService.confirmEmail`. Далі гілки: помилка токена, уже підтверджено, успіх. Кнопки викликають `closeModal` або відкривають `LoginDialog`. Критеріїв «хрестик ховає, клік поза вікном не ховає» у цьому файлі немає.
- `Client-mvp/src/pages/guest-home-page/GuestHome.tsx` — `GuestHomePage` відкриває `EmailConfirmModal`, якщо в query є `confirmToken`.
- `Client-mvp/src/services/auth-service.ts` — `AuthService.confirmEmail` на `URLs.auth.confirm` (`/auth/confirm-email`).
- `Client-mvp/src/constants/translations/en/email-modals.json` — тексти успіху й відхилення токена (`modals.emailConfirm` тощо).
- `Client-mvp/src/constants/translations/en/signup.json` — `confirmEmailTitle` («Your email address needs to be verified»), `confirmEmailMessage` («We sent a confirmation email to: »), `confirmEmailDesc`. Пошук `confirmEmailTitle` у `Client-mvp/src` знайшов лише json перекладів, не компонент.
- `Client-mvp/src/containers/guest-home-page/notification-modal/NotificationModal.tsx` — `NotificationModal`: кнопка викликає `onClose`. Єдиний знайдений виклик — `Client-mvp/src/containers/guest-home-page/forgot-password/ForgotPassword.jsx` (файл відкривався частково через пошук імпорту; тіло успішного листа не розбиралось).
- `Client-mvp/src/components/popup-dialog/PopupDialog.tsx` — спільна оболонка: хрестик без `onClick`, `Dialog` без `onClose` (клік поза вікном цю оболонку зараз не закриває, бо обробника немає).

### Що треба зробити

- База даних: змін не потрібно.
- Бекенд: змін не потрібно. Картка не описує новий запит. Підтвердження токена вже є і належить `EmailConfirmModal`.
- API: змін не потрібно, якщо вікно лише інформує. Якщо власник продукту скаже, що це знову виклик confirm-email, тоді це вже інша поведінка — її в критеріях немає.
- Фронтенд: окремий інфо-попап із двома правилами закриття. Не замінювати `EmailConfirmModal`.
- Тести: хрестик закриває, клік поза вікном не закриває. Spec `EmailConfirmModal` перевіряє токен, не ці два правила (файл spec у проході не відкривався; карта його називає).
- Документація: змін не потрібно.

### Складність

Припущення: L. Без відповіді, коли вікно з’являється і чим воно відрізняється від `EmailConfirmModal` і від невикористаних рядків `signup.json`, незрозуміло, що вважати готовим. Самі два правила кліку були б одним шаром.

### Тип роботи

Індивідуальна. Поділ передчасний, поки не названо момент показу. Це один попап.

### Залежності

Жорсткої немає. Картка не каже «після» іншої картки цього спринту. Припущення: якщо це інфо після відправки реєстрації, показ стане можливим лише коли форма з #44 почне відправляти лист. Критерії #44 якраз вимикають клікабельні елементи, тож відправки в #44 немає. Це не блокер двох правил закриття.

## Картка: #14 (SP: 1) Create informational pop-up window

### Суть і критерії приймання

Інформаційний попап за макетом. Картка скопійована з `ita-social-projects/Space2Study-node-Client-mvp#116`. Коли вікно з’являється, текст не каже.

Критерії з картки:

- If a user clicks on the close button the pop-up window must disappear.
- The pop-up window must not disappear if the user clicks on the area of the sign-up form

### Питання до власника продукту

Коли вікно з’являється? З коду це не видно. Критерії суперечать одне одному в прив’язці до sign-up: закриття по кнопці, але вікно не зникає при кліку на область sign-up. У #43 клік по області sign-up якраз ховає підтвердження закриття. Яке з двох вікон мається на увазі і що робити з кліком по формі?

### Що вже є в коді

Окремого informational pop-up для sign-up не знайдено. Шукав компоненти `*popup*`, `*modal*`, `*dialog*` у `Client-mvp/src` і текст `confirmEmailTitle`.

- `NotificationModal` і `EmailConfirmModal` описані в #21. Жоден не перевіряє «клік по області sign-up».
- `ConfirmDialog` закривається з `onClose` (клік поза діалогом).
- Форми sign-up, по якій треба клікати, немає (див. #44).

### Що треба зробити

- База даних: змін не потрібно.
- Бекенд: змін не потрібно. Запиту в картці немає.
- API: змін не потрібно.
- Фронтенд: попап із кнопкою закриття і правилом кліку по області sign-up. Поки власник продукту не скаже, коли вікно відкривається, незрозуміло, в який екран його вставляти.
- Тести: два критерії, після відповіді на суперечність.
- Документація: змін не потрібно.

### Складність

Припущення: L. Критерії суперечать одне одному, момент показу з картки і з коду не випливає. Без відповіді власника продукту незрозуміло, що готове.

### Тип роботи

Індивідуальна. Поділ передчасний: невідомо навіть, який екран чіпати.

### Залежності

Припущення: #44, якщо вікно і справді живе поверх форми sign-up. Артефакт — область форми реєстрації, про яку говорить другий критерій. Картка номер #44 не називає. Форми в коді немає.

## Картка: #20 (SP: 1) Closing confirmation pop-up window for the Stepper

### Суть і критерії приймання

Підтвердження закриття степера «as it was implemented for SignUp». Картка скопійована з `ita-social-projects/Space2Study-node-Client-mvp#110`.

Критерії з картки:

- If a user clicks on the close button in the Stepper the pop-up window must appear.
- The pop-up window must not appear if the user clicks outside the Stepper.
- The pop-up window must disappear if user click on the area of the Stepper.

### Питання до власника продукту

Чи «as it was implemented for SignUp» означає дослівні правила #43 (хрестик показує вікно, клік поза степером не показує, клік по області степера ховає)? Іншого опису патерну в тексті немає.

### Що вже є в коді

Патерну підтвердження закриття SignUp у коді немає (форма реєстрації відсутня, див. #43). Степер як модалка є.

- `Client-mvp/src/pages/student-home/StudentHome.tsx` — `StudentHome` при `isFirstLogin` викликає `openModal` з `UserStepsWrapper`.
- `Client-mvp/src/pages/tutor-home/TutorHome.tsx` — те саме для репетитора.
- `Client-mvp/src/components/user-steps-wrapper/UserStepsWrapper.tsx` — `UserStepsWrapper`.
- `Client-mvp/src/components/step-wrapper/StepWrapper.jsx` — `StepWrapper`: кнопки назад / далі / finish. Окремої кнопки закриття степера немає.
- `Client-mvp/src/components/popup-dialog/PopupDialog.tsx` — хрестик оболонки без `onClick`, тож натискання на нього зараз нічого не робить. `Dialog` без `onClose`.
- `ConfirmDialog` існує, але закривається кліком поза вікном (`onClose={onDismiss}`). Виклику з `StepWrapper` немає.

### Що треба зробити

- База даних: змін не потрібно.
- Бекенд: змін не потрібно.
- API: змін не потрібно.
- Фронтенд: на хрестику степера показати підтвердження з трьома правилами кліку. Хрестик зараз у спільній оболонці `PopupDialog`, не в `StepWrapper`.
- Тести: три правила. Spec степера є (`Client-mvp/src/tests/unit/components/step-wrapper/StepWrapper.spec.jsx` — кліки по вкладках, не закриття).
- Документація: змін не потрібно.

### Складність

Припущення: M. Один шар, новий діалог за зразком `ConfirmDialog`, але правила кліку інші, і патерну SignUp у коді ще немає.

### Тип роботи

Індивідуальна. Одна поведінка закриття степера. Ділити її з оболонкою `PopupDialog` означає чіпати всі модалки застосунку заради однієї картки — це гірше за одну зміну в місці відкриття степера.

### Залежності

Припущення: #43. Артефакт — патерн підтвердження закриття (з’явитись на хрестику, не з’являтись від кліку поза формою, зникнути від кліку по області форми). Картка прямо просить зробити «as it was implemented for SignUp». У коді цього патерну немає, його описують критерії #43. Якщо #43 ще не зроблена, повторювати немає з чого.

## Картка: #19 (SP: 2) Implement General Info step

### Суть і критерії приймання

Крок General Info один для студента і репетитора, бо за макетом вони однакові. User stories в тілі: #77, #74. Картка скопійована з `ita-social-projects/Space2Study-node-Client-mvp#111`.

Критерії з картки:

- First name and Last name of a user should be pulled from first registration form.
- Country and city have to be pulled from server on input focus
- Additional info length can't be more than 70 symbols

### Питання до власника продукту

Ліміт additional info: тут 70 символів, у #16 — 100. Число саме не вибирається. У коді третє число: `validations.professionalSummary` = `textField(0, 200)` у `Client-mvp/src/components/user-steps-wrapper/constants.ts`. Переклад `becomeTutor.experience.title` у `Client-mvp/src/constants/translations/en/become-tutor.json` каже «Maximum 70 characters», але це ключ `experience`, не `generalInfo`.

Звідки брати ім’я, якщо реєстрація ще не відправляє форму: #44 вимикає клікабельні елементи, тож «перша форма реєстрації» може не створити користувача. `GET /users/:id` вже є, але це не написано в картці.

### Що вже є в коді

Один компонент на обидві ролі:

- `Client-mvp/src/containers/tutor-home-page/general-info-step/GeneralInfoStep.jsx` — `GeneralInfoStep`. Зараз лише заголовок `becomeTutor.generalInfo.title` і `btnsBox`. Полів імені, країни, міста й additional info немає.
- `Client-mvp/src/components/user-steps-wrapper/UserStepsWrapper.tsx` — `UserStepsWrapper` рендерить той самий `GeneralInfoStep` і для студента, і для репетитора. Передає `isUserFetched` і `setIsUserFetched`, компонент їх не читає.
- Для студента `stepLabels` дорівнює `''`, для репетитора — `tutorStepLabels` (`generalInfo`, `subjects`, `language`, `photo`) з `Client-mvp/src/components/user-steps-wrapper/constants.ts`. Підпис `interests` є в `Client-mvp/src/constants/translations/en/step.json` і `ua/step.json`, у масиві кроків його немає.
- `initialValues`: `firstName`, `lastName`, `country: null`, `city: null`, `professionalSummary`. Припущення: additional info картки — це `professionalSummary`. Картка цих імен полів не називає.
- `Client-mvp/src/hooks/use-steps.jsx` — `handleSubmit` шле `firstName`, `lastName`, `address.country`, `address.city`, `professionalSummary` через `userService.updateUser`.
- `Client-mvp/src/services/user-service.tsx` — `getUserById` (`GET /users/:id`), `updateUser` (`PATCH /users/:id`).
- Бекенд приймає ці поля: `BackEnd-mvp/src/models/user.js` — `firstName`, `lastName`, `address.country`, `address.city`, `professionalSummary` (у схемі без maxLength). `BackEnd-mvp/src/validation/services/user.js` — `allowedUserFieldsForUpdate` містить ті самі ключі.
- Селект із завантаженням на фокусі як зразок, не для країни: `Client-mvp/src/components/async-autocomlete/AsyncAutocomplete.tsx` — `fetchOnFocus` і `handleFocus`.
- Ендпоінта країн і міст немає. Пошук `location`, `countrystatecity`, `/countries`, `/cities` у `BackEnd-mvp/src` — збігів немає. `country` / `city` знайдені лише як поля адреси користувача.

### Що треба зробити

- База даних: змін не потрібно в `Client-mvp`. На бекенді `address` і `professionalSummary` уже в моделі `User`. Окремої колекції країн картка не описує.
- Бекенд: змін не потрібно в межах цієї фронтенд-картки. Списків країн і міст у коді немає; їхні картки — #138 і #128 (див. залежності).
- API: клієнтський шлях країн/міст не знайдений у `Client-mvp/src/constants/request.ts` (ключів country/city/location там немає). Контракт полів відповіді не зафіксований.
- Фронтенд: поля кроку в `GeneralInfoStep` для обох ролей. Ім’я з першої реєстрації. Країна і місто з сервера на фокусі. Additional info не довше ніж 70 символів — лише після відповіді щодо суперечності з #16.
- Тести: кроку General Info spec не знайдено (шукав ім’я файлу поруч із `src/tests`; відкритий spec степера — `StepWrapper.spec.jsx` — цей крок не перевіряє).
- Документація: змін не потрібно.

### Складність

Припущення: L. Країна і місто мають прийти з сервера, якого в коді немає, і без відповіді про 70 чи 100 незрозуміло, який ліміт готовий. Сам екран — один компонент-заглушка.

### Тип роботи

Індивідуальна. Один компонент `GeneralInfoStep` на обидві ролі. Ділити студента і репетитора означає двічі редагувати той самий файл. Контракт селектів країни й міста не зафіксований, тож паралель з бекендом рано починати.

### Залежності

Жорсткої залежності від #10 немає. Обидві картки про країну і місто, але #19 не каже «після #10». Вони редагують одні файли: `Client-mvp/src/containers/tutor-home-page/general-info-step/GeneralInfoStep.jsx` (полів ще немає, селектів теж). Окремий артефакт, якого вимагає #10, — селекти Country і City «using BackEnd service». Критерій #19 — підвантажити країну і місто на фокусі всередині General Info, без згадки окремого кроку локації.

Припущення: дані на фокусі дають #138 (країни) і #128 (міста). Артефакт — HTTP-сервіс локації. Картка #19 ці номери не називає. Контракт полів відповіді не зафіксований. Ендпоінтів у бекенді немає (місце пошуку — вище).

Припущення щодо імені: щоб «підтягнути з першої реєстрації», користувач уже має існувати. #44 форму не відправляє. Це не блокер верстки полів.

## Картка: #16 (SP: 0.5) Add validation for General info step

### Суть і критерії приймання

Валідація обов’язкових полів General Info для степерів студента і репетитора. User stories: #77, #74. Картка скопійована з `ita-social-projects/Space2Study-node-Client-mvp#114`.

Критерії з картки:

- First name and Last name fields must be required and show an error when user removed text from them.
- Country and city have to be pulled from server on input focus
- Length of additional info can't be more than 100 symbols and block texting when it reached limit
- When there are errors in required fields stepper can't be finished

### Питання до власника продукту

70 символів у #19 проти 100 тут. Який ліміт additional info? Другий критерій повторює завантаження країни й міста і не є правилом помилки. Чи він входить у цю картку, чи лишається в #19?

### Що вже є в коді

- `GeneralInfoStep` — заглушка без полів (див. #19). Помилки показувати немає де.
- `Client-mvp/src/components/user-steps-wrapper/constants.ts` — `validations`: `firstName` і `lastName` через `nameField` (літери, максимум 30, не «обов’язкове» і не «помилка коли текст стерли»), `professionalSummary: textField(0, 200)`. Цей об’єкт `GeneralInfoStep` не імпортує. `StepProvider` його теж не імпортує.
- `Client-mvp/src/hooks/use-steps.jsx` — `handleSubmit` не викликає `fetchData`, якщо в `stepData` є непорожня помилка. `next` помилки не перевіряє. `GeneralInfoStep` у контекст помилок не пише, тож завершення зараз не блокується.
- Країна і місто з сервера: ендпоінтів немає (пошук у #19).

### Що треба зробити

- База даних: змін не потрібно.
- Бекенд: змін не потрібно за текстом валідації. Завантаження країни й міста — ті самі відсутні ендпоінти, що в #19 і #10.
- API: змін не потрібно, поки немає контракту локації.
- Фронтенд: обов’язкові ім’я і прізвище з помилкою після стирання; ліміт additional info з блокуванням вводу; не викликати завершення степера при помилках. Ліміт 100 не ставити, поки не вирішена суперечність із 70.
- Тести: чотири критерії. Spec саме General Info не знайдено.
- Документація: змін не потрібно.

### Складність

Припущення: L. Суперечність 70 проти 100, і критерій країни/міста знову вимагає сервер, якого немає. Самі перевірки імені були б одним шаром за зразком `nameField`.

### Тип роботи

Індивідуальна. Правила живуть у тому ж `GeneralInfoStep` і `constants.ts`, що й розмітка кроку. Ділити «показати помилку» і «не завершувати степер» — це два боки одного `handleSubmit`.

### Залежності

Жорсткої немає. Картка не каже «після #19». Вона редагує ті самі файли, що й #19: `GeneralInfoStep.jsx`, `Client-mvp/src/components/user-steps-wrapper/constants.ts`, і умову завершення в `Client-mvp/src/hooks/use-steps.jsx`. Ризик конфлікту, якщо дві людини пишуть поля й перевірки разом. Окремий артефакт цієї картки — правила помилок і заборона завершити степер, не сам крок.

Припущення: списки країни й міста, якщо цей критерій лишається тут, дають #138 і #128. Контракт полів не зафіксований.

## Картка: #10 (SP: 2) Implement stepper location

### Суть і критерії приймання

Селекти Country і City за дизайном, через BackEnd service. User story: #77. Картка скопійована з `ita-social-projects/Space2Study-node-Client-mvp#122`. Є посилання на Figma і зображення.

Окремого списку Acceptance Criteria немає.

### Питання до власника продукту

Що вважати готовим, крім макету? Які поля відповіді сервісу локації (назва країни, код, назва міста)? Картка контракт не фіксує. Чи місто вантажиться лише після країни?

### Що вже є в коді

Окремого кроку «location» немає. Країна і місто вже закладені в дані General Info, без селектів.

- `GeneralInfoStep.jsx` — заглушка, селектів немає. Це один компонент і для студента, і для репетитора (`UserStepsWrapper`).
- `constants.ts` — `country: null`, `city: null`.
- `use-steps.jsx` кладе їх у `address`.
- `AsyncAutocomplete` вміє `fetchOnFocus`. Його General Info не використовує.
- `Client-mvp/src/constants/request.ts` — ключа локації немає. URL не вигадую.
- Бекенд: пошук `location`, `countrystatecity`, `/countries`, `/cities` у `BackEnd-mvp/src` — не знайдено в коді. `BackEnd-mvp/src/routes/index.js` монтує `/auth`, `/users`, `/send-email`, `/admin-invitations`, `/questions`, `/resources-categories`, `/offers`. Поля `address.country` і `address.city` є в `BackEnd-mvp/src/models/user.js` як рядки, не як довідник.

Бекенд-картки цього спринту:

- #138 «Implement stepper Countries location service». Скопійована з `Space2Study-node-BackEnd-mvp#97`. Треба зробити сервіс, контролер, маршрут, unit-тести, Swagger. Джерело — API countrystatecity.in. Окремих полів відповіді в тексті немає.
- #128 «Implement stepper Cities location service». Текст: «Blocked by #97». Розширити сервіс містами обраної країни для старого клієнтського номера #142, те саме зовнішнє API. #138 скопійована з #97, тож «Blocked by #97» — старий номер копії.

### Що треба зробити

- База даних: змін не потрібно за текстом #10. #138 і #128 теж не просять колекцію, вони про зовнішнє API.
- Бекенд: не в цій картці. Сервіс країн — #138, міст — #128. У коді його немає.
- API: клієнтський виклик селектів. Шлях і поля відповіді не зафіксовані. Не вигадую URL.
- Фронтенд: селекти Country і City у степері. Єдине місце полів країни й міста зараз — `GeneralInfoStep` / `initialValues`.
- Тести: spec селектів. Його немає, бо селектів немає.
- Документація: змін не потрібно на клієнті. Swagger названий у #138, не в #10.

### Складність

Припущення: L. Окремих критеріїв немає, дані мають прийти з сервера, якого немає, контракт полів не зафіксований.

### Тип роботи

Індивідуальна. Селекти — один модуль степера. Ділити з бекендом можна було б після контракту запиту й відповіді, але полів відповіді картки не називають, тож поділ передчасний.

### Залежності

#138 і #128. Артефакт — бекенд-сервіс локації: країни (#138) і міста обраної країни (#128). Картка #10 прямо каже «using BackEnd service». Контракт полів ще не зафіксований.

З #19 жорсткої залежності немає. Це один і той самий `GeneralInfoStep`. #10 вимагає окремий артефакт — селекти Country і City через бекенд-сервіс. #19 вимагає підвантаження країни й міста на фокусі як критерій кроку General Info.

## Картка: #76 (SP:2) Implement language selection

### Суть і критерії приймання

Вибір мови на кроці `Language Step` степера. User story: #59. Картка скопійована з `ita-social-projects/Space2Study-node-Client-mvp#123`. Є два зображення макету.

Окремого списку Acceptance Criteria немає.

### Питання до власника продукту

Звідки список мов і це одна мова чи кілька? Картка цього не каже. У клієнті поруч лежать різні списки: `LanguagesEnum` (7 мов), `languagesMock` (довший список у константах кроку предметів), мови інтерфейсу `en`/`ua`. На бекенді `nativeLanguage` — enum розмовних мов, `appLanguage` — `en`/`ua`.

### Що вже є в коді

Крок є, вибору мови немає.

- `Client-mvp/src/containers/tutor-home-page/language-step/LanguageStep.jsx` — `LanguageStep`: картинка і текст «Language here», плюс `btnsBox`.
- `UserStepsWrapper` ставить `LanguageStep` третім кроком і для студента, і для репетитора.
- `Client-mvp/src/context/step-context.jsx` — `language` це один `useState(null)`, не масив.
- `Client-mvp/src/hooks/use-steps.jsx` — у `PATCH` іде `nativeLanguage: stepData.language ?? ''` (один рядок).
- `appLanguage` у `Client-mvp/src` не знайдено (пошук `appLanguage`).
- `nativeLanguage` є: `Client-mvp/src/types/user/user-interfaces/user.interfaces.ts` — поле `UserResponse`; `UpdateUserParams` теж його містить.
- `Client-mvp/src/types/common/enums/common.enums.ts` — `LanguagesEnum`: English, Ukrainian, Polish, German, French, Spanish, Arabic.
- `Client-mvp/src/containers/tutor-home-page/subjects-step/constants.js` — `languagesMock` (Chinese, Czech, …). `LanguageStep` цей файл не імпортує.
- `Client-mvp/src/plugins/i18n.ts` — `i18n.languages = ['en', 'ua']`. Це мова інтерфейсу.
- `Client-mvp/src/constants/translations/en/become-tutor.json` — `languages.autocompleteLabel` = «Your native language» (одна).
- `Client-mvp/src/components/languages-list-with-icon/LanguagesListWithIcon.tsx` показує вже обрані мови в профілі, не в кроці.
- Бекенд: `BackEnd-mvp/src/models/user.js` — `nativeLanguage` з `SPOKEN_LANG_ENUM`, `appLanguage` з `APP_LANG_ENUM` (`en`, `ua`) у `BackEnd-mvp/src/consts/validation.js`. Окремого маршруту «список мов» пошук `location`/`country` не шукав; у `src/routes/index.js` такого префікса немає.

### Що треба зробити

- База даних: змін не потрібно. Поле `nativeLanguage` вже в моделі користувача.
- Бекенд: змін не потрібно, якщо список береться з уже існуючого enum, а не з нового ендпоінта. Картка джерело не називає.
- API: змін не потрібно, поки немає запиту в тексті картки. Клієнт уже шле `nativeLanguage` у `PATCH /users/:id`.
- Фронтенд: вибір на `LanguageStep` за макетом. Зараз крок — заглушка.
- Тести: spec вибору. Окремого `LanguageStep.spec` пошук файлів кроку не показав.
- Документація: змін не потрібно.

### Складність

Припущення: L. Критеріїв немає, лише макети. Без відповіді, звідки список і скільки мов, незрозуміло, що готове. Сам крок — один файл-заглушка.

### Тип роботи

Індивідуальна. Один крок `LanguageStep`. Поділ передчасний, поки невідомо, один селект чи кілька.

### Залежності

Немає. Картка не посилається на іншу картку цього спринту. Крок уже стоїть у `UserStepsWrapper`.

## Картка: #18 (SP: 1) Add photo and select on Subjects step

### Суть і критерії приймання

Фото і селект категорій та предметів на кроці Subjects степера репетитора. User stories: #57, #58. Картка скопійована з `ita-social-projects/Space2Study-node-Client-mvp#112`.

Критерії з картки:

- When user clicks on field with categories they should be fetched from server
- When user chose a category and clicked on subjects select it should fetch all subjects of this category
- When user clicks on criss-cross of select it should clear it

### Питання до власника продукту

Клієнт уже кличе шляхи категорій і предметів навчання, а в бекенді цього спринту окремої картки на ці шляхи немає (є лише `resources-categories`, це інша сутність). Звідки брати дані, якщо сервера немає?

### Що вже є в коді

Один крок Subjects, зараз заглушка.

- `Client-mvp/src/containers/tutor-home-page/subjects-step/SubjectsStep.jsx` — `SubjectsStep`: текст «Subjects step» і `btnsBox`. Селектів, фото й хрестика немає.
- `Client-mvp/src/containers/tutor-home-page/subjects-step/constants.js` — `categoriesMock` (п’ять назв). Компонент кроку його не імпортує.
- Окремий крок фото, не цей: `Client-mvp/src/containers/tutor-home-page/add-photo-step/AddPhotoStep.jsx` — заголовок `becomeTutor.photo.description` і кнопки. `UserStepsWrapper` ставить його четвертим, Subjects — другим.
- Клієнтські виклики: `Client-mvp/src/services/category-service.ts` — `getCategories` (`GET /categories`), `getCategoriesNames` (`GET /categories/names`). `Client-mvp/src/services/subject-service.ts` — `getSubjects` і `getSubjectsNames` збирають `/categories/:id` + `/subjects` або `/subjects/names`. Шляхи: `Client-mvp/src/constants/request.ts`.
- Бекенд: `BackEnd-mvp/src/routes/index.js` не монтує `/categories`. Є `BackEnd-mvp/src/routes/resourcesCategory.js` на `/resources-categories` (категорії матеріалів репетитора). У `BackEnd-mvp/src/models` файлу `subject.js` немає; список моделей: `user.js`, `token.js`, `offer.js`, `question.js`, `resourcesCategory.js`, `adminInvitation.js`. `User.mainSubjects` у `BackEnd-mvp/src/models/user.js` має `ref: Subject`, моделі з таким ім’ям немає. Це збігається з картою бекенду, розбіжності немає.
- Переклади селектів уже в `Client-mvp/src/constants/translations/en/become-tutor.json`: `categories.mainSubjectsLabel`, `categories.subjectLabel`.

### Що треба зробити

- База даних: змін не потрібно в `Client-mvp`. Колекції предметів навчання в бекенді немає; окремої картки цього спринту на неї теж немає.
- Бекенд: змін не потрібно в цій фронтенд-картці. Ендпоінта, який клієнт уже викликає, у бекенді немає.
- API: клієнтські методи є. Підключати їх до селекта, не вигадуючи новий URL. Контракт відповіді в картці не названий. Типи вже є: `CategoryNameInterface`, `SubjectNameInterface` у `Client-mvp/src/types/common/interfaces/common.interfaces.ts`.
- Фронтенд: фото і два селекти на `SubjectsStep` репетитора, хрестик очищає селект. Дані категорій — з сервера по кліку.
- Тести: три критерії. Spec `SubjectsStep` не знайдено.
- Документація: змін не потрібно.

### Складність

Припущення: L. Дані мають прийти з сервера, якого немає, і окремої бекенд-картки цього спринту на `/categories` немає. Селекти самі по собі були б одним шаром: зразок `AsyncAutocomplete` і мок у `constants.js`.

### Тип роботи

Індивідуальна. Один крок `SubjectsStep`. Фото цього кроку і селекти в одному макеті однієї картки.

### Залежності

Жорсткої немає. Картка не каже «після» #72, #71, #70 чи #17. У коді один `SubjectsStep.jsx` (і його `constants.js`, стилі, ключі `becomeTutor.categories`). #72, #71, #70, #17 редагують ті самі файли. Це ризик конфлікту, не автоматичне «хто кого блокує».

## Картка: #17 (SP: 2) Add button and chips to Subjects step

### Суть і критерії приймання

Кнопка «Add one more subject» і чіпи обраних предметів на кроці Subjects репетитора. Картка скопійована з `ita-social-projects/Space2Study-node-Client-mvp#113`. User story в тілі немає.

Критерії з картки:

- When user selects subject and clicks on button "Add one more subject" it should create a new chip with selected subject
- When user have selects 3rd or more subject it should be showed by increasing values of rest selected subjects

### Питання до власника продукту

Що означає другий критерій: «showed by increasing values of rest selected subjects»? Скільки чіпів видно до третього предмета, що саме збільшується?

### Що вже є в коді

- Той самий `SubjectsStep.jsx` — заглушка «Subjects step». Кнопки й чіпів немає.
- Підпис кнопки вже є: `Client-mvp/src/constants/translations/en/become-tutor.json` — `categories.btnText` = «Add one more subject».
- `Client-mvp/src/components/subject-level-chips/SubjectLevelChips.tsx` — чіпи рівня володіння (`ProficiencyLevelEnum`), не чіпи обраних предметів кроку. `SubjectsStep` його не імпортує.
- `step-context.jsx` зберігає предмети як масив (`useState([])`). `use-steps.jsx` відправляє `mainSubjects: stepData.subjects`.

### Що треба зробити

- База даних: змін не потрібно.
- Бекенд: змін не потрібно за текстом критеріїв. Вони про кнопку і чіпи, не про новий ендпоінт. Збереження масиву в `PATCH /users/:id` вже зібране в `use-steps.jsx`, крок його не наповнює.
- API: змін не потрібно, якщо предмет уже обраний у селекті. Звідки селект бере предмет — картки #18 і #71, не ця.
- Фронтенд: кнопка і чіпи на тому ж `SubjectsStep`. Другий критерій не реалізовувати навмання.
- Тести: після роз’яснення другого критерію.
- Документація: змін не потрібно.

### Складність

Припущення: L. Другий критерій без відповіді власника продукту незрозумілий, тож незрозуміло, що готове. Кнопка й один чіп були б одним шаром.

### Тип роботи

Індивідуальна. Кнопка і чіпи в одному кроці. Ділити їх немає з чим контрактувати: картка не називає окремий формат чіпа.

### Залежності

Жорсткої немає. Картка не каже «після» #18 чи #71. Той самий файл `SubjectsStep.jsx`, що в #18, #72, #71, #70. Ризик конфлікту. Окремий артефакт цієї картки — кнопка «Add one more subject» і чіпи, не селект категорій.

## Картка: #72 (SP:2) Implement stepper Category selection

### Суть і критерії приймання

Вибір категорії з картинкою на кроці `Subjects`. User story #61. Картка скопійована з `ita-social-projects/Space2Study-node-Client-mvp#124`. Є Figma і зображення.

Окремого списку Acceptance Criteria немає.

### Питання до власника продукту

Що вважати готовим поза макетом? Звідки категорії, якщо `GET /categories` на бекенді цього спринту немає окремою карткою? Чи ця хвиля замінює селект із #18, чи це інший вигляд того самого поля?

### Що вже є в коді

Той самий `SubjectsStep.jsx` — текст «Subjects step», без картинки категорії. Клієнтський `categoryService.getCategories` / `getCategoriesNames` описаний у #18. Бекенд-маршруту `/categories` немає, є `/resources-categories`. Тип `CategoryInterface` має `appearance.icon` і `appearance.color` (`Client-mvp/src/types/common/interfaces/common.interfaces.ts`). Моделі з такими полями в `BackEnd-mvp/src/models` немає.

### Що треба зробити

- База даних: змін не потрібно в клієнті. Колекції категорій навчання в бекенді немає.
- Бекенд: змін не потрібно в цій картці. Окремої бекенд-картки спринту на категорії навчання немає.
- API: виклик уже описаний у `category-service.ts`. Новий URL не вигадую. Полів відповіді картка не фіксує; тип `CategoryInterface` на клієнті вже має `appearance`.
- Фронтенд: вибір категорії з картинкою на `SubjectsStep`.
- Тести: spec немає, критеріїв теж немає.
- Документація: змін не потрібно.

### Складність

Припущення: L. Критеріїв немає, дані з сервера, якого немає.

### Тип роботи

Індивідуальна. Один вибір категорії в одному кроці. Поділ з бекендом передчасний: контракту в картці немає.

### Залежності

Жорсткої немає. Картка не каже «після» #18. Той самий `SubjectsStep.jsx`. Ризик конфлікту з #18, #17, #71, #70, не блокування.

## Картка: #71 (SP:2) Implement stepper Subject selection

### Суть і критерії приймання

Вибір предмета на кроці `Subjects`. User story #61. Картка скопійована з `ita-social-projects/Space2Study-node-Client-mvp#125`. Є Figma і зображення.

Окремого списку Acceptance Criteria немає.

### Питання до власника продукту

Що вважати готовим поза макетом? Предмети обраної категорії чи весь список? `GET /categories/:id/subjects` клієнт уже збирає, бекенд-ендпоінта і окремої картки спринту немає. Звідки дані?

### Що вже є в коді

Той самий `SubjectsStep.jsx` без селекта предмета. `Client-mvp/src/services/subject-service.ts` — `getSubjects` / `getSubjectsNames`. Бекенд: моделі `Subject` і маршруту `/categories` немає (див. #18).

### Що треба зробити

- База даних: змін не потрібно в клієнті.
- Бекенд: змін не потрібно в цій картці. Ендпоінта предметів навчання немає.
- API: методи клієнта є. Новий URL не вигадую.
- Фронтенд: вибір предмета на `SubjectsStep`.
- Тести: spec немає.
- Документація: змін не потрібно.

### Складність

Припущення: L. Критеріїв немає, дані з сервера, якого немає.

### Тип роботи

Індивідуальна. Один селект у тому самому кроці. Поділ передчасний без контракту відповіді.

### Залежності

Жорсткої немає. Картка не каже «після #72» і не каже «використати вже зроблений крок». Той самий `SubjectsStep.jsx`. Ризик конфлікту з #18, #72, #70, #17.

## Картка: #70 (SP:2) Implement chips at Subjects step

### Суть і критерії приймання

`Add one more subject` і чіпи на кроці `Subjects`. User story #61. Картка скопійована з `ita-social-projects/Space2Study-node-Client-mvp#126`. Є Figma і зображення.

Окремого списку Acceptance Criteria немає.

### Питання до власника продукту

Чим готова поведінка відрізняється від #17, де ті самі кнопка і чіпи вже мають два критерії (другий із них розмитий)? Який вигляд чіпів у макеті вважати достатнім?

### Що вже є в коді

Той самий `SubjectsStep.jsx` без чіпів. Підпис кнопки — `becomeTutor.categories.btnText`. `SubjectLevelChips` — чіпи рівня, не цього кроку (див. #17).

### Що треба зробити

- База даних: змін не потрібно.
- Бекенд: змін не потрібно. Картка про чіпи на кроці.
- API: змін не потрібно. Окремого запиту текст не описує.
- Фронтенд: кнопка і чіпи на `SubjectsStep` за макетом.
- Тести: spec немає, критеріїв немає.
- Документація: змін не потрібно.

### Складність

Припущення: L. Окремих критеріїв немає, лише макет, і поруч лежить #17 з іншим формулюванням тієї самої кнопки. Без відповіді незрозуміло, що готове.

### Тип роботи

Індивідуальна. Один блок чіпів. Ділити кнопку і чіп — дрібніше за узгодження.

### Залежності

Жорсткої немає. Картка не каже «після #71» чи «після #17». Той самий `SubjectsStep.jsx`. Ризик конфлікту з #17, #18, #72, #71.

## Картка: #15 (SP: 1) Add Interests step to student stepper

### Суть і критерії приймання

Крок Interests студента «by using implemented Subjects step of a tutor». Картка скопійована з `ita-social-projects/Space2Study-node-Client-mvp#115`.

Критерії з картки:

- When user clicks on field with categories they should be fetched from server
- When user chose a category and clicked on subjects select it should fetch all subjects of this category
- When user clicks on criss-cross of select it should clear it

Це ті самі три речення, що в #18.

### Питання до власника продукту

Які картки цього спринту є «implemented Subjects step of a tutor»: стара хвиля #18 і #17 чи нова #72, #71, #70? Звідки категорії й предмети, якщо бекенд-ендпоінта в цьому спринті немає?

### Що вже є в коді

Окремого Interests step немає. Пошук `InterestsStep` у `Client-mvp/src` — не знайдено в коді.

- Підпис є: `Client-mvp/src/constants/translations/en/step.json` і `ua/step.json` — `stepLabels.interests`.
- `UserStepsWrapper` для студента не підставляє крок інтересів. `stepLabels` для студента — порожній рядок `''`. Діти ті самі, що в репетитора: `GeneralInfoStep`, `SubjectsStep`, `LanguageStep`, `AddPhotoStep`. `SubjectsStep` — заглушка «Subjects step».
- Селектів категорій і предметів немає ні в заглушці, ні в окремому студентському компоненті.
- Клієнтські `categoryService` і `subjectService` описані в #18. Бекенд-ендпоінта `/categories` немає.

### Що треба зробити

- База даних: змін не потрібно в клієнті. `mainSubjects.student` уже є в `BackEnd-mvp/src/models/user.js` як масив ObjectId з `ref: Subject`. Моделі `Subject` немає.
- Бекенд: змін не потрібно в цій картці. Окремої картки спринту на категорії навчання немає.
- API: ті самі клієнтські шляхи, що й у кроці репетитора. Новий URL не вигадую.
- Фронтенд: крок Interests студента, зібраний з уже зробленого кроку Subjects репетитора, з трьома критеріями селектів. Зараз повторювати немає чого: `SubjectsStep` — заглушка. Треба ще підключити крок у студентський список (`stepLabels` зараз `''`).
- Тести: три критерії на студентському кроці. `StepWrapper.spec.jsx` імпортує `studentStepLabels` з `constants.ts`, а в цьому файлі експортується лише `tutorStepLabels`.
- Документація: змін не потрібно.

### Складність

Припущення: L. Пряма залежність від чужого кроку, якого в коді ще немає, плюс ті самі відсутні серверні категорії й предмети.

### Тип роботи

Індивідуальна. Один студентський крок поверх уже зібраного кроку репетитора. Ділити селекти ще раз означає третю копію тих самих файлів.

### Залежності

Пряма: крок предметів репетитора. Картка каже «by using implemented Subjects step of a tutor». У коді цей крок один: `Client-mvp/src/containers/tutor-home-page/subjects-step/SubjectsStep.jsx`. Він ще не реалізований.

Припущення: тим кроком є картки, які його збирають. Критерії #15 збігаються з #18 (категорії з сервера, предмети категорії, хрестик очищає селект). Кнопку й чіпи #15 не просить; їх описують #17 і #70. Нова хвиля user story #61 — #72 (категорія з картинкою), #71 (предмет), #70 (чіпи). Картка #15 номери не називає. Поки не сказано, яку хвилю вважати «вже зробленим кроком», артефакт — робочі селекти категорії й предмета в `SubjectsStep` репетитора.

Жорсткої залежності від усіх п’яти одразу немає: #15 не каже «після #72». Ризик конфлікту лишається, бо інтереси мають користуватися тими самими файлами кроку.

## Відкриті питання

1. #44. Які елементи макету входять у попап реєстрації? У критеріях переліку немає, лише зображення.
2. #45. Ім’я на формі 2–15 символів, у бекенд-схемі signup і в `nameField` — до 30 (мінімум на бекенді 1). Пароль у картці — літера і цифра, у `common.ts` ще й довжина 8–25. Яке правило показувати?
3. #21. Коли з’являється email confirmation info pop-up, і чи це інфо «лист надіслано», а не вже існуючий `EmailConfirmModal` з `confirmToken`?
4. #14. Коли з’являється informational pop-up? Критерії: закрити кнопкою, але не ховати при кліку на область sign-up. У #43 клік по області sign-up якраз ховає підтвердження. Як читати цю пару?
5. #20. Чи «as it was implemented for SignUp» означає ті самі три правила кліку, що в #43?
6. #19 і #16. Additional info: 70 символів (#19) чи 100 (#16, ще й блокувати ввід)? У коді `professionalSummary` валідується як `textField(0, 200)`, переклад `becomeTutor.experience.title` каже 70. Число не вибране.
7. #19. Звідки ім’я «з першої реєстрації», якщо #44 вимикає клікабельні елементи і форма користувача не створює?
8. #16. Чи критерій «country and city pulled from server on input focus» входить у валідацію, чи це дубль #19?
9. #10, #138, #128. Які поля відповіді сервісу країн і міст? Окремих критеріїв у #10 немає, ендпоінтів у бекенді немає.
10. #76. Звідки список мов на Language Step і це одна мова чи кілька? `appLanguage` у клієнті не знайдено, `nativeLanguage` у відправці степера — один рядок.
11. #18, #15, #72, #71. Клієнт уже викликає `GET /categories`, `GET /categories/names`, `GET /categories/:id/subjects` і `/subjects/names`. У бекенді цього спринту окремої картки на ці шляхи немає (`resources-categories` — інше). Звідки брати категорії і предмети навчання?
12. #17. Що означає показ третього і далі предмета через «increasing values of rest selected subjects»?
13. #72, #71, #70. Окремих критеріїв немає, лише макети. Що готове, і чи нова хвиля user story #61 замінює #18 і #17?
14. #15. Які картки є «implemented Subjects step of a tutor»: #18 (і чи #17) чи #72, #71, #70?
