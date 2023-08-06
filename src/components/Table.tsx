import { Link } from "react-router-dom";
import { format } from "date-fns";

import {
  ChatBubbleLeftIcon,
  HeartIcon,
  CalendarDaysIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { Recipe } from "../type";

function Table({ recipes }: { recipes: Recipe[] }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <div className="flex items-center">
                        <HeartIcon
                          className="h-5 w-5 text-gray-400 mr-2"
                          aria-hidden="true"
                        />
                        Likes
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <div className="flex items-center">
                        <ChatBubbleLeftIcon
                          className="h-5 w-5 text-gray-400 mr-2"
                          aria-hidden="true"
                        />
                        Reviews
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <div className="flex items-center">
                        <ClockIcon
                          className="h-5 w-5 text-gray-400 mr-2"
                          aria-hidden="true"
                        />
                        Time
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <div className="flex items-center">
                        <CalendarDaysIcon
                          className="h-5 w-5 text-gray-400 mr-2"
                          aria-hidden="true"
                        />
                        Published on
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {recipes.map((recipe) => (
                    <tr className="hover:bg-gray-50">
                      <Link to={`/dashboard/recipe-detail/${recipe.id}`}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          <div className="flex items-center">
                            <img
                              className="h-11 w-11 rounded-full object-cover mr-1 ml-2"
                              src={recipe.recipePictureUrl}
                              alt="recipe"
                            />

                            {recipe.name}
                          </div>
                        </td>
                      </Link>

                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {recipe.likes}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {recipe.reviews}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {recipe.totalPrepTime}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {format(new Date(recipe.createdAt), "MMMM d, yyyy")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
