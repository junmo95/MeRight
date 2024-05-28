#-*- coding:utf-8 -*-
# flaskapp/tests.py
# 테스트용 라우팅 코드

from flask import g, request, Response, make_response, Flask
from datetime import datetime, date
from flaskapp.model import User, Board
from flaskapp.init_db import db_session
from sqlalchemy.exc import SQLAlchemyError

app = Flask(__name__)

@app.route('/test')
def hello():
    return "Hello User! " + getattr(g, 'str', '111')


@app.route('/res1')
def res1():
    custom_res = Response("Custom Response", 200, {'test': 'ttt'})
    return make_response(custom_res)


# environ 환경 정보 확인해보기
@app.route('/test_wsgi')
def wsgi_test():
    def application(environ, start_response):
        body = 'The request method was %s' % environ['REQUEST_METHOD']
        headers = [('Content-Type', 'text/plain'),
                   ('Content-Length', str(len(body)))]
        start_response('200 OK', headers)
        return [body]

    return make_response(application)


@app.route('/rp')
def rp():
    q = request.args.get('q')
    return "q= %s" % str(q)


# 파라미터 여러개 받기
# @app.route('/rp')
# def rp():
#     q = request.args.getlist('q')
#     return "q= %s" % str(q)


# @app.before_request
# def before_request():
#     print("before request")
#     g.str = "한글"


# request 처리용 함수
def ymd(fmt):
    def trans(date_str):
        return datetime.strptime(date_str, fmt)

    return trans


@app.route('/dt')
def dt():
    datestr = request.values.get('date', date.today(), type=ymd('%Y-%m-%d'))
    return "우리나라 시간 형식 : " + str(datestr)


@app.route('/reqenv')
def reqenv():
    return('REQUEST_METHOD : %(REQUEST_METHOD) s <br>'
           'SCRIPT_NAME : %(SCRIPT_NAME) s' % request.environ)


@app.route('/db_test')
def db_crud():
    try:
        u = User("mingzhi", "minji@naver.com", "1234")
        # u = User.query.filter(User.id == 1).first()

        u.email = "change@daum.net"
        db_session.add(u)
        db_session.commit()

    except SQLAlchemyError as sqlerr:
        db_session.rollback()
        print("SQLError >> ", sqlerr)

    except:
        print("Error!!")

    # ret = User.query.filter(User.id > 0)

    return ('hello')
        # "RET= " + str(ret)