const { v4: uuid } = require("uuid");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Maya Koma",
    email: "mayakoma@gmail.com",
    password: "test",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs", 422);
  }

  const { name, email, password } = req.body;
  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    throw new HttpError("could not create user, email already  exist", 422);
  }
  const createdUser = {
    id: uuid(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(200).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("Could not identify user...", 401);
  }
  res.status(200).json({ message: "login" });
};

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;
