import { Request, Response } from "express";
import Post, { IPost } from "../models/post.model";
import User, { IUser } from "../models/user.model";
import { updateSourceFile } from "typescript";

export const newPost = async (req: Request, res: Response) => {
  const user = await User.findById(req.userId, { password: 0 });
  if (!user) {
    return res.status(401).json("Unauthorized");
  }

  const newPostData: IPost = {
    title: req.body.title,
    content: req.body.content,
    createdAt: new Date(),
    tags: req.body.tags,
    author: user.toObject(),
  };

  const newPost = new Post(newPostData);
  const savedPost = await newPost.save();

  user.posts.push(savedPost._id.toString());
  await user.save();

  res.json([savedPost, user]);
};

export const getPost = async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json("Post not found");

  res.json(post);
};

export const getAllPosts = async (req: Request, res: Response) => {
  const posts = await Post.find();
  if (!posts) return res.status(404).json("Post not found");

  res.json(posts);
};

export const getPosts = async (req: Request, res: Response) => {
    const limit = parseInt(req.params.limit);
    if(!limit) return res.status(418).json();

    const posts = await Post.find().limit(limit);
    res.json(posts);
};

export const deletePost = async (req: Request, res: Response) => {
  const user = await User.findById(req.userId, { password: 0 });
  if (!user) {
    return res.status(401).json("Unauthorized");
  }

  await Post.deleteOne({ _id: req.params.id });

  const posts = user.posts;
  const index = posts.indexOf(req.params.id);

  if (index !== -1) {
    posts.splice(index, 1);
    user.posts = posts;
    user.save();
  }

  res.json(user.posts);
};

export const updatePost =  async (req: Request, res: Response) => {
  const user = await User.findById(req.userId, { password: 0 });
  if(!user) return res.status(401).json('Unauthorized');

  const updatedPostData: IPost = {
    _id: req.body._id,
    title: req.body.title,
    content: req.body.content,
    updatedAt: new Date,
    tags: req.body.tags
  };

  const updatedPost = new Post(updatedPostData);
  const renewedPost = await Post.updateOne({_id: req.body._id}, updatedPost)

  res.json(renewedPost);
}
