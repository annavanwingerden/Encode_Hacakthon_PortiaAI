import requests
from dotenv import load_dotenv
import os

# Load environment variables from the .env.local file
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env.local'))

# Retrieve the Google API key from environment variables
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
print(f"Loaded API Key: {GOOGLE_API_KEY}")


def search_youtube_video(topic, api_key):
    # Define the endpoint and parameters
    url = "https://www.googleapis.com/youtube/v3/search"
    params = {
        'part': 'snippet',
        'q': topic,
        'type': 'video',
        'key': api_key
    }
    
    # Make the request to the YouTube API
    response = requests.get(url, params=params)
    data = response.json()
    
    # Check if we got results
    if 'items' in data and len(data['items']) > 0:
        # Return the video ID of the first result
        return data['items'][0]['id']['videoId']
    else:
        return None

# Example usage
if __name__ == "__main__":
    API_KEY = GOOGLE_API_KEY
    topic_name = "properties of glass"
    video_id = search_youtube_video(topic_name, API_KEY)
    print(f"Video ID: {video_id}")
