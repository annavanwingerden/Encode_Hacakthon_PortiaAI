from flask import Flask, request, jsonify, send_from_directory
from dotenv import load_dotenv
from portia import (
    Config,
    Portia,
    StorageClass,
    LogLevel,
    example_tool_registry
)
from my_custom_tools.registry import custom_tool_registry
import os

app = Flask(__name__)

load_dotenv('.env.local')
openai_api_key = os.getenv("OPENAI_API_KEY")
TAVILY_API_KEY = os.getenv("TAGIVLY_API_KEY")

all_tool_registry = example_tool_registry + custom_tool_registry

my_config = Config.from_default(
    storage_class=StorageClass.DISK, 
    storage_dir='SearchRuns',
    default_log_level=LogLevel.DEBUG,
)

# Instantiate Portia with the default config which uses Open AI, and with some example tools.
portia = Portia(tools=all_tool_registry, config = my_config)

@app.route('/run', methods=['POST'])
def run_query():
    user_query = request.json.get('topic')
    plan_run = portia.run("Topic:" + user_query + "\n" + "Find a video about this topic and use its transcript to compose a short learning note, ensuring the note is written as one paragraph. The note should include information describing the key topics covered and should avoid information from the transcript that isn't related to the topic. Write this onto a new page on Notion")
    return jsonify(plan_run.model_dump_json())

@app.route('/')
def serve_frontend():
    return send_from_directory('frontend', 'index.html')

if __name__ == "__main__":
    app.run(debug=True)