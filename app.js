/////////////////////////////////////////////////////////
const config = require("./botconfig.json");      //
const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
const Cleverbot = require('cleverbot-node');
const clbot = new Cleverbot;
clbot.configure({botapi: "XqHIIW0scJKa7tWU0Hh9XL0GROLKgoTA"});
bot.commands = new Discord.Collection();
bot.mutes = require("./mutes.json");
/////////////////////////////////////////////////////////
fs.readdir("./cmds/", (err, files) => {
  if(err) console.error(err);

  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if(jsfiles.length <= 0) {
    console.log("[MODULE] No commands to load!");
    return;
  }
  console.log(`[MODULE] Loading ${jsfiles.length} commands!`);

  jsfiles.forEach((f, i) => {
    let props = require(`./cmds/${f}`);
    console.log(`[MODULE] ${i + 1}: ${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});
////////////////////////////////////////////////////////

bot.on("ready", () => {
  console.log(`[SYSTEM] Module is online as ${bot.user.username}!`);
  bot.user.setActivity("starting up...")
  bot.user.setStatus("idle")
  setTimeout(loadBot, 10000)
  function loadBot() {
    bot.user.setActivity("with my motherboard | ALPHA Version")
    bot.user.setStatus("dnd")
  };
  bot.setInterval(() => {
    for(let i in bot.mutes) {
      let time = bot.mutes[i].time;
      let guildId = bot.mutes[i].guild;
      let guild = bot.guilds.get(guildId);
      let member = guild.members.get(i);
      let mutedRole = guild.roles.find(r => r.name === "Muted");
      if(!mutedRole) continue;

      if(Date.now() > time) {
        console.log(`[MODULE] ${i} is now able to be unmuted!`)
        member.removeRole(mutedRole);
        delete bot.mutes[i];
        fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
          if(err) throw err;
          console.log(`[MODULE] Unmuted ${member.user.tag}!`)
        });
      }
    }
  }, 5000)
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") {
    message.channel.startTyping();
    setTimeout(noReply, 3000)
    function noReply() {
      message.channel.stopTyping();
    }
  }
  /////////////////////////
  if (message.channel.id === "437638318289846283") {
    if (isNaN(message.content) | !isNaN(message.content)) {
      let role = message.guild.roles.find("name", "Member");
      let rRole = message.guild.roles.find("name", "Noob");
      let member = message.member;
      member.addRole(role).catch(console.error);
      member.removeRole(rRole).catch(console.error);
      message.delete();
    }
  }
  /////////////////////////
  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let command =  messageArray[0];
  let args = messageArray.slice(1);
  /////////////////////////
  let cmd = bot.commands.get(command.slice(prefix.length));
  if(cmd) cmd.run(bot, message, args);
  /////////////////////////
  if(message.content.includes("!robloxtest")) {
    message.reply(`I'm currently logged on ROBLOX.com as ${login.username}!`);
  }
});

bot.on('guildMemberAdd', member => {
  let role = member.guild.roles.find('name', 'Noob');
  member.addRole(role)
});


bot.login(config.token);
