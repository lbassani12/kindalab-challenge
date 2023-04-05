import useSWR from "swr";

export const CATALOG_KEY = "catalog-key";
export const CATALOG_BASE_URL = "http://www.thecocktaildb.com/api/json/v1/1";

export interface Cocktail {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
}

export interface Catalog {
  drinks: Cocktail[];
}

export const useCatalog = () => {
  const { data, error, mutate } = useSWR(
    [CATALOG_KEY],
    async (): Promise<Catalog> => {
      return await fetch(
        `${CATALOG_BASE_URL}/filter.php?g=Cocktail_glass`
      ).then((res) => res.json());
    },
    { suspense: true }
  );

  return {
    data,
    error,
    mutate,
  };
};
