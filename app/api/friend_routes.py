from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User

friend_routes = Blueprint("friends", __name__)

@friend_routes.route("")
@login_required
def load_friends():

  user = User.query.get(current_user.id)
  all_sent_to = user.senders.all()
  all_from = user.receivers.all()
  return {'friends': {'all_sent_to': [recept.id for recept in all_sent_to], 'all_from': [sendant.id for sendant in all_from]}}

@friend_routes.route("/send", methods=["POST"])
@login_required
def send_friend():

  toUserId = request.get_json()['toUserId']

  receiver = User.query.get(toUserId)
  sender = User.query.get(current_user.id)
  receiver.receivers.append(sender)

  db.session.commit()
  return sender.to_dict()

# @friend.routes.route("/accept", methods=["PUT"])
# @login_required
# def decide_friend():

# @friend.routes.route("/remove", methods=["DELETE"])
# @login_required
# def remove_friend():
