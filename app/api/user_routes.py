from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User
from app.forms import EditProfileForm
from app.s3_helpers import (
  upload_file_to_s3, allowed_file, get_unique_filename)

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
  
  change = request.get_json()
  x = list(change.keys())
  y = change[f'{x[0]}']


  if x[0] == 'username':
    user.username = y
  elif x[0] == 'email':
    user.email = y
  elif x[0] == 'password':
    user.password = y
  elif x[0] == 'pfp_url':
    print('             **** here')
    print('             **** request is', request)
    print('             **** request.files is', request.files)
    if "image" not in request.files:
      print('             **** 1')
      return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
      return {"errors": "file type not permitted"}, 400
    
    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
      # if the dictionary doesn't have a url key
      # it means that there was an error when we tried to upload
      # so we send back that error message
      return upload, 400

    url = upload["url"]
    user.pfp_url = url
  else:
    return ('             ****chloe wrote this error')

  db.session.commit()
  return user.to_dict()

@user_routes.route('/<int:userId>/delete', methods=['DELETE'])
@login_required
def delete_user(userId):
  user = User.query.get(userId)
  db.session.query(User).filter(User.id == userId).delete()
  db.session.commit()

  return user.to_dict()
