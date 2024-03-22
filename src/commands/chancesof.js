const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const watcher = require('../backend/watcher.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chancesof')
        .setDescription("Chances of you using this command: 50%")
        .addStringOption(option => option.setName('chance').setDescription('What do you want to test your luck on?').setRequired(true)),

    async execute(interaction_metadata) {
        const chance = interaction_metadata.options.getString('chance');
        const result = Math.floor(Math.random() * 101);

        const chanceEmbed = new EmbedBuilder()
            .setTitle(`Chances of...`)
            .setDescription(`The chances of **${chance}** is **${result}%**`)
            .setFooter({ text: `Requested by: ${interaction_metadata.user.username}` });

        await interaction_metadata.reply({ embeds: [chanceEmbed] });

        watcher.command(interaction_metadata, `Chances of: ${chance}, Result: ${result}`);
    },
};