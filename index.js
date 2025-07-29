const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Dummy data
let posts = [
  {
    id: uuidv4(),
    username: "kalyani_jha",
    content: "i love coding!!",
  },
  {
    id: uuidv4(),
    username: "sharadhakhapra",
    content: "hardwork is important to achieve something great!",
  },
  {
    id: uuidv4(),
    username: "apnaCllg",
    content: "I got selected in ISRO!",
  },
];

// Routes
app.get("/", (req, res) => {
    res.redirect("/posts");
});


// Show all posts
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

// Form to create new post
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

// Create new post
app.post("/posts", (req, res) => {
  const { username, content } = req.body;
  const id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

// Show specific post
app.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((post) => post.id === id);
  res.render("show.ejs", { post });
});

// Edit form
app.get("/posts/:id/edit", (req, res) => {
  const { id } = req.params;
  const post = posts.find((post) => post.id === id);
  res.render("edit.ejs", { post });
});

// Update post
app.patch("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const post = posts.find((p) => p.id === id);
  post.content = content;
  res.redirect("/posts");
});

// Delete post
app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  posts = posts.filter((p) => p.id !== id);
  res.redirect("/posts");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
