const User = require("../models/user");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching users" });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userDetails = {
      name: user.name,
      phone: user.phone,
      profession: user.profession,
    };

    res.status(200).json(userDetails);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, phone, profession } = req.body;

    await User.findByIdAndUpdate(userId, { name, phone, profession });

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error updating user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    await User.findByIdAndDelete(userId);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting user" });
  }
};

module.exports = { getUsers, updateUser, deleteUser, getUserDetails };
