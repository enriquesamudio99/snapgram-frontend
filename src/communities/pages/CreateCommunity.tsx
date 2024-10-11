import { CreateCommunityForm } from "../components";

const CreateCommunity = () => {
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
              Create a Community
            </h2>
            <CreateCommunityForm />
          </div>
        </div>
      </section>
    </>
  )
}

export default CreateCommunity;