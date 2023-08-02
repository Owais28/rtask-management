const { User } = require('../models/User');

// Get all admins
const getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' });
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admins' });
  }
};

// Get admin by ID
const getAdminById = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await User.findOne({ _id: id, role: 'admin' });
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admin' });
  }
};

// Update admin by ID
const updateAdminById = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedAdmin = await User.findOneAndUpdate({ _id: id, role: 'admin' }, updates, { new: true });
    if (!updatedAdmin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ error })
  }
}
