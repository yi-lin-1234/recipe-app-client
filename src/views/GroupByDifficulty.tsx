import { useState, useEffect } from "react";

import { getAllRecipes, groupAndCountRecipesByDifficulty } from "../apiService";
import GridList from "../components/GridList";
import Error from "./Error";
import { Recipe, GroupedDataDifficultyObj } from "../type";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function GroupByDifficulty() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [groupedData, setGroupedData] = useState<GroupedDataDifficultyObj[]>(
    []
  );
  const [currentTab, setCurrentTab] = useState<string>("");

  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigation = groupedData.map((item) => ({
    name: item.difficultyLevel,
    count: item.count,
    current: currentTab === item.difficultyLevel,
  }));

  const filteredRecipes = recipes.filter(
    (recipe) => recipe.difficultyLevel === currentTab
  );

  useEffect(() => {
    async function initialSetUp() {
      setIsLoading(true);
      try {
        const data = await getAllRecipes();
        setRecipes(data);
        const groupDate = await groupAndCountRecipesByDifficulty();
        setGroupedData(groupDate);
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

  return (
    <div className="flex min-h-full flex-col">
      <div className="mx-auto flex w-full max-w-7xl items-start gap-x-8 px-4 sm:px-6 lg:px-8">
        <aside className="sticky top-8 hidden w-44 shrink-0 lg:block">
          <nav className="flex flex-1 flex-col py-8" aria-label="Sidebar">
            <ul className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name} onClick={() => setCurrentTab(item.name)}>
                  <div
                    className={classNames(
                      item.current
                        ? "bg-gray-50 text-indigo-600"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                      "group flex gap-x-3 rounded-md p-2 pl-3 text-sm leading-6 font-semibold"
                    )}
                  >
                    {item.name}

                    <span
                      className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-gray-600 ring-1 ring-inset ring-gray-200"
                      aria-hidden="true"
                    >
                      {item.count}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="flex-1">
          <GridList recipes={filteredRecipes} />
        </main>
      </div>
    </div>
  );
}

export default GroupByDifficulty;
