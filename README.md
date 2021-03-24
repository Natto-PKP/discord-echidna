# A structure to simply make your bots under discord.js.
**Install**: `npm install discord-echidna` | `npm i discord-echidna`

> `Documents` > Integrated and modular database. (JSON)<br>
> `Commands` > Simple and efficient order management.

# Example usage

```js
const { Echidna } = require('discord-echidna')

// Create a Echidna client
const echidna = new Echidna('DiscordBotToken')

// Ready event 
echidna.on('ready', ({ client }) => {
  console.log(`${client.user.tag} is ready!`)
})

// Message event - Take CommandsManager of the event
const { commands } = echidna.on('message', ({ message, command, args }) => {
  if (command == 'you') return message.react('💌')
  if (command == 'me' && args[0] == '?') return message.react('💤')
}, { prefix: '!' })

// Create a command
commands.create(
  // Take many arguments
  ({ message }) => {
    message.channel.send(message.author.displayAvatarURL())
  },
  { name: 'avatar', aliases: ['pp', 'pdp'], permissions: { client: ['SEND_MESSAGES'] } }
)
```

# Table of contents

- [Documentation](#documentation)
  - [Structures](#structures)
    - [Echidna](#class-echidna)
    - [Documents](#class-documents)
  - [Managers](#managers)
    - [CommandsManager](#class-commandsmanager)
    - [DocumentManager](#class-documentmanager)
    - [ModelsManager](#class-modelsmanager)
  - [Interfaces](#interfaces)
- [Dependencies](#dependencies)
- [Help](#help)


# Documentation

## Structures

### `class` Echidna
> Echidna client.
> ```js
> const { Echidna } = require('discord-echidna')
> const echidna = new Echidna(token, options?)
> ```
> `param` **token** > [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)<br>
> `param` **options?** > [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)<br>
> `param` **options.ignore?** > [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)<br>
> `param` **options.ignore.guilds?** > [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)[\<String>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)<br>
> `param` **options.ignore.users?** > [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)[\<String>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)<br>
> `param` **options.client?** > [\<Client>](https://discord.js.org/#/docs/main/stable/class/Client)<br>
> `param` **options.owner?** > [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)[\<String>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)<br>
> 
> `property` **client** > [\<ClientOptions>](https://discord.js.org/#/docs/main/stable/typedef/ClientOptions)<br>
> `property` **documents** > [\<Documents>](#class-documents)<br>
> `property` **options** > [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)<br>
> 
> #### `method` **\<Echidna>**.on(event, listener?, options?)
> > Watch a specific event.
> > ```js
> > const { Echidna } = require('discord-echidna')
> > const echidna = new Echidna('DiscordBotToken')
> > 
> > echidna.on('ready', ({ client }) => console.log(client.user.username + ' is ready.'))
> > ```
> > `param` **event** > [Events](#events)<br>
> > `param` **listener** > [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)<br>
> > `param` **options** > [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)<br>
> >
> > `return` [Events](#events)

### `class` Documents
> Manage your database document.<br>
> `property` **models** > [ModelsManager](#class-modelsmanager)<br>
> `property` **path** > [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)<br>
> 
> #### `method` **\<Documents>**.delete(ID, modelName)
> > Delete a database document.
> > ```js
> > Documents.delete('1234', 'user-exp')
> > ```
> > `param` **ID** > [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)<br>
> > `param` **modelName** > [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) - Add a model: [\<ModelsManager>.add()](#method-modelsmanager.addname-base)<br>
> 
> #### `method` **\<DocumentManager>**.exist(ID, modelName)
> > Check if this document exist.<br>
> > `param` **ID** > [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)<br>
> > `param` **modelName** > [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) - Add a model: [\<ModelsManager>.add()](#method-modelsmanager.addname-base)<br>
> > `return` [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)<br>
>
> #### `method` **\<Documents>**.open(ID, modelNAme)
> > Open or create database document.
> > ```js
> > const doc = Documents.open('12345', 'user-exp')
> > ```
> > `param` **ID** > [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)<br>
> > `param` **modelName** > [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) - Add a model: [\<ModelsManager>.add()](#method-modelsmanager.addname-base)<br>
> > 
> > `return` [\<DocumentManager>](#class-documentmanager)

## Managers

### `class` CommandsManager
> Manage bot commands<br>
> `property` **table** > [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)[\<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)<br>
> `property` **cooldowns** > [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)<br>
> 
> #### `method` **\<CommandsManager>**.create(exec, options, help)
> > Create a new command in commandsManager.
> > ```js
> > CommandsManager.create(
> >   ({ client }) => console.log(client.guilds.cache.size + ' guilds'),
> >   { name: 'count' }
> > )
> > ```
> > `param` **exec** > [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)<br>
> > `param` **options** > [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)<br>
> > `param` **options.name** > [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)<br>
> > `param` **options.aliases** > [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)[\<String>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)<br>
> > `param` **options.cooldown** > [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)<br>
> > `param` **options.permissions** > [Commands Permissions](#interface-permissions)<br>
> > `param` **options.allow** > [Allow ids](#interface-allowedordenyid)<br>
> > `param` **options.deny** > [Denied ids](#interface-allowedordenyid)<br>
> > `param` **help** > [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)<br>
>
> #### `method` **\<CommandsManager>**.get(name)
> > Get command object.<br>
> > `param` **name** > [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)<br>
> >
> > `return` [Object?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)<br>
> 
> #### `method` **\<CommandsManager>**.exist(...names)
> > Check if this names already exist.<br>
> > `param` **names** > [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)[\<String>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)<br>
> > 
> > `return` [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)



### `class` DocumentManager
> An open document of your database.<br>
> `property` **content** > [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)<br>
> `property` **default** > [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)<br>
> `property` **path** > [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)<br>
> 
> #### `method` **\<DocumentManager>**.delete()
> > Delete this document.
> 
> #### `method` **\<DocumentManager>**.save()
> > Save document update.
>
> #### `method` **\<DocumentManager>**.reset()
> > Reset this document.<br>
> > `return` [DocumentManager](#class-documentmanager)

### `class` ModelsManager
> Manage documents models.<br>
> `property` **table** [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)[\<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)> 
> 
> #### `method` **\<ModelsManager>**.add(name, base)
> > Add a document model
> > ```js
> > ModelsManager.add('user-exp', { level: 0, exp: 0 })
> > ```
> > `param` **name** > [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)<br>
> > `param` **base** > [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

## Interfaces

### `interface` AllowedOrDenyID
> `property` **users** > [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)[\<String>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)<br>
> `property` **guilds** > [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)[\<String>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)<br>
> `property` **channels** > [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)[\<String>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)<br>
> `property` **roles** > [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)[\<String>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)<br>

### `type` EchidnaFlags
> ```js
> 'owner', ...customsFlags
> ```

### `interface` Permissions
> `property` **users** > [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)[\<Permissions>](https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS)<br>
> `property` **client** > [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)[\<Permissions>](https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS)<br>
> `property` **flags** > [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)[\<EchidnaFlags>](#type-echidnaflags)<br>

# Dependencies

- [discord.js](https://www.npmjs.com/package/discord.js)

# Help

- Support server: https://discord.gg/6dDwP4x9aD
- Discord.js unofficial help: https://discord.gg/3p7Kcy2zUT