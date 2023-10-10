const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const {logger} = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
//const { logEvents } = require('./middleware/logEvents');
const PORT = process.env.PORT || 5000;

//custom middleware logger
app.use(logger)

//Cross Origin Resource share
const whitelist = ['https://www.yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:5500'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

//built in middleware 
app.use(express.urlencoded({extended: false}));

//built in for json
app.use(express.json());

//serve static files

app.use(express.static(path.join(__dirname, '/public')))

app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, "views", 'index.html'))
});

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, "views", 'new-page.html'))
});

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(path.join(__dirname, "views", 'new-page.html'))
});

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, "views", '404.html'))
// });


//Route Handler

app.get('/hello(.html)?', (req, res, next) => {
    console.log('attempt to load Hello.html')
    next();
}, (req, res) => {
    res.send('Hello, world')
})

//Chaining route handler

const one = (req, res, next) => {
    console.log('one')
    next()
}
const two = (req, res, next) => {
    console.log('two')
    next()
}
const three = (req, res) => {
    console.log('three')
    res.send('finish')
}

app.get('/merge(.html)?', [one, two, three])



app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});



app.use(errorHandler);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));