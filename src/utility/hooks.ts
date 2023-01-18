import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { pokeApi } from './axios';

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
  const { isError, isLoading, isFetchingNextPage, data, fetchNextPage } =
    useInfiniteQuery<PokemonResponse>({
      queryKey: ['pokemon'],
      queryFn: ({ pageParam }) =>
        pokeApi.get(pageParam ?? 'pokemon').then(response => response.data),
      getNextPageParam: result => result.next,
    });

  return {
    error: isError,
    loading: isLoading,
    moreLoading: isFetchingNextPage,
    pokemons: data?.pages.flatMap(page => page.results),
    fetchMore: fetchNextPage,
  };
};

export const usePokemonDetail = (url: string) => {
  const { isError, isLoading, data } = useQuery<PokemonDetail>({
    queryKey: ['pokemon', url],
    queryFn: () => pokeApi.get(url).then(response => response.data),
  });

  return { error: isError, loading: isLoading, detail: data };
};

export const usePokemonSprite = (url: string) => {
  const { error, loading, detail } = usePokemonDetail(url);

  return { error, loading, sprite: detail?.sprites.front_default };
};
