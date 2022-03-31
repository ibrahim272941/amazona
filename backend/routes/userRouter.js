import express from 'express';
import {
  loginController,
  signupController,
  deleteController,
  getByIdController,
  updateController,
} from '../controllers/user.js';
import isAuth from '../mddlewares/isAuth.js';

const router = express.Router();

router.post('/signin', loginController);
router
  .post('/', signupController)
  .get('/:id', isAuth, getByIdController)
  .patch('/:id', updateController)
  .delete('/:id', deleteController);
export default router;
