from dotenv import load_dotenv
load_dotenv()

import os
from supabase import create_client


url = os.getenv('SUPABASE_URL')
key = os.getenv('SUPABASE_KEY')
print(url, key)

supabase = create_client(url, key)