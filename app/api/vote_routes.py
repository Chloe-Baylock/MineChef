from flask import Blueprint, request
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
  vote = Vote(
    is_up = is_up,
    voter_id = current_user.id,
    post_id = postId
  )

  db.session.add(vote)
  db.session.commit()

  return vote.to_dict()

@vote_routes.route('/edit', methods=["PUT"])
@login_required
def edit_vote():
  voteId = request.get_json()['voteId']
  is_up = request.get_json()['is_up']

  print('                   ***** is_up is', is_up)
  print('                   ***** voteId is', voteId)

  vote = Vote.query.get(voteId)
  vote.is_up = is_up
  print('                   ***** vote is', vote)
  print('                   ***** vote.is_up is', vote.is_up)
  db.session.commit()
  print('                   ***** vote.to_dict() is', vote.to_dict())

  return vote.to_dict()


@vote_routes.route("/delete", methods=["DELETE"])
@login_required
def delete_vote():

  voteId = request.get_json()['voteId']

  vote = Vote.query.get(voteId)
  db.session.query(Vote).filter(Vote.id == voteId).delete()
  db.session.commit()
  return vote.to_dict()