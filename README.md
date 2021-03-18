# discord-echidna [Structure for discord.js bot.]
> **Install**: `npm i discord-echidna`

## Table of contents

- [Exemple](#example-usage)
- [Documentation](#documentation)
  - [Primary](#primary)
    - [Echidna](#class-echidna)
  - [Private](#private)
    - [ReadyEvent](#class-readyevent)
- [Dependencies](#dependencies)
- [Help](#help)

## Example usage

```js
const { Echidna } = require('discord-echidna')
const echidna = new Echidna('token')

echidna.on('ready', ({ client }) => console.log(`${client.user.tag} is ready!`))
```

## Documentation

### Primary

> #### `class` **Echidna**
> ```js
> const echidna = new Echidna(token, options)
> ```
> `param` **token** > Discord token of the bot<br> 
> `param` **options** > Object{ } - Module options<br>
> `param` **options.ignore** > { guilds: Object[ ], users: Object[ ] } - Id of servers|members that the bot ignores <br>
> `param` **options.client** > [ClientOptions](https://discord.js.org/#/docs/main/stable/typedef/ClientOptions)
> 
> `property` **<Echidna>.client** > [Client](https://discord.js.org/#/docs/main/stable/class/Client)<br>
> `property` **<Echidna>.options** > Object{ } - Options of the bot
> 
> `method` **<Echidna>.on(event, listener)**
> > ```js
> > echidna.on('ready', ({ client, Event /*ReadyEvent*/ }) => void)
> > ```
> > `param` **event** > Compatible Discord client event: ready, ... (more in comming)<br>
> > `param` **listener** > Include your code in this function

### Private

> #### `class` **ReadyEvent**
> ```js
> new ReadyEvent(Client, Function)
> ```

## Dependencies

- [discord.js](https://www.npmjs.com/package/discord.js)

## Help

- Support server: https://discord.gg/6dDwP4x9aD
- Discord.js unofficial help: https://discord.gg/3p7Kcy2zUT
