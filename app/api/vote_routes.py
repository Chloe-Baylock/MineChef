from flask import Blueprint, request
from flask_login import login_required

vote_routes = Blueprint("votes", __name__)

@vote_routes.route("")
@login_required
def load_votes():
  return false