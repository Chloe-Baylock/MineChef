from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User
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

@user_routes.route('/profile', methods=['PUT'])
@login_required
def edit_profile():
  form = EditProfileForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  userId = current_user.id
  user = User.query.get(userId)
  
  if form.validate_on_submit():
    user.username = form.data['username']
    user.email = form.data['email']
    user.hashed_password = form.data['hashed_password']
    user.pfp_url = form.data['pfp_url']
    user.description = form.data['description']

    db.session.commit()
    return user.to_dict()
  else: 
    print('               *****error with validate on submit')
    print('               *****form.data[username]', form.data['username'])
    print('               *****form.data', form.data)
    return user.to_dict()
# @user_routes.route('/current')
# def show_current_user():

  