import express from "express";
import isLogin from "../middleware/login.middleware";
import { addProblemToPlaylist, createPlaylist, deletePlayList, getAllPlaylistDetails, getPlaylistDetails, removeProblemFromPlaylist } from "../controllers/playlist.controller";

const playListRoute = express.Router();
playListRoute.route("/").get(isLogin, getAllPlaylistDetails)
playListRoute.route("/:playlistId").get(isLogin, getPlaylistDetails)
playListRoute.route("/create-playlist").get(isLogin, createPlaylist)
playListRoute.route("/:playlistId/add-problem").get(isLogin, addProblemToPlaylist)
playListRoute.route("/:playlistId").get(isLogin, deletePlayList)
playListRoute.route("/:playlistId/remove-problem").get(isLogin, removeProblemFromPlaylist)
export default playListRoute;
