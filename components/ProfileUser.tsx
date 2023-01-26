import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa";
const ProfileUser = () => {
  const { profile } = useSelector(({ githubRepos }: RootState) => githubRepos);
  return (
    <section className="bg-white p-6 shadow-lg rounded mt-4">
      <h1 className="text-xl mb-4 font-bold">User Profile</h1>
      <div className="flex gap-4 justify-center items-center ">
        {profile?.avatar_url && (
          <Image
            src={profile?.avatar_url}
            width={60}
            alt="avatar-user"
            height={60}
            priority
            className="rounded-full"
          />
        )}

        <div className="flex-start gap-4 justify-center items-center">
          <FaRegUser />
          <p>{profile?.login}</p>
          <p>ID : {profile?.id}</p>
        </div>
      </div>
    </section>
  );
};

export default ProfileUser;
