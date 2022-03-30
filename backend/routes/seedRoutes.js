import express from 'express';
import { insertion } from '../controllers/seed.js';

const seedRouter = express.Router();

seedRouter.get('/', insertion);
export default seedRouter;
