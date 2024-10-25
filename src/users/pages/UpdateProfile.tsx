import { useNavigate, useParams } from "react-router-dom";
import { UpdateProfileForm } from "../components";
import { useGetUser } from "../hooks";
import { useAuth } from "../../common/hooks";

const UpdatePost = () => {

  const navigate = useNavigate();
  const { userId } = useParams();
  const { user:currentUser } = useAuth();

  const { getUserQuery } = useGetUser(userId || "");
  const user = getUserQuery.data?.response?.user;

  if (getUserQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (!user || user._id !== currentUser.id) {
    navigate("/");
    return null;
  }

  return (
    <>
      <section className="main-content__wrapper">
        <div className="update-profile">
          <div className="update-profile__container">
            <h2 className="update-profile__title">
              <img
                src="/assets/icons/white-edit.svg" 
                alt="Add Post Icon" 
                className="update-profile__title-img" 
              />
              Update Profile
            </h2>
            <UpdateProfileForm
              user={user}
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default UpdatePost;