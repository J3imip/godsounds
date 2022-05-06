import {Context} from 'telegraf';
import {User} from '../entities/User';

interface SessionData {
  user: Partial<User>
}

export default interface ContextWithSession extends Context {
  session?: SessionData 
}
