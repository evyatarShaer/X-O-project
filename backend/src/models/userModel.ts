import {Game} from "./gameModel"

export interface User {
    id: string;
    name: string;
    passwordHash: string;
    games: Game[];
}