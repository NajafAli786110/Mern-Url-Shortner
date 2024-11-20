import Users from "../model/User.js";
import { v4 as uuidv4 } from "uuid";
import { setUser } from "../services/auth.js";

async function signInUsers(req, res) {
  const { name, email, password } = req.body;

  // Validate request body
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Fill Up All Details Correctly",
    });
  }

  try {
    // Create a new user
    const handleCreateUser = await Users.create({
      name: name,
      email: email,
      password: password,
    });
    return res.render("login");
  } catch (error) {
    // Handle errors
    return res.status(400).json({ message: error.message });
  }
}

async function loginInUser(req, res) {
  const { email, password } = req.body;
  const LoggedInUser = await Users.findOne({ email, password });
  if (LoggedInUser) {
    const sessionID = uuidv4();
    setUser(sessionID, LoggedInUser);
    res.cookie("uid", sessionID, { httpOnly: true });
    res.redirect("/");
  } else {
    res.render("login", { welcomeMsg: `This user is not in our records` });
  }
}

export { signInUsers, loginInUser };
