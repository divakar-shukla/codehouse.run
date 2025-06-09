import asyncHandler from "../utills/async-handler.js";
import db from "../lib/db.js";
import ApiError from "../utills/api-error.js";
import ApiResponse from "../utills/api-response.js";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user.id;

  try {
    const newPlaylist = await db.playList.create({
      data: {
        name,
        description,
        userId,
      },
    });
    return res
      .status(201)
      .json(new ApiResponse(201, newPlaylist, "Playlist created successfully"));
  } catch (error) {
    throw new ApiError(500, "Error while creating playlist", error);
  }
});
const getAllPlaylistDetails = asyncHandler(async (req, res) => {
  const playLists = await db.playList.findMany({
    where: {
      userId: req.user.id,
    },
    include: {
      problem: {
        include: {
          problem: true,
        },
      },
    },
  });

  if (!playLists.length) {
    throw new ApiError(404, "Playlists not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playLists, "Playlists fetched successfully"));
});
const getPlaylistDetails = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;

  const playList = await db.playList.findUnique({
    where: { id: playlistId, userId: req.user.id },
    include: {
      problem: {
        include: {
          problem: true,
        },
      },
    },
  });
  if (!playList) {
    throw new ApiError(404, "Playlist not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, playList, "PlayList fetched successfully"));
});
const addProblemToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body;
  try {
    const problemsInPlaylist = await db.problemInPlaylist.createMany({
      data: problemIds.map((problemId) => ({
        playListId: playlistId,
        problemId,
      })),
    });

    return res
      .status(201)
      .json(
        new ApiResponse(201, problemsInPlaylist, "Problems added in playlist"),
      );
  } catch (error) {
    throw new ApiError(500, "Error while adding problem in playlist", error);
  }
});
const deletePlayList = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  try {
    const deletedPlaylist = await db.playList.delete({
      where: {
        id: playlistId,
      },
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, deletedPlaylist, "Playlist deleted successfully"),
      );
  } catch (error) {
    if (error.code === "P2025") {
      throw new ApiError(404, "Playlist not found", error);
    } else {
      throw new ApiError(500, "Error while deleting playlist", error);
    }
  }
});
const removeProblemFromPlaylist = asyncHandler(async (req, res) => {
  const { playListId } = req.params;
  const { problemIds } = req.body;

  const deletedProblem = await db.problemInPlaylist.deleteMany({
    where: {
      playListId,
      problemId: {
        in: problemIds,
      },
    },
  });

  if (deletedProblem.count <= 0) {
    throw new ApiError(404, "Problem not found in the playlist");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        deletedProblem,
        "Problem removed from playlist successfully",
      ),
    );
});

export {
  createPlaylist,
  getAllPlaylistDetails,
  getPlaylistDetails,
  addProblemToPlaylist,
  deletePlayList,
  removeProblemFromPlaylist,
};
