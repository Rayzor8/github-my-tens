import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { AppDispatch, RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProfileUser,
  fetchRepositories,
} from "../redux/slices/githubReposSlice";

const UserInputForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector(({ githubRepos }: RootState) => githubRepos);

  function onSubmit(e: SyntheticEvent) {
    e.preventDefault();
    if (inputRef) {
      dispatch(fetchProfileUser(inputRef.current!.value) as any);
      dispatch(fetchRepositories(inputRef.current!.value) as any);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="search"
        placeholder="Search user"
        className="border-2 border-black"
        ref={inputRef}
      />
      <button type="submit" className="px-4 py-1 bg-blue-400">
        Submit
      </button>

      {error && <h1>{error.message}</h1>}
    </form>
  );
};

export default UserInputForm;
