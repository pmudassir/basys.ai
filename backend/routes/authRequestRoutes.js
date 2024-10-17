import express from 'express';
import {
  createAuthRequest,
  getAllAuthRequests,
  getAuthRequestById,
  updateAuthRequest,
  deleteAuthRequest
} from '../controllers/authRequestController.js';

const router = express.Router();

router.post('/', createAuthRequest);

router.get('/', getAllAuthRequests);

router.get('/:id', getAuthRequestById);

router.put('/:id', updateAuthRequest);

router.delete('/:id', deleteAuthRequest);

export default router;
