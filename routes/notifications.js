const express= require('express');

const router = express.Router();
const notificationCtrl = require('../controllers/notifications');

router.get('/', notificationCtrl.getNotifications);
router.put('/:id', notificationCtrl.markAsReaded);


module.exports = router;