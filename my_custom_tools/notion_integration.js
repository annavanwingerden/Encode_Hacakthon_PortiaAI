require('dotenv').config({ path: '../.env.local' });
const axios = require('axios');

const args = process.argv.slice(2);
const titleArg = args[0];
const paragraphArg = args[1];

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
                        "content": titleArg 
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
                                "content": paragraphArg
                            }
                        }
                    ]
                }
        }
        ]
    };

axios.post('https://api.notion.com/v1/pages', data, { headers })
.then(res => console.log("Page created:", res.data))
.catch(err => console.error("Error creating page:", err.response?.data || err));
