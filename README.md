# discord-echidna [Structure for discord.js bot.]
> **Install**: `npm i discord-echidna`

## Table of contents

- [Exemple](#example-usage)
- [Documentation](#documentation)
  - [Primary](#primary)
    - [Echidna](#class-echidna)
  - [Managers](#managers)
    - [Commands](#class-commandsmanager)
  - [Private](#private)
  - [Interfaces](#interfaces)
- [Dependencies](#dependencies)
- [Help](#help)

## Example usage

```js
const { Echidna } = require('discord-echidna')
const echidna = new Echidna('token')

echidna.on('ready', ({ client }) => console.log(`${client.user.tag} is ready!`))
echidna.on('message', () => {}, { prefix: '!', commandsDir: 'commands' })
```

## Documentation

### Primary

#### `class` **Echidna**
> ```js
> const echidna = new Echidna(token, options)
> ```
> `param` **token** > Discord token of the bot<br> 
> `param` **options** > Object{ } - Module options<br>
> `param` **options.ignore** > Object{ } Id of servers|members that the bot ignores<br>
> `param` **options.ignore.guilds** > String[ ]<br>
> `param` **options.ignore.users** > String[ ]<br>
> `param` **options.client** > [ClientOptions](https://discord.js.org/#/docs/main/stable/typedef/ClientOptions)
> 
> `property` **Echidna.client** > [Client](https://discord.js.org/#/docs/main/stable/class/Client)<br>
> `property` **Echidna.options** > Object{ } - Options of the bot
> 
> `method` **Echidna.on(event, listener, options)**
> > ```js
> > echidna.on('ready', ({ client, Event /*ReadyEvent*/ }) => console.log(`${client.user.tag} is ready!`)
> > ```
> > `param` **event** > Compatible [Discord client event](https://discord.js.org/#/docs/main/stable/class/Client): [Events](#events) <br>
> > `param` **listener** > Include your code in this function
> > `param` **options** > Look options for selected event
> > `return` [Event](#events)

### Managers

#### `class` **CommandsManager**
> ```js
> const echidna = new Echidna(token)
>
> const { commands } = echidna.on('message', ({ command }) => message.react('💌'), { prefix: '!', commandsDir: './commands' })
>
> commands.create(
>   ({ message, args, commands }) => {
>     if(!args[0]) return message.reply('args[0] is undefined')
>     console.log(commands.get(args[0]))
>   },
>   { name: 'cmd', permissions: { flags: ['owner] } }
> )
> ```
> `property` **table** > Object[ ] - Table of commands
> `property` **cooldowns** > Object { } - Command cooldown memory
> 
> `method` **CommandsManager.create(exec, options, help)**
> > ```js
> > commands.create(({ client }) => console.log(client.guilds.cache.size), { name: 'guilds', aliases: ['g'] })
> > ```
> > `param` **exec** > Write code of the command - [MessageEvent](#class-messageevent)<br>
> > `param` **options** > Object{ }<br>
> > `param` **options.name** > String<br>
> > `param` **options.aliases** > String[ ]<br>
> > `param` **options.cooldown** > Number<br>
> > `param` **options.permissions** > Object{[Permissions interface](#permissions)}<br>
> > `param` **options.allow** > Object{[Allowed IDs](#allowedordenyid)}<br>
> > `param` **options.deny** > Object{[Denied IDs](#allowedordenyid)}<br>
> > `param` **help** > Object{ } - An empty object to organize your help command<br>
>
> `method` **CommandsManager.get(name)**
> > ```js
> > commands.get('hello')
> > ```
> > `param` **name** > String<br>
> > `return` Object?
> 
> `method` **CommandsManager.exist(...names)**
> > ```js
> > commands.exist('hi', 'cat', 'cake')
> > ```
> > `param` **names** > ...String[]<br>
> > `return` Boolean

### Private

#### `class` **ReadyEvent**
> ```js
> new ReadyEvent(Client, Function)
> ```
> `property` **client** > [Client](https://discord.js.org/#/docs/main/stable/class/Client)

#### `class` **MessageEvent**
> ```js
> new MessageEvent(Client, Function, Object)
> ```
> `property` **client** > [Client](https://discord.js.org/#/docs/main/stable/class/Client)<br>
> `property` **commands** > [CommandsManager](#class-commandsmanager)

### Interfaces

#### Events
> `ready`: [ReadyEvent](#class-readyevent)<br>
> `message`: [MessageEvent](#class-messageevent)

#### Permissions
> `property` **users** > Array[[Discord permissions](https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS)]<br>
> `property` **client** > Array[[Discord permissions](https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS)]<br>
> `property` **flags** > String['owner'] 

#### AllowedOrDenyID
> `property` **users** > String[ ] - Table of users ids<br>
> `property` **guilds** > String[ ] - Table of guilds ids<br>
> `property` **channels** > String[ ] - Table of channels ids<br>
> `property` **roles** > String[ ] - Table of roles ids

## Dependencies

- [discord.js](https://www.npmjs.com/package/discord.js)

## Help

- Support server: https://discord.gg/6dDwP4x9aD
- Discord.js unofficial help: https://discord.gg/3p7Kcy2zUT
