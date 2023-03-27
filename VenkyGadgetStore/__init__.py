from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_login import LoginManager

db = SQLAlchemy()
DB_NAME = "database.db"



def create_VenkyGadgetStore_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'my key'
    app.config['DATABASE_URL'] = f'postgres://rznsalywifovow:457099221710f6c1530351a2f371129b0c5227db93f4b41a25033f2b623630a8@ec2-52-215-68-14.eu-west-1.compute.amazonaws.com:5432/dat2cntmt9lq5f'
    #app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'

    app.config['SQLALCHEMY_DATABASE_URI'] =f'postgres://rznsalywifovow:457099221710f6c1530351a2f371129b0c5227db93f4b41a25033f2b623630a8@ec2-52-215-68-14.eu-west-1.compute.amazonaws.com:5432/dat2cntmt9lq5f'
    db.init_app(app)

    from .views import views
    from .auth import auth

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    from .models import User, Note
    with app.app_context():
        db.create_all()

    #create_database(app)

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))

    return app


def create_database(app):
    if not path.exists('website/' + DB_NAME):
        db.create_all(app=app)
        #print('fitness factory db is created')
