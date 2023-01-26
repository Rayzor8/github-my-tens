import Link from "next/link";
import React, { useState } from "react";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { BsArrowRightShort } from "react-icons/bs";
import { VscRepo } from "react-icons/vsc";
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
      <ul className="grid  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
        {!isLoading ? (
          selectedRepos.map((repo) => (
            <li
              key={repo.id}
              className="p-4 bg-white rounded shadow-lg flex flex-col flex-wrap gap-2 "
            >
              <p className="text-sm">ID: {repo.id}</p>
              <div className="flex-start">
                <VscRepo />
                <p className="font-bold">{repo.name.toUpperCase()}</p>
              </div>
              <Link
                href={repo.html_url}
                target="_blank"
                className="italic text-xs flex-start"
              >
                <p className="underline underline-offset-2">Goto Repo</p>
                <BsArrowRightShort className="text-xl" />
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
