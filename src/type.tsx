export type Recipe = {
  id: string;
  name: string;
  cuisine: string;
  ingredients: string;
  instructions: string;
  recipePictureUrl: string;
  totalPrepTime: number;
  difficultyLevel: string;
  likes: number;
  reviews: number;
  notes: string;
  UserId: string;
  createdAt: string;
  updatedAt: string;
};

export type RecipeBody = {
  name: string;
  cuisine: string;
  ingredients: string;
  instructions: string;
  recipePictureUrl: string;
  totalPrepTime: number;
  difficultyLevel: string;
  notes: string;
};

export type ReviewBody = {
  content: string;
};

export type AiChatBody = {
  input: string;
};

export type ProfileBody = {
  username: string;
  profilePictureUrl: string;
  aboutMe: string;
};

export type LoginBody = {
  email: string;
  password: string;
};

export type SignupBody = {
  email: string;
  password: string;
  username: string;
};

export type ChartData = {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string;
    borderWidth: number;
  }>;
};

export type GroupedAttribute = {
  [key: string]: number;
};

export type GroupedDataCuisineObj = {
  cuisine: string;
  count: number;
};

export type GroupedDataDifficultyObj = {
  difficultyLevel: string;
  count: number;
};

export type AiMessage = {
  text: string;
  user: "human" | "AI";
};

export type RecipeWithUserInfo = {
  User: { id: string; profilePictureUrl: string; username: string };
  id: string;
  name: string;
  cuisine: string;
  ingredients: string;
  instructions: string;
  recipePictureUrl: string;
  totalPrepTime: number;
  difficultyLevel: string;
  likes: number;
  reviews: number;
  notes: string;
  UserId: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  username: string;
  email: string;
  profilePictureUrl: string;
  aboutMe: string;
};

export type RootState = {
  user: {
    value: User;
  };
};

export type ReviewObj = {
  id: string;
  RecipeId: string;
  UserId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  User: {
    profilePictureUrl: string;
    username: string;
  };
};

export type CustomRadioGroupProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
};
