const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(session({
    secret: 'testing',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Zet op 'true' als je HTTPS gebruikt
}));
// SQLite database importeren
const db = require('./config/db');

// Routes
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');  // 🔹 Auth routes toevoegen
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);  // 🔹 Auth routes activeren




const requireLogin = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'Je moet ingelogd zijn om deze pagina te bekijken' });
    }
    next();
};


app.use((req, res, next) => {
    res.locals.username = req.session.username || null; // Als niet ingelogd, null
    next();
});

// Hoofdpagina
app.get('/', (req, res) => {
    res.render('index', { title: 'Snackmaster | Home' });
});


// Regristereren
app.get('/register', (req, res) => {
    res.render('register', { title: 'Snackmaster | Registreren' });
});

// Inloggen
app.get('/login', (req, res) => {
    res.render('login', { title: 'Snackmaster | Inloggen' });
});

// Formulierpagina voor het toevoegen van snacks
app.get('/add-snack', (req, res) => {
    db.all('SELECT * FROM catagory', [], (err, categories) => {
        if (err) {
            console.error('Fout bij ophalen categorieën:', err.message);
            return res.status(500).send('Fout bij het laden van de pagina.');
        }
        
        db.all('SELECT * FROM type', [], (err, types) => {
            if (err) {
                console.error('Fout bij ophalen types:', err.message);
                return res.status(500).send('Fout bij het laden van de pagina.');
            }

            res.render('add-snack', { categories, types, title: 'Snackmaster | Snack Toevoegen' });
        });
    });
});

// Snacks ophalen met filteropties
app.get('/snacks', (req, res) => {
    const categoryId = req.query.catagory_id;
    const typeId = req.query.type_id;

    let query = `
        SELECT snack.rowid, snack.name, snack.price, 
               catagory.name AS category_name, 
               type.name AS type_name
        FROM snack
        JOIN catagory ON snack.catagory_id = catagory.rowid
        JOIN type ON snack.type_id = type.rowid
    `;

    const params = [];
    if (categoryId || typeId) {
        query += ' WHERE ';
        if (categoryId) {
            query += 'catagory.rowid = ?';
            params.push(categoryId);
        }
        if (typeId) {
            if (categoryId) query += ' AND ';
            query += 'type.rowid = ?';
            params.push(typeId);
        }
    }

    db.all(query, params, (err, snacks) => {
        if (err) {
            console.error('Fout bij ophalen snacks:', err.message);
            return res.status(500).send('Fout bij het laden van de pagina.');
        }

        db.all('SELECT * FROM catagory', [], (err, categories) => {
            if (err) {
                console.error('Fout bij ophalen categorieën:', err.message);
                return res.status(500).send('Fout bij het laden van de pagina.');
            }

            db.all('SELECT * FROM type', [], (err, types) => {
                if (err) {
                    console.error('Fout bij ophalen types:', err.message);
                    return res.status(500).send('Fout bij het laden van de pagina.');
                }

                res.render('snacks', { snacks, categories, types, selectedCategory: categoryId, selectedType: typeId, title: 'Snackmaster | Snack Bestellen' });
            });
        });
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server draait op http://localhost:${PORT}`));
