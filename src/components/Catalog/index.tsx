import { useCatalog } from "../../hooks/useCatalog";
import { CocktailCard } from "../CocktailCard";

export const Catalog: React.FC = () => {
  const { data: catalog } = useCatalog();

  return (
    <div className="p-6 grid grid-cols-3 gap-4 bg-cyan-300">
      {catalog?.drinks.map((cocktail) => (
        <CocktailCard
          id={cocktail.idDrink}
          thumbnail={cocktail.strDrinkThumb}
          title={cocktail.strDrink}
        />
      ))}
    </div>
  );
};

export default Catalog;
