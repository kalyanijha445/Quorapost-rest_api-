const { log } = require("console");
const express = require("express");
const app = express();
// const port = 8080;
const port = process.env.PORT || 8080;

const path = require("path");
const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const methodOverride = require("method-override");

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


let posts = [
    {
        id: uuidv4(),
        username: "kalyani_jha",
        content: "i love coading!!"
    },
    {
        id: uuidv4(),
        username: "sharadhakhapra",
        content: "hardwork is imp to achieve something  gr8!"
    },
    {
        id: uuidv4(),
        username: "apnaCllg",
        content: "I got selected in ISRO!"
    },
]

// see all post
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

// create routes
// 1. to create form
app.get("/posts/new", (req, res) =>{
    res.render("new.ejs");
});
// 2. to add form in index.ejs
app.post("/posts", (req,res) =>{
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content});
    res.redirect("/posts");
});

// specific post view
app.get("/posts/:id", (req, res) =>{
    let { id } = req.params;
    let post = posts.find((post) => id === post.id);
    console.log(post);
    res.render("show.ejs",{ post });
});

// patch rqst
app.patch("/posts/:id", (req, res) => { 
    let { id } = req.params;
    console.log(id);
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;

    console.log(post);
    res.redirect("/posts");
});


// Edit
app.get("/posts/:id/edit", (req, res) =>{
    let { id } = req.params;
    console.log(id);
    let post = posts.find((post)=> id === post.id);
    res.render("edit.ejs", {post});

});

// delete
app.delete("/posts/:id",(req, res) =>{
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
} )


app.listen(port, ()=>{
    console.log("listening on port: 8080");
});