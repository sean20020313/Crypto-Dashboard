import streamlit as st
import pandas as pd
import plotly.graph_objects as go
import requests
from plotly.subplots import make_subplots

# API設定
API_URL = 'https://api.coingecko.com/api/v3/coins/markets'
PARAMS = {
    'vs_currency': 'usd',
    'order': 'market_cap_desc',
    'per_page': 20,
    'page': 1,
    'sparkline': 'false'
}

# 获取市值前20名的幣種數據
def fetch_data():
    response = requests.get(API_URL, params=PARAMS)
    data = response.json()
    return pd.DataFrame(data)

# 获取幣種的近30天價格走勢
def plot_price_trend(coin_id):
    url = f'https://api.coingecko.com/api/v3/coins/{coin_id}/market_chart'
    params = {'vs_currency': 'usd', 'days': '30'}
    response = requests.get(url, params=params)
    data = response.json()
    
    dates = [entry[0] for entry in data['prices']]
    prices = [entry[1] for entry in data['prices']]
    
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=dates, y=prices, mode='lines', name=coin_id))
    fig.update_layout(title=f'{coin_id} 近30天價格走勢', xaxis_title='日期', yaxis_title='價格 (USD)')
    
    return fig

# 顯示恐懼貪婪指數圓弧圖
def fear_and_greed_index():
    url = 'https://api.alternative.me/fng/'
    response = requests.get(url)
    data = response.json()
    latest_index = float(data['data'][0]['value'])  # 確保 latest_index 是數字
    latest_index_label = data['data'][0]['value_classification']

    # 圓弧圖
    fig = make_subplots(rows=1, cols=1, specs=[[{'type': 'indicator'}]])

    fig.add_trace(go.Indicator(
        mode="gauge+number",
        value=latest_index,
        title={'text': "恐懼貪婪指數"},
        gauge={'axis': {'range': [None, 100]},
               'steps': [
                   {'range': [0, 25], 'color': "red"},
                   {'range': [25, 50], 'color': "orange"},
                   {'range': [50, 75], 'color': "yellow"},
                   {'range': [75, 100], 'color': "green"}],
               'threshold': {'line': {'color': "black", 'width': 4}, 'thickness': 0.75, 'value': latest_index}  # 使用數字值
        }
    ))

    fig.update_layout(height=400)
    st.plotly_chart(fig)
    
    st.write(f"最新的恐懼貪婪指數是 {latest_index} ({latest_index_label})")

# 顯示市值前20名的幣種
def display_top_20_coins():
    df = fetch_data()
    
    st.title('市值前 20 名加密貨幣')

    st.sidebar.title('篩選條件')
    
    # 篩選條件：選擇幣種
    selected_coin = st.sidebar.selectbox('選擇幣種', df['name'])
    
    # 顯示前20名幣種的資料
    st.write(df[['name', 'current_price', 'market_cap', 'price_change_percentage_24h']])

    # 顯示選擇幣種的近30天價格走勢
    if selected_coin:
        coin_id = df[df['name'] == selected_coin].iloc[0]['id']
        fig = plot_price_trend(coin_id)
        st.plotly_chart(fig)

# 顯示幣種介紹
def display_coin_details():
    st.sidebar.title("幣種介紹")
    selected_coin_for_info = st.sidebar.selectbox('選擇幣種詳情', ['bitcoin', 'ethereum', 'cardano'])  # 這裡可以擴展更多幣種
    
    url = f'https://api.coingecko.com/api/v3/coins/{selected_coin_for_info}'
    response = requests.get(url)
    data = response.json()

    st.header(f"{data['name']} - {data['symbol'].upper()}")
    st.write(f"**類型**: {data['categories'][0]}")
    st.write(f"**描述**: {data['description']['en'][:300]}...")  # 顯示前300字
    st.write(f"**官方網站**: [Link]({data['links']['homepage'][0]})")
    
# 主函數
def main():
    # 顯示恐懼貪婪指數
    fear_and_greed_index()

    # 顯示市值前20名幣種
    display_top_20_coins()
    
    # 顯示幣種介紹
    display_coin_details()

if __name__ == "__main__":
    main()
