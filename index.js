const config = require("./config.json")
var Discord = require("discord.js")
const Perspective = require("perspective-api-client")
var perspe = new Perspective({apiKey: config.perspectiveKey});
client = new Discord.Client();
const db = require('quick.db');

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
	}
});
var app = express();
app.get('/', function(req, res){
   res.send("Bot work.");
});

app.listen(3000, function() {
  client.login(config.token)
});

