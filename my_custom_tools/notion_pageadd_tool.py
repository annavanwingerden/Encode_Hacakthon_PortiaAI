from portia.errors import ToolHardError
from pydantic import BaseModel, Field
from portia.tool import Tool, ToolRunContext

class NotionPageAddToolSchema(BaseModel):
    """Schema defining the inputs for the NotionPageAddTool"""
    pagename: str = Field(...,
                          description = "Name of page to be created")
    pagecontents: str = Field(...,
                              description = "The first pagraph of the new page")
    
class NotionPageAddTool(Tool[str]):
    """Creates a new notion page then writes the first paragraph"""
    
    id: str = "notion_pageadd_tool"
    name: str = "Notion page add tool"
    description: str = "Creates a new page then writes the first paragraph"
    args_schema: type[BaseModel] = NotionPageAddToolSchema
    output_schema: tuple[str, str] = ("str", "A string indicating the location of the new page")

    def run(self, _: ToolRunContext, pagename: str, pagecontents: str) -> str:
        """Run the NotionPageAddTool"""