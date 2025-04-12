import subprocess

# Run the JavaScript file using Node.js -- might need to change the path to the file
result = subprocess.run(['node', 'notion_integration.js'], capture_output=True, text=True)


print("Output:", result.stdout)
print("Error:", result.stderr)