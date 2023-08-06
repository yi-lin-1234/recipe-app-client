import { useState, useEffect } from "react";

import GridList from "../components/GridList";
import { getLikedRecipes } from "../apiService";
import Error from "./Error";
import { Recipe } from "../type";

function LikedRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function initialSetUp() {
      setIsLoading(true);
      try {
        const data = await getLikedRecipes();
        setRecipes(data);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    initialSetUp();
  }, []);

  if (error) return <Error error={error} />;
  if (isLoading) return <div>Loading...</div>;

  return <GridList recipes={recipes} />;
}

export default LikedRecipes;
