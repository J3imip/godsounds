import {User} from '../entities/User';
import ContextWithSession from '../interfaces/Context';
import UserService from '../services/user.service';

const getUser = () => async(ctx: ContextWithSession, next: Function) => {
  let user = ctx.from;
  let userPostgres: undefined | User = await UserService.findOne({userId: user!.id});
    
  if(!userPostgres) {
    await UserService.createUser({
      userId: ctx.from!.id,
      firstName: ctx.from?.first_name,
      username: ctx.from?.username
    });

    userPostgres = await UserService.findOne({userId: ctx.from!.id});
  };
  
  ctx.session.user = userPostgres;
  return next();
}

export default getUser;
