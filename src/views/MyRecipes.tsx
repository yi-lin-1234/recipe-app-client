import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import GridList from "../components/GridList";
import { getRecipesByUserId } from "../apiService";
import Error from "./Error";
import { Recipe, RootState } from "../type";

function MyRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const currentUser = useSelector((state: RootState) => state.user.value);

  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function initialSetUp() {
      setIsLoading(true);
      try {
        const data = await getRecipesByUserId(currentUser.id);
        setRecipes(data);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    initialSetUp();
  }, [currentUser.id]);

  if (error) return <Error error={error} />;
  if (isLoading) return <div>Loading...</div>;

  return <GridList recipes={recipes} />;
}

export default MyRecipes;
