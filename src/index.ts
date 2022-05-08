import {createConnection} from 'typeorm';
import {User} from './entities/User';
import {Telegraf, session, Scenes} from 'telegraf';
import * as dotenv from 'dotenv';
import {Sticker} from './entities/Sticker';
import ContextWithSession from './interfaces/Context';
import getUser from './middlewares/getUser';

dotenv.config();

const bot = new Telegraf<ContextWithSession>(process.env.BOT_TOKEN!);

(async() => {
  try {
    await createConnection({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.PORT!),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [
        User,
        Sticker
      ],
      synchronize: true
    });
    console.log("Connected to database!");

    const stage = new Scenes.Stage<ContextWithSession>([], {ttl: 10});

    bot.use(session());
    bot.use(stage.middleware());
    bot.use(getUser());
    bot.use(require('./composers/user.composer'));

    bot.launch({
      dropPendingUpdates: true
    });
  } catch(e) {
    console.error(e);
    throw new Error("Unable to connect to db");
  }
})();
