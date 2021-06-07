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

app.get('/',(req, res) => {
  task.find({}, (err, tasks) => {
      res.render("todo.ejs", { todoTasks: tasks});
  });
   
});


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

app.get("/delete/:id", async (request, response) => {
    try {
        const t = await task.findByIdAndDelete(request.params.id);
         if (!t) response.status(404).send("No item found");
         response.redirect("/");
    } catch (error) {
      response.status(500).send(error);
    }
  });

  app.get("/completed/:id", async (request, response) => {
    try {
        const update =
        {
            status: "Completed"
        }
      await task.findByIdAndUpdate(request.params.id, update);
      response.redirect("/");
    } catch (error) {
      response.status(500).send(error);
    }
  });