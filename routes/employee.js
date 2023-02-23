const router = require("express").Router();
const employeeController = require('../controllers/employeeController')
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended :false}))

router.post("/" ,employeeController.employee_create);
router.post("/login",employeeController.employee_Login);
// router.get("/:employeeId");
// router.put("/:employeeId");
// router.delete("/:employeeId");



module.exports = router;
