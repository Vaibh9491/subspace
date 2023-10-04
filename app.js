const express = require('express');
const app = express();
const port = 3000; 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const _ = require('lodash');
function analyzeBlogData(req, res, next) {
  const blogData = req.body; 
  const totalPosts = _.size(blogData);
  const averageWordCount = _.meanBy(blogData, 'wordCount');
  req.blogAnalysis = {
    totalPosts,
    averageWordCount,
  };
  next();
}

app.use(express.json()); 
app.use(analyzeBlogData);
app.get('/search', (req, res) => {
  const query = req.query.query;
  const blogData = req.body; 

   const searchResults = _.filter(blogData, (blog) => {
    return blog.title.toLowerCase().includes(query.toLowerCase());
  });
  res.json(searchResults);
});

const fetch = require('node-fetch');

app.use(async (req, res, next) => {
  try {
    const response = await fetch('https://api.example.com/blogdata');
    const blogData = await response.json();
    req.body = blogData; 

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching blog data');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
