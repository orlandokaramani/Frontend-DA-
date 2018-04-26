import { Bashkia } from './Bashkia';
import { Users } from './User';
import { Qv } from './QV';

export interface Njesia{
    id: number;
    njesia1 : string;
    idBashkia: number;
    qv: Qv[];
    
}