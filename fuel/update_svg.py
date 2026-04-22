import requests
import os

cities = {
    "Adelaide": "https://petrolspy.com.au/graph/adelaide_U91E10.svg",
    "Sydney": "https://petrolspy.com.au/graph/sydney_U91E10.svg",
    "Melbourne": "https://petrolspy.com.au/graph/melbourne_U91E10.svg",
    "Brisbane": "https://petrolspy.com.au/graph/brisbane_U91E10.svg",
    "Perth": "https://petrolspy.com.au/graph/perth_U91E10.svg",
    "Canberra": "https://petrolspy.com.au/graph/canberra_U91E10.svg",
    "Hobart": "https://petrolspy.com.au/graph/hobart_U91E10.svg",
    "Darwin": "https://petrolspy.com.au/graph/darwin_U91E10.svg"
}

for city, url in cities.items():
    try:
        # Use a User-Agent to avoid being blocked by PetrolSpy
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
        response = requests.get(url, headers=headers, timeout=15)
        response.raise_for_status()
        
        with open(f"cycle_{city}.svg", "wb") as f:
            f.write(response.content)
        print(f"Updated {city}")
    except Exception as e:
        print(f"Error updating {city}: {e}")
