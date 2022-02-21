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
  return {'friends': {
    'all_sent_to': [recept.to_dict() for recept in all_sent_to],
    'all_from': [sendant.to_dict() for sendant in all_from]}
  }

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

@friend_routes.route("/delete", methods=["DELETE"])
@login_required
def remove_send():

  current = User.query.get(current_user.id)

  obj = request.get_json()['obj']
  if (len(obj['cf'])):
    otherUser = User.query.get(obj['cf'][0]['id'])
    current.senders.remove(otherUser)
    current.receivers.remove(otherUser)
  elif (len(obj['sf'])):
    otherUser = User.query.get(obj['sf'][0]['id'])
    otherUser.receivers.remove(current)
  else:
    otherUser = User.query.get(obj['st'][0]['id'])
    current.receivers.remove(otherUser)

  db.session.commit()

  return otherUser.to_dict()

# @friend_routes.route("/delete-receive", methods=["DELETE"])
# @login_required
# def remove_receive():

#   receiver = request.get_json()['sad_user']

#   sender_user = User.query.get(current_user.id)
#   receiver_user = User.query.get(receiver['id'])
#   receiver_user.receivers.remove(sender_user)

#   db.session.commit()

#   return lonely.to_dict()