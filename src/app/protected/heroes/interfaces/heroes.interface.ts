export interface Heroe {
  _id?: string;
  id?: string;
  alt_img?: string;
  ok?: boolean;
  superHero?: string;
  publisher?: Publisher;
  alterEgo?: string;
  firstAppearance?: string;
  characters?: string;
  heroe?: any;
}

export enum Publisher {
  DCComics = 'DC Comics',
  MarvelComics = 'Marvel Comics',
}
