import {
  getProblemsQuery,
  getProblemByIdQuery,
  updateProblemQuery,
  deleteProblemQuery,
  getSolvedProblemQuery,
} from "@/lib/problemService";

import { create } from "zustand";

const useProblemStore = (set) => ({
  problems: [],
  problem: null,
  solvedProblems: [],
  getingProblems: false,
  getingProblem: false,

  getAllProblem: async () => {},
});
