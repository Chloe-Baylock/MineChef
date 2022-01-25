from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    data = field.data
    if '@' in data :
      user = User.query.filter(User.email == data).first()
      dataType = 'email'
    else:
      user = User.query.filter(User.username == data).first()
      dataType = 'username'

    if not user:
      raise ValidationError(f'No user with that {dataType} exists.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    data = form.data['username']
    if '@' in data:
      user = User.query.filter(User.email == data).first()
    else:
      user = User.query.filter(User.username == data).first()

    if user and not user.check_password(password):
        raise ValidationError('Password was incorrect.')


class LoginForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[
                           DataRequired(), password_matches])
