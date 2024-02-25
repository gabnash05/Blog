

export function getAllBlogs(req, res) {
  res.json({message: 'welcome to BlogSite'});
}

export function getOneBlog(req, res) {
  const id = req.params.id;
  res.json({message: 'welcome to BlogSite'});
}

export function postBlog(req, res) {
  const id = req.params.id;
  res.json({message: 'POST'});
}

export function deleteBlog(req, res) {
  const id = req.params.id;
  res.json({message: 'DELETE'});
}

export function updateBlog(req, res){
  const id = req.params.id;
  res.json({message: 'UPDATE'});
}