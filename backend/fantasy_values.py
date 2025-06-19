PPR_SCORING = {
    "two_point_conversions": 2,
    "pass_yards": 0.04,
    "pass_attempts": 0,
    "pass_td": 4,
    "pass_completions": 0,
    "pass_interceptions": -2,
    "points_per_reception": 1,
    "carries": 0,
    "rush_yards": 0.1,
    "rush_td": 6,
    "fumbles": -2,
    "receiving_yards": 0.1,
    "receiving_td": 6,
    "targets": 0,
    "fg_made": 3,
    "fg_missed": -1,
    "xp_made": 1,
    "xp_missed": -1,
}

STANDARD_SCORING = {
    **PPR_SCORING,
    "points_per_reception": 0,
}

HALF_PPR_SCORING = {
    **PPR_SCORING,
    "points_per_reception": 0.5,
}

IDP_PPR_SCORING = {
    **PPR_SCORING,
    "idp_total_tackles": 0,
    "idp_solo_tackles": 0,
    "idp_tfl": 0,
    "idp_qb_hits": 0,
    "idp_int": 0,
    "idp_sacks": 0,
    "idp_pass_deflections": 0,
    "idp_fumbles_recovered": 0,
}

IDP_STANDARD_SCORING = {
    **IDP_PPR_SCORING,
    "points_per_reception": 0,
}

IDP_HALF_PPR_SCORING = {
    **IDP_PPR_SCORING,
    "points_per_reception": 0.5,
}