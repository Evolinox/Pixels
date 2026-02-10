const prisma = require('../prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { email, password, username, firstname, lastname } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // First check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists." });
        }

        // If no user exists, create the new user
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, username, firstname, lastname }
        });

        res.json(user);
    } catch (err) {
        // If another error occurs, log it
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ token });
};

exports.devResetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ error: "Email and newPassword are required." });
    }

    try {
        // Optional safety: block this in production
        if (process.env.NODE_ENV === "production") {
            return res.status(403).json({ error: "Not allowed in production." });
        }

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { email },
            data: { password: hashedPassword }
        });

        res.json({ message: "Password reset successfully (dev)." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};