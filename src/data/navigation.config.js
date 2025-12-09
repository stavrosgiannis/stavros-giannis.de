// Navigation routes configuration
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  PROJECTS: "/project",
  RESUME: "/resume",
};

// Navigation items with icons and labels
export const NAV_ITEMS = [
  {
    label: "Home",
    path: ROUTES.HOME,
    icon: "AiOutlineHome",
  },
  {
    label: "About",
    path: ROUTES.ABOUT,
    icon: "AiOutlineUser",
  },
  {
    label: "Projects",
    path: ROUTES.PROJECTS,
    icon: "AiOutlineFundProjectionScreen",
  },
  {
    label: "Resume",
    path: ROUTES.RESUME,
    icon: "CgFileDocument",
    protected: true,
  },
];

// Resume access configuration
export const RESUME_CONFIG = {
  accessCode: "WeWantYou",
  accessCodeMessage: "Enter access code to view resume",
  denialMessage: "Access denied. Incorrect code.",
};
