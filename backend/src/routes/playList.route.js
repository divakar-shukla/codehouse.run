import express from "express";
import isLogin from "../middleware/login.middleware.js";import {
  addProblemToPlaylist,
  createPlaylist,
  deletePlayList,
  getAllPlaylistDetails,
  getPlaylistDetails,
  removeProblemFromPlaylist,
} from "../controllers/playlist.controller.js";
// import {
//   addRemoveProblemToPlaylistValidator,
//   createPlaylistValidator,
//   getDeletePlaylistValidator,
// } from ".../validator/playlist.Validator.js";
import validate from "../middleware/validator-middleware.js";
import { addProblemToPlaylistValidator, removeProblemToPlaylistValidator, createPlaylistValidator, getDeletePlaylistValidator } from "../validator/playlist.validator.js";

const playListRoute = express.Router();
playListRoute.route("/").get(isLogin, getAllPlaylistDetails);
playListRoute
  .route("/:playlistId")
  .get(getDeletePlaylistValidator(), validate, isLogin, getPlaylistDetails);
playListRoute
  .route("/create-playlist")
  .post(createPlaylistValidator(), validate, isLogin, createPlaylist);
playListRoute
  .route("/:playlistId")
  .delete(getDeletePlaylistValidator(), validate, isLogin, deletePlayList);
playListRoute
  .route("/:playlistId/add-problem")
  .post(
    addProblemToPlaylistValidator(),
    validate,
    isLogin,
    addProblemToPlaylist,
  );
playListRoute
  .route("/:playlistId/remove-problem")
  .delete(
    removeProblemToPlaylistValidator(),
    validate,
    isLogin,
    removeProblemFromPlaylist,
  );

export default playListRoute;
