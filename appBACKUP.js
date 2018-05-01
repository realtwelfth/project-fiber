/// CONFIGURATION ///
const config = require("./botconfig.json");
const Discord = require("discord.js")
const bot = new Discord.Client();
const fs = require("fs")
////////////////////
try {
  let commandFile = require(`./commands/${command}.js`);
  commandFile.run(bot, message, func)
}



///////////////////
bot.on("ready", () => {
  console.log("[SYSTEM] Module online!")
});
// EVENT LISTENER
bot.on("message", (message) => {
  /// VARIABLES ///
  const sender = message.author;
  const msg = message.content.toUpperCase();
  const prefix = config.prefix
  const ownerID = config.ownerID
  const coOwnerID = config.coownerID
  ////////////////
  if (!msg.startsWith(prefix) || message.author.bot) return;
  if (message.channel.type === "dm") return;
  ////////////////
  /// COMMANDS ///
  ////////////////

  // PING //
  if (msg.startsWith(prefix + "PING")) {
    message.channel.send("Pong!\n\nPing: " + bot.ping + "ms")
  };



  // GUILD INFO //
  if (msg.startsWith(prefix + "GUILDINFO")) {
    const embed = new Discord.RichEmbed()
    .setTitle("Guild Name")
    .setDescription(message.guild.name)
    .setAuthor("Guild Information", "https://i.imgur.com/xzbhNAA.png")
    .setColor(000000)
    .setFooter("Found any bugs? Report them to Hamad#1337!")
    .setTimestamp()
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount)
    message.channel.send({embed});
  }

  /// BOT INFO ///
  if (msg.startsWith(prefix + "BOTINFO")) {
    const embed = new Discord.RichEmbed()
    .setTitle("Who am I?")
    .setAuthor("Bot Information", "https://i.imgur.com/xzbhNAA.png")
    .setColor(000000)
    .setDescription("Hi, I'm Fiber! I'm a friendly bot that can help you a lot with various of things!")
    .setFooter("Found any bugs? Report them to Hamad#1337!")
    .setTimestamp()
    .addField("My Name", bot.user.username)
    .addField("Creation date", bot.user.createdAt)
    message.channel.send({embed});
  }
  // [TEST] //
  if (msg.startsWith(prefix + "TEST")) {
    if (sender.id == ownerID || coOwnerID) {
      message.channel.send("Hi there, I'm online but I'm unable to retrieve data from discordapp.com!")
    }
    if(sender.id !== ownerID || coOwnerID) return message.channel.send("You don't have permission to run this command!");
  };
  // [KICK MEMBER] //
  if (msg.startsWith(prefix + "KICK")) {
    if(sender.id == ownerID || coOwnerID) {
      let member = message.mentions.members.first();
      member.kick
    }
    if(sender.id !== ownerID || coOwnerID) return message.channel.send("You don't have permission to run this command!");
  }
});

bot.login(config.token)
