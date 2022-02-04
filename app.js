const express = require("express");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
var path = require("path");
var methodOverride = require("method-override");

const requestHandlers = require("./scripts/request-handlers.js");
const { request } = require("express");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.engine(
  "hbs",
  engine({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: "hbs",
    defaultLayout: "index",
    partialsDir: `${__dirname}/views/partials`,
  })
);

app.use(express.static(path.join(__dirname, "public")));

// Turma
app.get("/", requestHandlers.getTurmas);

app.post("/turmas", requestHandlers.inserirTurma);

app.put("/turmas/:id", requestHandlers.editarTurma);

app.delete("/turmas/:id", requestHandlers.deleteTurma);

app.get("/turmas/:id/alunos", requestHandlers.getTurmaAlunos);

app.delete("/turmas/:id/alunos/:idAluno", requestHandlers.deleteAluno);

app.post("/turmas/:id/alunos", requestHandlers.inserirAluno);

app.put("/turmas/:id/alunos/:idAluno", requestHandlers.editarAluno);

app.listen(3000, () => {
  console.log(`App listening on port 3000`);
});
