const fs = require('fs');
const path = require('path');
const prisma = require('../prisma');

exports.uploadPicture = async (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const picture = await prisma.picture.create({
        data: {
            url: `/storage/${file.filename}`,
            userId: req.user.id,
            title: req.body.title,
            descr: req.body.descr,
            takenAt: req.body.takenAt,
            location: req.body.location ?? null,
            latitude: req.body.latitude
                ? parseFloat(req.body.latitude)
                : null,
            longitude: req.body.longitude
                ? parseFloat(req.body.longitude)
                : null,

            // Camera
            cameraModel: req.body.cameraModel ?? null,
            aperture: req.body.aperture ?? null,
            focalLength: req.body.focalLength ?? null,
            iso: req.body.iso
                ? parseInt(req.body.iso)
                : null,
            shutterSpeed: req.body.shutterSpeed ?? null,
            resolution: req.body.resolution ?? null,
            megapixel: req.body.megapixel ?? null
        }
    });

    res.json(picture);
};

exports.getAllPictures = async (req, res) => {
    const pictures = await prisma.picture.findMany();
    res.json(pictures);
};

exports.getPictureByCode = async (req, res) => {
    const code = req.params.code;
    const filePath = path.join(__dirname, '../../storage', `${code}.png`);

    // Prüfen, ob die Datei existiert
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // Datei existiert nicht
            return res.status(404).json({ error: 'Bild nicht gefunden' });
        }

        // Wenn sie existiert, geben wir Status 200 zurück.
        // Wir senden hier nur JSON, da die Preview-Seite nur den Status prüft.
        return res.status(200).json({ success: true, message: 'Bild gefunden' });
    });
};