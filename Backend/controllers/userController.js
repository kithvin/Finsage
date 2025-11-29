// Temporary data store (replace with database in production)
const users = [];

// Get all users
exports.getUsers = (req, res) => {
  res.json(users);
};

// Get single user
exports.getUser = (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

// Create user
exports.createUser = (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(user);
  res.status(201).json(user);
};

// Update user
exports.updateUser = (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  
  res.json(user);
};

// Delete user
exports.deleteUser = (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).json({ message: 'User not found' });
  
  users.splice(userIndex, 1);
  res.status(204).send();
};