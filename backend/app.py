from flask import Flask
from flask_cors import CORS
from flask_caching import Cache
from backend.server.requests import Server
from backend.api.players import player_bp
from backend.api.teams import team_bp

cache = Cache()

def create_app():
    app = Flask(__name__)
    app.debug = True
    CORS(app)
    # app.config['CACHE_TYPE'] = 'SimpleCache'
    # app.config['CACHE_DEFAULT_TIMEOUT'] = 600
    # cache.init_app(app)

    app.register_blueprint(player_bp, url_prefix='/player')
    app.register_blueprint(team_bp, url_prefix='/team')

    Server.initialize()
    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
