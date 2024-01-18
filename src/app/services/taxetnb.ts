import { Categorie } from "./categorie";
import { Proprietaire } from "./proprietaire";
import { Taux } from "./taux";
import { Terrain } from "./terrain";

export class Taxetnb {
  id !: number;
  description !: String;
  label !: String;
  montantbase !: number;
  tnbyear !: number;
  category : Categorie | undefined;
  redevable : Proprietaire | undefined;
  taux : Taux | undefined;
  terrain : Terrain | undefined;
}
