const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json()); // Middleware

const users = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/users.json`));
const employees = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/employees.json`)
);

const getAllUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
};

const getUser = (req, res) => {
  const user = users.find((el) => el.id === req.params.id);

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",

    data: {
      user,
    },
  });
};

const createUser = (req, res) => {
  res.status(200).json({
    status: "success",

    data: null,
  });
};

const updateUser = (req, res) => {
  const user = users.find((el) => el.id === req.params.id);

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      user: "<Updated user>",
    },
  });
};

const deleteUser = (req, res) => {
  const user = users.find((el) => el.id === req.params.id);

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};

// app.get("/users", getAllUsers);

// app.get("/users/:id", getUser);

// app.post("/users", createUser);

// app.patch("/users/:id", updateUser);

// app.delete("/users/:id", deleteUser);

app.route("/users").get(getAllUsers).post(createUser);
app.route("/users/:id").get(getUser).patch(updateUser).delete(deleteUser);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
