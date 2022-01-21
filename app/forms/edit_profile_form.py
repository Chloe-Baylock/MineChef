from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired

class EditProfileForm(FlaskForm):
  username = StringField('username', validators=[DataRequired()])
  email = StringField('email', validators=[DataRequired()])
  hashed_password = PasswordField('hashed_password', validators=[DataRequired()])
  pfp_url = StringField('pfp_url')
  description = StringField('description')