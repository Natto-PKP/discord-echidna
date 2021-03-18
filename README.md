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
> const echidna = new Echidna(token, options)
> ```
> `param` **token** > Discord token of the bot<br> 
> `param` **options** > Object{ } Module options<br>
> `param` **options.ignore** > { guilds: Object[ ], users: Object[ ] } Id of servers|members that the bot ignores <br>
> `param` **options.client** > [ClientOptions](https://discord.js.org/#/docs/main/stable/typedef/ClientOptions)
> 
> `property` **<Echidna>.client** > [Client](https://discord.js.org/#/docs/main/stable/class/Client)<br>
> `property` **<Echidna>.options** > Object{ }
> 
> `method` **<Echidna>.on()**
> > ```js
> > echidna.on(event, listener)
> > ```
> > `param` **event** > Compatible Discord client event: ready, ... (more in comming)<br>
> > `param` **listener** > Include your code in this function

### Private

> `class` **ReadyEvent**
> ```js
> new ReadyEvent(Client, Function)

## Dependencies

- [discord.js](https://www.npmjs.com/package/discord.js)
