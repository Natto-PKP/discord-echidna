# discord-echidna [Structure for discord.js bot.]
> **Install**: `npm i discord-echidna`

## Table of contents

- [Exemple](#example-usage)
- [Documentation](#documentation)
  - [Public](#public)
  - [Private](#private)
- [Dependencies](#dependencies)

## Example usage

```js
const { Echidna } = require('discord-echidna')
const echidna = new Echidna('token')

echidna.on('ready', ({ client }) => console.log(`${client.user.tag} is ready!`))
```

## Documentation

### Public

> `class` **Echidna**
> ```js
> new Echidna(token, options)
> ```
> **token** > Discord token of the bot
> **options** > Object{}
> **options.ignore** > Object{}
> **options.ignore.guilds** > Object[]
> **options.ignore.users** > Object[]
> **options.client** > [ClientOptions](https://discord.js.org/#/docs/main/stable/typedef/ClientOptions)

### Private

> `class` **ReadyEvent**
> ```js
> new ReadyEvent([Client](https://discord.js.org/#/docs/main/stable/class/Client), Function)

## Dependencies

- [discord.js](https://www.npmjs.com/package/discord.js)
