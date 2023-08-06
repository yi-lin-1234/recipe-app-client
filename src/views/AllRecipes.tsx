import { useState, useEffect } from "react";

import GridList from "../components/GridList";
import Error from "./Error";
import { getAllRecipes } from "../apiService";
import { Recipe } from "../type";

function AllRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function initialSetUp() {
      setIsLoading(true);
      try {
        const data = await getAllRecipes();
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

export default AllRecipes;
