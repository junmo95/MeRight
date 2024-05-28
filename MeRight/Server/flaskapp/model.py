#-*- coding:utf-8 -*-
# flaskapp/model.py
# DB Model 내용

from sqlalchemy import Column, Integer, DateTime, TIMESTAMP, ForeignKey, PrimaryKeyConstraint, func, VARCHAR, TEXT
# from sqlalchemy.orm import relationship, backref
from flaskapp.init_db import Base


# user : 사용자
class User(Base):
    __tablename__ = 'User'
    id = Column(Integer, autoincrement=True, primary_key=True)
    username = Column(VARCHAR(45), unique=True, nullable=False)
    passwd = Column(VARCHAR(1000), nullable=False)
    email = Column(VARCHAR(45), unique=True, nullable=False)

    def __init__(self, username, email, passwd):
        self.username = username
        self.email = email
        self.passwd = passwd

    def __repr__(self):
        return 'User %s, %r, %r' % (self.id, self.email, self.username)


# request : 검색 요청
class SearchReq(Base):
    __tablename__ = 'SearchReq'
    request_id = Column(Integer, autoincrement=True, primary_key=True)
    user_id = Column(Integer, ForeignKey(User.id), nullable=False)
    img_desc = Column(TEXT)
    keyword_1 = Column(VARCHAR(45))
    keyword_2 = Column(VARCHAR(45))
    keyword_3 = Column(VARCHAR(45))
    keyword_4 = Column(VARCHAR(45))
    keyword_5 = Column(VARCHAR(45))
    request_dt = Column(DateTime(timezone=True), server_default=func.now())
    result_cnt = Column(Integer, default=0)
    result_list = Column(TEXT)

    def __init__(self, user_id, img_desc=None, keyword_1=None, keyword_2=None, keyword_3=None, keyword_4=None, keyword_5=None):
        self.user_id = user_id
        self.img_desc = img_desc
        self.keyword_1 = keyword_1
        self.keyword_2 = keyword_2
        self.keyword_3 = keyword_3
        self.keyword_4 = keyword_4
        self.keyword_5 = keyword_5

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


# crawling_target : 크롤링 대상 사이트 주소
class CrawlingTarget(Base):
    __tablename__ = 'Crawling_Target'
    id = Column(Integer, autoincrement=True, primary_key=True)
    board_name = Column(VARCHAR(45), unique=True)

    def __init__(self, board_name):
        self.board_name = board_name


# board : 게시판 글
class Board(Base):
    __tablename__ = 'Board'
    id = Column(Integer, autoincrement=True, primary_key=True)
    user_id = Column(Integer, ForeignKey(User.id), nullable=False)
    title = Column(TEXT)
    content = Column(TEXT)
    # create_date = Column(DateTime(timezone=True), server_default=func.now())

    def __init__(self, user_id, title=None, content=None):
        self.user_id = user_id
        self.title = title
        self.content = content

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


# comment : 게시판 댓글
class Comment(Base):
    __tablename__ = 'Comment'
    id = Column(Integer, autoincrement=True, primary_key=True)
    board_id = Column(Integer, ForeignKey(Board.id), nullable=False)
    user_id = Column(Integer, ForeignKey(User.id), nullable=False)
    create_date = Column(DateTime(timezone=True), server_default=func.now())
    content = Column(TEXT)

    def __init__(self, board_id, user_id, content=None):
        self.board_id = board_id
        self.user_id = user_id
        self.content = content
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

