import React, { useState } from "react";
import { NavBar } from "../../components/NavBar/NavBar";
import Profile from "../../components/Profile/Profile";
import ReusableModal from "../../components/ReusableModal/ReusableModal"; 

const ProfileMain = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <NavBar />
      <ReusableModal open={isModalOpen} onClose={closeModal} title="Perfil">
        <Profile />
      </ReusableModal>
    </div>
  );
};

export default ProfileMain;
