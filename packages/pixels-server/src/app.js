const express = require('express');
const cors = require('cors');
const path = require('path');

const { sendPreviewPage } = require('./controllers/previewController');
const { sendErrorResponse } = require('./utils/errorPage');

const apiRoutes = require('./routes/apiRoutes');

const app = express();

// serve the html page
app.use(express.static(path.join(__dirname, '../public')));

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use('/storage', express.static(path.join(__dirname, '../storage')));

app.use('/api/v1', apiRoutes)

// serve preview page of images
app.get('/:code', sendPreviewPage);

// serve error page
app.use((req, res) => {
    return sendErrorResponse(req, res, 404,'Page not found');
});

module.exports = app;