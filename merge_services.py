import re

with open('services.html', 'r', encoding='utf-8') as f:
    services_content = f.read()

with open('services_groups.html', 'r', encoding='utf-8') as f:
    groups_html = f.read()

# Define the placeholder block to replace
start_marker = "<!-- Placeholder for Group 2 -->"
end_marker = "</section>"

start_idx = services_content.find(start_marker)
# Find the next </section> after the placeholder
end_idx = services_content.find(end_marker, start_idx) + len(end_marker)

if start_idx != -1 and end_idx != -1:
    new_services_content = services_content[:start_idx] + groups_html + services_content[end_idx:]
    with open('services.html', 'w', encoding='utf-8') as f:
        f.write(new_services_content)
    print("Merged successfully!")
else:
    print("Could not find placeholder!")
