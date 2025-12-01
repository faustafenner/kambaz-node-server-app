import model from "./model.js";
export default function UsersDao() {
const createUser = (user) => {
  return model.create(user);
}

  const findAllUsers = () => model.find();
  const findUserById = (userId) => model.findById(userId);
  const findUserByUsername = (username) =>  model.findOne({ username: username });
  const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};

  const findUserByCredentials = (username, password) =>  model.findOne({ username, password });
  const updateUser = (userId, user) =>  model.updateOne({ _id: userId }, { $set: user });
  const deleteUser = (userId) => model.findByIdAndDelete( userId );
  const findUsersByRole = (role) => model.find({ role: role }); 
  return { createUser, findAllUsers, findUserById, findUserByUsername, findUsersByPartialName, findUserByCredentials, updateUser, deleteUser, findUsersByRole };
}
