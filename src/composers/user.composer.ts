import { Composer } from 'telegraf';
import ContextWithSession from '../interfaces/Context';
const composer = new Composer<ContextWithSession>();

composer.start(async(ctx: ContextWithSession)=>{
  await ctx.reply("hey nigga");
});

export = composer;
