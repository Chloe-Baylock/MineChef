from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

friends = db.Table(
    "friends",
    db.Column('sender_id', db.Integer, db.ForeignKey('users.id'), nullable=False),
    db.Column('receiver_id', db.Integer, db.ForeignKey('users.id'), nullable=False),
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    pfp_url = db.Column(db.String(255))
    description = db.Column(db.Text)

    post = db.relationship('Post', back_populates="user", cascade="all, delete")
    vote = db.relationship('Vote', back_populates="user", cascade="all, delete")

    senders = db.relationship(
      "User",
      secondary=friends,
      primaryjoin=(friends.c.sender_id == id),
      secondaryjoin=(friends.c.receiver_id == id),
      backref=db.backref('receivers', lazy="dynamic"),
      lazy="dynamic"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'password': self.password,
            'pfp_url': self.pfp_url,
            'description': self.description
        }
