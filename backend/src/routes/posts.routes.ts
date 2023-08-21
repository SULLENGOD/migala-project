import { Router } from "express";
const router: Router = Router();

import { deletePost, getAllPosts, getPost, getPosts, newPost, updatePost } from "../controllers/posts.controller";
import { TokenValidation } from "../libs/verifyToken";

router.get('/:id', getPost);
router.get('/getAll', getAllPosts);
router.get('/limit/:limit', getPosts);

router.put('/update-post', TokenValidation, updatePost);
router.post('/new-post', TokenValidation, newPost);
router.delete('/delete-post/:id', TokenValidation, deletePost);


export default router;