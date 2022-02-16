# from .db import db

# class Friend(db.Model):
#   __tablename__ = 'friends'

#   id = db.Column(db.Integer, primary_key=True)
#   sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#   receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#   is_pending = db.Column(db.Boolean, nullable=False)

#   userSend = db.relationship('User', back_populates="sender")
#   userReceive = db.relationship('User', back_populates="receiver")