from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from flask_login import UserMixin

from config import db, bcrypt, login_manager

class Player(db.Model, SerializerMixin):
    __tablename__ = 'players'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    position = db.Column(db.String)
    age = db.Column(db.Integer)
    roster_id = db.Column(db.Integer, db.ForeignKey('rosters.id'))

    roster = db.relationship('Roster', back_populates='players')

    serialize_rules = ('-teams.players', '-coaches.players', '-roster.players',)


class Team(db.Model, SerializerMixin):
    __tablename__ = 'teams'

    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String)
    mascot = db.Column(db.String)
    wins = db.Column(db.Integer)
    theme = db.Column(db.String)

    rosters = db.relationship('Roster', back_populates='team')

    serialize_rules = ('-coaches.teams', '-rosters.teams',)

class Coach(db.Model, SerializerMixin, UserMixin):
    __tablename__ = 'coaches'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    playing_style = db.Column(db.String)
    username = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String, nullable=False)

    rosters = db.relationship('Roster', back_populates='coach')

    serialize_rules = ('-rosters.coaches', '-teams.coaches',)

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password)
    
@login_manager.user_loader
def load_user(user_id):
    return Coach.query.filter(Coach.id == user_id).first()
    
   
    
class Roster(db.Model, SerializerMixin):
    __tablename__ = 'rosters'

    id = db.Column(db.Integer, primary_key=True)
    roster_size = db.Column(db.Integer)
    level = db.Column(db.String)
    year = db.Column(db.Integer)
    coach_id = db.Column(db.Integer, db.ForeignKey('coaches.id'))
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'))

    players = db.relationship('Player', back_populates='roster')
    coach = db.relationship('Coach', back_populates='rosters')
    team = db.relationship('Team', back_populates='rosters')

    serialize_rules = ('-coach.rosters', '-team.rosters', '-players.rosters',)


