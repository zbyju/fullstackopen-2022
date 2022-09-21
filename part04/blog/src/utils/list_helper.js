const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return undefined;
  return blogs.reduce((favorite, blog) => {
    return blog.likes > favorite.likes ? blog : favorite;
  }, blogs[0]);
};

const blogsOfAuthor = (author, blogs) => {
  return blogs.filter((blog) => blog.author === author);
};

const countBlogsOfAuthor = (author, blogs) => {
  return blogsOfAuthor(author, blogs).length;
};

const likesOfAuthor = (author, blogs) => {
  return totalLikes(blogsOfAuthor(author, blogs));
};

const allAuthors = (blogs) => {
  return [...new Set(blogs.map((blog) => blog.author))];
};

const mostBlogs = (blogs) => {
  const authorCounts = allAuthors(blogs).map((author) => ({
    author,
    blogs: countBlogsOfAuthor(author, blogs),
  }));
  if (authorCounts.length === 0) return undefined;
  return authorCounts.reduce((most, author) => {
    return author.blogs > most.blogs ? author : most;
  }, authorCounts[0]);
};

const mostLikes = (blogs) => {
  const authorCounts = allAuthors(blogs).map((author) => ({
    author,
    likes: likesOfAuthor(author, blogs),
  }));
  if (authorCounts.length === 0) return undefined;
  return authorCounts.reduce((most, author) => {
    return author.likes > most.likes ? author : most;
  }, authorCounts[0]);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
