#-*- coding:utf-8 -*-
##### 현제 계획 ######
# API로 이미지를 받아서 데이터베이스의 사진과 비교, 맞는 사진 위치 API 보내기


import dlib, cv2
import numpy as np

#객체 선언
detector = dlib.get_frontal_face_detector()
sp = dlib.shape_predictor('models/shape_predictor_68_face_landmarks.dat')
facerec = dlib.face_recognition_model_v1('models/dlib_face_recognition_resnet_model_v1.dat')


def Face(img):
    ##함수들##
    #얼굴 탐지, 랜드마크
    def find_faces(img):
        dets = detector(img, 1)
        if len(dets) == 0:
            return np.empty(0), np.empty(0), np.empty(0)
        rects, shapes = [], []
        shapes_np = np.zeros((len(dets), 68, 2), dtype=np.int)
        for k, d in enumerate(dets):
            rect = ((d.left(), d.top()), (d.right(), d.bottom()))
            rects.append(rect)
            shape = sp(img, d)
            for i in range(0, 68):
                shapes_np[k][i] = (shape.part(i).x, shape.part(i).y)
            shapes.append(shape)
        return rects, shapes, shapes_np

    #얼굴  특징값
    def encode_faces(img, shapes):
        face_descriptors = []
        for shape in shapes:
            face_descriptor = facerec.compute_face_descriptor(img, shape)
            face_descriptors.append(np.array(face_descriptor))
        return np.array(face_descriptors)

    ##고객 이미지 받아 처리하기##
    # 고객의 한개의 사진(통짜) -> 다수의 관련 사진 특징(특징값)

    img_path = 'img/' + img  #대상 이미지 <= 여기다가 API 로 사진 받아보기

    # img_path = '../flask/upload' + img  #대상 이미지 <= 여기다가 API 로 사진 받아보기


    data_descs = [] #고객 이미지들 특징값 저장 위치

    #고객 이미지들 특징값 descs 리스트에 저장
    print(img_path)
    img_bgr = cv2.imread(img_path)
    img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)
    _, img_shapes, _ = find_faces(img_rgb)
    target_descs = encode_faces(img_rgb, img_shapes)[0] # [~~~~~] 상태

    print(target_descs)

    return [target_descs]

        
        
        
    



