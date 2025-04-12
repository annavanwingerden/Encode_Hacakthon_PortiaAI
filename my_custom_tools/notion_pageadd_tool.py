from portia.errors import ToolHardError
from pydantic import BaseModel, Field
from portia.tool import Tool, ToolRunContext
import subprocess

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
    output_schema: tuple[str, str] = ("str", "A string saying that it ran correctly")

    def run(self, _: ToolRunContext, pagename: str, pagecontents: str) -> str:
        """Run the NotionPageAddTool"""
        title = pagename
        paragraph = pagecontents
        
        result = subprocess.run(['node', 'my_custom_tools/notion_integration.js',title,paragraph]
                                , capture_output=True, text=True)
        if result.returncode != 0:
            raise ToolHardError(f"Error running notion integration: {result.stderr}")
        return 'success'