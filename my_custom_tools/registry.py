"""Registry containing custom tools to be used for this example."""

from portia import InMemoryToolRegistry
from my_custom_tools.notion_pageadd_tool import NotionPageAddTool
from my_custom_tools.find_video_tool import FindVideoTool

custom_tool_registry = InMemoryToolRegistry.from_local_tools(
    [
        NotionPageAddTool(),
        FindVideoTool()
    ],
)