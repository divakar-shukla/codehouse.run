import axiosIntance from "./axios";
const problemService = {
  addProblemQuery: async (value) => {
    const response = await axiosIntance.post("/problem/create-problem", value);
    console.log(response);

    return response.data;
  },
  getProblemsQuery: async () => {
    const response = await axiosIntance.get(`/problem/get-all-problem`);
    console.log(response);
    return response.data;
  },
  getProblemByIdQuery: async (id) => {
    const response = await axiosIntance.post(
      `/problem/get-problem/${id}`,
      value,
    );
    console.log(response);
    return response.data;
  },
  updateProblemQuery: async (id, value) => {
    const response = axiosIntance.put(`/problem/upadate-problem/${id}`, value);
    console.log(response);
    return response.data;
  },
  deleteProblemQuery: async (id, value) => {
    const response = axiosIntance.delete(
      `/problem/delete-problem/${id}`,
      value,
    );
    console.log(response);
    return response.data;
  },
  getSolvedProblemQuery: async () => {
    const response = axiosIntance.get("/problem/get-solved-problemByUser");
    console.log(response);
    return response.data;
  },
};

export default problemService;
