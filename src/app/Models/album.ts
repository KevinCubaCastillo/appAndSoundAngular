import { Canciones } from "./Canciones";

export interface album {
   nombre: string;
   fechaLanzamiento: string;
   portada: string;
   cancionList : Canciones[];
}