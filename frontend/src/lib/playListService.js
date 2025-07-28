import axiosIntance from "./axios";

const playListService = {
  createPlayListQuery: async (payload) => {
    const response = await axiosIntance.post(
      "/playlist/create-playlist",
      payload,
    );

    return response.data;
  },
  getPlayListByIdQuery: async (id) => {
    const response = await axiosIntance.get(`/playlist/${id}`);
    return response.data;
  },
  deletePlayListQuery: async (id) => {
    const response = await axiosIntance.delete(`/playlist/${id}`);
    return response.data;
  },
  getAllPlaylistQuery: async () => {
    const response = await axiosIntance.get("/playlist/");
    return response.data;
  },
  addProblemInPlayListQuery: async (playListId, problemId) => {
    const response = await axiosIntance.post(
      `/playlist/${playListId}/add-problem`,
      { problemId },
    );
    return response.data;
  },
  removeProblemInPlayListQuery: async (id) => {
    const response = await axiosIntance.delete(
      `/playlist/${id}/remove-problem`,
    );
    console.log(response);
    return response.data;
  },
};

export default playListService;
