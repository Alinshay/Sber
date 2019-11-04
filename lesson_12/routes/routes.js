const pool = require('../data/config');


const router = app => {
    app.get('/', function (req, res) {
        res.render('index', { title: 'BOOKS', message: 'Welcome to Book`s API'});
    });

    app.get('/books', (request, response) => {
        pool.query('SELECT * FROM favorites', (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    app.get('/books/:id', (request, response) => {
        const id = request.params.id;

        pool.query('SELECT * FROM favorites WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    app.post('/books', (request, response) => {
        pool.query('INSERT INTO favorites SET ?', request.body, (error, result) => {
            if (error) throw error;
            console.log(result);
            response.status(201).send(`Book added with ID: ${result.insertId}`);
        });
    });

    app.put('/books/:id', (request, response) => {
        const id = request.params.id;

        pool.query('UPDATE favorites SET ? WHERE id = ?', [request.body, id], (error, result) => {
            if (error) throw error;
            response.send('Book updated successfully.');
        });
    });

    app.delete('/books/:id', (request, response) => {
        const id = request.params.id;

        pool.query('DELETE FROM favorites WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send('Book deleted.');
        });
    });

    //какие можно сделать выборки?

}

module.exports = router;
