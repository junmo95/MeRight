#-*- coding:utf-8 -*-
from fastapi import FastAPI
import uvicorn
import json
# import os
# import torch
# from torch import nn
# import torch.nn.functional as F
# import torch.optim as optim
# from torch.utils.data import Dataset, DataLoader
# import gluonnlp as nlp
# import numpy as np
# from tqdm import tqdm, tqdm_notebook
# import pandas as pd

# #kobert
# from kobert.utils import get_tokenizer
# from kobert.pytorch_kobert import get_pytorch_kobert_model
# from kobert_tokenizer import KoBERTTokenizer

# #transformers
# from transformers import AdamW
# from transformers.optimization import get_cosine_schedule_with_warmup
# from transformers import BertModel

app = FastAPI()


@app.get('/chat')
def make_answer(user_Q: str):
    print(user_Q)
    result = predict(user_Q)
    print(result)
    user_A = {'user_A' : result}
    user_A = json.dumps(user_A)
    return user_A


# #GPU 사용 시
# device = torch.device("cuda:0")

# tokenizer = KoBERTTokenizer.from_pretrained('skt/kobert-base-v1')
# tok=tokenizer.tokenize
# model, vocab = get_pytorch_kobert_model()

# # 5. 입력 데이터셋을 토큰화하기
# class BERTDataset(Dataset):
#     def __init__(self, dataset, sent_idx, label_idx, bert_tokenizer,max_len,
#                 pad, pair):


#         transform = nlp.data.BERTSentenceTransform(
#             bert_tokenizer, max_seq_length=max_len,vocab=vocab, pad=pad, pair=pair)

#         self.sentences = [transform([i[sent_idx]]) for i in dataset]
#         self.labels = [np.int32(i[label_idx]) for i in dataset]

#     def __getitem__(self, i):
#         return (self.sentences[i] + (self.labels[i], ))


#     def __len__(self):
#         return (len(self.labels))

# # Setting parameters
# max_len = 64 # 해당 길이를 초과하는 단어에 대해선 bert가 학습하지 않음
# batch_size = 64
# warmup_ratio = 0.1
# num_epochs = 100
# max_grad_norm = 1
# log_interval = 100
# learning_rate =  5e-5
# #vocab=None

# class BERTClassifier(nn.Module):
#     def __init__(self,
#                  bert,
#                  hidden_size = 768,
#                  num_classes=6,   ##클래스 수 조정##
#                  dr_rate=None,
#                  params=None):
#         super(BERTClassifier, self).__init__()
#         self.bert = bert
#         self.dr_rate = dr_rate

#         self.classifier = nn.Linear(hidden_size , num_classes)
#         if dr_rate:
#             self.dropout = nn.Dropout(p=dr_rate)

#     def gen_attention_mask(self, token_ids, valid_length):
#         attention_mask = torch.zeros_like(token_ids)
#         for i, v in enumerate(valid_length):
#             attention_mask[i][:v] = 1
#         return attention_mask.float()

#     def forward(self, token_ids, valid_length, segment_ids):
#         attention_mask = self.gen_attention_mask(token_ids, valid_length)

#         _, pooler = self.bert(input_ids = token_ids, token_type_ids = segment_ids.long(), attention_mask = attention_mask.float().to(token_ids.device),return_dict=False)
#         if self.dr_rate:
#             out = self.dropout(pooler)
#         return self.classifier(out)


# #!pwd
# # Commented out IPython magic to ensure Python compatibility.
# # %cd drive/MyDrive/
# # %cd [프로젝트 위치]
# #!ls
# # model = BERTClassifier(model,  dr_rate=0.5).to(device)
# #BERT 학습 모델 불러오기
# # device = "cuda" if torch.cuda.is_available() else "cpu"
# model = torch.load('models/model6.pt')
# #map_location=device

# def predict(predict_sentence):

#     data = [predict_sentence, '0']
#     dataset_another = [data]

#     another_test = BERTDataset(dataset_another, 0, 1, tok, max_len, True, False)
#     test_dataloader = torch.utils.data.DataLoader(another_test, batch_size=batch_size, num_workers=5)

#     model.eval()

#     for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(test_dataloader):
#         token_ids = token_ids.long().to(device)
#         segment_ids = segment_ids.long().to(device)

#         valid_length= valid_length
#         label = label.long().to(device)

#         out = model(token_ids, valid_length, segment_ids)
#         for i in out:
#             logits = i
#             logits = logits.detach().cpu().numpy()
#             tmp = []
#             for _ in range(len(logits)):
#                 print(_, logits[_])
#                 tmp.append((_, logits[_]))
#             tmp.sort(key=lambda x: x[1], reverse=True)
#             print(tmp)
#             string_lst = ["이미지 검색하기", "개인정보 유출", "구제방법 알아보기", "전문가 상담 요청하기", "게시판 연결", "비용"]
#             result = [string_lst[t[0]] for t in tmp if t[1] > 1]
#             if len(result) == 0:
#                 print("이해하지못했습니다. 다시 입력해주세요!")
#                 return "잘 이해하지 못했어요! 다시 입력해주세요."
#             elif len(result) == 1:
#                 print(result[0])
#                 return result[0]
#             else:
#                 print(result[0:2])
#                 return result[0:2]


def predict(a):
    b = a
    return b



# if getattr(module, '__name__', None) in ['__mp_main__', '__main__']:
# if getattr(module, '__name__', None) in [None, '__mp_main__', '__main__']:
#     uvicorn.run(app, port=8001)
if __name__ == "__main__":
    uvicorn.run(app, port=8001)














