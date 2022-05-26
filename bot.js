// Perform Setup
const Discord = require("discord.js")
require("dotenv").config()
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
})
const token = process.env.TOKEN
let roles = []

const FetchBotData = () => {
  // The channel in which we pick up the bot data from
  const dataChannel = client.channels.cache.get("977931066578989096")

  // Fetching the raw data
  dataChannel.messages
    .fetch({ limit: 1 })
    .then((msg) => {
      let content
      msg.forEach((m) => (content = m.content))
      // Convert strings to array
      let newRoles
      newRoles = content.split("\n")
      roles = []
      // Remove unnecessary entries
      newRoles.shift()
      newRoles.shift()
      newRoles.pop()
      newRoles.pop()
      newRoles.forEach((e) => {
        let newItem = []
        newItem[0] = e.substr(0, 2)
        newItem[1] = e.substr(2, e.length)
        roles.push(newItem)
      })
    })
    .catch((err) => console.log(err))
}

// Client On Ready
client.on("ready", () => {
  FetchBotData()
  console.log(`Logged in as ${client.user.tag}`)
})

// Client On Message Reaction Add
client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.message.id === "837068987144601670") {
    //FetchBotData()
    console.log(reaction.message.id)
    const member = reaction.message.guild.members.cache.find(
      (member) => member.id === user.id
    )

    if (reaction.partial) {
      try {
        await reaction.fetch()
      } catch (error) {
        console.error(`Couldn't fetch reaction message (${error})`)
        return
      }
    }

    try {
      const r = roles.find((e) => e[0] === reaction.emoji.name)
      member.roles.add(r[1])
      console.log(`Added role ${r[1]} to ${member.displayName}`)
    } catch {
      ;(e) => console.error(e)
    }
  }
})

client.on("messageReactionRemove", async (reaction, user) => {
  if (reaction.message.id === "837068987144601670") {
    const member = reaction.message.guild.members.cache.find(
      (member) => member.id === user.id
    )

    if (reaction.partial) {
      try {
        await reaction.fetch()
      } catch (error) {
        console.error(`Couldn't fetch reaction message (${error})`)
        return
      }
    }

    try {
      const r = roles.find((e) => e[0] === reaction.emoji.name)
      member.roles.remove(r[1])
      console.log(`Removed role ${r[0]} from ${member.displayName}`)
    } catch {
      ;(e) => console.error(e)
    }
  }
})

// Log in to Discord
client.login(token)
