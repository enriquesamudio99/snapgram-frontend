import { CreatePostForm } from "../components"

const CreatePost = () => {
  return (
    <>
      <section className="main-content__wrapper">
        <div className="create-post">
          <div className="create-post__container">
            <h2 className="create-post__title">
              <img
                src="/assets/icons/add-post.svg" 
                alt="Add Post Icon" 
                className="create-post__title-img" 
              />
              Create a Post
            </h2>
            <CreatePostForm />
          </div>
        </div>
      </section>
    </>
  )
}

export default CreatePost;