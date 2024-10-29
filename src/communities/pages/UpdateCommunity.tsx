import { useNavigate, useParams } from "react-router-dom";
import { UpdateCommunityForm } from "../components";
import { useGetCommunity } from "../hooks";
import { useAuth } from "../../common/hooks";

const UpdateCommunity = () => {

  const navigate = useNavigate();
  const { communityId } = useParams();
  const { user } = useAuth();

  const { getCommunityQuery } = useGetCommunity(communityId || "");
  
  const community = getCommunityQuery.data?.response?.community;

  if (getCommunityQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (!community || community.createdBy !== user.id) {
    navigate("/");
    return null;
  }

  return (
    <>
      <section className="main-content__wrapper">
        <div className="create-community">
          <div className="create-community__container">
            <h2 className="create-community__title">
              <img
                src="/assets/icons/white-users.svg" 
                alt="Create Community Icon" 
                className="create-community__title-img" 
              />
              Update a Community
            </h2>
            <UpdateCommunityForm 
              community={community}
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default UpdateCommunity;