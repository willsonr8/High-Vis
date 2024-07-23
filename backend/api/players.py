from flask import Blueprint

player_bp = Blueprint('player', __name__)


@player_bp.route('/<player_name>', methods=['GET'])
def get_player(player_name):
    return f"{player_name}"
