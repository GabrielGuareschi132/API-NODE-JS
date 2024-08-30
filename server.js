// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3300;

const usersFilePath = path.join(__dirname, 'data', 'users.json');
const docsFilePath = path.join(__dirname, 'data', 'docs.json');

const readJSONFile = (filePath) => {
    try {
        return fs.readFileSync(filePath, 'utf-8');
    } catch (err) {
        console.error(`Erro ao ler o arquivo ${filePath}: ${err.message}`);
        return null;
    }
};

const usersData = readJSONFile(usersFilePath);
const docsData = readJSONFile(docsFilePath);

app.get('/api/users', (req, res) => {
    if (usersData) {
        res.status(200).json(JSON.parse(usersData));
    } else {
        res.status(500).send('Erro ao carregar dados dos usuários.');
    }
});

app.get('/api/docs', (req, res) => {
    if (docsData) {
        res.status(200).json(JSON.parse(docsData));
    } else {
        res.status(500).send('Erro ao carregar dados dos documentos.');
    }
});

app.use((req, res) => {
    res.status(404).send('404 Página não encontrada');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
