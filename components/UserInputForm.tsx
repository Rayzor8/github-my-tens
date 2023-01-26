import React, { SyntheticEvent, useRef } from "react";
import { AppDispatch, RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProfileUser,
  fetchRepositories,
  emptyInput,
} from "../redux/slices/githubReposSlice";
import { FaSearch } from "react-icons/fa";

const UserInputForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector(({ githubRepos }: RootState) => githubRepos);

  function onSubmit(e: SyntheticEvent) {
    e.preventDefault();

    if (inputRef.current?.value) {
      dispatch(fetchProfileUser(inputRef.current!.value) as any);
      dispatch(fetchRepositories(inputRef.current!.value) as any);
    } else {
      dispatch(emptyInput());
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex">
        <input
          type="search"
          placeholder="Search user"
          className="border-2 border-black pl-4 py-2 rounded-l-md"
          ref={inputRef}
        />
        <button
          type="submit"
          className="px-4 py-1 bg-blue-400 hover:bg-blue-500 active:bg-blue-500 rounded-r-md border-2 border-black"
        >
          <FaSearch />
        </button>
      </div>
      {error && <h1 className="text-xl text-red-500 mt-8">{error.message}</h1>}
    </form>
  );
};

export default UserInputForm;
