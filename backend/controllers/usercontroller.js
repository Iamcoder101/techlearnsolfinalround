const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(201).json({
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

     res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // true in production if using HTTPS
        sameSite: "lax",
        maxAge: 2 * 60 * 60 * 1000, // 2 hours
      })
      .status(200)
      .json({
        user: { id: user._id, name: user.name, email: user.email },
      });

  } catch (err) {
    res.status(500).json({ message: "Signin failed", error: err.message });
  }
};
exports.logoutUser = (req, res) => {
  res.clearCookie('token'); // or whatever your cookie name is
  res.json({ message: 'Logged out successfully.' });
};

