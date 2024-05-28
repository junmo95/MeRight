#-*- coding:utf-8 -*-
# flaskapp/__init__.py
# flask

from flask import Flask, g, Response, make_response
from flaskapp.init_db import init_database, db_session


app = Flask(__name__)



import flaskapp.views
import flaskapp.tests

app.debug = True



# DB
@app.before_first_request
def beforeFirstRequest():
    print(">> before_first_request!!")
    init_database()


@app.teardown_appcontext
def teardown_context(exception):
    print(">>> teardown context!!", exception)
    db_session.remove()   # remove used db-session
