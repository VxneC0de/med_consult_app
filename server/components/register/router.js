const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../response/index');

router.post('/', (req, res) => {
  controller.addUser(req.body)
    .then((user) => response.success(req, res, user, 201)) // This line is to save in Auth
    .catch((error) => response.error(req, res, 'Internal Error', 500, error));
});

module.exports = router;