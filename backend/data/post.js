const { readData } = require('./util');

async function getAllPostsByEmail(email) {
  const storedData = await readData();
  if (!storedData.posts) {
    return [];
  }
  return storedData.posts.filter((post) => post.createdBy === email);
}

exports.getAllPostsByEmail = getAllPostsByEmail;