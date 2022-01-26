from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import db, User, Post
from app.forms import PostForm

post_routes = Blueprint('posts', __name__)

@post_routes.route('')
@login_required
def posts():
  
  posts = Post.query.all()
  return {'posts': [post.to_dict() for post in posts]}

@post_routes.route('/new', methods=["POST"])
@login_required
def post():
  form = PostForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    userId = current_user.id
    post = Post(
      author_id = userId,
      title=form.data['title'] or 'Untitled',
      content=form.data['content'],
    )
    db.session.add(post)
    db.session.commit()
    
    return post.to_dict()
  else:
    return {'errors': 'chloe wrote this error, posts/new route'}, 401

@post_routes.route('/<int:postId>/edit', methods=["PUT"])
@login_required
def editPost(postId):
  form = PostForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  post = Post.query.get(postId)
  
  if form.validate_on_submit():
    post.title=form.data['title'] or 'Untitled',
    post.content=form.data['content'],
  
    db.session.commit()
    return post.to_dict()
  else:
    return {'errors': 'chloe wrote this error, posts/new route'}, 401

@post_routes.route('/<int:postId>/delete', methods=["DELETE"])
@login_required
def deletePost(postId):
  post = Post.query.get(postId)
  db.session.query(Post).filter(Post.id == postId).delete()
  db.session.commit()
  return post.to_dict()