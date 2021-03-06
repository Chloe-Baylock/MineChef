from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class PostForm(FlaskForm):
  title = StringField('title')
  content = StringField('content', validators=[DataRequired()])