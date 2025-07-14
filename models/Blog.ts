import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  content: String,  // Changed from summary/summary_urdu
  createdAt: { type: Date, default: Date.now }
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
export default Blog;