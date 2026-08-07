import ClothesSection from "./ClothesSection";
import SideBar from "./SideBar";
import "./Profile.css";

function Profile({
  clothingItems,
  onAddClick,
  onCardClick,
  onCardLike,
  onEditProfile,
  onLogout,
}) {
  return (
    <main className="profile">
      <SideBar onEditProfile={onEditProfile} onLogout={onLogout} />
      <ClothesSection
        clothingItems={clothingItems}
        onAddClick={onAddClick}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
      />
    </main>
  );
}

export default Profile;
