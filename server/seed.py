from random import randint
from faker import Faker
from app import app
from models import db, Coach, Roster, Player, Team

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        Coach.query.delete()
        Player.query.delete()
        Roster.query.delete()
        Team.query.delete()

        coaches = []
        rosters = []
        teams = []
        players = []
        choices = ['light', 'dark', 'sporty', 'business']

        print("Creating Coaches")
        for i in range(10):
            coach = Coach(
                first_name = fake.first_name(),
                last_name = fake.last_name(),
                playing_style = fake.name(),
                username = fake.city(),
                _password_hash = fake.password()
            )
            coaches.append(coach)
        db.session.add_all(coaches)
        db.session.commit()

        print("Creating Teams")
        for i in range(10):
            team = Team(
                city = fake.first_name(),
                mascot = fake.last_name(),
                wins = randint(0, 50),
                theme = fake.random_element(elements=[choice for choice in choices])
            )
            teams.append(team)
        db.session.add_all(teams)
        db.session.commit()

        print("Creating Rosters")
        for i in range(25):
            roster = Roster(
                roster_size = randint(10, 25),
                level = fake.first_name(),
                year = fake.year(),
                coach_id = fake.random_element(elements=[coach.id for coach in coaches]),
                team_id = fake.random_element(elements=[team.id for team in teams])
            )
            rosters.append(roster)
        db.session.add_all(rosters)
        db.session.commit()

        print("Creating Players")
        for i in range(50):
            player = Player(
                first_name = fake.first_name(),
                last_name = fake.last_name(),
                position = fake.name(),
                age = randint(18, 40),
                roster_id = fake.random_element(elements=[roster.id for roster in rosters])
            )
            players.append(player)
        db.session.add_all(players)
        db.session.commit()



