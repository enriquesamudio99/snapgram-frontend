import { Link } from "react-router-dom";
import { ICommunity } from "../../types";

interface CommunityItemProps {
  community: ICommunity;
}

const CommunityItem = ({ community }: CommunityItemProps) => {
  return (
    <div className="community-item">
      <Link
        to={`/community/${community._id}`}
        className="community-item__info"
      >
        <div className="community-item__container">
          <img
            src={`${community.image?.secure_url ? community.image.secure_url : "/assets/icons/profile-placeholder.svg"}`}
            alt={`${community.name} Image`}
            className="community-item__img"
          />
          <h2 className="community-item__name">{community.name}</h2>
          <p className="community-item__username">@{community.username}</p>
        </div>
      </Link>
    </div>
  )
}

export default CommunityItem