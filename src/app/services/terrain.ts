import { Categorie } from "./categorie";
import { Proprietaire } from "./proprietaire";

export class Terrain {
    id : number | undefined;
    nom : String | undefined;
    description : String | undefined;
    surface : number | undefined;
    redevable : Proprietaire | undefined;
    category : Categorie | undefined;
}
