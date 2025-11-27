const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Connect DB
mongoose
  .connect("mongodb+srv://Abhishek:Abhi123@crud.exxxngk.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

// Create model
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    age: Number,
  })
);

// Create User
app.post("/users", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// Read All Users
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Update User by ID
app.put("/users/:id", async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedUser);
});

// Delete User by ID
app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Server Running"));
