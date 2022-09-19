import express, { response } from "express";
import mysql from 'mysql'
import cors from 'cors'

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sijecanj2021!",
    database: "test"
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json('hello, this is the backend')
})

app.get("/books", (req, resp) => {
    const q = "SELECT * FROM books"
    db.query(q, (err, data) => {
        if(err) return resp.json(err)
        return resp.json(data)
    })
})


app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `description`, `price`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book created succsessfully")
    })
})

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;

    const q = "DELETE FROM books WHERE id = ?"
  

    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book deleted succsessfully")
    })
})


app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`=?,`description`=?,`price`=?,`cover`=? WHERE id = ?"

    const values =[
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    db.query(q, [...values, bookId], (err,data) => {
        if (err) return res.json(err)
        return res.json("Book updated succsessfully")
    })
})

app.listen(8800, () => {
    console.log('Connected to backend')
})