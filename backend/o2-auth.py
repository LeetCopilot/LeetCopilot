from dotenv import load_dotenv
load_dotenv()

import os
from gotrue.errors import AuthApiError
from supabase import create_client

url = os.getenv('SUPABASE_URL')
key = os.getenv('SUPABASE_KEY')
account_password: str = os.getenv('ACCOUNT_PASSWORD')

supabase = create_client(url, key)

session = None
try:
    session = supabase.auth.sign_in_with_password({"email": "chowdhuryridha@gmail.com", "password": account_password})
except AuthApiError as e:
    print("Login failed")

print(session)

supabase.auth.sign_out()