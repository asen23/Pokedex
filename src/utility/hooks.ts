import { useApi } from './axios';

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

export const usePokemons = () => {
  const { error, loading, data } = useApi<PokemonResponse>('pokemon');

  return { error, loading, pokemons: data?.results };
};

export const usePokemonDetail = (url: string) => {
  const { error, loading, data } = useApi<PokemonDetail>(url);

  return { error, loading, detail: data };
};

export const usePokemonSprite = (url: string) => {
  const { error, loading, detail } = usePokemonDetail(url);

  return { error, loading, sprite: detail?.sprites.front_default };
};
