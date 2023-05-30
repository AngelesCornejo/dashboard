const express = require('express');
const mongoose = require('mongoose');
const iotSchema = require('../models/iot');
const router = express.Router();

const passport = require('passport');


router.get('/',(req,res)=>{
    res.render('signin');
});

router.get('/signup',(req,res)=>{
    res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/inicio',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

router.get('/signin',(req,res)=>{
    res.render('signin');
});

router.post('/signin',passport.authenticate('local-signin',{
    successRedirect: '/inicio',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

router.get('/inicio',  isAuthenticated, (req, res)=>{
    res.render('inicio');
});

router.get('/histograma',  isAuthenticated, (req, res)=>{
    res.render('histograma');
});

router.get('/info',  isAuthenticated, (req, res)=>{
    res.render('informacion');
});

router.get('/registros',  isAuthenticated, (req, res)=>{
    res.render('registros');
});

router.get("/logout", (req, res) => {
    req.logout(req.user, err => {
      if(err) return next(err);
      res.redirect("/");
    });
  });
  

/*Para usar fetch y obtener los datos de los nodos sensores*/
router.get('/datosnodos',isAuthenticated,async(req,res)=>{
     await iotSchema.find().then((data)=>res.json(data)).catch((error)=>res.json({message: error}));     
});

router.get('/nodo1',isAuthenticated,async(req,res)=>{
    await findByNode('63e01ef64045da1b53a0f55e').then((data)=>res.json(data)).catch((error)=>res.json({message: error}));
});

router.get('/nodo2',isAuthenticated,async(req,res)=>{
    await findByNode('63e01f344045da1b53a0f55f').then((data)=>res.json(data)).catch((error)=>res.json({message: error}));
});

router.get('/nodo3',isAuthenticated,async(req,res)=>{
    await findByNode('63e1e08000da544f855a0854').then((data)=>res.json(data)).catch((error)=>res.json({message: error}));
});

router.get('/nodo4',isAuthenticated,async(req,res)=>{
    await findByNode('63e1e08000da544f855a0855').then((data)=>res.json(data)).catch((error)=>res.json({message: error}));;
});

function findByNode(id_node){
    const data = iotSchema.aggregate([
        {
            $lookup: {
                from: "nodos",
                localField: "id_nodo",
                foreignField: "_id",
                as: "nodInf"
            }
        },
        {
            $match: { "nodInf._id": mongoose.Types.ObjectId(id_node) }
        }
    ]);
    return data;
}

function isAuthenticated(req,res,next) {
    if(req.isAuthenticated()){
        return next(); //Continua con siguiente ruta que se elija
    }
    res.redirect('/');
};

module.exports = router;