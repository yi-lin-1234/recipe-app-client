import { Fragment, useState, FormEvent } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { removeUser } from "../features/auth/authSlice";
import { logout } from "../../src/apiService";
import { RootState } from "../type";

import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  XMarkIcon,
  PlusCircleIcon,
  TagIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("Mentors");

  const currentUser = useSelector((state: RootState) => state.user.value);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigation = [
    {
      name: "all recipes",
      href: "all-recipes",
      icon: HomeIcon,
      current: currentTab === "all recipes",
    },
    {
      name: "new recipe",
      href: "create",
      icon: PlusCircleIcon,
      current: currentTab === "new recipe",
    },
    {
      name: "my recipe",
      href: "my-recipes",
      icon: FolderIcon,
      current: currentTab === "my recipe",
    },
    {
      name: "liked recipe",
      href: "liked-recipes",
      icon: HeartIcon,
      current: currentTab === "liked recipe",
    },
    {
      name: "search",
      href: "search",
      icon: MagnifyingGlassIcon,
      current: currentTab === "search",
    },
    {
      name: "message",
      href: "message-penal",
      icon: ChatBubbleLeftIcon,
      current: currentTab === "message",
    },
    {
      name: "ai chat",
      href: "ChatBot",
      icon: FaceSmileIcon,
      current: currentTab === "ai chat",
    },

    {
      name: "group by cuisine",
      href: "group-by-cuisine",
      icon: TagIcon,
      current: currentTab === "group by cuisine",
    },
    {
      name: "group by difficulty",
      href: "group-by-difficulty",
      icon: TagIcon,
      current: currentTab === "group by difficulty",
    },
    {
      name: "chart",
      href: "chart",
      icon: ChartBarIcon,
      current: currentTab === "chart",
    },
  ];

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
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center">
                    <Link to="/">
                      <img
                        className="h-16 w-auto"
                        src="https://res.cloudinary.com/yilin1234/image/upload/v1686352927/logo_1_1_vybcob.png"
                        alt="logo"
                      />
                    </Link>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li
                              key={item.name}
                              onClick={() => setCurrentTab(item.name)}
                            >
                              <Link
                                to={item.href}
                                className={classNames(
                                  item.current
                                    ? "bg-gray-50 text-indigo-600"
                                    : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                                  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                )}
                              >
                                <item.icon
                                  className={classNames(
                                    item.current
                                      ? "text-indigo-600"
                                      : "text-gray-400 group-hover:text-indigo-600",
                                    "h-6 w-6 shrink-0"
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <Link to="/">
              <img
                className="h-16 w-auto"
                src="https://res.cloudinary.com/yilin1234/image/upload/v1686352927/logo_1_1_vybcob.png"
                alt="logo"
              />
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li
                      key={item.name}
                      onClick={() => setCurrentTab(item.name)}
                    >
                      <Link
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-50 text-indigo-600"
                            : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-indigo-600"
                              : "text-gray-400 group-hover:text-indigo-600",
                            "h-6 w-6 shrink-0"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="relative flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Separator */}
              <div
                className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                aria-hidden="true"
              />

              {/* Profile dropdown */}
              <Menu as="div" className="relative">
                <Menu.Button className="-m-1.5 flex items-center p-1.5">
                  <img
                    className="h-10 w-10 rounded-full bg-gray-50 object-cover"
                    src={currentUser.profilePictureUrl}
                    alt="User Profile"
                  />
                  <span className="hidden lg:flex lg:items-center">
                    <span
                      className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                      aria-hidden="true"
                    >
                      {currentUser ? currentUser.username : "loading"}
                    </span>
                    <ChevronDownIcon
                      className="ml-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    {/* Your Profile Item */}
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="my-profile" // Replace with your desired link
                          className={classNames(
                            active ? "bg-gray-50" : "",
                            "block px-3 py-1 text-sm leading-6 text-gray-900"
                          )}
                        >
                          your profile
                        </Link>
                      )}
                    </Menu.Item>
                    {/* Sign Out Item */}
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          onClick={onLogout}
                          className={classNames(
                            active ? "bg-gray-50" : "",
                            "block px-3 py-1 text-sm leading-6 text-gray-900"
                          )}
                        >
                          sign out
                        </div>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <main>
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
