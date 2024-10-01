import { User } from "../models/userModel"
import path from 'path';
import jsonfile from "jsonfile"

const FILE = path.join(__dirname, '../data/dbFile.json');

export const getUsers = async (): Promise<User[]> => await jsonfile.readFile(FILE);

export const saveUsers = async (users: User[]): Promise<void> =>
    await jsonfile.writeFile(FILE, users, { spaces: 2 });