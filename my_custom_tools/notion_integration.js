require('dotenv').config({ path: '../.env.local' });
const axios = require('axios');

// Load environment variables
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_PARENT_ID = process.env.NOTION_PARENT_ID;

console.log("NOTION_API_KEY:", NOTION_API_KEY);
console.log("NOTION_PARENT_ID:", NOTION_PARENT_ID);


// Define the headers for the request
const headers = {
    "Authorization": `Bearer ${NOTION_API_KEY}`,
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28"  // Use the latest version
};

// Define the data for the new page
const data = {
    "parent": { "database_id": NOTION_PARENT_ID,
     },
    "properties": {
        "title": {
            "title": [
                {
                    "text": {
                        "content": "testing adding pages to notion"  
                    }
                }
            ]
        }
    },
    "children": [
    {
            "object": "block",
            "type": "paragraph",
            "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "This is a paragraph in the new page."
                            }
                        }
                    ]
                }
        }
        ]
    };

axios.post('https://api.notion.com/v1/pages', data, { headers })
