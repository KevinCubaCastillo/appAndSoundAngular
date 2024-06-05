import { pCanciones } from "./pCanciones";

export interface playlist{
    nombre: string;
    id_usuario: string;
    publico: boolean;
    canciones: pCanciones[];
}