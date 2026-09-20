import re

with open('services.html', 'r', encoding='utf-8') as f:
    content = f.read()

# We want to remove the whole <article ...> ... </article> and its preceding comment for each of the 3 IDs
ids_to_remove = ["google-business-profile", "business-email", "social-commerce"]

for item_id in ids_to_remove:
    # Regex to match the comment and the article block
    pattern = r"(\s*<!-- Service \d\.\d -->\s*<article id=\"" + item_id + r"\".*?</article>)"
    content = re.sub(pattern, "", content, flags=re.DOTALL)

with open('services.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Removed the 3 services.")
