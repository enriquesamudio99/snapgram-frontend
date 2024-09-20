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
    route: "/all-users",
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
    value: "explore",
    label: "Explore",
    icon: "/assets/icons/wallpaper.svg",
    route: "/"
  },
  {
    icon: "/assets/icons/people.svg",
    route: "/all-users",
    value: "people",
    label: "People",
  },
  // {
  //   value: "notifications",
  //   label: "Notifications",
  //   icon: "/assets/icons/bell.svg",
  //   route: "/"
  // },
  {
    value: "settings",
    label: "Settings",
    icon: "/assets/icons/settings.svg",
    route: "/"
  }
];

const bottomBarLinks = [
  {
    icon: "/assets/icons/home.svg",
    route: "/",
    value: "home",
    label: "Home",
  },
  {
    icon: "/assets/icons/bookmark.svg",
    route: "/",
    value: "saved",
    label: "Saved",
  },
  {
    icon: "/assets/icons/users.svg",
    route: "/",
    value: "communities",
    label: "Communities",
  },
  {
    icon: "/assets/icons/gallery-add.svg",
    route: "/",
    value: "create",
    label: "Create",
  },
  
];

export {
  leftSideBarLinks,
  mbNavbarLinks,
  bottomBarLinks
}