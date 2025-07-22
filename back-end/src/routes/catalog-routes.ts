import express from 'express';
import { createPost, listPosts, listPostsId, updatePost, deletePost } from '../controllers/catalog-controller';

const router = express.Router();

router.post('/films', createPost);
router.get('/films', listPosts);
router.get('/films/:id', listPostsId);
router.put('/films/:id', updatePost);
router.delete('/films/:id', deletePost);

export default router;