#-*- coding:utf-8 -*-
# flaskapp/views.py
# 라우팅 내용 담은 파일

from flask import request, Response, make_response, jsonify, redirect, Flask, render_template
from flaskapp import app
from datetime import datetime, timedelta
from flaskapp.init_db import db_session
from flaskapp.model import User, Board, SearchReq, Comment
from elasticsearch import Elasticsearch
from werkzeug.utils import secure_filename
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from functools import wraps
import requests
import json
import jwt
import os
import time
import pymysql

jwt_blocklist = set()

bcrypt = Bcrypt(app)

CORS(app)

SECRET_KEY = "MerightSecret"

app.config['JSON_AS_ASCII'] = False     # 한글깨짐오류 해결

@app.route('/', methods=['GET'])
def index():
    return "Welcome to MeRight API"


# 로그인 불필요
@app.route("/sign-up", methods=['POST'])
def sign_up():
    user_req = request.get_json(force=True)
    username = user_req["username"]
    email = user_req["email"]
    passwd = user_req["passwd"]
    passwd_text = bcrypt.generate_password_hash(passwd)
    u = User(username, email, passwd_text)
    print('가입 정보 확인 : ', u.username, u.passwd, u.email)
    if User.query.filter(User.email == email).all():
        db_session.rollback()
        return jsonify({"regist": "fail_email 중복된 이메일이 있습니다."})
    elif User.query.filter(User.username == username).all():
        db_session.rollback()
        return jsonify({"regist": "fail_name 중복된 아이디가 있습니다."})
    else:
        print('@@@@@@@@@@@@@@')
        db_session.add(u)
        db_session.commit()
        print('3333333333333333')
        return jsonify({"regist": "success"})


# 로그인 토큰 체크 함수
def check_access_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms='HS256')

    except jwt.ExpiredSignatureError:
        payload = None
    except jwt.InvalidTokenError:
        payload = None

    return payload


# 로그인 체크 데코레이터
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwagrs):
        access_token = request.cookies.get('access_token')  # 요청의 토큰 정보를 받아옴! 근데 없으면?
        # print('token: ', access_token)

        if access_token is not None:    # 토큰이 있는 경우
            access_token = access_token.replace("%22", "")   # 토큰이 있는 경우에만 replace시도
            payload = check_access_token(access_token) # 토큰 유효성 확인
            if payload is None:     # 토큰 decode 실패
                return jsonify({'success': 'false', "msg": "invalid token"})
        else:   # 토큰이 없는 경우
            return jsonify({'success': 'false', "msg": "please login"})
        return f(*args, **kwagrs)
    return decorated_function


# 로그인 불필요
@app.route('/login', methods=['POST'])
def login_post():   # json으로 받거나, form으로 받거나!
    req = request.get_json(force=True)

    username = req.get('username', None)
    passwd = req.get('passwd', None)
    u = User.query.filter(User.username == username).first()
    # print(u)
    if u and bcrypt.check_password_hash(u.passwd, passwd):
        payload = {
            'id': username,
            'exp': datetime.utcnow() + timedelta(seconds=60*60)  # 로그인 1시간 유지
        }

        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
        return jsonify({'success': 'true', 'access_token': token, 'user_id': u.id, 'username' : u.username, 'email' : u.email})  # 마이페이지 필요한 유저정보 넘기기

    # 아이디, 비밀번호가 일치하지 않는 경우
    elif User.query.filter(User.username == username).first():
        print('비밀번호가 틀렸습니다.')
        return jsonify({'success': 'false_passwd'})
    else:
        print('존재하지 않는 회원입니다.')
        return jsonify({'success': 'false_username'})


# 로그인 불필요
@app.route('/logout')
def logout():
    req = request.get_json(force=True)
    username = req.get('username', None)
    payload = {
        'id': username,
        'exp': datetime.utcnow() + timedelta(seconds=0.1)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

    return jsonify({'logout': 'success', 'access_token' : token})


@app.route('/board/list', methods=['GET'])
def board_list():
    boards = Board.query.all()
    return {'list': [i.as_dict() for i in boards]}


@app.route('/board/write', methods=['POST'])
@login_required
def board_write():
    req = request.get_json(force=True)

    user_id = request.cookies.get('user_id')
    title = req.get('title')
    content = req.get('content')
    b = Board(user_id, title, content)
    # print(b)
    # data_json = json.loads(b, ensure_ascii=False).encode('utf8')
    db_session.add(b)
    db_session.commit()
    return jsonify({'success': 'true'})   # 저장 완료
    # except:
    #     return jsonify({'success': 'false'})    # 저장 실패


@app.route('/board/read/<int:bid>', methods=['GET', 'POST'])
# @login_required
def board_read(bid):
    b = Board.query.filter(Board.id == bid).first()
    c = Comment.query.filter(Comment.board_id == bid).all()
    if request.method == 'GET':

        return jsonify({'success': 'true', "result_b": b.as_dict(), "result_c": [i.as_dict() for i in c]})  # 저장 완료
    elif request.method == 'POST':
        req = request.get_json(force=True)
        board_id = bid
        user_id = request.cookies.get('user_id')
        content = req.get('content')
        c = Comment(board_id, user_id, content)
        db_session.add(c)
        db_session.commit()
        return jsonify({'success': 'success', 'content': content, 'time' : c.create_date})


# @app.route('/board/comment/<int:bid>', methods=['GET'])
# # @login_required
# def board_comment(bid):
#     if request.method == 'GET':
#         b = Board.query.filter(Board.id == bid).first()
#         c = Comment.query.filter(Comment.board_id == bid).all()
#         return jsonify({'success': 'true', "result_b": b.as_dict(),"result_c": [i.as_dict() for i in c]})


@app.route('/board/modify/<int:bid>', methods=['POST'])
@login_required
def board_modify(bid):
    req = request.get_json(force=True)
    user_id = request.cookies.get('user_id')
    title = req.get('title')
    content = req.get('content')
    # try:
    b = Board.query.filter(Board.id == bid).first()
    if  b.user_id == int(user_id):
        b.title = title
        b.content = content
        db_session.add(b)
        db_session.commit()
        return jsonify({'success': 'true'})     # 수정 완료
        # else:
        #     return jsonify({'success': 'false'})    # 저장 실패   # 수정 실패, 권한이 없는 사용자
    # except:
    #     return jsonify({'success': 'false'})    # 수정 실패


@app.route('/board/delete/<int:bid>')
@login_required
def board_delete(bid):
    b = Board.query.filter(Board.id == bid).first()
    user_id = request.cookies.get('user_id')
    # print(b.title)
    # print(b.content)
    if (b is not None) and b.user_id == int(user_id):
        try:
            db_session.delete(b)
            db_session.commit()
            return jsonify({'success': 'true'})# 삭제 완료
        except:
            return jsonify({'success': 'false'})    # 삭제 실패. DB오류
    else:
        return jsonify({'success': 'false'})    # 삭제 실패, 권한이 없는 사용자


# 키워드 검색 요청
@app.route('/search', methods=['POST'])
@login_required
def search_request():
    req = request.get_json(force=True)
    user_id = request.cookies.get('user_id')
    keywords = [req.get('keyword_1'), req.get('keyword_2'), req.get('keyword_3'), req.get('keyword_4'), req.get('keyword_5')]
    try:
        r = SearchReq(user_id, None, keyword_1=keywords[0], keyword_2=keywords[1], keyword_3=keywords[2], keyword_4=keywords[3], keyword_5=keywords[4])
        db_session.add(r)
        db_session.commit()
        appended_keyword = ""
        for keyword in keywords:
            if keyword is not None:
                appended_keyword += " " + keyword
            else:
                break

        user_info = User.query.filter(User.id == user_id).first()
        data = search_keyword(appended_keyword)

        if data:     # 검색 결과가 있으면
            return jsonify({'success': 'true', "username": user_info.username, 'result': data})
        else:
            return jsonify({'success': 'false', "username": user_info.username, 'msg': "안내할 메시지 - ex)n개의 데이터에서 검색했으나 일치하는 결과가 없다... 어쩌구"})
    except:
        return jsonify({'success': 'error'})


# @app.route('/essearch')
# 얼굴검색 (vector에 사용자 feature넣기)
def search_feature(feature):
    es = Elasticsearch(['http://localhost:9200/'])
    sizes = 900
    res = es.search(index='crawling*', body={
        'query':{
            'script_score': {
            'query': {"exists": { "field": "img_desc"}},
            'script': {
                'source': "1 / (1 + l2norm(params.query_vector, 'img_desc'))",
                'params': {'query_vector': feature}
            }
            }
        },"size": sizes
    })
    data = []
    for hit in res['hits']['hits']:
        inner_data = {}
        print(hit['_source']['link'])
        print(hit['_source']['img_url'])
        inner_data['id'] = hit['_id']
        inner_data['link'] = hit['_source']['link']
        inner_data['img_url'] = hit['_source']['img_url']
        if hit['_score']>0.72:
            data.append(inner_data)
        else:
            continue

    print("hits 갯수: ", res['hits']['total']['value'])
    print("출력 갯수: ", len(res['hits']['hits']))

    data_json = json.dumps(data, ensure_ascii=False, indent=4)
    # data_json = json.dumps(res['hits']['hits'], ensure_ascii=False, indent=4) #전체 받을때 사용
    return data_json


# 이미지 검색 요청
@app.route('/face', methods=['POST'])
@login_required
def image_dlib():
    # 이미지 넘기기(먼저서버로 넘기기 테스트)
    if request.method == 'POST':
        # 받은 이미지 파일에 저장
        # 파일 비우기 -> 안해도 될듯?
        for delete_img in os.scandir('./flaskapp/img'):
            os.remove(delete_img.path)

        user_id = request.cookies.get('user_id')
        f = request.files['imgfile']  # 파일 받기
        f.save("./flaskapp/img/" + secure_filename(f.filename))  # 저장할 경로 + 파일명

        # request 통해서 fastapi에서 dlib 동작후 json으로 특징값 받기
        url = 'http://localhost:8000/face?img_name=' + f.filename
        resp = requests.get(url)  # request 타입으로 받기
        data = resp.json()  # 제이슨 형태로 읽기
        data = json.loads(data)
        img_desc = data['feature']
        print("img_desc 추출 시, 데이터 타입: ", type(img_desc))
        r = SearchReq(user_id, str(img_desc))
        db_session.add(r)
        db_session.commit()

        user_info = User.query.filter(User.id == user_id).first()
        data = search_feature(img_desc)
        result = {"username": user_info.username, "result": data}

        return jsonify(result)


@app.route('/search_mypage/<int:sid>', methods=['GET'])
def search(sid):
    s = SearchReq.query.filter(SearchReq.request_id == sid).first()
    img = s.img_desc
    print("여기가 내 이미지 벡터값: ", img)
    print("이건 타입: ", type(img))
    if img is None:
        keywords = [s.keyword_1, s.keyword_2, s.keyword_3, s.keyword_4, s.keyword_5]
        appended_keyword = ""
        for keyword in keywords:
            if keyword is not None:
                appended_keyword += " " + keyword
            else:
                break
        # print("키워드 검색 요청 값: ", appended_keyword)
        user_id = request.cookies.get('user_id')
        user_info = User.query.filter(User.id == user_id).first()
        data = search_keyword(appended_keyword)

        if data:  # 검색 결과가 있으면
            return jsonify({'success': 'true', "username": user_info.username, 'result': data})
        else:
            return jsonify({'success': 'false', "username": user_info.username,
                            'msg': "안내할 메시지 - ex)n개의 데이터에서 검색했으나 일치하는 결과가 없다... 어쩌구"})
    else:
        print("list 변환 시 img_desc 값: ", list(img))
        print("list 변환 시 img_desc 타입: ", type(list(img)))

        print("eval 변환 시 img_desc 값: ", eval(img))
        print("eval 변환 시 img_desc 타입: ", type(eval(img)))

        img = eval(img)
        print("Image Search, vector: ", img)
        face = search_feature(img)
        return jsonify(face)


@app.route('/chat', methods=['GET'])
def chat_fromfastapi():
    if request.method == 'GET':
        user_Q = request.args.get('user_Q')
        print('###########', user_Q)
        #get from react
        # user_Q = {'user_Q': 'this is question'} # react에서 받았다고 가정
        #get from fastapi
        url = 'http://localhost:8001/chat'

        try:
            resp = requests.get(url, {'user_Q' : user_Q})  
        except:
            time.sleep(2)
            resp = requests.get(url, {'user_Q' : user_Q})  

        # resp = requests.get(url, {'user_Q' : user_Q})        # request 타입으로 받기
        user_A = resp.json()                    # 제이슨 형태로 읽기
        return user_A                           # Answer teturn

# def extract_word(keyword, sentence):
#     switch = 0
#     start = 0
#     word = keyword
#     word_len = len(word)
#     sentence_len = len(sentence)+1

#     # 저장 장소
#     target_words = []  # 여기에 [[시작 인덱스, 끝 인덱스]] 형식으로 저장

#     ####문장에서 단어 위치 뽑아내기####
#     while switch != -1:
#         word_list = [] #문장 시작, 끝, 길이
#         switch = sentence.find(word, start)
#         if switch != -1:
#             word_list.append(switch)
#             start = switch + word_len
#             word_list.append(start-1)
#             target_words.append(word_list)
#         # print(target_words) #확인용

#     # print(len(target_words)) #확인용

#     target_sentence = [] #여기에 출력될 문자들이 저장
#     target_range = 30 # 앞뒤 검색범위


#     #### 뽑은 단어 위치를 통해 앞뒤문장 뽑아내기 ####
#     for target_group in target_words:
#         # print(target_group) #확인용

#         buffer = []
#         #앞부분
#         if target_group[0] - target_range < 0:
#             start = 0
#         else:
#             start = target_group[0] - target_range

#         if len(sentence[start:target_group[0]].split()) != 0:
#             buffer.extend(sentence[start:target_group[0]].split()[-3:-1])
#             buffer.append(sentence[start:target_group[0]].split()[-1])

#         #뒷부분
#         if target_group[1] + target_range > sentence_len:
#             end = sentence_len - 1
#         else:
#             end = target_group[1] + target_range

#         buffer.extend(sentence[target_group[0]:end].split()[0:3])
#         buffer = ' '.join(buffer)

#         # print('buffer : ', buffer) #확인용

#         # 해당 문장과 해당단어랑 같이 보낼경우
#         # target_sentence.append([buffer, word])
#         # print('여기가 buffer: ',buffer)
#         target_sentence.append(buffer)

#         # 해당 문장만 보낸경우
#         target_sentence.append(buffer)
#         # print(target_sentence)
    
#     return buffer


# @app.route('/essearch', methods=['POST']) # 직접 연결 없음. /search에서 호출함
# @login_required
# 키워드검색 (keyword)는 공백으로 연결 -> and 검색
def search_keyword(keyword):
    es = Elasticsearch(['http://localhost:9200/'])
    sizes=900
    res = es.search(index='crawling*', size=sizes, body={
      "query": {
        "multi_match": {
            "query": keyword,
            "operator": "and",
            "type": "cross_fields",
            "fields": ["title", "content"]
          }
        }
      })
    data = []
    for hit in res['hits']['hits']:
        inner_data = {}
        print(hit['_source']['link'])
        print(hit['_source']['title'])
        inner_data['id'] = hit['_id']
        inner_data['link'] = hit['_source']['link']
        inner_data['title'] = hit['_source']['title']
        inner_data['content'] = hit['_source']['content']
        data.append(inner_data)

    data_json = json.dumps(data, ensure_ascii=False, indent=4)
    # data_json=json.dumps(data['hits']['hits'],ensure_ascii=False, indent=4)
    return data_json

# def search_keyword(keyword):
#     es = Elasticsearch(['http://211.34.246.192:9200/'])
#     sizes=1000
#     res = es.search(index='crawling*', size=sizes, body={
#       "query": {
#         "multi_match": {
#             "query": keyword,
#             "operator": "and",
#             "type": "cross_fields",
#             "fields": ["title", "content"]
#           }
#         }
#       })
#     keyword=keyword.split()
#     data = []

#     for hit in res['hits']['hits']:
#         inner_data = {}
#         inner_data['id'] = hit['_id']
#         inner_data['link'] = hit['_source']['link']
#         for key in keyword:
#             if key in hit['_source']['title']:
#                 inner_data['keyword_' +str(keyword.index(key)+1)] = extract_word(key, hit['_source']['title'])
#             else:
#                 inner_data['keyword_'+ str(keyword.index(key)+1)] = extract_word(key, hit['_source']['content'])
#         data.append(inner_data)

#     print("hits 갯수: ", res['hits']['total']['value'])

#     data_json = json.dumps(data, ensure_ascii=False, indent=4)
#     return data_json


@app.route('/count')
# elasticsearch 데이터 전체 갯수, int type return
def es_count():
    es = Elasticsearch(['http://localhost:9200/'])
    data = es.count(index='crawling*', body={
            "query": {
                "match_all": {}
            }
        })
    return str(data["count"])


@app.route('/count/img')
# elasticsearch img_desc(feature) 갯수==얼굴갯수 int type return
def es_img_count():
    es = Elasticsearch(['http://localhost:9200/'])
    data = es.count(index='crawling*', body={
        "query": {
            "bool": {
                "filter": {"exists": {"field": "img_desc"}}
            }
            }
        }
    )
    return str(data["count"])


# @app.route('/mypage')
# @login_required
# def mypage():
#     user_id = request.cookies.get('user_id')
#     print("test!", user_id)
#     user_info = User.query.filter(User.id == user_id).first()
#     user_info = {'username': user_info.username,
#                   'email': user_info.email}
#     my_boards = Board.query.filter(Board.user_id == user_id).all()
#     search_history = SearchReq.query.filter(SearchReq.user_id == user_id).all()
#     return {'user_info': user_info, 'my_boards': [i.as_dict() for i in my_boards], 'search_history': [i.as_dict() for i in search_history]}


@app.route('/mypage')
@login_required
def mypage():
    user_id = request.cookies.get('user_id')
    user_info = User.query.filter(User.id == user_id).first()
    user_info = {'username': user_info.username,
                  'email': user_info.email}
    my_boards = Board.query.filter(Board.user_id == user_id).all()
    # search_history = SearchReq.query.filter(SearchReq.user_id == user_id).all()
    search_img = SearchReq.query.filter((SearchReq.user_id == user_id) &(SearchReq.img_desc != None)).all()
    search_tag = SearchReq.query.filter((SearchReq.user_id == user_id) &(SearchReq.img_desc == None)).all()
    # print(search_tag)
    # print(search_img)
    return {'user_info': user_info, 'my_boards': [i.as_dict() for i in my_boards], 'search_img': [i.as_dict() for i in search_img], 'search_tag': [i.as_dict() for i in search_tag]}


@app.route('/req_count')
def req_count():
    number_of_user_rows = 0
    number_of_searchreq_rows = 0
    try:
        db = pymysql.connect(host='localhost', port=3306, user='meright_user', passwd='1234', db='merightdb', charset='utf8')
        cursor = db.cursor()
        number_of_user_rows = cursor.execute("SELECT * FROM User")
        number_of_searchreq_rows = cursor.execute("SELECT * FROM SearchReq")
        cursor.execute(number_of_user_rows, number_of_searchreq_rows)
        db.close()

    finally:
        return jsonify({'reqcnt': number_of_searchreq_rows, 'usercnt': number_of_user_rows})