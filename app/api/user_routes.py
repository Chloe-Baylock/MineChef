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

  userId = current_user.id
  user = User.query.get(userId)

  # form = EditProfileForm()
  # form['csrf_token'].data = request.cookies['csrf_token']
  
  change = request.get_json()
  x = list(change.keys())
  y = change[f'{x[0]}']


  if x[0] == 'username':
    user.username = y
  elif x[0] == 'email':
    user.email = y

  db.session.commit()
  return user.to_dict()

@user_routes.route('/<int:userId>/delete', methods=['DELETE'])
@login_required
def delete_user(userId):
  user = User.query.get(userId)
  db.session.query(User).filter(User.id == userId).delete()
  db.session.commit()

  return user.to_dict()
