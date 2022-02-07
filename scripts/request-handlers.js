"use strict";
const mysql = require("mysql");
const options = require("./connection-options.json");

/**
 * Função para retornar a lista de pessoas da BD.
 * @param {*} req
 * @param {*} res
 */

function getTurmas(req, res) {
  var connection = mysql.createConnection(options);

  connection.connect();
  var query =
    "select t.*, count(a.id) as contagemAlunos from turma t left join aluno a on a.idTurma = t.id group by t.id";
  connection.query(query, function (err, rows) {
    if (err) {
      res.json({ message: "error", error: err });
    } else {
      res.render("turmas", { turmas: rows });
    }
  });
}
module.exports.getTurmas = getTurmas;

function inserirTurma(req, res) {
  let connection = mysql.createConnection(options);
  let nome = req.body.input1;
  let curso = req.body.input2;

  let sql = "INSERT INTO turma(nome, curso) VALUES (?,?)";
  connection.connect(function (err) {
    if (err) throw err;
    connection.query(sql, [nome, curso], function (err, rows) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.redirect("/");
      }
    });
  });
}
module.exports.inserirTurma = inserirTurma;

function editarTurma(req, res) {
  let connection = mysql.createConnection(options);
  let nome = req.body.input1;
  let curso = req.body.input2;
  let id = req.params.id;

  let sql = "Update turma set nome = ?, curso = ? where id = ?";
  connection.connect(function (err) {
    if (err) throw err;
    connection.query(sql, [nome, curso, id], function (err, rows) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.redirect("/");
      }
    });
  });
}

module.exports.editarTurma = editarTurma;

function deleteTurma(req, res) {
  let connection = mysql.createConnection(options);
  let sql = "DELETE FROM TURMA WHERE id = ?";
  connection.connect(function (err) {
    if (err) throw err;
    connection.query(sql, [req.params.id], function (err, rows) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.redirect("/");
      }
    });
  });
}
module.exports.deleteTurma = deleteTurma;

function getTurmaAlunos(req, res) {
  let connection = mysql.createConnection(options);
  let sql =
    "SELECT a.*, t.nome as nomeTurma, t.curso, t.id as idTurma FROM TURMA as t INNER JOIN ALUNO as a ON a.idTurma = t.id WHERE t.id = ?";
  connection.connect(function (err) {
    if (err) throw err;
    connection.query(sql, [req.params.id], function (err, rows) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.render("alunos", { alunosTurma: rows });
      }
    });
  });
}
module.exports.getTurmaAlunos = getTurmaAlunos;

function deleteAluno(req, res) {
  let connection = mysql.createConnection(options);
  let sql = "DELETE FROM ALUNO WHERE id = ?";
  connection.connect(function (err) {
    if (err) throw err;
    connection.query(sql, [req.params.idAluno], function (err, rows) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.redirect("/turmas/" + req.params.id + "/alunos");
      }
    });
  });
}
module.exports.deleteAluno = deleteAluno;

function inserirAluno(req, res) {
  let connection = mysql.createConnection(options);
  let nome = req.body.input1;
  let numero = req.body.input2;

  let sql = "INSERT INTO aluno(nome, numero, idTurma) VALUES (?,?,?)";
  connection.connect(function (err) {
    if (err) throw err;
    connection.query(sql, [nome, numero, req.params.id], function (err, rows) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.redirect("/turmas/" + req.params.id + "/alunos");
      }
    });
  });
}
module.exports.inserirAluno = inserirAluno;

function editarAluno(req, res) {
  let connection = mysql.createConnection(options);
  let nome = req.body.input1;
  let numero = req.body.input2;
  let idAluno = req.params.idAluno;
  let sql = "Update aluno set nome = ?, numero = ? where id = ?";
  connection.connect(function (err) {
    if (err) throw err;
    connection.query(sql, [nome, numero, idAluno], function (err, rows) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.redirect("/turmas/" + req.params.id + "/alunos");
      }
    });
  });
}

module.exports.editarAluno = editarAluno;
