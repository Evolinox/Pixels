const prisma = require('../prisma');
const { verifyToken } = require('../utils/jwt');

exports.getUserByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // This prevents the password to be send
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = verifyToken(token);

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // This prevents the password to be send
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
};