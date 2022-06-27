//dependencies
const router = require('express').Router();
//middleware
const verifyAdmin = require('../middleware/verifyAdmin');
const imageUpload = require("../middleware/fileUpload");
//controllers
const userController = require('../controllers/user');
const adminController = require('../controllers/admin');


// Register Route
router.post('/register',imageUpload.single('file'), userController.register);

//Login Route
router.post("/login", userController.login);

//refresh-token Route
router.post('/refresh-token', userController.refreshToken);

//Get user data Route
router.get('/',verifyAdmin, adminController.getUsers);

//change role of user Route
router.post("/changeRole",verifyAdmin, adminController.changeRole);


module.exports = router;