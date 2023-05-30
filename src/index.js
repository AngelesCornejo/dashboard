const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

//inicializaciones
const app = express();
app.use(express.static(__dirname+ '/public'));
require('./database');
require('./passport/local-auth')

//settings
app.set('views', path.join(__dirname,'views'));
app.engine('ejs', engine); //motor de plantillas para usar codigo html con funciones extendidas como condicionales, bucles
app.set('view engine', 'ejs'); //especifica que se usara la extension ejs en vistas
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //Para recibir datos del formulario y que solo sera texto, no imagenes u otros archivos pesados
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next)=>{
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.signinUserMessage = req.flash('signinUserMessage');
    app.locals.signinPasswordMessage = req.flash('signinPasswordMessage');
    app.locals.user = req.user; //Esto es para usar la variable user que devuelve passport cuando un 
    //usuario esta identificado o con sesion, y así susar esta variable en las vistas y demás 
    next();
})

//Routes
app.use('/', require('./routes/index'));


//starting the server
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
});