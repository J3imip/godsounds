import {User} from '../entities/User';
import UserService from '../services/user.service';

const getUser = () => async(ctx: any, next: Function) => {
  let user = ctx.update[Object.keys(ctx.update)[1]].from;
  let userPostgres: undefined | User = await UserService.findOne({userId: user.id});
    
  if(!user) {
    await UserService.createUser({
      userId: ctx.from!.id,
      firstName: ctx.from?.first_name,
      username: ctx.from?.username
    });

    userPostgres = await UserService.findOne({userId: ctx.from!.id});
  };
  
  ctx.session ??= {user: userPostgres};
  return next();
}

export default getUser;
