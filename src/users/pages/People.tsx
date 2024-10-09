import { useAuth } from "../../common/hooks";
import { IAuthUser, IUser } from "../../types";
import { UserItem } from "../components";
import { useGetUsers } from "../hooks";

interface PeopleResultsProps {
  currentUser: IAuthUser;
  users: IUser[] | undefined;
  isLoading: boolean;
}

const PeopleResults = ({ currentUser, users, isLoading }: PeopleResultsProps) => {

  if (isLoading) {
    return <p className="people__message">Loading...</p>;
  }
  
  if (!users?.length) {
    return <p className="people__message">There are no users</p>;
  }

  return (
    <div className="people__grid">
      {users.map(user => (
        <UserItem 
          key={user._id}
          currentUser={currentUser}
          user={user}
        />
      ))}
    </div>
  );
}

const People = () => {

  const { user: currentUser } = useAuth();
  const { getUsersQuery } = useGetUsers();

  const users = getUsersQuery.data?.response?.users;

  return (
    <section className="main-content__wrapper">
      <div className="people">
        <div className="people__container">
          <h2 className="people__title">
            <img
              src="/assets/icons/white-people.svg"
              alt="People Icon"
              className="people__title-img"
            />
            People
          </h2>
          <PeopleResults
            currentUser={currentUser}
            users={users}
            isLoading={getUsersQuery.isLoading}
          />
        </div>
      </div>
    </section>
  )
}

export default People;