import express from "express";
import mysql from "mysql";

const app = express();
app.use(express.json());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM test.books";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO BOOKS(`title`, `description`, `cover`) VALUES (?)";
  const values = [req.body.title, req.body.description, req.body.cover];

  db.query(q, [values], (err, data) => {
    if (err) res.send(err);
    return res.json(data);
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) res.send(err);
    return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title` = ?, `description` = ?, `cover` = ? WHERE id = ?";
  const values = [req.body.title, req.body.description, req.body.cover];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("connected to backend");
});
