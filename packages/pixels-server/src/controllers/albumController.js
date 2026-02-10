const prisma = require('../prisma');

exports.createAlbum = async (req, res) => {
    const { name } = req.body;
    const album = await prisma.album.create({
        data: {
            name,
            userId: req.user.id
        }
    });

    res.json(album);
};

exports.addPictureToAlbum = async (req, res) => {
    const { albumId } = req.params;
    const { pictureId } = req.body;

    const link = await prisma.albumPicture.create({
        data: {
            albumId: parseInt(albumId),
            pictureId: parseInt(pictureId)
        }
    });

    res.json(link);
};

exports.getAlbumWithPictures = async (req, res) => {
    const { albumId } = req.params;

    const album = await prisma.album.findUnique({
        where: { id: parseInt(albumId) },
        include: {
            pictures: {
                include: { picture: true }
            }
        }
    });

    res.json(album);
};