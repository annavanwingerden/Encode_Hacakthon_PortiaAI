require('dotenv').config();
const axios = require('axios');

// Load environment variables
const NOTION_API_KEY = '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';
const NOTION_PARENT_ID = '1d3f5b16-c546-8020-a6f2-ccce5e4944d5';

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
                        "content": "Python script running"  
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
