from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db

friend_routes = Blueprint("friends", __name__)

# @friend_routes.route("")
# @login_required
# def load_friends:

@friend_routes.route("/send", methods=["POST"])
@login_required
def send_friend():

  toUserId = request.get_json()['toUserId']

  friend = Friend(
    sender_id = current_user.id,
    receiver_id = toUserId,
    is_pending = true
  )

  db.session.add(friend)
  db.session.commit()

# @friend.routes.route("/accept", methods=["PUT"])
# @login_required
# def decide_friend():

# @friend.routes.route("/remove", methods=["DELETE"])
# @login_required
# def remove_friend():
