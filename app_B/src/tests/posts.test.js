const request = require('supertest'); 
const initApp = require('../server');
const mongoose = require("mongoose");
const postModel = require("../models/posts_model");

var app;

beforeAll(async () => {
    app = await initApp();
    console.log('beforeAll');
    await postModel.deleteMany();
});

afterAll(async () => {
    console.log('afterAll');
    await mongoose.connection.close();
});

var postId = "";
const testPost = {
    title: "Test title",
    content: "Test content",
    owner: "Lee",
};
const invalidPost = {
    title: "Test title",
    content: "Test content",
};
const updatedPost = {
    title: "Updated title",
    content: "Updated content",
    owner: "Lee",
};

describe("Posts test suite", () => {
    test("Post test get all posts", async () => {
       const response = await request(app).get("/posts");
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(0);
    });

    test("Post test add post", async () => {
        const response = await request(app).post("/posts").send(testPost);
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(testPost.title);
        expect(response.body.content).toBe(testPost.content);    
        expect(response.body.owner).toBe(testPost.owner);
        postId = response.body._id;
    });

    test("Post test add invalid post", async () => {
        const response = await request(app).post("/posts").send(invalidPost);
        expect(response.statusCode).not.toBe(201);
    });


    test("Post test get all posts after adding", async () => {
        const response = await request(app).get("/posts");
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(1);
    });

    test("Test get post by owner", async () => {
        const response = await request(app).get("/posts?owner=" + testPost.owner);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].owner).toBe(testPost.owner);
    });
    
    test("Test get post by id", async () => {
        const response = await request(app).get("/posts/" + postId);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(postId);
    });

    test("Test get post by id fail", async () => {
        const response = await request(app).get("/posts/678e9d7c4d3809be848c1fda");
        expect(response.statusCode).toBe(404);
    });

    test("Test update post", async () => {
        const response = await request(app).put("/posts/" + postId).send(updatedPost);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(updatedPost.title);
        expect(response.body.content).toBe(updatedPost.content);
        expect(response.body.owner).toBe(updatedPost.owner);
    });

    test("Test update post fail", async () => {
        const response = await request(app).put("/posts/" + postId + 5);
        expect(response.statusCode).toBe(400);
    });
    test("Test update non-existing post", async () => {
        const nonExistingId = "5f785989e8421c13d422f934"; 
        const response = await request(app).put("/posts/" + nonExistingId).send(updatedPost);
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({ message: "Post not found" });
    });

    test("Test getAllPosts with database error", async () => {
        jest.spyOn(postModel, 'find').mockImplementation(() => {
            throw new Error('Database error');
        });

        const response = await request(app).get("/posts");
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe('Database error');

        postModel.find.mockRestore();
    });

});