<h1 align="center">Simple To-Do</h1>
<h2 align="center">Web Development</h2>
<p align="center">Final Project</p>
<p align="center">2021</p><br>


## Authors
- [Carla Pérez Gavilán](https://github.com/CarlaPerezGavilan)
- [Carlos García](https://github.com/cxrlos)

## Usage

1. Install [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/)
2. Clone the project
3. Inside the folder, access the `api` subfolder
4. Run `npm install` 
5. Run `npm start` 
6. Connect to `localhost:3000` 
7. Try out the app!

## Description

Simple To-Do web application that uses a mongoDB collection that is accessed though an express-based API. The operations included are called from the [index.js](https://github.com/cxrlos/todo-lists/blob/main/api/index.js) file and are the following:
- Create a task:

`app.get('/',(req, res) => {
  task.find({}, (err, tasks) => {
      res.render("todo.ejs", { todoTasks: tasks});
  });
});`

- Delete task:

`app.get("/delete/:id", async (request, response) => {`
    `try {`
        `const t = await task.findByIdAndDelete(request.params.id);`
        `if (!t) response.status(404).send("No item found");`
            `response.redirect("/");`
    `} catch (error) {`
        `response.status(500).send(error);`
    `}`
`});`

- Change completion status:

`app.get("/completed/:id", async (request, response) => {`
    `try {`
        `const update = {`
            `status: "Completed"`
        `}`
        `await task.findByIdAndUpdate(request.params.id, update);`
        `response.redirect("/");`
    `} catch (error) {`
        `response.status(500).send(error);`
    `}`
`});`

- Edit task fields:

`app.route("/edit/:id").get((req, res) => {`
    `const id = req.params.id;`
    `task.find({}, (err, tasks) => {`
        `res.render("edit.ejs", {` 
            `todoTasks: tasks, idTask: id`
        `});`
    `});`
`}).post((req, res) => {`
    `const id = req.params.id;`
    `task.findByIdAndUpdate(id, {` 
        `content: req.body.content, description: req.body.description`
    `}, err => {`
        `if (err)` 
        `return res.send(500, err);`
        `res.redirect("/");`
    `});`
`});`



## Dependencies
The libraries used for the development are the following:

- [node](https://nodejs.org/en/) 
- [npm](https://www.npmjs.com/)
  - [express](https://www.npmjs.com/package/express)
  - [nodemon](https://www.npmjs.com/package/nodemon)
  - [dotenv](https://www.npmjs.com/package/dotenv)
  - [mongoose](https://www.npmjs.com/package/mongoose)
