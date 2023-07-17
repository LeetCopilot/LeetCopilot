from dotenv import load_dotenv
load_dotenv()

import os
from supabase import create_client, Client
from gotrue.errors import AuthApiError

url: str = os.getenv('SUPABASE_URL')
key: str = os.getenv('SUPABASE_KEY')
account_email: str = os.getenv('ACCOUNT_EMAIL')
account_password: str = os.getenv('ACCOUNT_PASSWORD')

supabase: Client = create_client(url, key)

session = None
try:
    session = supabase.auth.sign_in_with_password({"email": account_email, "password": account_password})
except AuthApiError as e:
    print("Login failed")
    print("Error:", e)

response = supabase.table('Problems').select("*").execute()

response, count = supabase.table('Problems').insert({"name": "Test", "number": 3}, upsert=True).execute()

response = supabase.table('Problems').select("*").execute()

print(response)

supabase.auth.sign_out()

print("Done")