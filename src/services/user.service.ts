import {FindConditions} from "typeorm";
import {User} from "../entities/User";

class UserService {
  async createUser(data: Partial<User>) {
    try {
      await User.create(data).save();
    } catch(e) {
      console.error(e);
    }
  }

  async findOne(data: FindConditions<User>): Promise<User | undefined> {
    return User.findOne(data);
  }
}

export default new UserService();
