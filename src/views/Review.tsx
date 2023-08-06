import { useState, useEffect, FormEvent } from "react";
import { useParams } from "react-router-dom";

import { getReviewsById, createNewReview } from "../../src/apiService";

import ListItem from "../components/ListItem";
import SuccessAlert from "../components/SuccessAlert";
import ErrorAlert from "../components/ErrorAlert";
import { ReviewObj } from "../type";

function Review() {
  const { id } = useParams<{ id: string }>();
  const [input, setInput] = useState<string>("");
  const [reviews, setReviews] = useState<ReviewObj[]>([]);

  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function initialSetUp() {
      setIsLoading(true);
      if (!id) {
        console.log("No ID provided");
        return;
      }
      try {
        const data = await getReviewsById(id);
        setReviews(data);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    initialSetUp();
  }, [id]);

  async function handleOnSubmit(e: FormEvent) {
    e.preventDefault();
    if (!id) {
      console.log("No ID provided");
      return;
    }
    setSuccess(false);
    setError(null);

    // Initialize request body
    const body = { content: input };

    try {
      await createNewReview(id, body);
      setSuccess(true);
      setError(null); // reset the error message on successful login
      setInput("");
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="isolate bg-white px-6">
      <form className="mx-auto mt-5 max-w-xl" onSubmit={handleOnSubmit}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <div className="mt-2.5">
              <textarea
                rows={5}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="  add your comment..."
                required
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 mt-2">
          {error && <ErrorAlert error={error} />}
          {success && (
            <SuccessAlert message="new review create successfully, refresh to see new review" />
          )}
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            post
          </button>
        </div>
      </form>

      <div className="mx-auto mt-5 max-w-xl">
        <div>
          {reviews.length > 0 &&
            reviews.map((review) => (
              <ListItem review={review} key={review.id} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Review;
