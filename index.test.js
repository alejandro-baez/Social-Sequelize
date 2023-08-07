const { Comment, Like, Post, Profile, User } = require("./index");
const { db } = require('./db/connection.js');
const users = require("./seed/users.json")
const profiles = require("./seed/profiles.json")
const posts =require("./seed/posts.json")
const comments = require("./seed/comments.json")
const likes = require("./seed/likes.json")

describe('Social Sequelzie Test', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the test suite is run
        await db.sync({ force: true });
    })

    // Write your tests here
    
    test("can create a User", async function() {
        await User.bulkCreate(users)
        const foundUser = await User.findByPk(1)
        expect(foundUser).toEqual(expect.objectContaining(users[0]));
    })

    test("can create a Profile", async function(){
        await Profile.bulkCreate(profiles)

        const foundProfile = await Profile.findByPk(1);
        expect(foundProfile).toEqual(expect.objectContaining(profiles[0]))
    })

    test("can create a Post", async function(){
        await Post.bulkCreate(posts);
        const foundPost = await Post.findByPk(1);
        expect(foundPost).toEqual(expect.objectContaining(posts[0]))
    })

    test("can create a Comment", async function(){
        await Comment.bulkCreate(comments);
        const foundComment = await Comment.findByPk(1);
        expect(foundComment).toEqual(expect.objectContaining(comments[0]))
    })

    test("can create a Like", async function(){
        await Like.bulkCreate(likes);
        const foundLike = await Like.findByPk(1);
        expect(foundLike).toEqual(expect.objectContaining(likes[0]));

    })

    test("user can have only one profile", async ()=> {
        //await db.sync({force:true});
        let myUser = await User.create(users[0]);
        let myProfile = await Profile.create(profiles[0]);

        await myUser.setProfile(myProfile);

        const associatedProfile = await myUser.getProfile();
        expect(associatedProfile instanceof Profile).toBeTruthy();
    })

    test('user can have many likes', async ()=>{
        //await db.sync({force:true});
        let myUser = await User.create(users[0]);
        let myLike1 = await Like.create(likes[0]);
        let myLike2 = await Like.create(likes[1]);

        await myUser.addLike(myLike1);
        await myUser.addLike(myLike2);

        const associatedLikes = await myUser.getLikes();

        expect(associatedLikes.length).toBe(2);
        expect(associatedLikes[0] instanceof Like).toBe(true);
    })

    test("likes can have many users", async()=>{
        let myLike = await Like.create(likes[0]);
        let user1 = await User.create(users[0]);
        let user2 = await User.create(users[1]);

        await myLike.addUser(user1);
        await myLike.addUser(user2);

        const associatedUsers = await myLike.getUsers();

        expect(associatedUsers.length).toBe(2);
        expect(associatedUsers[0] instanceof User).toBeTruthy();

    })




})