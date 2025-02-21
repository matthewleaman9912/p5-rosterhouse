from crypt import methods
from flask import request, session, make_response,jsonify, redirect, url_for
from flask_cors import cross_origin
from flask_restful import Resource
from flask_login import login_user, logout_user, login_required, current_user

# Local imports
from config import app, db, api, login_manager
# Add your model imports
from models import Player, Team, Roster, Coach

class Players(Resource):

    def get(self):
        players = [player.to_dict() for player in Player.query.all()]
        return make_response(players, 200)
    
    def post(self): 
        json = request.get_json()

        new_player = Player(
            first_name = json['first_name'],
            last_name = json['last_name'],
            position = json['position'],
            age = json['age'],
            roster_id = json['roster_id']
        )
        db.session.add(new_player)
        db.session.commit()
        player_dict = new_player.to_dict()
        return make_response(jsonify(player_dict, 201))
    
api.add_resource(Players, '/players')

class Teams(Resource):

    def get(self):
        teams = [team.to_dict() for team in Team.query.all()]
        return make_response(teams, 200)
    
    def post(self):
        
        json = request.get_json()

        new_team = Team(
            city = json['city'],
            mascot = json['mascot'],
            wins = json['wins'],
            theme = json['theme']
        )
        db.session.add(new_team)
        db.session.commit()
        team_dict = new_team.to_dict()
        return make_response(jsonify(team_dict))
    
api.add_resource(Teams, '/teams')

class Coaches(Resource):

    def get(self):
        coaches = [coach.to_dict() for coach in Coach.query.all()]
        return make_response(coaches, 200)
    
    def post(self):
        json = request.get_json()

        new_coach = Coach(
            first_name = json['first_name'],
            last_name = json['last_name'],
            playing_style = json['playing_style'],
            username = json['username'],
        )
        new_coach.password_hash = json['_password_hash']
        db.session.add(new_coach)
        db.session.commit()
        coach_dict = new_coach.to_dict()
        login_user(new_coach)
        return make_response(jsonify(coach_dict, 201))
    
api.add_resource(Coaches, '/coaches')

class Rosters(Resource):

    def get(self):
        rosters = [roster.to_dict() for roster in Roster.query.all()]
        return make_response(rosters, 200)
    
    def post(self):
        json = request.get_json()

        new_roster = Roster(
            roster_size = json['roster_size'],
            level = json['level'],
            year = json['year'],
            coach_id = json['coach_id'],
            team_id = json['team_id']
        )
        db.session.add(new_roster)
        db.session.commit()
        roster_dict = new_roster.to_dict()
        return make_response(jsonify(roster_dict))
    
api.add_resource(Rosters, '/rosters')

class RostersById(Resource):

    def get(self, id):
        roster = Roster.query.filter(Roster.id == id).first()
        return make_response(roster.to_dict(), 201)

    def patch(self, id):
        roster = Roster.query.filter(Roster.id == id).first()
        json = request.get_json()

        for attr in json:
            setattr(roster, attr, json[attr])
        db.session.add(roster)
        db.session.commit()
        roster_dict = roster.to_dict()
        response = make_response(
            roster_dict,
            200
        )
        return response
    
    def delete(self, id):
        roster = Roster.query.filter(Roster.id == id).first()
        if roster:
            db.session.delete(roster)
            db.session.commit()
            body = {}
            return make_response(body, 204)
        return {'error': 'Roster not found'}
    
api.add_resource(RostersById, '/rosters/<int:id>')

class Login(Resource):

    def post(self):
        json = request.get_json()

        username = json['username']
        coach = Coach.query.filter(Coach.username == username).first()

        password = json['password']

        if coach:
            if coach.authenticate(password):
                login_user(coach)
                return jsonify({'success': True})
            return jsonify({'success': False, 'message': 'Invalid Credentials'})
    
        return {'error': 'Invalid username or password'}, 401

api.add_resource(Login, '/login')


class Logout(Resource):
    @login_required
    def delete(self):
        logout_user()
        body = {}
        return(make_response(body, 200))
    
api.add_resource(Logout, '/logout')

class CurrentUser(Resource):
    
    def get(self):
        if current_user:
            return make_response(jsonify(current_user.to_dict()))
        else: 
            return {'data': 'unsuccessful'}

api.add_resource(CurrentUser, '/currentuser')


if __name__ == '__main__':
    app.run(port=3333, debug=True)