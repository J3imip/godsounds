import {Context, Scenes} from 'telegraf';
import {User} from '../entities/User';

interface NewSession extends Scenes.SceneSession {
  user: User | undefined
}

interface ContextWithSession extends Context {
  session: NewSession
  scene: Scenes.SceneContextScene<ContextWithSession>
}

export = ContextWithSession;
