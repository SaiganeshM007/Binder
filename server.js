const express = require("express");
const mongoose = require("mongoose");
const Registeruser = require("./model");
const Book = require("./bookmodel");
const middleware = require("./middleware");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

mongoose
  .connect(
    "mongodb+srv://ganeshmarrey:ganeshmarrey@cluster0.xp2dbka.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => console.log("Mongo Db established"));

app.use(express.json());
app.use(cors({ origin: "*" }));

app.post("/register", async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      confirmedpassword,
      age,
      gender,
      location,
      contact,
    } = req.body;
    let exist = await Registeruser.findOne({ email });
    if (exist) {
      return res.status(400).send("User Already Exist");
    }
    if (password !== confirmedpassword) {
      return res.status(400).send("Passwords are not matching");
    }

    let newUser = new Registeruser({
      username,
      email,
      password,
      confirmedpassword,
      age,
      gender,
      location,
      contact,
    });
    await newUser.save();
    res.status(200).send("Registered Successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let exist = await Registeruser.findOne({ email });
    if (!exist) {
      return res.status(400).send("User Doesn't Exist");
    }
    if (exist.password !== password) {
      return res.status(400).send("Invalid Credentials");
    }
    let payload = {
      user: {
        id: exist.id,
      },
    };
    jwt.sign(payload, "marrey", { expiresIn: 3600000 }, (err, token) => {
      if (err) throw err;
      return res.json({ token });
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/books", middleware, async (req, res) => {
  try {
    let books = await Book.find({ user: req.user.id });
    res.json(books);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});
app.delete("/deletebook/:id", middleware, async (req, res) => {
  try {
    const bookId = req.params.id;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).send("Book not found");
    }

    if (String(book.user) !== req.user.id) {
      return res.status(403).send("Unauthorized");
    }

    let user = await Registeruser.findById(req.user.id);
    user.books = user.books.filter((book) => String(book) !== bookId);
    await user.save();

    await Book.findByIdAndDelete(bookId);
    res.status(200).send("Book deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

app.get("/books/search", async (req, res) => {
  try {
    const { name } = req.query;
    const books = await Book.find({ name: { $regex: name, $options: "i" } })
      .populate("user", "username age gender location contact")
      .exec();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.get("/myprofile", middleware, async (req, res) => {
  try {
    let exist = await Registeruser.findById(req.user.id).populate("books");
    if (!exist) {
      return res.status(400).send("User not found");
    }
    res.json(exist);
  } catch (err) {
    console.log(err);
  }
});

app.post("/addbook", middleware, async (req, res) => {
  try {
    const { name, author, genre } = req.body;
    let newBook = new Book({
      name,
      author,
      genre,
      user: req.user.id,
    });
    await newBook.save();

    let user = await Registeruser.findById(req.user.id);
    user.books.push(newBook);
    await user.save();

    res.status(200).send("Book Added Successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
