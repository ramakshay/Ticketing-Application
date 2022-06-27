const router = require('express').Router();
const verify = require('../middleware/verifyAdmin');

const getTest = require('../controllers/test');

router.get("/", verify ,getTest.testRo);

module.exports = router;