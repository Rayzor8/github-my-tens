import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Image from "next/image";

const ProfileUser = () => {
  const { profile } = useSelector(({ githubRepos }: RootState) => githubRepos);
  return (
    <div>
      <h1>{profile?.login}</h1>
      <p>{profile?.id}</p>
      {profile?.avatar_url && (
        <Image src={profile?.avatar_url} width={50} alt="avatar-user" height={50} />
      )}
    </div>
  );
};

export default ProfileUser;
