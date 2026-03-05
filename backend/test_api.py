import requests
import time

BASE_URL = "http://localhost:5000/api"

def run_tests():
    print("--- Starting Backend API Tests ---")
    
    # Generate unique email to avoid "User already exists" on rerun
    email = f"testuser_{int(time.time())}@example.com"
    password = "password123"

    print(f"\n1. Testing Registration with {email}...")
    reg_response = requests.post(f"{BASE_URL}/auth/register", json={
        "name": "Test User",
        "email": email,
        "password": password
    })
    
    if reg_response.status_code == 201:
        print("✅ Registration Successful")
    else:
        print(f"❌ Registration Failed: {reg_response.text}")
        return

    print("\n2. Testing Login...")
    login_response = requests.post(f"{BASE_URL}/auth/login", json={
        "email": email,
        "password": password
    })
    
    if login_response.status_code == 200:
        print("✅ Login Successful")
        token = login_response.json().get("token")
        print(f"Token received: {token[:20]}...")
    else:
        print(f"❌ Login Failed: {login_response.text}")
        return
        
    print("\n3. Testing Protected Profile Route...")
    headers = {"Authorization": f"Bearer {token}"}
    profile_response = requests.get(f"{BASE_URL}/auth/profile", headers=headers)
    
    if profile_response.status_code == 200:
        print("✅ Protected Profile Route Accessible")
        print(f"Profile Data: {profile_response.json()}")
    else:
        print(f"❌ Protected Route Failed: {profile_response.text}")

    print("\n--- All Auth Tests Complete ---")
    print("To test the Gemini API, valid API keys must be added to the .env file first.")

if __name__ == "__main__":
    run_tests()
