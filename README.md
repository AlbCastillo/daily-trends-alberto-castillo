# Daily Trends Alberto Castillo

This is a boilerplate for quickly building RESTful APIs using Node.js, Express, TSOA, and Typescript.

This template comes with many features such as JWT authentication, unit and integration tests, module generator (Model, Service, Controller), Swagger documentation, dependency injection container, error handler, logging system, and NodeJS Security Cheat Sheet.

In this branch of the boilerplate, we will use MongoDB as the database and Mongoose as the ODM.

## Table of Contents

- [Daily Trends Alberto Castillo](#daily-trends-alberto-castillo)
  - [Table of Contents](#table-of-contents)
  - [Interesting Dependencies](#interesting-dependencies)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Swagger Documentation](#swagger-documentation)
    - [Available Scripts](#available-scripts)
    - [Src files tree](#src-files-tree)
- [Boilerplate used](#boilerplate-used)
- [License](#license)

## Interesting Dependencies

- [TypeScript](https://www.typescriptlang.org/): Language
- [Express.js](https://expressjs.com/): Lightweight web server application framework
- [TSOA](https://tsoa-community.github.io/docs/getting-started.html): Clean Architecture Framework with integrated OpenAPI
- [TSyringe](https://github.com/microsoft/tsyringe): A lightweight dependency injection container for TypeScript/JavaScript for constructor injection
- [Helmet](https://helmetjs.github.io): Secure Express apps by setting HTTP headers
- [Xss](https://www.npmjs.com/package/xss): Xss ia module used to filter input from users to prevent XSS attacks
- [Hpp](https://www.npmjs.com/package/hpp): An Express middleware to protect against HTTP Parameter Pollution attacks
- [Express-rate-limit](https://www.npmjs.com/package/express-rate-limit): a basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset.
- [Lodash](https://lodash.com): Utility library
- [Mongoose](https://mongoosejs.com): MongoDB ODM
- [Swagger UI Express](https://github.com/scottie1984/swagger-ui-express): Documentation generator and hosting
- [ESLint](https://eslint.org/): Linting and formatting code
- [Dotenv](https://github.com/motdotla/dotenv): Configuration of environment variables
- [EditorConfig](https://editorconfig.org/): Maintain consistent coding style
- [Winston](https://github.com/winstonjs/winston): Logging
- [Morgan](https://github.com/expressjs/morgan#readme): HTTP request logger middleware
- [Jest](https://jestjs.io/): Testing
- [Serialize-error](https://github.com/sindresorhus/serialize-error): Serialize an Error object into a plain object
- [Supertest](https://github.com/visionmedia/supertest): High-level abstraction for testing HTTP
- [Nodemon](https://nodemon.io/): Hot reloading
- [Plop](https://plopjs.com/documentation/): Micro-generator framework to create Controllers, Models, and Services
- [Husky](https://typicode.github.io/husky/#): Commit checker

## Getting Started

### Installation

It is recommended to install the following dependencies globally:

```bash
ts-node
nodemon
tsoa
```

**Install the project dependencies using yarn:**

```bash
yarn install
```

**Rename the file `.env.example` to `.env` (Edit the file if needed). You can use the following command:**

```bash
cp .env.example .env
```

**Build the TSOA routes:**

This step is important because TSOA uses this command to build the routes and OpenAPI (Swagger) documentation.

```bash
yarn build
```

**Run the application with live reloading:**

```bash
yarn dev
```

**Run the application:**

```bash
yarn start
```

After that, go to: `http://localhost:8095`

### Swagger Documentation

API Documentation is automatically on the route tsoa_generated/swagger.json after executes the command `yarn build`

The API Documentation runs under `http://localhost:8095/docs`

### NodeJS Security Cheat Sheet

This template uses the NodeJS Security Cheat Sheet from OWASP.

### Available Scripts

- `yarn build`: Build the routes and specs from TSOA and compile TypeScript.
- `yarn lint`: Lint your TypeScript code.
- `yarn lint:fix`: Lint and automatically fix your TypeScript code.
- `yarn dev`: Run the server locally.
- `yarn clean`: Remove build, tsoa_generated, and coverage folders.
- `yarn plop:module`: Generate a new module for the API with a simple CRUD.

### SRC files tree

```txt
  📦src
  ┣ 📂api
  ┃ ┗ 📂feed
  ┃ ┃ ┗ 📂feed
  ┃ ┃ ┃ ┣ 📂dto
  ┃ ┃ ┃ ┃ ┣ 📜create-feed.dto.ts
  ┃ ┃ ┃ ┃ ┣ 📜find-feed.dto.ts
  ┃ ┃ ┃ ┃ ┣ 📜remove-feed.dto.ts
  ┃ ┃ ┃ ┃ ┣ 📜responses.feed.dto.ts
  ┃ ┃ ┃ ┃ ┗ 📜update-feed.dto.ts
  ┃ ┃ ┃ ┣ 📂models
  ┃ ┃ ┃ ┃ ┣ 📜feed.model.ts
  ┃ ┃ ┃ ┃ ┗ 📜feed.schema.ts
  ┃ ┃ ┃ ┣ 📜feed.controller.ts
  ┃ ┃ ┃ ┣ 📜feed.repository.ts
  ┃ ┃ ┃ ┗ 📜feed.service.ts
  ┣ 📂commons
  ┃ ┗ 📜types.ts
  ┣ 📂logging
  ┃ ┗ 📜winston.logger.ts
  ┣ 📂middlewares
  ┃ ┣ 📜api.errors.ts
  ┃ ┣ 📜authentication.ts
  ┃ ┣ 📜morgan.logger.ts
  ┃ ┗ 📜sanitizer.ts
  ┣ 📂tsoa_generated
  ┃ ┣ 📜routes.ts
  ┃ ┗ 📜swagger.json
  ┣ 📂utils
  ┃ ┣ 📜date.utils.ts
  ┃ ┣ 📜feed.utils.ts
  ┃ ┣ 📜http.errors.utils.ts
  ┃ ┣ 📜mongoose.utils.ts
  ┃ ┗ 📜sum.ts
  ┣ 📜app.ts
  ┣ 📜config.ts
  ┣ 📜ioc.ts
  ┣ 📜mongoose.ts
  ┣ 📜server.ts
  ┗ 📜swagger.json
```

## Boilerplate used

- [albcastillo/express-ts-tsoa-boilerplate-mongoose](https://github.com/AlbCastillo/express-ts-tsoa-boilerplate-mongoose)

## License

[MIT](LICENSE.md)
