export type PokemonResponse = {
  count: number;
  next: string;
  previous: null;
  results: Pokemon[];
};

export type Pokemon = {
  name: string;
  url: string;
};

export interface PokemonDetail {
  abilities: Ability[];
  base_experience: number;
  height: number;
  id: number;
  name: string;
  species: Species;
  sprites: Sprites;
  types: Type[];
  weight: number;
}
interface Ability {
  ability: Species;
  is_hidden: boolean;
  slot: number;
}
interface Species {
  name: string;
  url: string;
}
interface Sprites {
  front_default: string;
}
interface Type {
  slot: number;
  type: Species;
}
