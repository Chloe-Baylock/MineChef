from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class EditProfileForm(FlaskForm):
  username = StringField('username', validations=[DataRequired()])
  email = StringField('email', validations=[DataRequired()])
  hashed_password = StringField('hashed_password', validations=[DataRequired()])
  pfp_url = StringField('pfp_url', validations=[DataRequired()])
  description = StringField('description', validations=[DataRequired()])