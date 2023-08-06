import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import RecipeGridList from "../components/GridList";
import Error from "./Error";
import { getRecipesByUserId, getUserById } from "../apiService";
import { RootState, User, Recipe } from "../type";

import { EnvelopeIcon } from "@heroicons/react/20/solid";

function UserProfile() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User>({
    id: "",
    username: "",
    email: "",
    profilePictureUrl: "",
    aboutMe: "",
  });
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const currentUser = useSelector((state: RootState) => state.user.value);
  const isMySelf = id === currentUser.id;

  useEffect(() => {
    async function initialSetUp() {
      setIsLoading(true);
      if (!id) {
        console.log("No ID provided");
        return;
      }
      try {
        const temp_user = await getUserById(id);
        setUser(temp_user);
        const temp_recipe = await getRecipesByUserId(id);
        setRecipes(temp_recipe);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    initialSetUp();
  }, [id]);

  if (error && error.response.data.message !== "No recipes found")
    return <Error error={error} />;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-background-grey p-16 h-screen">
      <div className=" overflow-hidden rounded-lg bg-white shadow">
        <div className="bg-white border-b border-gray-200">
          <div className="p-6 sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex-shrink-0">
                <img
                  className="mx-auto h-20 w-20 rounded-full object-cover"
                  src={user.profilePictureUrl}
                  alt="user"
                />
              </div>
              <div className="text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-sm font-medium text-gray-600">
                  welcome to my profile!
                </p>
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {user.username}
                </p>
              </div>
            </div>
            {!isMySelf && (
              <div className="mt-5 flex justify-center sm:mt-0">
                <Link to={"/dashboard/direct-message"} state={user}>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <EnvelopeIcon
                      className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />

                    <span>Message</span>
                  </button>
                </Link>
              </div>
            )}
          </div>
          <div className="p-6 text-sm font-medium text-gray-600 border-t border-gray-200">
            {user.aboutMe}
          </div>
        </div>
        {error && <Error error={error} />}
        {recipes.length > 0 && <RecipeGridList recipes={recipes} />}
      </div>
    </div>
  );
}

export default UserProfile;
