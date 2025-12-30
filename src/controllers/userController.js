const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userZodSchema = require("../validations/userZod");
const userJoiSchema = require("../validations/userJoi");

exports.signup = async (req, res) => {
  try {
    userZodSchema.parse(req.body);
    await userJoiSchema.validateAsync(req.body);

    const existing = await db.find({
      selector: { email: req.body.email },
    });

    if (existing.docs.length > 0) {
      return res.status(400).json({ message: "Data already inserted" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await db.insert({
      ...req.body,
      password: hashedPassword,
      type: "user",
    });

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const result = await db.find({
    selector: { email },
  });

  if (result.docs.length === 0)
    return res.status(400).json({ message: "User not found" });

  const user = result.docs[0];

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ message: "Login successful", token });
};

exports.getUser = async (req, res) => {
  const user = await db.get(req.user.id);
  res.json(user);
};

exports.updateUser = async (req, res) => {
  const user = await db.get(req.user.id);

  const updatedUser = {
    ...user,
    ...req.body,
  };

  await db.insert(updatedUser);
  res.json({ message: "User updated successfully" });
};

exports.logout = async (req, res) => {
  res.json({ message: "Logout successful (Client-side token removal)" });
};
