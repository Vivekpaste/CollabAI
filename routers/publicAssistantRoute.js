import { getAllPublicAssistantWithDetails,addPublicAssistant, getAllPublicAssistant, getSinglePublicAssistant, updateSinglePublicAssistant, deleteSinglePublicAssistant, getSingleUsersPubAssistWithDetails, syncAllAssistantWithOpenAI } from '../controllers/publicAssistantController.js';
import express from 'express'
import authenticateUser from '../middlewares/login.js';
const publicRouter = express.Router();

publicRouter.route('/').get(authenticateUser, getAllPublicAssistant);
publicRouter.get('/details_info', authenticateUser, getSingleUsersPubAssistWithDetails);
publicRouter.get('/sync', authenticateUser, syncAllAssistantWithOpenAI);
publicRouter.get('/:id', authenticateUser, getSinglePublicAssistant);
publicRouter.post('/categorized', authenticateUser, getAllPublicAssistantWithDetails);
publicRouter.post('/', authenticateUser, addPublicAssistant);
publicRouter.patch('/:id', authenticateUser, updateSinglePublicAssistant);
publicRouter.delete('/:id', authenticateUser, deleteSinglePublicAssistant);
export default publicRouter;
