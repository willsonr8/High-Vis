from os import environ

class Config:
    SECRET_KEY = environ.get('SECRET_KEY', 'default_secret_key')
    SQLALCHEMY_DATABASE_URI = environ.get("DATABASE_URL")