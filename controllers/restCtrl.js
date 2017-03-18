const app = require('../server');
const db = app.get('db');

module.exports = {
    create: (request, response) => {
        const query = `
            INSERT INTO people
                (first_name, last_name, rank)
                VALUES (
                    '${request.body.first_name}',
                    '${request.body.last_name}',
                    '${request.body.rank}'
                )
                RETURNING *;
        `;
        db.run(query, (dbError, dbResults) => {
            if (dbError) {
                console.log(dbError);
                return response.status(500).send('Internal Server Error');
            }
            return response.status(201).send(dbResults[0]);
        });
    },
    readList: (request, response) => {
        db.run('SELECT * FROM people;', (dbError, dbResults) => {
            if (dbError) {
                console.log(dbError);
                return response.status(500).send('Internal Server Error');
            }
            return response.status(200).send({results: dbResults});
        });
    },
};
