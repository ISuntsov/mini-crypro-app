# Crypto Wallet App

## (Next.js, React.js, Redux-Toolkit, RTK Query, MaterialUI, Node.js, Express, Typescript)

Это демонстрационное мини-приложение для управления криптовалютными балансами, без БД, данные моковые.

Оно позволяет:

- Импортировать приватный ключ для генерации адреса кошелька и доступа к балансам.
- Редактировать список валют (выбор чекбоксами).
- Просматривать балансы в выбранных валютах.
- Автоматически конвертировать балансы в доллары.

## Используемые технологии

## ### Фронтенд

- TypeScript: Язык программирования для написания типобезопасного кода.

- Next.js: фреймворк для React, который предоставляет инструменты для создания производительных и масштабируемых веб-приложений. Среди ключевых особенностей — поддержка серверного рендеринга и статической генерации, автоматическая маршрутизация, оптимизация изображений и интеграция с API.

- React.js: библиотека JavaScript с открытым исходным кодом для разработки пользовательских интерфейсов. Её применяют для создания одностраничных и многостраничных приложений, разработки крупных сайтов.

- Redux Toolkit: официальная библиотека для эффективного управления состоянием в приложениях на основе Redux. Включает инструменты для упрощения разработки, такие как настройка хранилища, создание редукторов и асинхронная обработка.

- RTK Query: экспериментальная библиотека от команды Redux, основная цель которой — извлечение и кэширование данных для веб-приложения. Построена на основе Redux Toolkit и предоставляет расширенные возможности настройки для гибкой и эффективной обработки запросов.

- Material UI: популярная библиотека пользовательского интерфейса для React, которая предоставляет разработчикам широкий набор компонентов и функций для создания привлекательных и функциональных интерфейсов.

## ### Бэкенд

- Node.js: Среда выполнения для серверной части.

- Express.js: Фреймворк для создания REST API.

- ethers.js: Библиотека для работы с криптографией и генерации адресов кошельков.

## Установка и запуск

## ### Клонирование репозитория

Склонируйте репозиторий на ваш компьютер:

```
git clone https://github.com/ваш-username/ваш-репозиторий.git
cd ваш-репозиторий
```

## ### Установка зависимостей

Установите зависимости для фронтенда и бэкенда:

#### Установка зависимостей для фронтенда

```
cd ../client
npm i
```

#### Установка зависимостей для бэкенда

```
cd ../server
npm i
```

## ### Запуск проекта

#### Запуск бэкенда

Перейдите в папку server и запустите сервер:

```
cd ../server
npm run dev
```

Сервер будет доступен по адресу: http://localhost:3001.

#### Запуск фронтенда

Перейдите в папку frontend и запустите приложение:

```
cd ../client
npm run dev
```

Фронтенд будет доступен по адресу: http://localhost:3000.
