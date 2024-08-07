import streamlit as st
import pandas as pd
import faiss
from sklearn.feature_extraction.text import TfidfVectorizer
from openai import OpenAI

# 텍스트 파일에서 데이터 추출
def extract_tarot_descriptions_from_txt(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        text = file.read()
    
    # 카드 명칭과 설명을 매칭하는 로직
    cards = ["나그네", "전술사", "난이", "왕비", "임금", "스승", "연인", "거북선", "용기", 
             "현인", "운명", "정의", "매달린 사람", "저승", "절제", "도깨비", "붕괴", "별", 
             "달", "해", "업보", "세계"]
    
    descriptions = {}
    text_lines = text.split('\n')
    
    for i, card in enumerate(cards):
        start_idx = None
        for idx, line in enumerate(text_lines):
            if line.strip() == card:
                start_idx = idx
                break
        
        if start_idx is not None:
            if i + 1 < len(cards):
                next_card = cards[i + 1]
                end_idx = None
                for idx, line in enumerate(text_lines[start_idx+1:], start=start_idx+1):
                    if line.strip() == next_card:
                        end_idx = idx
                        break
            else:
                end_idx = len(text_lines)
            
            descriptions[card] = "\n".join(text_lines[start_idx+1:end_idx]).strip()
    
    return descriptions

# 검색 인덱스 생성
def create_faiss_index(descriptions):
    tarot_df = pd.DataFrame(list(descriptions.items()), columns=["label", "description"])
    vectorizer = TfidfVectorizer()
    embeddings = vectorizer.fit_transform(tarot_df['description'])
    
    dimension = embeddings.shape[1]
    index = faiss.IndexFlatL2(dimension)
    index.add(embeddings.toarray())
    
    return tarot_df, vectorizer, index

def retrieve_card_descriptions(card_label, tarot_df):
    return tarot_df[tarot_df['label'] == card_label]['description'].values[0]

def get_interpretation_nolbu(card_descriptions, query, client):
    input_data = "\n".join([f"Card {i+1}: {desc}" for i, desc in enumerate(card_descriptions)])
    system_message = f"The user has selected the following tarot cards:\n{input_data}\n" \
                     "Based on these cards and the user's query, provide a detailed interpretation." \
                     "Answer in Korean"\
                     "말투는 싸가지 없는 말투로 해줘. 일단 욕설과 함께 반말을 하고, '네놈'이라는 호칭을 사용해줘."\
                     "'엣헴!'이라는 말투도 중간중간 적절히 추가해줘."\
                     "카드의 의미를 다 합쳐서 최종적으로 정리해주는 것도 #총정리 로 해줘."
                     
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": query},
            {"role": "system", "content": system_message}
        ]
    )
    return response.choices[0].message.content

def get_interpretation_heungbu(card_descriptions, query, client):
    input_data = "\n".join([f"Card {i+1}: {desc}" for i, desc in enumerate(card_descriptions)])
    system_message = f"The user has selected the following tarot cards:\n{input_data}\n" \
                     "Based on these cards and the user's query, provide a detailed interpretation." \
                     "Answer in Korean"\
                     "말투는 아주 착한 말투로 해줘. 무조건 존댓말, '손님'이라는 호칭을 사용해줘."\
                     "'헤헤헤'라는 말투도 중간중간 적절히 추가해줘."\
                     "카드의 의미를 다 합쳐서 최종적으로 정리해주는 것도 #총정리 로 해줘."
                     
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": query},
            {"role": "system", "content": system_message}
        ]
    )
    return response.choices[0].message.content

# Streamlit 앱
st.header("흥부 놀부 타로 챗봇에 오신걸 환영합니다.")
st.write("타로 카드 3개를 골라주세요.")

# OpenAI API Key
openai_api_key = st.text_input("Enter OpenAI API Key", type="password")
if not openai_api_key:
    st.info("Please add your OpenAI API key to continue.", icon="🔑")
else:
    client = OpenAI(api_key=openai_api_key)

    # 텍스트 파일 경로 입력 받기
    txt_path = "/Users/kim-youngmin/Downloads/한국형타로카드 설명.txt"
    
    if txt_path:
        try:
            # 텍스트 파일에서 데이터 추출
            tarot_descriptions = extract_tarot_descriptions_from_txt(txt_path)
            tarot_df, vectorizer, index = create_faiss_index(tarot_descriptions)

            # User selects 3 tarot cards
            selected_cards = st.multiselect("Select 3 tarot cards", list(tarot_df['label']))

            if len(selected_cards) == 3:
                card_descriptions = [retrieve_card_descriptions(card, tarot_df) for card in selected_cards]

                # 질문 유형 선택
                question_type = st.selectbox("질문 유형을 선택하세요:", ["운명", "사랑", "재물", "건강", "기타"])

                # "기타"를 선택한 경우 서술형 질문 입력
                if question_type == "기타":
                    query = st.text_input("질문을 입력하세요:")
                else:
                    query = question_type

                if query:
                    character = st.selectbox("흥부와 놀부 중 누구한테 타로점을 보시겠습니까?", ["흥부", "놀부"])
                    if character == "흥부":
                        interpretation = get_interpretation_heungbu(card_descriptions, query, client)
                    else:
                        interpretation = get_interpretation_nolbu(card_descriptions, query, client)
                    st.text_area("Tarot Reading Interpretation", value=interpretation, height=200)
        except Exception as e:
            st.error(f"An error occurred: {e}")
