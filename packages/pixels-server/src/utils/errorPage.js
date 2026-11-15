exports.sendErrorResponse = (req, res, status, message) => {
    if (req.headers.accept?.includes('text/html')) {
        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Pixels Websharing</title>
                <link rel="stylesheet" href="/css/style.css">
            </head>
            <body>
            <div class="container">
                <h1>${status}</h1>
                <p>${message}</p>
            </div>
            </body>
            </html>
        `;
        return res.status(status).send(html);
    }
    return res.status(status).json({ error: message });
}