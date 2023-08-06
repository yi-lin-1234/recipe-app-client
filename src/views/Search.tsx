import { useState, FormEvent } from "react";
import { Tooltip } from "react-tooltip";

import { searchRecipes } from "../apiService";
import Table from "../components/Table";
import Error from "./Error";
import { Recipe } from "../type";

import { InformationCircleIcon } from "@heroicons/react/24/outline";

function Search() {
  const [searchfield, setSearchField] = useState<string>("name");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortField, setSortField] = useState<string>("likes");
  const [sortOrder, setSortOrder] = useState<string>("DESC");

  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [error, setError] = useState<any>(null);

  async function handleOnSubmit(e: FormEvent) {
    e.preventDefault();
    setSearchResults([]);
    setError(null);
    try {
      const data = await searchRecipes(
        searchfield,
        searchTerm.trim(),
        sortField,
        sortOrder
      );
      setSearchResults(data);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }

  return (
    <div className="isolate bg-white mt-6">
      <form className="mx-auto max-w-xl" onSubmit={handleOnSubmit}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-4">
          <div>
            <label
              htmlFor="search-field"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              search field
            </label>
            <div className="mt-2.5">
              <select
                id="search-field"
                className="block w-full rounded-md border-0 px-3.5 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={searchfield}
                onChange={(e) => setSearchField(e.target.value)}
              >
                <option value="name">name</option>
                <option value="ingredients">ingredients</option>
                <option value="instructions">instructions</option>
              </select>
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <label
                htmlFor="search-term"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                search term
              </label>
              <div
                style={{ cursor: "pointer" }}
                data-tooltip-id="my-tooltip"
                data-tooltip-content="If you don't enter a specific search term, we'll return all the delicious recipes for you to explore. Enjoy!"
                data-tooltip-place="bottom"
              >
                <InformationCircleIcon className="w-5 h-5 text-gray-500 ml-2" />
              </div>
              <Tooltip id="my-tooltip" />
            </div>
            <div className="mt-2.5">
              <input
                type="text"
                id="search-term"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="sort-field"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              sort field
            </label>
            <div className="mt-2.5">
              <select
                id="sort-field"
                className="block w-full rounded-md border-0 px-3.5 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
              >
                <option value="likes">likes</option>
                <option value="reviews">reviews</option>
                <option value="totalPrepTime">time</option>
                <option value="createdAt">upload date</option>
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="sort-order"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              sort order
            </label>
            <div className="mt-2.5">
              <select
                id="sort-order"
                className="block w-full rounded-md border-0 px-3.5 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="DESC">highest/newest first</option>
                <option value="ASC">lowest/oldest first</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            search
          </button>
        </div>
      </form>

      {error && <Error error={error} />}
      {searchResults.length > 0 && <Table recipes={searchResults} />}
    </div>
  );
}

export default Search;
