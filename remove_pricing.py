import re

# Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove #pricing section
content = re.sub(r'\s*<section id="pricing".*?</section>', '', content, flags=re.DOTALL)

# Remove nav links to #pricing
content = re.sub(r'\s*<a href="#pricing"[^>]*>Investment</a>', '', content, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)


# Update services.html
with open('services.html', 'r', encoding='utf-8') as f:
    content2 = f.read()

# Remove nav links to index.html#pricing
content2 = re.sub(r'\s*<a href="index\.html#pricing"[^>]*>Investment</a>', '', content2, flags=re.DOTALL)

with open('services.html', 'w', encoding='utf-8') as f:
    f.write(content2)

print("Removed pricing section and links.")
