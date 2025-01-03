const Comment= require("../models/comments_model");

const createComments = async(req,res) => {
    try{
        const format =req.body;
        const comment= new Comment(format);
        await comment.save();
        res.status(201).send(comment);
    }catch (err){
        res.status(400).send(err); 
    }
};


const getComments = async(req,res) => {
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

const getCommentsById = async(req,res) => {
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


const getCommentsByPostId = async(req,res) => {
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

const deleteCommentsById = async(req,res) => {
    const ID =req.params.id;
    try{
        const delteComment=await Comment.findByIdAndDelete(ID);
        res.status(200).send(delteComment);
    }catch(err){
        res.status(400).send(err);
    }
};


const updateCommentsById = async(req,res) => {
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


module.exports={
    createComments,
    getComments,
    getCommentsById,
    getCommentsByPostId,
    deleteCommentsById,
    updateCommentsById
    };