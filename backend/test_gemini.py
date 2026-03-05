import requests
import time

BASE_URL = "http://localhost:5000/api"

def test_gemini():
    print("--- Testing Gemini AI Chat Endpoint ---")
    
    # 1. Login to get a token
    email = f"testuser_{int(time.time())}@example.com"
    password = "password123"

    requests.post(f"{BASE_URL}/auth/register", json={
        "name": "Gemini Tester",
        "email": email,
        "password": password
    })
    
    login_response = requests.post(f"{BASE_URL}/auth/login", json={
        "email": email,
        "password": password
    })
    
    token = login_response.json().get("token")
    headers = {"Authorization": f"Bearer {token}"}

    # 2. Send a message to the AI
    print("\nSending message: 'I feel very anxious about my final exams tomorrow.'")
    chat_response = requests.post(
        f"{BASE_URL}/chat/message", 
        headers=headers,
        json={"message": "I feel very anxious about my final exams tomorrow."}
    )
    
    if chat_response.status_code == 200:
        data = chat_response.json()
        print("\n✅ AI Response Received Successfully:")
        print(f"\n{data.get('reply')}\n")
        print(f"Session saved with ID: {data.get('sessionId')}")
    else:
        print(f"\n❌ Gemini API Failed: {chat_response.text}")

if __name__ == "__main__":
    test_gemini()
