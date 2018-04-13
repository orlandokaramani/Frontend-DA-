import { Photo } from "./Photo";

export interface Users {
    id: number;
    username: string
    knownAs: string;
    mosha: number;
    gjinia: string;
    lastActive: Date;
    photoUrl: string;
    emer: string;
    atesi: string;
    mbiemer: string;
    photos?: Photo[];
    introduction: string;
    interests: string;
}