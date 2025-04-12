from dotenv import load_dotenv
from portia import (
    Config,
    Portia,
    StorageClass,
    LogLevel,
    example_tool_registry,
)
from my_custom_tools.registry import custom_tool_registry
import os

load_dotenv('.env.local')
<<<<<<< HEAD
=======
openai_api_key = os.getenv("OPENAI_API_KEY")
TAGIVLY_API_KEY = os.getenv("TAGIVLY_API_KEY")
>>>>>>> 476185f8d828c69adc945f22ce4879b1c5f2a09a

all_tool_registry = example_tool_registry + custom_tool_registry

my_config = Config.from_default(
    storage_class=StorageClass.DISK, 
    storage_dir='SearchRuns',
    default_log_level=LogLevel.DEBUG,
    )

# Instantiate Portia with the default config which uses Open AI, and with some example tools.
portia = Portia(tools=all_tool_registry, config = my_config)

user_query = input("Write a topic you want to learn about: ")
# Run the test query and print the output!
plan_run = portia.run("Topic:"+user_query+"\n"+"Compose a short note on this topic in the style of lecture notes, ensuring the note is written as one paragraph. The note should include information describing the key topics. Then, add the note onto a Notion page named "+user_query)
print(plan_run.model_dump_json(indent=2))