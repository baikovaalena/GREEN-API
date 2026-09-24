# GreenApi

Веб-клиент чатов на [GREEN-API](https://green-api.com). Вход по `idInstance` и `apiTokenInstance`, список чатов, история, отправка сообщений и создание чата по номеру телефона.

Стек: React, TypeScript, Vite, Redux Toolkit (RTK Query), React Router, Telegram UI.

## Требования

- Node.js 20.19+ или 22.12+
- npm
- Инстанс GREEN-API в статусе `authorized`

Учётные данные инстанса берутся в личном кабинете GREEN-API: `idInstance` и `apiTokenInstance`.

## Локальный запуск

```bash
npm install
```

В корне проекта создайте файл `.env`:

```env
VITE_API_URL=https://4100.api.green-api.com
```

Если переменная не задана, клиент использует тот же адрес по умолчанию. Файл `.env` в git не попадает.

```bash
npm run dev
```

Приложение откроется на [http://localhost:5173](http://localhost:5173). Корневой путь `/` сразу перенаправляет на `/home`. Без сохранённых учётных данных откроется `/registration`.

На форме входа укажите `idInstance` и `apiTokenInstance`. Клиент вызывает `getStateInstance` и пускает дальше только при ответе `authorized`. Пара логина и токена сохраняется в `localStorage` под ключом `credentials` и подставляется в следующие запросы. Кнопка выхода удаляет эти данные.

## Скрипты

| Команда           | Что делает                          |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Dev-сервер Vite                     |
| `npm run build`   | Проверка типов и production-сборка  |
| `npm run preview` | Просмотр собранного `dist`          |
| `npm run lint`    | ESLint                              |
| `npm run format`  | Prettier по всему проекту           |

## Что ещё стоит знать

Запросы к GREEN-API идут прямо из браузера. В URL подставляются id и токен инстанса, например `/waInstance{id}/sendMessage/{token}`.

- Список чатов приходит из `getChats`. Чат, созданный по номеру, сначала живёт только в состоянии страницы и пропадёт после перезагрузки, пока API не начнёт его возвращать.
- Открытый чат хранится в query-параметре `chatId`.
- История запрашивается пачками по 100 сообщений и показывается от старых к новым.
- Новые сообщения подтягиваются long polling-ом: `receiveNotification` с `receiveTimeout=20`, затем `deleteNotification`. При уведомлении обновляется история соответствующего чата.
- Номер при создании чата очищается от всего, кроме цифр, и проверяется через `checkAccount`.

## Структура

Проект собран по Feature-Sliced Design:

```
src/
  app/        # провайдеры, роутер, store, глобальные стили
  pages/      # registration, home
  features/   # вход уже на странице; create-chat, send-message, logout
  entities/   # auth, chat
  shared/     # клиент GREEN-API
```

Алиасы: `@`, `@app`, `@pages`, `@widgets`, `@features`, `@entities`, `@shared`.
