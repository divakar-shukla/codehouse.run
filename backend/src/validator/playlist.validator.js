import { body, param } from "express-validator";

const createPlaylistValidator = () => {
  return [
    body("name").trim().notEmpty().withMessage("Title is required"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required"),
  ];
};

const getDeletePlaylistValidator = () => {
  return [
    param("playlistId")
      .trim()
      .notEmpty()
      .withMessage("Playlist id is required"),
  ];
};

const addProblemToPlaylistValidator = () => {
  return [
    body("problemId").trim().notEmpty().withMessage("problem id is required"),
    param("playlistId")
      .trim()
      .notEmpty()
      .withMessage("Playlist id is required"),
  ];
};

const removeProblemToPlaylistValidator = () => {
  return [
    body("problemIds")
      .notEmpty()
      .withMessage("problem id is required")
      .isArray({ min: 1 })
      .withMessage("Problem Ids array must have atleast 1 problem id"),
    param("playlistId")
      .trim()
      .notEmpty()
      .withMessage("Playlist id is required"),
  ];
};
export {
  createPlaylistValidator,
  getDeletePlaylistValidator,
  addProblemToPlaylistValidator,
  removeProblemToPlaylistValidator,
};
