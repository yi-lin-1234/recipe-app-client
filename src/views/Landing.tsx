import { useEffect, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { removeUser } from "../features/auth/authSlice";
import { logout } from "../../src/apiService";
import { restoreSession } from "../apiService";
import { setUser } from "../features/auth/authSlice";
import { RootState } from "../type";

function Landing() {
  const currentUser = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await restoreSession();
        const currentUser = response.data.user;
        dispatch(setUser(currentUser));
      } catch (error) {
        console.error(error);
        dispatch(setUser(null));
      }
    };

    verifyToken();
  }, [dispatch]);

  const onLogout = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await logout();
      dispatch(removeUser());
      localStorage.removeItem("messages");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <img
              className="h-28 w-auto"
              src="https://res.cloudinary.com/yilin1234/image/upload/v1686352927/logo_1_1_vybcob.png"
              alt="logo"
            />
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              recipes app
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              cooking made easy - inspiration just a tap away.
            </p>
            {currentUser === null ? (
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="/login"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="/dashboard/all-recipes"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  dashboard
                </Link>
                <div
                  onClick={onLogout}
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
