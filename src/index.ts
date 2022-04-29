import {createConnection} from 'typeorm';
import {User} from './entities/User';
import {Context, Telegraf} from 'telegraf';
import dotenv from 'dotenv';
import {Sticker} from './entities/Sticker';
import UserService from './services/user.service';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN!);

(async() => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "godsounds",
      database: "godsounds",
      entities: [
        User,
        Sticker
      ],
      synchronize: true
    });
    console.log("Connected to database!");
    bot.launch({
      dropPendingUpdates: true
    });
  } catch(e) {
    console.error(e);
    throw new Error("Unable to connect to db");
  }
})();

bot.command("start", async(ctx: Context)=>{
  const user = await UserService.findOne({userId: ctx.from!.id});
  if(!user) 
    await UserService.createUser({
      userId: ctx.from!.id,
      firstName: ctx.from?.first_name,
      username: ctx.from?.username
    });
});
