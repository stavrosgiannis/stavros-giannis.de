import { getClientEnv } from "../utils/env";

export const NAV_ITEMS = [
  {
    label: "Home",
    sectionId: "home",
    icon: "AiOutlineHome",
  },
  {
    label: "About",
    sectionId: "about",
    icon: "AiOutlineUser",
  },
  {
    label: "Projects",
    sectionId: "projects",
    icon: "AiOutlineFundProjectionScreen",
  },
  {
    label: "Resume",
    sectionId: "resume",
    icon: "CgFileDocument",
    protected: true,
  },
];

// Resume access configuration
export const RESUME_CONFIG = {
  accessCode: getClientEnv("RESUME_CODE", "WeWantYou"),
  accessCodeMessage: "Enter access code to view resume",
  denialMessage: "Access denied. Incorrect code.",
};
