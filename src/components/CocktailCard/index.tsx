import { useNavigate } from "react-router-dom";
import { useCocktailDetail } from "../../hooks/useCocktailDetail";

import { CocktailCardProps } from "./types";

export const CocktailCard: React.FC<CocktailCardProps> = ({
  id,
  title,
  thumbnail,
}) => {
  const { data: detail } = useCocktailDetail(id);
  const navigate = useNavigate();

  return (
    <div
      className="flex w-[600px] p-6 bg-white rounded-md shadow-lg justify-between cursor-pointer"
      onClick={() => navigate(`/cocktail/${id}`)}
    >
      <div className="flex flex-col gap-3">
        <h2 className="w-[250px] text-3xl">{title}</h2>
        <ul className="text-sm text-slate-500">
          <li className="w-[250px] text-md">
            • {detail.ingridientsRecipies.ingridients[0].name}
          </li>
          <li className="w-[250px] text-md">
            • {detail.ingridientsRecipies.ingridients[1].name}
          </li>
          {detail.ingridientsRecipies.total > 2 && (
            <li>and {detail.ingridientsRecipies.total - 2} ingredients more</li>
          )}
        </ul>
      </div>
      <img className="h-60 w-60" src={thumbnail} alt={`${title}-img`} />
    </div>
  );
};

export default CocktailCard;
