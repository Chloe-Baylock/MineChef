from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Post
from app.forms import PostForm

post_routes = Blueprint('posts', __name__)

@post_routes.route('')
@login_required
def posts():
  posts = Post.query.all()
  return {'posts': [post.to_dict for post in posts]}

@post_routes.route('/new', methods=["POST"])
@login_required
def post():
  form = PostForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    userId = current_user.id
    user = User.query.get(userId)

    post = Post(
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