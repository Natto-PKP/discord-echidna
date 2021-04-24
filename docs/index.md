- [Echidna Client](#echidna-client)
- [Database](#database)
- [Commands](#commands)
- [Others](#others)

# #Examples
***

### Echidna Client

```js
const { Echidna } = require('discord-echidna')

// Create discord-echidna instance
const echidna = new Echidna('TOKEN')

// Classic ready event
echidna.on('ready', ({ client }) => console.log(client.user.tag + ' is ready.'))

// Message event
echidna.on('message', ({ client, message, command, args }) => {
    console.log(message) // Discord.Message
    console.log(command) // Discord.Message.prototype.content
    console.log(args) // Array<String>
})
```

### Database

```js
const { Collections, Database } = require('discord-echidna')

// Create a collection of documents
Collections.add('students', { notes: {}, year: 2021 })

// Create (if this not exist) and open document
const doc = Database.open('Léon', 'students')

// Update document content
doc.update({ notes: { geo: 14, arts: { music: 1 } } })
doc.content
// { ID: 'Léon', notes: { geo: 14, arts: { music: 1 } }, year: 2021 }

doc.update({ music: 12 }, { path: 'notes.arts' })
doc.content
// { ID: 'Léon', notes: { geo: 14, arts: { music: 12 } }, year: 2021 }

// Save changement
doc.save()
```

### Commands

```js
/**
  * If the event message (discord-echidna) is not issued, commands 
  * will not be executed.
  * Command will be automatically executed during a message.
  */
const { Commands } = require('discord-echidna')

// Create a command
Commands.create(
    ({ message }) => {
        // Code to exec
        message.reply('World !')
    },
    { name: 'hello', aliases: ['hi'] } // Command options
)
```

```js
// commandsDir fetch automaticaly your commands
echidna.on('message', () => null, { commandsDir: './commands' })
```

### Others

#### Discord.js sharding

```js
// index.js
const { ShardingManager } = require('discord.js')
const manager = new ShardingManager('./app.js', { token: 'TOKEN' })

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`))
manager.spawn()

// app.js
const { Echidna } = require('discord-echidna')
const echidna = new Echidna('Your Discord bot Token')

echidna.on('ready', () => { console.log('Hello !') })
```

#### Message.createPages()

```js
const format = (array, { number, total }) => ({
  embed: {
    author: { name: 'Guild roles' },
    color: 'green',
    description: array.map((role) => role.toString()).join(' '),
    footer: { text: 'pages: ' + number + '/' + total }
  }
})

message.createPages(message.guild.roles.cache, format, { limit: 10 })
```
