import { Link } from "react-router-dom";
import { Recipe } from "../type";

function Card({ recipe }: { recipe: Recipe }) {
  return (
    <div className="group relative border-b border-r border-gray-200 p-4 sm:p-6">
      <Link to={`/dashboard/recipe-detail/${recipe.id}`}>
        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
          <img
            src={recipe.recipePictureUrl}
            alt="recipe"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="pb-4 pt-10 text-center">
          <h3 className="text-xl font-medium text-gray-900">{recipe.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{recipe.cuisine}</p>
        </div>
      </Link>
    </div>
  );
}

export default Card;
