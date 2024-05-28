#-*- coding:utf-8 -*-
# flaskapp/init_db.py
# DB 구동을 위한 내용 모음

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base


mysql_url = "mysql+pymysql://meright_user:1234@localhost/merightdb?charset=utf8"
engine = create_engine(mysql_url, echo=True, convert_unicode=True)

db_session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))
# 트랜잭션 관리를 위해 autocommit은 False, commit하지 않으면 DB에 반영되지 않음.

Base = declarative_base()
Base.query = db_session.query_property()


def init_database():
    Base.metadata.create_all(bind=engine)

