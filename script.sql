Create database turmasdb;

use turmasdb;
DROP TABLE IF EXISTS `aluno`;
DROP TABLE IF EXISTS `turma`;

CREATE TABLE `turma` (
  `id`  int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `curso` varchar(255) NOT NULL,
  PRIMARY KEY (id) 
) ENGINE=InnoDB DEFAULT CHARSET=utf16;


CREATE TABLE `aluno` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `numero` int NOT NULL, 
  `idTurma` int NOT NULL,
  PRIMARY KEY (id) ,
  FOREIGN KEY (idTurma) REFERENCES turma(id)  ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

Insert into turma (nome, curso) values ('Turma 1', 'Engenharia Informática');
Insert into turma (nome, curso) values ('Turma 2', 'Medicina');
Insert into turma (nome, curso) values ('Turma 3', 'Advocacia');

Insert into aluno (nome, numero, idTurma) values ('Nicole Fernandes', '201600093', 1);
Insert into aluno (nome, numero, idTurma) values ('Henoch Vitureira', '201600092', 2);


select t.*, count(a.id) from turma t 
left join aluno a on a.idTurma = t.id
group by t.id

DELETE FROM TURMA WHERE id = 1