const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection (replace if needed)
mongoose.connect("mongodb+srv://sarfarajalam0309_db_user:Password0309@cluster0.bwa1xvb.mongodb.net/iotDB?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected Successfully"))
.catch(err => console.log("Mongo Error:", err));
// ✅ Schema
const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model("User", UserSchema);

// ✅ Signup API
app.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;

        const newUser = new User({ username, password });
        await newUser.save();

        res.json({ message: "User registered successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Signup failed" });
    }
});

// ✅ Login API
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username, password });

        if (user) {
            res.json({ message: "Login Successful" });
        } else {
            res.json({ message: "Invalid credentials" });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Login failed" });
    }
});
// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
