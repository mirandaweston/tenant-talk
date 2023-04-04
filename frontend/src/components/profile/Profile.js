import React from "react";
import UpdateProfileForm from "../updateProfileForm/UpdateProfileForm";
import UpdatePasswordForm from "../updatePasswordForm/UpdatePasswordForm";

const Profile = () => {
  return (
    <div className="space-y-10 divide-y divide-gray-900/10">
      <UpdateProfileForm />
      <UpdatePasswordForm />
    </div>
  );
};

export default Profile;
