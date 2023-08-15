import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { getRecipeById, updateRecipeById } from "../apiService";
import SuccessAlert from "../components/SuccessAlert";
import ErrorAlert from "../components/ErrorAlert";
import CustomRadioGroup from "../components/CustomRadioGroup";

import { PhotoIcon, ArrowUpOnSquareIcon } from "@heroicons/react/24/solid";

function Edit() {
  const { id } = useParams<{ id: string }>();

  const [name, setName] = useState<string>("");
  const [cuisine, setCuisine] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [totalPrepTime, setTotalPrepTime] = useState<number>(0);
  const [difficultyLevel, setDifficultyLevel] = useState<string>("easy");
  const [notes, setNotes] = useState<string>("");

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [currentImage, setCurrentImage] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const levels = ["easy", "medium", "hard"];

  useEffect(() => {
    async function initialSetUp() {
      setIsLoading(true);
      if (!id) {
        console.log("No ID provided");
        return;
      }
      try {
        const data = await getRecipeById(id);
        setName(data.name);
        setCuisine(data.cuisine);
        setIngredients(data.ingredients);
        setInstructions(data.instructions);
        setTotalPrepTime(data.totalPrepTime);
        setDifficultyLevel(data.difficultyLevel);
        setNotes(data.notes);
        setCurrentImage(data.recipePictureUrl);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    initialSetUp();
  }, [id]);

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.target;
    if (files && files.length !== 0) {
      setImage((prevState) => files[0]);
      setImagePreview(URL.createObjectURL(files[0]));
    }
  }

  async function handleImageUpload() {
    try {
      const data = new FormData();
      if (image) {
        data.append("file", image);
        data.append("upload_preset", "purchaseApp");
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/yilin1234/image/upload",
          data
        );
        return response.data.secure_url;
      }
    } catch (error) {
      console.error(error);
      alert("Error uploading image."); // Set error state
    }
  }

  async function handleOnSubmit(e: FormEvent) {
    e.preventDefault();

    if (!id) {
      console.log("No ID provided");
      return;
    }

    let profilePictureUrl = currentImage;

    // If there is a new image, upload it
    if (image) {
      profilePictureUrl = await handleImageUpload();
      if (!profilePictureUrl) return; // Return if image upload failed
    }

    // Validate text input fields (should not be just spaces)
    if (
      !name.trim() ||
      !cuisine.trim() ||
      !ingredients.trim() ||
      !instructions.trim() ||
      !notes.trim()
    ) {
      alert("Text fields cannot be empty or consist of only spaces.");
      return;
    }

    // Validate totalPrepTime (it should be greater than 0)
    if (totalPrepTime <= 0) {
      alert("Preparation time must be greater than 0.");
      return;
    }

    // Initialize request body
    const body = {
      name,
      cuisine: cuisine.toLowerCase(),
      ingredients,
      instructions,
      recipePictureUrl: profilePictureUrl,
      totalPrepTime,
      difficultyLevel,
      notes,
    };

    try {
      await updateRecipeById(id, body);
      setSuccess(true);
      setError(null);
    } catch (error) {
      console.error(error);
      setSuccess(false);
      setError(error);
    }
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="isolate bg-white p-10">
      <form className="mx-auto max-w-xl" onSubmit={handleOnSubmit}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="current image"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              current recipe image
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <img src={currentImage} alt="preview" width="300" />
              </div>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              name
            </label>
            <div className="mt-2.5">
              <input
                id="name"
                type="text"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="cuisine"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              cuisine
            </label>
            <div className="mt-2.5">
              <input
                id="cuisine"
                type="text"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="ingredients"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              ingredients
            </label>
            <div className="mt-2.5">
              <textarea
                id="ingredients"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="instructions"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              instructions
            </label>
            <div className="mt-2.5">
              <textarea
                id="instructions"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-span-full">
            <label
              htmlFor="profileImage"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              recipe picture
            </label>
            <div className="mt-3 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="profileImage"
                className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                upload an image{" "}
                <ArrowUpOnSquareIcon
                  className="-mr-0.5 h-5 w-5"
                  aria-hidden="true"
                />
                <input
                  className="sr-only"
                  id="profileImage"
                  type="file"
                  name="profileImage"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" width="300" />
                ) : (
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="totalPrepTime"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              total preparation time (minutes)
            </label>
            <div className="mt-2.5">
              <input
                id="totalPrepTime"
                type="number"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={totalPrepTime}
                onChange={(e) => setTotalPrepTime(Number(e.target.value))}
                required
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <CustomRadioGroup
              label="difficulty level"
              value={difficultyLevel}
              onChange={setDifficultyLevel}
              options={levels}
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="notes"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              notes
            </label>
            <div className="mt-2.5">
              <textarea
                id="notes"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 mt-6">
          {error && <ErrorAlert error={error} />}
          {success && (
            <SuccessAlert message="new recipe update successfully, refresh to see new changes" />
          )}
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            update
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
