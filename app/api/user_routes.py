from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User
from app.forms import EditProfileForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
  users = User.query.all()
  return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
  user = User.query.get(id)
  return user.to_dict()

@user_routes.route('/<int:userId>', methods=['PUT'])
@login_required
def edit_profile(userId):
  form = EditProfileForm

  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    username = form.data['username']
    email = form.data['email']
    hashed_password = form.data['hashed_password']
    pfp_url = form.data['pfp_url']
    description = form.data['description']
    updated_user = User(user_id=current_user, username=username, email=email, pfp_url=pfp_url, description=description, updated_user=updated_user)
    return updated_user.to_dict()
  else: return "error with edit form"
  
  