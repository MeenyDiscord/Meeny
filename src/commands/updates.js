const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ComponentType, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('updates')
        .setDescription("Shows you what changed in Meeny!"),
    async execute(interaction_metadata) {
        // Update Menu
		const updateSelect = new StringSelectMenuBuilder()
			.setCustomId('updateSelect')
			.setPlaceholder('Click/Tap Me!')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Version 1')
					//.setDescription('')
					.setValue('v1')
                    //.setDefault(true),
            );

        const row = new ActionRowBuilder()
            .addComponents(updateSelect);

        //Embeds
        const updateEmbed = new EmbedBuilder()
            .setTitle(`Updates`)
            .setDescription('Select a option!')
            .setFooter({ text: `Requested by: ${interaction_metadata.user.username}` })

        const v1embed = new EmbedBuilder()
            .setTitle(`Version 1`)
            .setDescription(`
            ## Version 1.0.0
            (-) The whole section for now
            `)
            .setFooter({ text: `Requested by: ${interaction_metadata.user.username}` })

        const updateReply = await interaction_metadata.reply({ embeds: [updateEmbed], components: [row]});

        const collector = await updateReply.createMessageComponentCollector({ componentType: ComponentType.StringSelect });

        collector.on('collect', async i => {
            if(i.customId === "updateSelect")
            {
                const value = i.values[0];
                if (value === "v1")
                {
                    await i.update({ embeds: [v1embed], components: [row] });
                    //console.log(`${interaction_metadata.user.username} selected Version 1! - updates.js`)
                }
            }
        });

        //console.log(`Command: ${interaction_metadata.commandName}, Ran by: ${interaction_metadata.user.tag}`);
    },
};