from youtube_transcript_api import YouTubeTranscriptApi

ytt_api = YouTubeTranscriptApi()
fetched_transcript = ytt_api.fetch(video_id='HyzlYwjoXOQ')

print(fetched_transcript.to_raw_data())