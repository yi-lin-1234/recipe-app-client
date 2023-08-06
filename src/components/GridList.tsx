import Card from "./Card";
import { Recipe } from "../type";

function GridList({ recipes }: { recipes: Recipe[] }) {
  return (
    <div className="mx-auto max-w-7xl overflow-hidden">
      <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
        {recipes.map((recipe) => (
          <Card key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default GridList;
