"use strict";

// load modules
const express = require("express");
const morgan = require("morgan");

const router = express.Router();
//const {model} = require("./models")
const { User, Course } = require("./models");

router.use(express.json());

//Handler function for all routes
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

//User Get Route that returns a list of users
router.get(
  "/users",
  authenticateUser,
  asyncHandler(async (req, res) => {
    const user = await req.currentUser;
    res.json(user).status(200);
  })
);

//User Post Route that creates a new user
router.post(
  "/users",
  authenticateUser,
  asyncHandler(async (req, res) => {
    try {
      await User.create(req.body);
      res.status(201).location("/").end();
    } catch (error) {
      console.log("ERROR: ", error.name);

      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

//Courses GET route that will return all courses inluding User associated w that course
router.get(
  "/courses",
  asyncHandler(async (req, res, next) => {
    const courses = await Course.findAll({
      indlude: {
        model: User,
      },
    });
    res.json(course).status(200);
  })
);

//Courses GET route that will return corresponding course w User associated w that course
router.get("/courses/:id", asyncHandler(async (req, res, next) => {
    const course = await Course.findByPk(req.params.id, {
      include: {
        model: User,
      },
    });
    res.json(course).status(200);
  })
);




module.exports = router;
