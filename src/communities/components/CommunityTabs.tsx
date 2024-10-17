import { useState } from "react";
import { IAuthUser, ICommunity } from "../../types";
import { CommunityPosts, CommunityMembers, CommunityRequests } from "./";

interface CommunityTabsProps {
  community: ICommunity;
  currentUser: IAuthUser;
}

const CommunityTabs = ({ community, currentUser }: CommunityTabsProps) => {
  
  const [activeTab, setActiveTab] = useState<number>(1);

  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return (
          <CommunityPosts 
            community={community}
            currentUser={currentUser}
          />
        );
      case 2:
        return (
          <CommunityMembers 
            community={community}
            currentUser={currentUser}
          />
        );
      case 3:
        return (
          <CommunityRequests 
            community={community}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="community-tabs">
      <div className="community-tabs__container">
        <ul className="community-tabs__list">
          <li className="community-tabs__item">
            <button
              type="button"
              className={`community-tabs__item-btn ${activeTab === 1 ? "community-tabs__item-btn--active" : ""}`}
              onClick={() => setActiveTab(1)}
            >
              Posts
            </button>
          </li>
          <li className="community-tabs__item">
            <button
              type="button"
              className={`community-tabs__item-btn ${activeTab === 2 ? "community-tabs__item-btn--active" : ""}`}
              onClick={() => setActiveTab(2)}
            >
              Members
            </button>
          </li>
          {community.communityType === "Private" && community.createdBy === currentUser.id && (
            <li className="community-tabs__item">
              <button
                type="button"
                className={`community-tabs__item-btn ${activeTab === 3 ? "community-tabs__item-btn--active" : ""}`}
                onClick={() => setActiveTab(3)}
              >
                Requests
              </button>
            </li>
          )}
        </ul>
        <div className="community-tabs__content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}

export default CommunityTabs