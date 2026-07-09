import ClothesSection from "./ClothesSection";
import SideBar from "./SideBar";
import "./Profile.css";

function Profile({ clothingItems, onAddClick, onCardClick }) {
  return (
    <main className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        onAddClick={onAddClick}
        onCardClick={onCardClick}
      />
    </main>
  );
}

export default Profile;
