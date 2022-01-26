from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import db, Post
from app.forms import PostForm

post_routes = Blueprint('posts', __name__)

@post_routes.route('')
@login_required
def posts():
  print('                       ***********in route')
  posts = Post.query.all()
  print('                       ***********posts is', posts)
  return {'posts': [post.to_dict() for post in posts]}

@post_routes.route('/new', methods=["POST"])
@login_required
def post():
  form = PostForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  print('                       ***********in route')
  print('                       ***********form.data is', form.data)

  if form.validate_on_submit():
    print('                       ***********valid form')
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



# @post_routes.route('/<int:postId>', methods=["POST"])
# @login_required
# def post():