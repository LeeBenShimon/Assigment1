
import postModel from "../models/posts_model";
import { Request, Response } from "express";

const createPost = async (req:Request, res:Response) => {
  const post = req.body;
  try{
    const newPost = await postModel.create(post);
    res.status(201).send(newPost);
  }catch(error){
    res.status(400).send(error);
  }
};

const getAllPosts = async (req:Request, res:Response) => {
  try{
    const posts = await postModel.find({});
    res.status(200).send(posts);
  }catch(error){
    res.status(400).send(error);  
  }
};

const getPostById = async (req:Request, res:Response) => {
  const id = req.params.id;
  try{
    const post = await postModel.findById(id);
    if(post === null){
      return res.status(404).send({message: "Post not found"});
    } else {
      return res.status(200).send(post);
    }
  }
  catch(error){
    res.status(400).send(error);
  }
};

const updatePost = async (req:Request, res:Response) => {
  const id = req.params.id;
  const postData = req.body;

  try {
    const updatedPost = await postModel.findByIdAndUpdate(id, postData, { new: true });
    if (!updatedPost) {
      return res.status(404).send({ message: "Post not found" });
    }
    res.status(200).send(updatedPost);
  } catch (error) {
    res.status(400).send(error);
  }
};

export default {
  createPost,
  getAllPosts,
  getPostById,
  updatePost
};
