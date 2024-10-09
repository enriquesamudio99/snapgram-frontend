const leftSideBarLinks = [
  {
    icon: "/assets/icons/home.svg",
    route: "/",
    value: "home",
    label: "Home",
  },
  {
    icon: "/assets/icons/wallpaper.svg",
    route: "/explore",
    value: "explore",
    label: "Explore",
  },
  {
    icon: "/assets/icons/people.svg",
    route: "/people",
    value: "people",
    label: "People",
  },
  {
    icon: "/assets/icons/bookmark.svg",
    route: "/saved",
    value: "saved",
    label: "Saved",
  },
  {
    icon: "/assets/icons/users.svg",
    route: "/communities",
    value: "communities",
    label: "Communities",
  },
  {
    icon: "/assets/icons/gallery-add.svg",
    route: "/create-post",
    value: "create-post",
    label: "Create Post",
  },
];

const mbNavbarLinks = [
  {
    icon: "/assets/icons/wallpaper.svg",
    value: "explore",
    label: "Explore",
    route: "/explore"
  },
  {
    icon: "/assets/icons/people.svg",
    value: "people",
    label: "People",
    route: "/people",
  },
  {
    icon: "/assets/icons/settings.svg",
    value: "settings",
    label: "Settings",
    route: "/settings"
  }
];

const bottomBarLinks = [
  {
    icon: "/assets/icons/home.svg",
    value: "home",
    label: "Home",
    route: "/",
  },
  {
    icon: "/assets/icons/bookmark.svg",
    value: "saved",
    label: "Saved",
    route: "/saved",
  },
  {
    icon: "/assets/icons/users.svg",
    value: "communities",
    label: "Communities",
    route: "/communities",
  },
  {
    icon: "/assets/icons/gallery-add.svg",
    value: "create",
    label: "Create",
    route: "/create-post",
  },
  
];

export {
  leftSideBarLinks,
  mbNavbarLinks,
  bottomBarLinks
}