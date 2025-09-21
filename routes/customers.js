const express = require("express");
const router = express.Router();
const customersController = require("../controllers/customers");
const {
  createCustomerValidation,
  updateCustomerValidation,
} = require("../validators/customerValidator");
const validate = require("../validators/validate");

router.get("/", customersController.getAll);
router.get("/:id", customersController.getSingle);
router.post("/", createCustomerValidation, validate, customersController.createCustomer);
router.put("/:id", updateCustomerValidation, validate, customersController.updateCustomer);
router.delete("/:id", customersController.deleteCustomer);

module.exports = router;