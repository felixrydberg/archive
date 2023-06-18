const express = require('express');
const bcrypt = require('bcrypt');
const { users, badges, ships, ranks, linkbadges, linkships, linkranks } = require('../models/prismaclient');
const router = express.Router();

module.exports = router;

