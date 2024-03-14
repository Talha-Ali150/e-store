const dotenv = require("dotenv");
const connectToDb = require("./db/db.config.js");
const app = require("./app.js");
const port = process.env.PORT;

dotenv.config({ path: "./.env" });

connectToDb()
  .then(() => {
    app.listen(port || 8000, () => console.log(`server is running at ${port}`));
  })
  .catch((err) => console.log("MongoDB Connection Failed"));

// app.get("/", (req, res) => {
//   try {
//     res.send("welcome");
//   } catch (e) {
//     res.send(e);
//   }
// });

// app.post("/register", async (req, res) => {
//   const data = req.body;
//   try {
//     const user = new User(data);
//     await user.save();
//     res.status(201).json({ userDetails: user });
//     //     const { username, email, password } = req.body;

//     //     // Check if any required fields are missing
//     //     if (!username || !email || !password) {
//     //       throw new Error("Missing fields");
//     //     }

//     //     // Check if a user with the same email already exists
//     //     const existingUser = await User.findOne({ email });
//     //     if (existingUser) {
//     //       throw new Error("Email already in use");
//     //     }

//     //     // Create a new user object
//     //     const user = new User({ username, email, password });

//     //     // Save the user to the database
//     //     await user.save();

//     //     // Send success response with status code 201 and user details
//     //     res.status(201).json({ userDetails: user });
//     //
//   } catch (error) {
//     // Send error response with status code 400 and error message
//     res.status(400).json({ error: error.message });
//   }
// });

// app.post("/login", async (req, res) => {
//   const data = req.body;

//   try {
//     const user = await User.findOne({ email: data.email });

//     if (!user) {
//       return res.status(404).send({
//         message: "user not found",
//       });
//     }

//     const correctPassword = await user.comparePassword(data.password);

//     if (!correctPassword) {
//       return res.status(401).send({ message: "wrong credentials" });
//     }

//     const token = await user.generateToken();
//     res.status(201).send({ message: " logged in successfully ", token });
//   } catch (e) {
//     res.status(501).send({ message: e.message });
//   }
// });

// // app.listen(port, () => {
// //   console.log("server is running at ", port);
// // });
