import express from 'express';

import ModelsController from './controllers/ModelsController';
import UserController from './controllers/UserController';

const router = express.Router();

router.use('/models', ModelsController);
router.use('/users', UserController);

router.get('/', (req, res) => {
  res.end('hi');
});

module.exports = router;
