export enum Status {
    ongoing = 'ongoing',
    finished = 'finished',
}

export interface Game {
    id: string;
    move: {
        player: string;
        position: number[];
    },
    status: Status;
    results: string;
}