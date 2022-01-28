from .db import db

class Post(db.Model):
  __tablename__ = 'posts'

  id = db.Column(db.Integer, primary_key=True)
  author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  title = db.Column(db.String(255))
  content = db.Column(db.Text, nullable=False)

  user = db.relationship('User', back_populates="post")

  def to_dict(self):
    return {
      'id': self.id,
      'author_id': self.author_id,
      'title': self.title,
      'content': self.content
    }