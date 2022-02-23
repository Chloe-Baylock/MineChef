from .db import db

class Vote(db.Model):
  __tablename__ = 'votes'

  id = db.Column(db.Integer, primary_key=True)
  is_up = db.Column(db.Boolean, nullable=False)
  voter_id = db.Column(db.Integer, db.ForeignKey('us3rs.id'), nullable=False)
  post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)

  user = db.relationship('User', back_populates="vote")
  post = db.relationship('Post', back_populates="vote")

  def to_dict(self):
    return {
      'id': self.id,
      'is_up': self.is_up,
      'voter_id': self.voter_id,
      'post_id': self.post_id
    }