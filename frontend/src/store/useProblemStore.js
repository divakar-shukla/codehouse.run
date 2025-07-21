import problemService from "@/lib/problemService";
import { create } from "zustand";
import toast from "react-hot-toast";
const {
  getProblemsQuery,
  getProblemByIdQuery,
  updateProblemQuery,
  deleteProblemQuery,
  getSolvedProblemQuery,
} = problemService;

const useProblemStore = create((set) => ({
  problems: [],
  problem: null,
  solvedProblems: [],
  getingProblems: false,
  getingProblem: false,

  getAllProblems: async () => {
    try {
      set({ getingProblems: true });
      const response = await getProblemsQuery();
      set({ problems: response.data });
      return response.data;
    } catch (error) {
      set({ problems: [] });
      toast.error(error.response.data.message);
    } finally {
      set({ getingProblems: false });
    }
  },
}));
export default useProblemStore;
