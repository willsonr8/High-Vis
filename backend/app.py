from flask import Flask
from flask_cors import CORS
from flask_caching import Cache

cache = Cache()

def create_app():
    app = Flask(__name__)
    app.debug = True
    CORS(app)
    app.config['CACHE_TYPE'] = 'SimpleCache'
    app.config['CACHE_DEFAULT_TIMEOUT'] = 600
    cache.init_app(app)

    from .api.players import player_bp
    app.register_blueprint(player_bp, url_prefix='/player')

    from .API import APICalls
    APICalls.initialize()
    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
