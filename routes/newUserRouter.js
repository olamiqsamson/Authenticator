const router = require('express').Router()

const { register, login, logout} = require('../controller/newUser');
const requiredAuthPrcocess =require('../middleware/auth')

router.post('/register',register)
router.post('/login', login)
router.get('/logout',logout)
router.get("/dashboard", requiredAuthPrcocess ,(req, res) => {
    res.status(200).render("dashboard");
  });



module.exports = router;