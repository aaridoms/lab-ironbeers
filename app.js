const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index.hbs');
});

app.get('/beers', (req, res, next) => {
  let beersArr = [];
  punkAPI
    .getBeers()

    .then(response => {
      for (let i = 0; i < 25; i++) {
        beersArr.push(response[i]);
      }

      res.render('beers.hbs', {
        beersArr: beersArr
      });
      console.log(response);
      console.log(beersArr);
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/random-beer', (req, res, next) => {

  punkAPI.getRandom()
  .then((response) => {
    console.log(response)
    res.render('random-beer.hbs', {
      randomBeer: response
    });
  })
  .catch((err) => {
    console.log(err)
  })
});

app.get('*', (req, res, next) => {
  res.send('error, pagina no encontrada');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
