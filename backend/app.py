from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
#from dotenv import load_dotenv
from .api.users import users_bp
from .api.players import player_bp

#load_dotenv()
db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    app.debug = True
    CORS(app)
    #app.config.from_object('config.Config')
    db.init_app(app)
    app.register_blueprint(users_bp, url_prefix='/users')
    app.register_blueprint(player_bp, url_prefix='/player')
    with app.app_context():
        print(app.url_map)
    return app


if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        db.create_all()
    app.run(debug=True)
