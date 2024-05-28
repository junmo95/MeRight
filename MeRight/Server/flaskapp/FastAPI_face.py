#-*- coding:utf-8 -*-
from fastapi import FastAPI
from Face_model import Face
import os 
import json
import uvicorn

app = FastAPI()

feature_db = []

@app.get('/face')
def create_upload_files(img_name: str = ''):
    #파일에 저장된 이미지로 dlib 적용
    # feature_db.append(Face())

    for img in os.listdir('img'): #이미지 저장된 경로
        feature_db.append(Face(img))
        print(type(img))

    feature_result = []
    
    for i in range(len(feature_db)):
        # feature_result.append(feature_db[i][0].tolist())
        feature_result = feature_db[i][0].tolist()
        print(i, "는 "   , feature_result)
        feature_json = json.dumps({'feature' : feature_result})
    return feature_json



if __name__ == "__main__":
    uvicorn.run(app, port=8000)















