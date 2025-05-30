### Установка

`npm i`

Далее заполните (создайте) в файле .env данные согласно файлу .env.sample.
После этого создайте базу данных и заполните её командами:

`npm run prisma:push` - создание БД

`npm run prisma:seed` - автоматическое заполнение БД

### Запуск в режиме разработки

`npm run dev`

### Запуск сборки приложения

`npm run build`

### Запуск собранной версии

`npm start`

### Конфигурация Nginx

Конфигурацию из файла "nginx.config.txt" вставьте в свою конфигурацию Nginx.
Не забудьте добавить хост в /etc/hosts

## Список технологий и версии

- TypeScript (5) - Язык программирования
- Next.js (14.2.24) - Fullstack фреймворк
- Turbopack (устанавливается вместе с Next.js) - инструмент для сборки кода на замену Webpack.
- React (18) - UI библиотека для frontend части
- Tailwind (3.4.1) - библиотека готовых стилей
- ShadCN (2.3.0) - библиотека готовых компонентов
- licude-icons (Последняя) - библиотека иконок
- react-use (17.5.0) - библиотека дополнительных хуков
- Zustand (4.5.2) - менеджер состояний (State manager)
- PostgreSQL (Последняя) - БД
- Prisma (Последняя) - ORM для БД
- React Hook From (Последняя) - библиотека для форм
- Zod (Последняя) - библиотека для проверки введённых данных в форме
- Dadata (Последняя) - сервис для поиска существующих адресов
- RESEND (Последняя) - сервис для отправки электронных писем
- Auth.js (Последняя) - библиотека для реализации регистрации и авторизации
- Jest (Последняя) - библиотека для тестирования приложения
- Testing-library (Последняя) - библиотека для тестирования компонентов

## Список пользователей

Пользователь с ролью USER

email: test@gmail.com <br/>
password: test_test

---

Пользователь с ролью ADMIN

email: admin@mail.ru <br/>
password: admin_admin
