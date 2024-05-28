from flask import Flask, request
import pymysql

app = Flask(__name__)


class MyuserDao:
    def __init__(self):
        pass
    # 유저정보 가져오기
    def getusers(self):
        ret = []
        db = pymysql.connect(host='localhost', port=3306, user='meright_user', db='merightdb', password='1234', charset='utf8')
        curs = db.cursor()

        sql = "select * from user";
        curs.execute(sql)

        rows = curs.fetchall()
        for e in rows:
            temp = {'id': e[0], 'user_id': e[1], 'password': e[2], 'email': e[3]}
            ret.append(temp)

        db.commit()
        db.close()
        return ret
    #유저 정보 넣기
    def insuser(self, id, user_id, password, email):
        db = pymysql.connect(host='localhost', user='meright_user', port=3306, db='merightdb', password='1234', charset='utf8')
        curs = db.cursor()

        sql = '''insert into user (id, user_id, password, email) values(%s,%s,%s,%s)'''
        curs.execute(sql, (id, user_id, password, email))
        db.commit()
        db.close()
    #유저 정보 수정
    def upduser(self, id, user_id, password, email):
        db = pymysql.connect(host='localhost', user='meright_user', port=3306, db='merightdb', password='1234', charset='utf8')
        curs = db.cursor()

        sql = "update user set user_id=%s, password=%s, email=%s where id=%s"
        curs.execute(sql, (user_id, password, email, id))
        db.commit()
        db.close()
    #유저 정보 삭제
    def deluser(self, id):
        db = pymysql.connect(host='localhost', user='meright_user', port=3306, db='merightdb', password='1234', charset='utf8')
        curs = db.cursor()

        sql = "delete from user where id=%s"
        curs.execute(sql, id)
        db.commit()
        db.close()


if __name__ == "__main__":
    # MyuserDao().insuser('aaa', 'bb', 'cc', 'dd')
    # MyuserDao().upduser('aa', 'dd', 'dd', 'aa')
    # MyuserDao().deluser('aaa')
    userlist = MyuserDao().getusers();
    app.run(debug=True)
