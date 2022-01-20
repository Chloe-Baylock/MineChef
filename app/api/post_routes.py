from flask import Blueprint
from flask_login import login_required
# from app.models import User

post_routes = Blueprint('posts', __name__)

@post_routes.route('')
@login_required
def posts():
  posts = Post.query.all()
  return "congrats!"
  # return {'posts': [post.to_dict for post in posts]}