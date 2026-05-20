import { ApplicationIntegrationType, Interaction, InteractionContextType, SlashCommandBuilder } from "discord.js";
import { MeenyCommand, RegisterCommand } from "../backend/bot";

@RegisterCommand
export class SocialCommand extends MeenyCommand
{
  constructor()
  {
    const command: SlashCommandBuilder = new SlashCommandBuilder();
    command.setDescription("Replies with all of Meeny's social media");

    command.setIntegrationTypes([ApplicationIntegrationType.UserInstall]);
    command.setContexts([InteractionContextType.BotDM]);

    super("socials", command);
  }

  override async execute(interaction_metadata: Interaction): Promise<void>
  {
    if (!interaction_metadata.isChatInputCommand())
    {
      return;
    }

    await interaction_metadata.reply({
      embeds: [{title: "Meeny's socials", description: "Click a button below to visit any one of Meeny's socials."}],
      components: [{
        type: 1,
        components: [{
          type: 2,
          label: "GitHub (Source Code)",
          style: 5,
          url: "https://github.com/MeenyDiscord/Meeny/",
          emoji: {name: "github", id: "1300614258790367232"},
        }, {
          type: 2,
          label: "Twitter",
          style: 5,
          url: "https://twitter.com/MeenyDiscord",
          emoji: {name: "twitter", id: "1300614248476708884"},
        }],
      }],
    });
  }
}
