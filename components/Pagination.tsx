import Link from "next/link";
import React, { useState } from "react";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const Pagination = () => {
  const [page, setPage] = useState(1);
  const REPO_PER_PAGE = 10;
  const pageHandleClick = (number: number) => {
    setPage(number);
  };

  const { repos, isLoading } = useSelector(
    ({ githubRepos }: RootState) => githubRepos
  );

  // paginationHandler
  const startIndex = (page - 1) * REPO_PER_PAGE;
  const endIndex = page * REPO_PER_PAGE;
  const selectedRepos = repos.slice(startIndex, endIndex);
  const totalPages = Math.ceil(repos.length / REPO_PER_PAGE);
  const createArray = [...Array(totalPages).keys()].map((arr) => arr + 1);

  const buttonStyle = `px-4 py-2 bg-white text-sm md:text-xl border border-black mr-1 mb-1 rounded-sm`;

  return (
    <>
      <ul className="grid grid-cols-6 gap-4 mt-10">
        {!isLoading ? (
          selectedRepos.map((repo) => (
            <li key={repo.id} className="p-2 bg-slate-400">
              <p>{repo.id}</p>
              <p>{repo.name}</p>
              <Link href={repo.html_url} target="_blank">
                Go to repo
              </Link>
            </li>
          ))
        ) : (
          <p className="text-4xl font-bold">Loading...</p>
        )}
      </ul>
      <div className="my-4">
        {totalPages === createArray.length &&
          createArray.map((number, index) => (
            <button
              key={index}
              className={
                page === number
                  ? `${buttonStyle} bg-blue-600 text-white`
                  : buttonStyle
              }
              onClick={() => pageHandleClick(number)}
            >
              {number}
            </button>
          ))}
      </div>
    </>
  );
};

export default Pagination;
