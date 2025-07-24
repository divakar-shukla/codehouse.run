import React, { useState, useMemo, useEffect } from "react";
import {
  Plus,
  Circle,
  CircleCheckBig,
  Trash2,
  BookmarkPlus,
  Pencil,
  Loader,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";
import useProblemStore from "@/store/useProblemStore";
import { DIFFICULTIES } from "@/utills/constants";
import { useAuthStore } from "@/store/useAuthStore";
import { Link, Navigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import problemService from "@/lib/problemService";
import toast from "react-hot-toast";

const Problem = () => {
  const { authUser } = useAuthStore();
  const problems = useProblemStore((state) => state.problems);
  const getAllProblems = useProblemStore((state) => state.getAllProblems);
  const gettingProblems = useProblemStore((state) => state.getingProblems);
  const [searchFilter, setSearchFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [savingProblem, setSavingProblem] = useState();
  const [deletingProblem, setDeletingProblem] = useState();
  const { deleteProblemQuery } = problemService;

  useEffect(() => {
    (async () => {
      await getAllProblems();
    })();
  }, [getAllProblems]);

  const allTags = useMemo(() => {
    if (!Array.isArray(problems)) return [];
    const tagSet = new Set();
    problems.forEach((p) => p.tags.forEach((t) => tagSet.add(t.toUpperCase())));
    return Array.from(tagSet);
  }, [problems]);

  const filterdProblem = useMemo(() => {
    const ff = (problems || [])
      .filter((problem) =>
        searchFilter == ""
          ? true
          : problem.title.toLowerCase().includes(searchFilter.toLowerCase()),
      )
      .filter((problem) =>
        difficultyFilter == "all"
          ? true
          : problem.difficulty === difficultyFilter,
      )
      .filter((problem) => {
        return tagFilter == "all"
          ? true
          : problem.tags.map((p) => p.toUpperCase()).includes(tagFilter);
      });
    // console.log("njfdff", ff);
    // console.log("prprprp", problems);
    return ff;
  }, [problems, searchFilter, difficultyFilter, tagFilter]);

  const deleteProblem = async (id) => {
    console.log(id);
    try {
      setDeletingProblem(true);
      const response = await deleteProblemQuery(id);
      const res = await getAllProblems();
      setRandom(Math.random());
      console.log(response);
      toast.success(response.message);
      <Navigate to="/problem" />;
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setDeletingProblem(false);
    }
  };

  const saveProblem = async (id) => {};

  if (savingProblem) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  if (deletingProblem) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  if (gettingProblems) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  console.log(problems);
  return (
    <div className="max-w-[1300px] mt-30 m-auto">
      <div className="w-full p-2">
        <div className=" text-[var(--foreground)] text-3xl font-bold text-center">
          Explore Coding Challenges
        </div>
        <div className="flex p-4 w-full justify-between mt-8 items-center py-4 bg-[var(--card)] rounded-sm">
          <h3 className="text-xl text-[var(--foreground)]">All Problems</h3>
          <button className="bg-[var(--foreground)] text-[var(--background)] py-2 px-3 text-sm rounded flex items-center cursor-pointer">
            <Plus className="mr-2 size-4" />
            Create PlayList
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 bg-[var(--card)] py-6 px-4 rounded-sm">
          <div className="flex items-center bg-[var(--primary)] rounded">
            <input
              type="text"
              className="py-2 px-4 rounded hover:outline-0 focus:outline-0 w-full placeholder:text-[var(--background)] text-[var(--background)]"
              placeholder="Search Problem"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </div>
          <div className="flex items-center bg-[var(--primary)] rounded ">
            <select
              name=""
              id=""
              className="w-full focus:outline-0 text-[var(--background)] placeholder:text-[var(--background)] py-2 px-4"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              <option value="all">All Difficulty</option>
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>
                  {d[0].toUpperCase() + d.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center bg-[var(--primary)] rounded ">
            <select
              name=""
              id=""
              className="w-full focus:outline-0 text-[var(--background)] placeholder:text-[var(--primary)] py-2 px-4"
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
            >
              <option value="all">All Tags</option>
              {allTags.map((t) => (
                <option key={t} value={t.toUpperCase()}>
                  {t[0].toUpperCase() + t.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <p className="text-[var(--detail-font-color)] text-sm mt-4">
            Showing {filterdProblem.length} problems
          </p>
        </div>
        <div className="overflow-x-auto mt-6">
          <table className="border w-full p-6 table-auto min-w-[700px]">
            <thead className="bg-[var(--card)] text-[var(--detail-font-color)] text-sm text-left ">
              <tr>
                <th className="px-2 py-3">Solved</th>
                <th className="px-2 py-3">Title</th>
                <th className="px-2 py-3">Tags</th>
                <th className="px-2 py-3">Difficulty</th>
                <th className="px-2 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="bg-[var(--background)] text-sm">
              {filterdProblem.length > 0 ? (
                filterdProblem.map((problem) => {
                  const isSolved = problem.solvedBy.some((user) => {
                    return user.id === authUser.id;
                  });
                  const visibleTags = problem.tags.slice(0, 2);
                  const remainingTags = problem.tags.length - 2;
                  // console.log("issolved", isSolved);
                  return (
                    <tr className="border-b-2" key={problem.id}>
                      <th className="px-2 py-3  text-left">
                        {isSolved == false ? (
                          <Circle className="size-4 text-[var(--detail-font-color)]" />
                        ) : (
                          <CircleCheckBig className="size-4 text-[var(--foreground)]" />
                        )}
                      </th>
                      <th className="px-2 py-3 text-left text-[var(--detail-font-color)]">
                        <Link to={`/problem/${problem.id}`}>
                          {problem.title}
                        </Link>
                      </th>
                      <th className="px-2 py-3 text-left">
                        <Badge className="bg-[var(--primary)] mx-2">
                          {visibleTags[0]}
                        </Badge>
                        <Badge className="bg-[var(--primary)] mx-2">
                          {visibleTags[1]}
                        </Badge>
                        {remainingTags > 0 ? (
                          <Badge className="bg-[var(--primary)] mx-2">
                            +{remainingTags}
                          </Badge>
                        ) : (
                          ""
                        )}
                      </th>
                      <th className="px-2 py-3 text-left text-[var(--detail-font-color)]">
                        {problem.difficulty}
                      </th>
                      <th className="px-2 py-3 text-left text-[var(--detail-font-color)]">
                        <div className="flex items-center gap-4">
                          {problem.userId == authUser.id ? (
                            <>
                              <div className="bg-[var(--secondary)] p-2 rounded cursor-pointer">
                                <Tooltip>
                                  <Link
                                    to={`/admin/edit-problem/${problem.id}`}
                                  >
                                    <TooltipTrigger asChild>
                                      <Pencil size={18} />
                                    </TooltipTrigger>
                                  </Link>

                                  <TooltipContent>
                                    <p>Edit</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <div
                                className="bg-[var(--secondary)] p-2 rounded cursor-pointer"
                                onClick={() => deleteProblem(problem.id)}
                              >
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Trash2 size={18} />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Delete</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            </>
                          ) : (
                            ""
                          )}

                          <div className="bg-[var(--secondary)] p-2 rounded cursor-pointer">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <BookmarkPlus size={18} />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Save</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </div>
                      </th>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    No problems found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Problem;
