from youtube_transcript_api import YouTubeTranscriptApi

ytt_api = YouTubeTranscriptApi()
fetched_transcript = ytt_api.fetch(video_id='qi8jmEbWsxU')

# Convert the transcript to raw data
transcript_entries = fetched_transcript.to_raw_data()  
transcript_text = ' '.join([entry['text'] for entry in transcript_entries]) 

print(transcript_text)