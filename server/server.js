const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const gameRoutes = require('./routes/games');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/games', gameRoutes);

sequelize.sync().then(() => {
    app.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
