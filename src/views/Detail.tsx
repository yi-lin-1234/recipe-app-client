import { useState, useEffect, useRef, Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import Error from "./Error";
import {
  checkLikeStatus,
  likeRecipe,
  unlikeRecipe,
  getRecipeById,
  deleteRecipeById,
} from "../apiService";
import { RecipeWithUserInfo, RootState } from "../type";

import {
  HeartIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

function Detail() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeWithUserInfo>({
    User: { id: "", profilePictureUrl: "", username: "" },
    id: "",
    name: "",
    cuisine: "",
    ingredients: "",
    instructions: "",
    recipePictureUrl: "",
    totalPrepTime: 0,
    difficultyLevel: "",
    likes: 0,
    reviews: 0,
    notes: "",
    UserId: "",
    createdAt: "",
    updatedAt: "",
  });
  const [isLiked, setIsLiked] = useState(false);
  const currentUser = useSelector((state: RootState) => state.user.value);
  const isOwner = recipe && currentUser && recipe.UserId === currentUser.id;

  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [open, setOpen] = useState<boolean>(false);
  const cancelButtonRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function initialSetUp() {
      setIsLoading(true);
      if (!id) {
        console.log("No ID provided");
        return;
      }
      try {
        const LikeStatus = await checkLikeStatus(id);
        const data = await getRecipeById(id);
        setIsLiked(LikeStatus);
        setRecipe(data);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    initialSetUp();
  }, [id]);

  const handleLikeToggle = async () => {
    try {
      if (isLiked) {
        await unlikeRecipe(recipe.id);
      } else {
        await likeRecipe(recipe.id);
      }
      // Toggle the like status
      setIsLiked(!isLiked);
    } catch (error) {
      console.error(error);
      window.alert("An error occurred while toggling the like status.");
    }
  };

  const handleOnDelete = async () => {
    if (!id) {
      console.log("No ID provided");
      return;
    }
    try {
      await deleteRecipeById(id);
      navigate("/dashboard/my-recipes");
    } catch (error) {
      console.error(error);
    }
  };

  if (error) return <Error error={error} />;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        delete recipe
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          delete your recipe permanently?
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={handleOnDelete}
                    >
                      delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="px-4 sm:px-6 lg:px-8">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-lg font-medium leading-6 text-gray-900">
              creator
            </dt>
            <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <div className="flex items-center">
                <Link to={`/dashboard/user-profile/${recipe.UserId}`}>
                  <img
                    src={recipe.User.profilePictureUrl}
                    alt="user profile"
                    className="h-8 w-8 rounded-full bg-gray-50 object-cover"
                  />
                </Link>
                <span className="ml-4">{recipe.User.username}</span>
              </div>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-lg font-medium leading-6 text-gray-900">
              name
            </dt>
            <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {recipe.name}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-lg font-medium leading-6 text-gray-900">
              difficulty
            </dt>
            <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {recipe.difficultyLevel}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-lg font-medium leading-6 text-gray-900">
              total cooking time (mins)
            </dt>
            <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {recipe.totalPrepTime}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-lg font-medium leading-6 text-gray-900">
              cuisine
            </dt>
            <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {recipe.cuisine}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-lg font-medium leading-6 text-gray-900">
              likes
            </dt>
            <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <div className="flex items-center">
                <span className="isolate inline-flex rounded-md shadow-sm">
                  <button
                    type="button"
                    className="relative inline-flex items-center gap-x-1.5 rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                  >
                    <HeartIcon
                      className={`h-6 w-6 shrink-0 cursor-pointer ${
                        isLiked ? "text-red-500" : "text-gray-400"
                      }`}
                      onClick={handleLikeToggle}
                    />
                    {isLiked ? "unlike" : "like"}
                  </button>
                  <button
                    type="button"
                    className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                  >
                    {recipe.likes}
                  </button>
                </span>
              </div>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-lg font-medium leading-6 text-gray-900">
              ingredients
            </dt>
            <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <textarea
                id="instructions"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={recipe.ingredients}
                readOnly
              />
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-lg font-medium leading-6 text-gray-900">
              instructions
            </dt>
            <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <textarea
                id="instructions"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={recipe.instructions}
                readOnly
              />
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-lg font-medium leading-6 text-gray-900">
              notes
            </dt>
            <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <textarea
                id="instructions"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={recipe.notes}
                readOnly
              />
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-lg font-medium leading-6 text-gray-900">
              recipePictureUrl
            </dt>
            <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <a
                href={recipe.recipePictureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-indigo-600 px-2.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                click to see recipe this picture{" "}
                <span aria-hidden="true">&rarr;</span>
              </a>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-lg font-medium leading-6 text-gray-900">
              reviews
            </dt>
            <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <Link
                to={`/dashboard/review/${recipe.id}`}
                className="rounded-full bg-indigo-600 px-2.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                click to see reviews page <span aria-hidden="true">&rarr;</span>
              </Link>
            </dd>
          </div>
          {isOwner && (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-lg font-medium leading-6 text-gray-900">
                action
              </dt>
              <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <Link to={`/dashboard/edit/${recipe.id}`}>
                  <button className="inline-flex items-center mr-5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    <PencilSquareIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
                    edit
                  </button>
                </Link>

                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <TrashIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
                  delete
                </button>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}

export default Detail;
