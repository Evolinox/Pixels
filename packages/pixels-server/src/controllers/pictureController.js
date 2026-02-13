const prisma = require('../prisma');

exports.uploadPicture = async (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const picture = await prisma.picture.create({
        data: {
            url: `/storage/${file.filename}`,
            userId: req.user.id,
            title: req.body.title,
            descr: req.body.descr
        }
    });

    res.json(picture);
};

exports.getAllPictures = async (req, res) => {
    const pictures = await prisma.picture.findMany();
    res.json(pictures);
};

exports.getLatestPictures = async (req, res) => {
    const { count, userId } = req.query;
    const n = parseInt(count) || 10;

    try {
        const where = {};
        if (userId !== undefined) {
            where.userId = parseInt(userId, 10);
        }
        const pictures = await prisma.picture.findMany({
            where,
            orderBy: { id: 'desc' },
            take: n,
            include: {
                user: {
                    select: { id: true, username: true, avatar: true }
                }
            }
        });

        res.json(pictures);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch latest pictures' });
    }
};

exports.createComment = async (req, res) => {
    const { userId, pictureId, content } = req.body;
    const newComment = await prisma.comment.create({
        data: {
            content: content,
            userId: userId,
            pictureId: pictureId,
        }
    });
    res.json(newComment);
}