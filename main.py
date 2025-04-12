from dotenv import load_dotenv
from portia import (
    Config,
    Portia,
    StorageClass,
    LogLevel,
    example_tool_registry,
)
from my_custom_tools.registry import custom_tool_registry

load_dotenv('local.env')

all_tool_registry = example_tool_registry + custom_tool_registry

my_config = Config.from_default(
    storage_class=StorageClass.DISK, 
    storage_dir='SearchRuns',
    default_log_level=LogLevel.DEBUG,
    )

# Instantiate Portia with the default config which uses Open AI, and with some example tools.
portia = Portia(tools=all_tool_registry, config = my_config)
# Run the test query and print the output!
plan_run = portia.run('Write a short note on how fast quantum computers currently are. It should be one paragraph and in the style of lecture notes.'
                      + 'and write it onto a notion page called quantam')
print(plan_run.model_dump_json(indent=2))