const postModel = require("../models/posts_model");
const createPost = async (req, res) => {
  const post = req.body;
  try{
    const newPost = await postModel.create(post);
    res.status(201).send(newPost);
  }catch(error){
    res.status(400).send(error);
  }
};

const getAllPosts = async (req, res) => {
  try{
    const posts = await postModel.find({});
    res.status(200).send(posts);
  }catch(error){
    res.status(404).send(error);  
  }
};

module.exports = {
  createPost,
  getAllPosts
};