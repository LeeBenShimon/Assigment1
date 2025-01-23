import Comment from "../models/comments_model";
import { Request, Response } from "express";

const createComments = async(req:Request, res:Response) => {
    try{
        const format =req.body;
        const comment= new Comment(format);
        await comment.save();
        res.status(201).send(comment);
    }catch (err){
        res.status(400).send(err); 
    }
};


const getComments = async(req:Request, res:Response) => {
    const authorFilter = req.query.author;
    try{
        if(authorFilter){
            const comments=await Comment.find({author:authorFilter});
            res.status(200).send(comments);
            return;
        }
        const comments=await Comment.find({});
        res.status(200).send(comments);
    }catch(err){
        res.status(400).send(err);
    }
};

const getCommentsById = async(req:Request, res:Response) => {
    const IdFilter = req.params.id;
    try{
        if(IdFilter){
            const comments=await Comment.findById(IdFilter);
            res.status(200).send(comments);
            return;
        }
    }catch(err){
        res.status(400).send(err);
    }
};


const getCommentsByPostId = async(req:Request, res:Response) => {
    const PostIdFilter = req.query.postId;
    try{
        if(PostIdFilter){
            const comments=await Comment.find({postId:PostIdFilter});
            res.status(200).send(comments);
            return;
        }
    }catch(err){
        res.status(400).send(err);
    }
};

const deleteCommentsById = async(req:Request, res:Response) => {
    const ID =req.params.id;
    try{
        const delteComment=await Comment.findByIdAndDelete(ID);
        res.status(200).send(delteComment);
    }catch(err){
        res.status(400).send(err);
    }
};


const updateCommentsById = async(req:Request, res:Response) => {
    const ID=req.params.id;
    const comment=req.body;
    try{
        const update=await Comment.findByIdAndUpdate(ID,comment,{new:true,runValidators: true});
        res.status(200).send(update);
    if (!update) {
        return res.status(404).send({ message: "Post not found" });
      }
    }
    catch(err){
        res.status(400).send(err);
    }
};

export default {
    createComments,
    getComments,
    getCommentsById,
    getCommentsByPostId,
    deleteCommentsById,
    updateCommentsById
};
