> [**discord-echidna Wiki**](https://github.com/Natto-PKP/discord-echidna/wiki)

This module allows you to code your discord bots under **discord.js** more simply! You will have access to a simple and complete management of your commands, a simplified and optimized JSON database by a simple manager. **discord-echidna** offers other useful functions for your bots.

> `npm install discord-echidna`

# Example usage
- [Create Echidna client](#create-echidna-client)
- [Use Discord event](#user-discord-event)
- [Use Database](#use-database)
- [Use Commands](#use-commands)

## Create Echidna client
```js
// Require module
const { Echidna } = require('discord-echidna')

// Create client
const echidna = new Echidna('YourDiscordBotToken')
```

## Use Discord event
```js
// Ready event
echidna.on('ready', ({ client }) => {
    console.log(`${client.user.tag} is ready ! o7`)
})

// Message event
echidna.on('message', ({ client, message, command, args }) => {
    console.log(message) // Discord Message Object
    console.log(command) // First word of Message content
    console.log(args) // Last words of Message content
})

// All discord.js event is supported
```

## Use Database
```js
const { Collections, Database } = require('discord-echidna')

// Create a collection
Collections.add('user-exp', { level: 0, exp: 0, rewards: [] })

// Create a document
const doc = Database.open('1234', 'user-exp') // If data not exist, this method create data

console.log(doc.content) // { level: 0, exp: 0, rewards: [], ID: '1234' }
doc.update({ level: 1 }) // Set new value
console.log(doc.content) // { level: 1, exp: 0, rewards: [], ID: '1234' }

doc.reset() // Reset by default collection document value
console.log(doc.content) // { level: 0, exp: 0, rewards: [], ID: '1234' }

doc.update({ level: 2, exp: 45 }).update(['A medal', 'Cookie'], { path: 'rewards' })
console.log(doc.content) // { level: 2, exp: 45, rewards: ['A medal', 'Cookie'], ID: '1234' }

doc.remove({ index: 0, path: 'rewards' }) // Remove a specific element to array
console.log(doc.content) // { level: 2, exp: 45, rewards: ['Cookie'], ID: '1234' }

doc.remove({ path: 'rewards' }) // Remove a key
console.log(doc.content) // { level: 2, exp: 45, ID: '1234' }

doc.save() // Save changement

// Or Create Array document

Collections.add('guild', [])

const doc = Database.open('members-exp', 'guild')
doc.update({ id: '1234', level: 0, exp: 0 }) // Push element in array
doc.update([{ id: '5678', level: 0, exp: 0 }, { id: '9101', level: 0, exp: 0 }]) // Push elements in array
console.log(doc.content) // [{ id: '1234', level: 0, exp: 0 }, { id: '5678', level: 0, exp: 0 }, { id: '9101', level: 0, exp: 0 }]

doc.update({ level: 4 }, { index: 2 }) // Set a new value in this.content[index]
doc.save()
```

## Use Commands
```js
const { Commands, Echidna } = require('discord-echidna')

const echidna = new Echidna('YourDiscordBotToken')
echidna.on('message') // If the event message is not issued, the commands will not be executed.

// Create a command
Commands.create(
    ({ message }) => {
        message.reply('World !')
    },
    { name: 'hello', aliases: ['hi'] }
) // Command will be automatically executed during a message.

// You can also directly enter an commands directory in the event message. Files.js will be automatically read.
echidna.on('message', null, { commandsDir: './commands', prefix: '=' })
```