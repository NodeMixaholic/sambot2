const config = require("./config.json")
var Discord = require("discord.js")
const Perspective = require("perspective-api-client")
var perspe = new Perspective({apiKey: config.perspectiveKey});
client = new Discord.Client();
const db = require('quick.db');
let express = require("express")

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', async (message) => {
	
	try {
		var text = String(message.content)
		console.log(text)
		let result = await perspe.analyze(text)
		let stringify = JSON.stringify(result)
		let obj = JSON.parse(stringify);
		console.log(stringify);
		if (message.member.hasPermission('ADMINISTRATOR') || message.author.id == 304405847247814656) {
			console.log("ADMIN/NODEMIXAHOLIC BYPASS")
		} else {
		if (obj.attributeScores.TOXICITY.summaryScore.value > .8) {
			message.delete();
			message.reply("Please don't be toxic, and no spamming too btw. :-)");
		} else if (obj.attributeScores.SPAM.summaryScore.value > .8) {
			message.delete();
			message.reply("Please don't spam, and no being toxic too btw. :-)");
		}
		}
		
	} catch {
		console.log("cant understand!")
	}

	if (text.startsWith("!bal")) {
		var userid = message.author.id;
		let money = db.fetch(`scbal_${userid}`);
		if (money == null) {
		  money = 0;
		} 
		message.reply(`you have ${money} SamCoin!`);
	} else if (text.startsWith("!dailydollar")) {
		cool = 8.64e+7; //1 day
		amt = 300;
		var doubleday = false;
		var quadday = true;
	
		if (doubleday) {
		  amt = amt * 2
		}
		if (quadday) {
		  amt = amt * 4
		}
		var user = message.author;
		let lastdd = db.fetch(`sclastdd_${user.id}`);
		if (lastdd !== null && (cool - (Date.now() - lastdd) > 0)) {
		  let remTime = ms(cool - (Date.now() - lastdd)); //Get remaining time...
		  message.channel.send(`You have already collected your daily dollar! Please wait ${remTime.hours} hours and ${remTime.minutes} minutes!`)
		} else {
		  message.channel.send(`Successfully collected $${amt}`)
		  db.set(`sclastdd_${user.id}`, Date.now()) //current time in ms to db
		  db.add(`scbal_${user.id}`, amt)
		} 
	} else if (text.startsWith("!help")) {
		message.reply("!bal, !dailydollar")
	} else if (text.startsWith("!executeOrder69")) { 
    if (message.member.hasPermission('ADMINISTRATOR') || message.author.id == 304405847247814656) {
    let member = message.mentions.members.first();
    if(!member) return message.reply("Mention a valid waiter");
    if(!member.kickable) return message.reply("Error!");
    member.kick();
    }
  } else if (text.startsWith("!iAmABot")) { 
    try {
      if (message.author.id == 304405847247814656) {
      let role = message.guild.roles.cache.get("831282758504415232");
      //add 831311224733564948 (joey) and 912481082836918312 (biggest pp)
      let jrole = message.guild.roles.cache.get("831311224733564948");
      let prole = message.guild.roles.cache.get("912481082836918312");
      //also add 800161574080872449 (best)
      let brole = message.guild.roles.cache.get("800161574080872449");
      message.member.roles.add(brole);
      message.member.roles.add(jrole);
      message.member.roles.add(prole);
      message.member.roles.add(role);
      }
    } catch {
      console.log("error")
    }
  }
});
var app = express();
app.get('/', function(req, res){
   res.send("Bot work.");
});

app.listen(3000, function() {
  client.login(config.token)
});
