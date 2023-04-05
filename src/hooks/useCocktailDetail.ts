import useSWR from "swr";
import { CATALOG_BASE_URL } from "./useCatalog";

export const COCKTAIL_DETAIL_KEY = "cocktail-detail-key";

interface CocktailDetailResponse {
  drinks: CocktailDetail[];
}

export interface CocktailDetail {
  idDrink?: string;
  strDrink?: string;
  strDrinkAlternate?: string;
  strTags?: string;
  strVideo?: string;
  strCategory?: string;
  strIBA?: string;
  strAlcoholic?: string;
  strGlass?: string;
  strInstructions?: string;
  strInstructionsES?: string;
  strInstructionsDE?: string;
  strInstructionsFR?: string;
  strInstructionsIT?: string;
  ["strInstructionsZH-HANS"]?: string;
  ["strInstructionsZH-HANT"]?: string;
  strDrinkThumb?: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
  strMeasure11?: string;
  strMeasure12?: string;
  strMeasure13?: string;
  strMeasure14?: string;
  strMeasure15?: string;
  strImageSource?: string;
  strImageAttribution?: string;
  strCreativeCommonsConfirmed?: string;
  dateModified?: string;
}

interface Ingredient {
  name: string;
  measure: string;
}

export interface NormalizedCocktailDetail {
  idDrink?: string;
  strDrink?: string;
  strDrinkAlternate?: string;
  strTags?: string;
  strVideo?: string;
  strCategory?: string;
  strIBA?: string;
  strAlcoholic?: string;
  strGlass?: string;
  strInstructions?: string;
  strInstructionsES?: string;
  strInstructionsDE?: string;
  strInstructionsFR?: string;
  strInstructionsIT?: string;
  ["strInstructionsZH-HANS"]?: string;
  ["strInstructionsZH-HANT"]?: string;
  strDrinkThumb?: string;
  ingridientsRecipies: {
    total: number;
    ingridients: Ingredient[];
  };
  strImageSource?: string;
  strImageAttribution?: string;
  strCreativeCommonsConfirmed?: string;
  dateModified?: string;
}

const normalizeCocktail = (cocktailDetail: CocktailDetail) => {
  let normalizedObj = {} as NormalizedCocktailDetail;
  let ingridientList = [] as Ingredient[];
  let totalIngr = 0;

  Object.entries(cocktailDetail).forEach(([key, value]) => {
    if (key.includes("strIngredient") && value !== null) {
      totalIngr++;
      const ingrIdx = key.replace("strIngredient", "");
      if (`strMeasure${ingrIdx}` in cocktailDetail)
        ingridientList.push({
          name: value,
          measure:
            cocktailDetail[`strMeasure${ingrIdx}` as keyof CocktailDetail] ??
            "",
        });
    } else if (!key.includes("strMeasure") && value !== null) {
      normalizedObj[key as keyof NormalizedCocktailDetail] = value;
    }
  });
  normalizedObj["ingridientsRecipies"] = {
    total: totalIngr,
    ingridients: ingridientList,
  };

  return normalizedObj;
};

export const useCocktailDetail = (cocktailId: string | undefined) => {
  const { data, error, mutate } = useSWR(
    cocktailId ? { key: COCKTAIL_DETAIL_KEY, cocktailId: cocktailId } : null,
    async ({ key, cocktailId }): Promise<CocktailDetailResponse> => {
      return await fetch(`${CATALOG_BASE_URL}/lookup.php?i=${cocktailId}`).then(
        (res) => res.json()
      );
    },
    { suspense: true }
  );

  return {
    data: normalizeCocktail(data.drinks[0]),
    error,
    mutate,
  };
};
