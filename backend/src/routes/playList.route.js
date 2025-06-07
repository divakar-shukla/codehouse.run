import express from "express";
import isLogin from "../middleware/login.middleware.js";
import { addProblemToPlaylist, createPlaylist, deletePlayList, getAllPlaylistDetails, getPlaylistDetails, removeProblemFromPlaylist } from "../controllers/playlist.controller.js";

const playListRoute = express.Router();
playListRoute.route("/").get(isLogin, getAllPlaylistDetails)
playListRoute.route("/:playlistId").get(isLogin, getPlaylistDetails)
playListRoute.route("/create-playlist").post(isLogin, createPlaylist)
playListRoute.route("/:playlistId/add-problem").post(isLogin, addProblemToPlaylist)
playListRoute.route("/:playlistId").delete(isLogin, deletePlayList)
playListRoute.route("/:playListId/remove-problem").delete(isLogin, removeProblemFromPlaylist)
export default playListRoute;
