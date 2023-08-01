const express = require('express');
const bodyparser = require('body-parser');
const sequelize = require('./util/database');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});


const port = 3000
//sync database
sequelize
  .sync()
  .then(result => {
    console.log("Database connected");
    app.listen(port);
    console.log(`http://localhost:${port}`);

  })
  .catch(err => console.log(err));

  //test route
app.get('/', (req, res, next) => {
  res.send('potentes api on!');
});

//CRUD routes
app.use('/users', require('./routes/usersRoutes'));
app.use('/grupos', require('./routes/gruposRoutes'));
app.use('/participantes', require('./routes/participantesRoutes'));
app.use('/dinamicas', require('./routes/dinamicasRoutes'));
app.use('/jogos', require('./routes/jogosRoutes'));
app.use('/desafios', require('./routes/desafiosRoutes'));
app.use('/respostas', require('./routes/respostasRoutes'));
app.use('/clientes', require('./routes/clientesRoutes'));

//error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});