# Node Boilerplate

[![N|Solid](https://nodejs.org/static/images/logo.svg)](https://github.com/josezone/node_boilerplate.git)

Node Boilerplate is used for quickly start any node project.

# Features!

- Build using typescript
- Use of Inversion of Control Principle
- Flexible, reusable, readable
- adhire to S.O.L.I.D. priciples

> The overriding design goal for nodeboiler plate
> is to ease up the project setup
> reduce project development time
> improve team productivity

### Tech

Node Boilerplate uses a number of open projects to work properly:

- [Node] - Open-source, cross-platform JavaScript run-time environment
- [Microsoft TypeScript] - Strict syntactical superset of JavaScript
- [InversifyJS] - A powerful and lightweight inversion of control container
- [Typeorm] - Active Record and Data Mapper patterns supports MySQL / MariaDB / Postgres / SQLite / Microsoft SQL Server / Oracle / sql.js / MongoDB
- [Express] - Fast, unopinionated, minimalist web framework
- [Passport] - Simple, unobtrusive authentication
- [Swagger] - Specification for documenting REST API
- [TypeDoc] - A documentation generator for TypeScript projects
- [Jest] - JavaScript testing library

### Installation

Node Boilerplate requires [Node] v10.16 to run. It also requires to connect to any Relational database.

Install the dependencies and devDependencies.

```sh
$ npm install
```

Check for any linting and compiletime error.

```sh
$ npm run check
```

Fix linting errors.

```sh
$ npm run fix
```

Create TypeDoc doccumentation

```sh
$ npm run doc
```

Run tests

```sh
$ npm t
```

Look for test coverage

```sh
$ npm run coverage
```

Development mode

```sh
$ npm run dev
```

Generate Migration

```sh
$ npm run autoMigrate
```

Create Build

```sh
$ npm run compile
```

Delete Build Folder

```sh
$ npm run clean
```

Server run, use Forever or PM2

```sh
$ forever start ./build/src/index.js
$ pm2 start ./build/src/index.js
```

### Environmental Variables

| Variable         | Description               | Example                 |
| ---------------- | ------------------------- | ----------------------- |
| PORT             | Port the server is hosted | 3000                    |
| NODE_ENV         | Project LifeCycle         | production, development |
| TYPEORM_HOST     | Host address of the DB    | localhost               |
| TYPEORM_USERNAME | DB user name              | root                    |
| TYPEORM_PASSWORD | DB password               | root                    |
| TYPEORM_DATABASE | DB name                   | test                    |
| TYPEORM_PORT     | DB PORT                   | 5432                    |


[node]: https://nodejs.org
[microsoft typescript]: https://www.typescriptlang.org/
[inversifyjs]: https://inversify.io/
[typeorm]: https://typeorm.io/
[express]: https://expressjs.com/
[passport]: http://www.passportjs.org/
[swagger]: https://swagger.io/
[typedoc]: https://typedoc.org/
[jest]: https://jestjs.io/
