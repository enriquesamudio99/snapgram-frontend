import { useEffect, useState } from "react";
import { useAuth, useDebounce } from "../../common/hooks";
import { IAuthUser, IUser } from "../../types";
import { UserItem } from "../components";
import { useGetUsers, useSearchUsers } from "../hooks";
import { Loader } from "../../common/components";
import { useInView } from "react-intersection-observer";

interface PeopleResultsProps {
  currentUser: IAuthUser;
  users: IUser[] | undefined;
  isLoading?: boolean;
  isFetching?: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

const PeopleResults = ({ currentUser, users, isLoading = false, isFetching = false, hasNextPage, fetchNextPage }: PeopleResultsProps) => {

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (isLoading || isFetching) {
    return <p className="people-results__message">Loading...</p>;
  }

  if (!users?.length) {
    return <p className="people-results__message">There are no users</p>;
  }

  return (
    <div className="people-results">
      <div className="people-results__grid">
        {users.map(user => (
          <UserItem 
            key={user._id}
            currentUser={currentUser}
            user={user}
          />
        ))}
      </div>
      {hasNextPage && (
        <div className="people-results__loader-container">
          <div
            ref={ref}
            className="people-results__loader"
          >
            <Loader />
          </div>
        </div>
      )}
    </div>
  );
}

const People = () => {

  const { user: currentUser } = useAuth();
  const [searchValue, setSearchValue] = useState<string>("");

  const { getUsersQuery } = useGetUsers();

  const debouncedValue = useDebounce(searchValue, 800);
  const { searchUsersQuery } = useSearchUsers(debouncedValue);

  const users = getUsersQuery.data?.pages.flatMap((page) => page?.response?.users as IUser[]);
  const searchUsers = searchUsersQuery.data?.pages.flatMap((page) => page?.response?.users as IUser[]);

  const shouldShowSearchResults = searchValue !== "";

  return (
    <section className="main-content__wrapper">
      <div className="people">
        <div className="people__container">
          <div className="people__search">
            <p className="people__search-title">Search Users</p>
            <input
              type="text"
              className="people__search-input"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search Users"
            />
          </div>
          <div className="people__results">
            <h2 className="people__results-title">
              {searchValue !== "" ? `Search Term: ${searchValue}` : "New People"}
            </h2>
          </div>
          <div className="people__grid">
            {shouldShowSearchResults ? (
              <PeopleResults
                currentUser={currentUser}
                users={searchUsers}
                isFetching={searchUsersQuery.isFetching}
                hasNextPage={searchUsersQuery.hasNextPage}
                fetchNextPage={searchUsersQuery.fetchNextPage}
              />
            ) : (
              <PeopleResults
                currentUser={currentUser}
                users={users}
                isLoading={getUsersQuery.isLoading}
                hasNextPage={getUsersQuery.hasNextPage}
                fetchNextPage={getUsersQuery.fetchNextPage}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default People;