import { useNavigate, useParams } from "react-router-dom";

import { useCocktailDetail } from "../../hooks/useCocktailDetail";
import { ReactComponent as LeftArrow } from "../../assets/left-arrow.svg";

import { ShowMoreCocktailParamsProps } from "./types";

export const ShowMoreCocktail: React.FC = () => {
  const { id } = useParams<ShowMoreCocktailParamsProps>();
  const { data: detail } = useCocktailDetail(id);
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-cyan-400 h-screen">
      <div className="flex text-3xl text-white w-[400px] justify-center relative">
        <LeftArrow
          className="h-10 w-10 [&>g>polygon]:!fill-white cursor-pointer absolute left-0"
          onClick={() => navigate(-1)}
        />
        <h2 className="text-center">{detail.strDrink}</h2>
      </div>
      <div className="flex flex-col gap-3 bg-white p-6 w-[400px] mt-4 rounded-md shadow-lg">
        <img
          className="h-90 w-90"
          src={detail.strDrinkThumb}
          alt={`${"pija"}-img`}
        />
        <h3>Ingridients</h3>
        <ul className="text-sm text-slate-500">
          {detail.ingridientsRecipies.ingridients.map(({ name, measure }) => (
            <li className="w-[250px] text-md">
              • {measure} - {name}
            </li>
          ))}
        </ul>
        <h3>How to prepare</h3>
        <p className="text-sm text-slate-500">{detail.strInstructions}</p>
      </div>
    </div>
  );
};

export default ShowMoreCocktail;
