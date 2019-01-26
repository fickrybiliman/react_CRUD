var express = require('express');
var router = express.Router();

const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//middlewares for check express-session
const { checkAuth } = require('../middlewares/auth');

/* GET users listing. */
router.get('/', checkAuth, function(req, res, next) {
   models.User.findAll().then(users => {
      // console.log(users);
      res.status(200).json({ message : 'Read Data Users'});
   }).catch(err => {
      console.log(err);
      res.status(403).json({ message : 'Gagal Baca Data Users'});
   })
});

router.get('/login', (req, res, next) => {
   res.render('auth/login');
});

router.post('/login', (req, res, next) => {
   const {username, password} = req.body;
   models.User.findOne({
      where: {
         username: username
      }
   }).then(user => {
      console.log(user)
      if (user != null) {
         const checkPassword = bcrypt.compareSync(password, user.password);
         if (checkPassword === true) {
            const token = jwt.sign({ user : user }, 'secret key')
            res.status(200).json({ message : 'Success Login', data : { token }})
         } else {
            res.status(403).json({ message : 'Invalid Login' })
         }
      } else {
         res.status(403).json({ message : "Invalid Login" })
      }
   })
});

router.get('/add', checkAuth, (req, res, next) => {
   models.User.findAll().then(users => {
      res.render('auth/registrasi', {user: users})
   }).catch(err => {
      console.log(err);
      res.render('auth/registrasi');
   })
});

router.post('/add', checkAuth, (req, res, next) => {
   let {username, password} = req.body;
   password = bcrypt.hashSync(password, 7);
   models.User.create({username, password}).then(user => {
      console.log(user);
      res.redirect('/users');
   }).catch(err => {
      console.log(err);
      res.redirect('/users');
   })
})

router.get('/logout', (req, res, next) => {
   req.session.destroy(function(err) {
      if (err) {
         console.log(err);
      } else {      
         res.redirect('/users/login');
      }
   })
});

router.get('/edit/:id', checkAuth, (req, res, next) => {
   const userId = req.params.id;
   models.User.findOne({where: {id: userId}}).then(user => {
      res.render('auth/edit', {user: user});
   }).catch(err => {
      console.log(err);
      res.redirect('/users');
   })
});

router.post('/edit/:id', checkAuth, (req, res, next) => {
   const userId = req.params.id;
   let {username, password} = req.body;
   password = bcrypt.hashSync(password, 7);
   models.User.findOne({where: {id: userId}}).then(user => {
     return User.update({
        username,
        password
      })
   }).then(updatedUser => {
      res.redirect('/users');
   }).catch(err => {
      console.log(err);
      res.redirect('/users');
   })
});

router.get('/delete/:id', checkAuth, (req, res, next) => {
   const userId = req.params.id;
   models.User.findOne({where: {id: userId}}).then(user => {
      return user.destroy();
   }).then(user => {
      res.redirect('/users');
   }).catch(err => {
      console.log(err);
      res.redirect('/users');
   })
});

module.exports = router;
  