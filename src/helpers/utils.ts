export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${formattedDate} at ${time}`;
}

export const checkIsLiked = (likesList: string[], userId: string) => {
  return likesList.includes(userId);
};

export const checkIsShared = (sharedList: string[], userId: string) => {
  return sharedList.includes(userId);
};

export const checkFollowing = (followersList: string[], userId: string) => {
  return followersList.includes(userId);
};

export const checkIsFollowYou = (followingList: string[], userId: string) => {
  return followingList.includes(userId);
};