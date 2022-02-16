from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Vote

vote_routes = Blueprint("votes", __name__)

@vote_routes.route("")
@login_required
def load_votes():
  
  votes = Vote.query.all()
  return {'votes': [vote.to_dict() for vote in votes]}

@vote_routes.route("/new", methods=["POST"])
@login_required
def post_vote():

  # follower_id = request.get_json()['follower_id']
  postId = request.get_json()['postId']
  is_up = request.get_json()['is_up']
  print('                       ******** is up is', is_up)
  vote = Vote(
    is_up = is_up,
    voter_id = current_user.id,
    post_id = postId
  )

  db.session.add(vote)
  db.session.commit()

  return vote.to_dict()
