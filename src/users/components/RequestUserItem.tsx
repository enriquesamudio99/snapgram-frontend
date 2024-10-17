import { useAcceptMemberMutation, useDenyMemberMutation } from "../../communities/hooks";
import { IUser } from "../../types";
import { Link } from "react-router-dom";

interface UserItemProps {
  communityId: string;
  user: IUser;
}

const RequestUserItem = ({ communityId, user }: UserItemProps) => {

  // Mutations
  const acceptMemberMutation = useAcceptMemberMutation();
  const denyMemberMutation = useDenyMemberMutation();


  const handleAcceptMember = async (e: React.MouseEvent) => {
    e.preventDefault();

    await acceptMemberMutation.mutateAsync({ communityId, userId: user._id });
  }

  const handleDenyMember = async (e: React.MouseEvent) => {
    e.preventDefault();

    await denyMemberMutation.mutateAsync({ communityId, userId: user._id });
  }

  return (
    <div className="request-user-item">
      <div className="request-user-item__container">
        <Link
          to={`/profile/${user._id}`}
          className="request-user-item__info"
        >
          <img
            src="/assets/icons/profile-placeholder.svg"
            alt={`${user.name} Profile`}
            className="request-user-item__img"
          />
          <h2 className="request-user-item__name">{user.name}</h2>
          <p className="request-user-item__username">@{user.username}</p>
        </Link>
        <div className="request-user-item__btns">
          <button
            type="button"
            className="request-user-item__btn"
            onClick={handleAcceptMember}
          >
            Accept
          </button>
          <button
            type="button"
            className="request-user-item__btn request-user-item__btn--warning"
            onClick={handleDenyMember}
          >
            Deny
          </button>
        </div>
      </div>
    </div>
  )
}

export default RequestUserItem