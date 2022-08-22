const express = require('express');
const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', express.json(), createUser);
router.patch('/me', express.json(), updateProfile);
router.patch('/me/avatar', express.json(), updateAvatar);

module.exports = router;
