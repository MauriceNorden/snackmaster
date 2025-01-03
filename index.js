const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const db = require('./config/db');


// Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Hoofdpagina
app.get('/', (req, res) => {
    res.render('index', { title: 'Snackmaster | Home' });
});
// Formulierpagina voor het toevoegen van snacks
app.get('/add-snack', async (req, res) => {
    try {
        const [categories] = await db.query('SELECT * FROM catagory');
        const [types] = await db.query('SELECT * FROM type');
        res.render('add-snack', { categories, types, title: 'Snackmaster | Snack Toevoegen' });
    } catch (error) {
        console.error('Fout:', error.message);
        res.status(500).send('Fout bij het laden van de pagina');
    }
});




app.get('/snacks', async (req, res) => {
    const categoryId = req.query.catagory_id; // ID van de geselecteerde categorie (optioneel)
    const typeId = req.query.type_id; // ID van het geselecteerde type (optioneel)

    try {
        // Query met filters voor categorie en type
        let query = `
            SELECT snack.id, snack.name, snack.price, 
                   catagory.name AS category_name, 
                   type.name AS type_name
            FROM snack
            JOIN catagory ON snack.catagory_id = catagory.id
            JOIN type ON snack.type_id = type.id
        `;

        const params = [];
        if (categoryId || typeId) {
            query += ' WHERE ';
            if (categoryId) {
                query += 'catagory.id = ?';
                params.push(categoryId);
            }
            if (typeId) {
                if (categoryId) query += ' AND ';
                query += 'type.id = ?';
                params.push(typeId);
            }
        }

        const [snacks] = await db.query(query, params);

        // Haal alle categorieën en types op voor de dropdowns
        const [categories] = await db.query('SELECT * FROM catagory');
        const [types] = await db.query('SELECT * FROM type');

        res.render('snacks', { snacks, categories, types, selectedCategory: categoryId, selectedType: typeId, title: 'Snackmaster | Snack Bestellen' });
    } catch (error) {
        console.error('Fout bij ophalen snacks:', error.message);
        res.status(500).send('Er ging iets mis bij het laden van de pagina.');
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server draait op http://localhost:${PORT}`));