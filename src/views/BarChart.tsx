import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  groupAndCountRecipesByCuisine,
  groupAndCountRecipesByDifficulty,
} from "../apiService";
import Error from "./Error";
import {
  ChartData,
  GroupedDataCuisineObj,
  GroupedDataDifficultyObj,
} from "../type";

// eslint-disable-next-line
import "chart.js/auto";

function BarChart() {
  const [chartDataCuisine, setChartDataCuisine] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "Number of Recipes",
        data: [],
        backgroundColor: "#4F45E4",
        borderWidth: 2,
      },
    ],
  });
  const [chartDataDifficulty, setChartDataDifficulty] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "Number of Recipes",
        data: [],
        backgroundColor: "#4F45E4",
        borderWidth: 2,
      },
    ],
  });

  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function initialSetUp() {
      setIsLoading(true);
      try {
        const grouped_data_cuisine: GroupedDataCuisineObj[] =
          await groupAndCountRecipesByCuisine();
        setChartDataCuisine({
          labels: grouped_data_cuisine.map((obj) => obj.cuisine),
          datasets: [
            {
              label: "Number of Recipes",
              data: grouped_data_cuisine.map((obj) => obj.count),
              backgroundColor: "#4F45E4",
              borderWidth: 2,
            },
          ],
        });
        const grouped_data_difficulty: GroupedDataDifficultyObj[] =
          await groupAndCountRecipesByDifficulty();

        setChartDataDifficulty({
          labels: grouped_data_difficulty.map((obj) => obj.difficultyLevel),
          datasets: [
            {
              label: "Number of Recipes",
              data: grouped_data_difficulty.map((obj) => obj.count),
              backgroundColor: "#4F45E4",
              borderWidth: 2,
            },
          ],
        });
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
    <div className="bg-gray-50 h-screen">
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
        {/* Details section */}
        <section aria-labelledby="details-heading">
          <div className="flex flex-col items-center text-center">
            <h2
              id="details-heading"
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              Recipes Statistics
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-gray-600">
              Explore our wide range of recipes, categorized by cuisine and
              difficulty. See how they stack up against each other.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-8">
            <div>
              <div className="aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-lg">
                <Bar
                  data={chartDataCuisine}
                  options={{ responsive: true, indexAxis: "y" }}
                />
              </div>
              <p className="mt-8 text-base text-gray-500">
                This chart represents the number of recipes available for each
                cuisine in our collection. Find out which cuisine has the most
                recipes.
              </p>
            </div>
            <div>
              <div className="aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-lg">
                <Bar
                  data={chartDataDifficulty}
                  options={{ responsive: true, indexAxis: "y" }}
                />
              </div>
              <p className="mt-8 text-base text-gray-500">
                Here we have grouped the recipes by their difficulty level. It
                gives you an idea about the variety of easy, midium, and hard
                recipes we have.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default BarChart;
