from portia.errors import ToolHardError
from pydantic import BaseModel, Field
from portia.tool import Tool, ToolRunContext

class NotionWriteToolSchema(BaseModel):
    """Schema defining the inputs for the NotionWriteTool"""
    pagename: str = Field(...,
                          description = "Name of page to be witten to")
    pagecontents: str = Field(...,
                              description = "Data to write into page")
    
class NotionWriteTool(Tool[str]):
    """Writes to an existing notion page"""
    
    id: str = "notion_write_tool"
    name: str = "Notion write tool"
    description: str = "Writes information into a specified notion page"
    args_schema: type[BaseModel] = NotionWriteToolSchema
    output_schema: tuple[str, str] = ("str", "A string indicating the name of the page")

    def run(self, _: ToolRunContext, pagename: str, pagecontents: str) -> str:
        """Run the NotionWriteTool"""