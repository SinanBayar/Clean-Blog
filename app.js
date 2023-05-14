const express = require('express');
const app = express();
const port = 4000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});

const blog = {
  id: 1,
  title: 'Blog title',
  description: 'Blog description',
};

app.get('/', (req, res) => {
  res.send(blog);
});
