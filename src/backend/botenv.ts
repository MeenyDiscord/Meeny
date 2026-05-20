import chalk from "chalk";
import dotenv from "dotenv";
import { resolve } from "path";

const DEFAULT_BAN_MESSAGE: string = "You are on the ban list, request cannot continue.";

export class MeenyEnvironment
{
  id: string;
  token: string;

  watchList: string[];
  banList: string[];
  banMessage: string;

  constructor()
  {
    dotenv.config();

    this.id = process.env.DISCORD_BOT_ID;
    this.token = process.env.DISCORD_BOT_TOKEN;

    this.watchList = MeenyEnvironment.parseEnvList(process.env.MEENY_WATCH_LIST) ?? [];
    this.banList = MeenyEnvironment.parseEnvList(process.env.MEENY_BAN_LIST) ?? [];
    this.banMessage = DEFAULT_BAN_MESSAGE;

    if (this.banMessage != null && this.banMessage != "")
    {
      this.banMessage = process.env.MEENY_BAN_MESSAGE;
    }
  }

  public static parseEnvList(text: string): string[]
  {
    try
    {
      var runtime: Function = Function(`return ${text};`);
      return runtime();
    }
    catch (e)
    {
      console.log(chalk.redBright(`Error parsing ${text} as an environment list!`));
      return [];
    }
  }
}
