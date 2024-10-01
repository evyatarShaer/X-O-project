import { User } from "../models/userModel";
import * as userDAL from "../dal/userDal"
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"


export const createUser = async (username: string, password: string): Promise<User> => {
    const users: User[] = await userDAL.getUsers();
    const passwordHash: string = await bcrypt.hash(password, 10);
    const newUser: User = {
        id: uuid(),
        name: username,
        passwordHash,
        games: [],
    }
    users.push(newUser);
    await userDAL.saveUsers(users)
    return newUser;
}


export const authenticateUser = async (username: string, password: string): Promise<User | null> => {
    const users = await userDAL.getUsers();
    const user = users.find(currentUser => currentUser.name === username);
    
    if (user && await bcrypt.compare(password, user.passwordHash)) {
        return user;
    }
    return null;
}