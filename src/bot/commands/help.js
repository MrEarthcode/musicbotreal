module.exports = {
    name: "help",
    cooldown: 3,
    description: 'bot orders',
    aliases: ["h"],
    run: async function(client, message, args, user) {
        try {
            const { MessageEmbed } = require('discord.js');
            var prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`);
            if (prefix == null) prefix = require('../../config/bot').prefix;
            let help = new MessageEmbed()
                .setColor('YELLOW')
                .setAuthor('🤖 | Bot Orders', client.user.avatarURL({ dynamic: true }), `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=6479507312`)
            require('fs').readdir(__dirname + '/', (err, files) => {
                if (err) return console.error(err);
                files.forEach(file => {
                    if (!file.endsWith(".js")) return;
                    let props = require(__dirname + '/' + file);
                    let commandName = file.split(".")[0];
                    help.addFields({ name: prefix + props.name, value: props.description, inline: true })
                });
            });
            setTimeout(() => {
                message.channel.send({
                    embed: help
                })
            }, 500);
        } catch (err) {
            console.log(err)
        }
    }
};