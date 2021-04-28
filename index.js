const config = require("./config.json")
var Discord = require("discord.js")
const Perspective = require("perspective-api-client")
var perspe = new Perspective({apiKey: config.perspectiveKey});
client = new Discord.Client();

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
		if (obj.attributeScores.TOXICITY.summaryScore.value > .8) {
			message.delete();
			message.reply("Please don't be toxic, and no spamming too btw. :-)");
		} else if (obj.attributeScores.SPAM.summaryScore.value > .8) {
			message.delete();
			message.reply("Please don't spam, and no being toxic too btw. :-)");
		}
	} catch {
		console.log("cant understand!")
	}
});

client.login(config.token);
