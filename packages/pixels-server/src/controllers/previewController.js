const {sendErrorResponse} = require("../utils/errorPage");

exports.sendPreviewPage = async (req, res) => {
    const code = req.params.code;
    const api = `http://localhost:3000/api/v1/img/${code}`;

    try {
        const fetchImage = await fetch(api, {
            method: 'GET'
        });

        if (fetchImage.ok) {
            const imageUrl = `http://localhost:3000/storage/${code}.png`; // Dynamische URL

            const html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta property="og:title" content="Pixel Bild: ${code}" />
                    <meta property="og:image" content="${imageUrl}" />
                    <meta property="og:url" content="${imageUrl}" />
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Pixels Websharing</title>
                    <link rel="stylesheet" href="/css/style.css">
                </head>
                <body>
                    <img src="${imageUrl}" alt="Lagerfeuer von Pfadfindern">
            
                    <script src="/js/script.js"></script>
                </body>
                </html>
            `;
            return res.send(html);
        }
        return sendErrorResponse(req, res, fetchImage.statusCode, fetchImage.statusMessage);

    } catch (err) {
        console.log(err)
        return sendErrorResponse(req, res, 500, 'Internal Server Error');
    }
};