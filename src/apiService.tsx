import axios from "axios";
import {
  LoginBody,
  SignupBody,
  RecipeBody,
  ReviewBody,
  AiChatBody,
  ProfileBody,
} from "./type";

//dev
// const instance = axios.create({
//   baseURL: "http://localhost:8000",
//   withCredentials: true,
// });

//prod
const instance = axios.create({
  baseURL: "https://expressjs-server-production-69e3.up.railway.app/",
  withCredentials: true,
});

//==============================( POST )==============================

// login
export const login = async (body: LoginBody) => {
  const response = await instance.post("login", body);
  return response;
};

// signup
export const signup = async (body: SignupBody) => {
  const response = await instance.post("signup", body);
  return response;
};

// logout
export const logout = async () => {
  const response = await instance.post("logout");
  return response;
};

// protected route verification
export const restoreSession = async () => {
  const response = await instance.post("protectedRouteVerification");
  return response;
};

// create new recipe
export const createNewRecipe = async (body: RecipeBody) => {
  await instance.post("recipe", body);
};

// like a recipe
export const likeRecipe = async (id: string) => {
  const response = await instance.post(`like/${id}`);
  return response.data.message;
};

// create new review
export const createNewReview = async (id: string, body: ReviewBody) => {
  await instance.post(`review/${id}`, body);
};

// ai chatbot
export const askChatbot = async (body: AiChatBody) => {
  const response = await instance.post("chatbot", body);
  return response.data.message;
};

//==============================( GET )==============================

// fetch all recipes
export const getAllRecipes = async () => {
  const response = await instance.get("all-recipes");
  return response.data.recipes;
};

// get recipe by id
export const getRecipeById = async (id: string) => {
  const response = await instance.get(`recipe/${id}`);
  return response.data.recipe;
};

// get recipe by id
export const getUserById = async (id: string) => {
  const response = await instance.get(`user/${id}`);

  return response.data.user;
};

// fetch recipes with given user
export const getRecipesByUserId = async (id: string) => {
  const response = await instance.get(`user-recipes/${id}`);
  return response.data.recipes;
};

// get liked recipes by current user
export const getLikedRecipes = async () => {
  const response = await instance.get("liked-recipes");
  return response.data.recipes;
};

// search recipes with field and term
export const searchRecipes = async (
  field: string,
  term: string,
  sortField: string,
  sortOrder: string
) => {
  const response = await instance.get("search-recipes", {
    params: {
      field: field,
      query: term,
      sortField: sortField,
      sortOrder: sortOrder,
    },
  });
  return response.data.recipes;
};

// check if recipe is liked or not
export const checkLikeStatus = async (id: string) => {
  const response = await instance.get(`is-liked/${id}`);
  return response.data.isLiked;
};

// get reviews by recipe id
export const getReviewsById = async (id: string) => {
  const response = await instance.get(`/reviews/${id}`);
  return response.data.reviews;
};

// group recipes by cuisine
export const groupAndCountRecipesByCuisine = async () => {
  const response = await instance.get("recipes-count-by-cuisine");
  return response.data.data;
};

// group recipes by cuisine
export const groupAndCountRecipesByDifficulty = async () => {
  const response = await instance.get("recipes-count-by-difficulty");
  return response.data.data;
};

//==============================( PUT )==============================

// update a recipe by id
export const updateRecipeById = async (id: string, body: RecipeBody) => {
  await instance.put(`/recipe/${id}`, body);
};

// update user profile
export const updateUserProfile = async (body: ProfileBody) => {
  await instance.put("update-user", body);
};

// update user profile
export const updateReviewById = async (id: string, body: ReviewBody) => {
  await instance.put(`/review/${id}`, body);
};

//==============================( DELETE )==============================

// unlike a recipe
export const unlikeRecipe = async (id: string) => {
  const response = await instance.delete(`unlike/${id}`);
  return response.data.message;
};

// delete a recipe by id
export const deleteRecipeById = async (id: string) => {
  await instance.delete(`recipe/${id}`);
};

// delete a review by id
export const deleteReviewById = async (id: string) => {
  await instance.delete(`review/${id}`);
};
