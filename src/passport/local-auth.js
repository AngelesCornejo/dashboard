const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user'); //Para usar la funcion comparePassword y encryptPassword definidas en ese archivo

//Almecena usuario en navegador para mantener sesion iniciada
passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser(async (id, done)=>{
    const user = await User.findById(id);
    done(null,user);
});

//Registro del usuario
passport.use('local-signup', new LocalStrategy({
    //qué datos vamos a recibir del cliente
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},async (req, email, password, done)=>{

    const user = await User.findOne({email: email});
    if(user){
        //valida si ya existe un usuario con ese correo 
        return done(null, false, req.flash('signupMessage','El correo ya existe'));
    } else {
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password); //La función encryptPassword se definió en 
        //el modelo del esquema del usuario, es decir en models/user.js 
        await newUser.save(); //Cuando termine de guardarlo, continua con la siguiente linea pq es un proceso
        //asincrono y externo de nodejs, es un proceso de la bd como tal
        done(null, newUser);
    }
}));

//Inicio de sesion del usuario 
passport.use('local-signin', new LocalStrategy({
    //qué datos vamos a recibir del cliente
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done)=>{

    const user = await User.findOne({email:email});
    if(!user){
        //Valida si existe el correo del usuario 
        return done(null, false, req.flash('signinUserMessage', 'Usuario no encontrado'));
    } 
    if(!user.comparePassword(password)){ 
        //La función comparePassword se definió en el esquema del usuario, en models/user.js
        //Valida si la contraseña es correcta
        return done(null, false, req.flash('signinPasswordMessage', 'Contraseña incorrecta'));
    }
    done(null, user);

}));