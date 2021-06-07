/* -----------------------------------------------------------------------------
 * @index.js
 *
 * Main code, contains the endpoints and respective connectivity functions
 *
 * Authors: Carla Perez & Carlos Garcia
 ---------------------------------------------------------------------------- */

const express = require("express");
const app = express();

// Pass values from URL
app.use(express.urlencoded({extended: true}));

// Saw the use of dotenv as a "good practice" to store the API key
const dotenv = require("dotenv");
dotenv.config();

// As the problem to solve was easy enough, we used mongoose because it's quite
// simple (compared to the equivalent mongo commands)
const mongoose = require("mongoose");

// Helper to define the details for a task
const task = require("./task");

mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.API_KEY, { useNewUrlParser: true }, () => {
    app.listen(3000, () => console.log("Server Up and running"));
});

app.set("view engine", "ejs");

// Main endpoint, calls the todo (main ejs file)
app.get('/',(req, res) => {
  task.find({}, (err, tasks) => {
      res.render("todo.ejs", { todoTasks: tasks});
  });
});

// Create new task
app.post('/',async (req, res) => {
    const todoTask = new task({content: req.body.content, description: req.body.description});
    try {
        await todoTask.save();
        // Reloads after the request is sent so it can show the updated data
        res.redirect("/");
    } catch (err) {
        res.redirect("/");
    }
});

// Delete task given a mongoDB object id
app.get("/delete/:id", async (request, response) => {
    try {
        const t = await task.findByIdAndDelete(request.params.id);
        if (!t) response.status(404).send("No item found");
            response.redirect("/");
    } catch (error) {
        response.status(500).send(error);
    }
});

// Mark task as complete given its mongoDB object id
app.get("/completed/:id", async (request, response) => {
    try {
        const update = {
            status: "Completed"
        }
        await task.findByIdAndUpdate(request.params.id, update);
        response.redirect("/");
    } catch (error) {
        response.status(500).send(error);
    }
});

// Edit task values given its mongoDB object id
app.route("/edit/:id").get((req, res) => {
    const id = req.params.id;
    task.find({}, (err, tasks) => {
        res.render("edit.ejs", { 
            todoTasks: tasks, idTask: id
        });
    });
}).post((req, res) => {
    const id = req.params.id;
    task.findByIdAndUpdate(id, { 
        content: req.body.content, description: req.body.description
    }, err => {
        if (err) 
        return res.send(500, err);
        res.redirect("/");
    });
});
