import mongoose from "mongoose";

let postSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    content: {type: String, required: true},
    title: {type: String, required: true},
    image: {type: String, default: 'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post-1536x674.webp'},
    category: {type: String, default: 'uncategorized'},
    slug: {type: String, required: true, unique: true}
}, {timestamps: true})

let  Post = mongoose.model('POST', postSchema)
export default Post