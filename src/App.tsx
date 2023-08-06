import { Route, Routes } from "react-router-dom";

import Landing from "./views/Landing";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Dashboard from "./views/Dashboard";
import MyProfile from "./views/MyProfile";
import UserProfile from "./views/UserProfile";
import Create from "./views/Create";
import AllRecipes from "./views/AllRecipes";
import MyRecipes from "./views/MyRecipes";
import LikedRecipes from "./views/LikedRecipes";
import Detail from "./views/Detail";
import GroupByCuisine from "./views/GroupByCuisine";
import GroupByDifficulty from "./views/GroupByDifficulty";
import Search from "./views/Search";
import DirectMessage from "./views/DirectMessage";
import MessagePenal from "./views/MessagePenal";
import ChatBot from "./views/ChatBot";
import BarChart from "./views/BarChart";
import Review from "./views/Review";
import Edit from "./views/Edit";
import PrivateRoutes from "./views/PrivateRoutes";
import NotFound from "./views/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="all-recipes" element={<AllRecipes />} />
          <Route path="create" element={<Create />} />
          <Route path="my-recipes" element={<MyRecipes />} />
          <Route path="liked-recipes" element={<LikedRecipes />} />
          <Route path="search" element={<Search />} />
          <Route path="direct-message" element={<DirectMessage />} />
          <Route path="message-penal" element={<MessagePenal />} />
          <Route path="chatbot" element={<ChatBot />} />
          <Route path="group-by-cuisine" element={<GroupByCuisine />} />
          <Route path="group-by-difficulty" element={<GroupByDifficulty />} />
          <Route path="chart" element={<BarChart />} />

          <Route path="my-profile" element={<MyProfile />} />

          <Route path="user-profile/:id" element={<UserProfile />} />
          <Route path="recipe-detail/:id" element={<Detail />} />
          <Route path="review/:id" element={<Review />} />
          <Route path="edit/:id" element={<Edit />} />
        </Route>
      </Route>

      {/* This route will be rendered when no other routes match */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
