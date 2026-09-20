import re
import json
import os

with open("Sri_Lanka_IT_AI_Services_Business_Plan.md", "r", encoding="utf-8") as f:
    text = f.read()

# Find section 4
start_pos = text.find("## 4. Service Portfolio (Detailed)")
end_pos = text.find("### 4.8 Launch Priority Matrix")
sec4_text = text[start_pos:end_pos]

pillar_pattern = re.compile(r'### 4\.(\d+)\s+Pillar \d+:\s+([^\n]+)\n\n\*\*Promise:\*\*\s+([^\n]+)(.*?)(?=(?:### 4\.|\Z))', re.DOTALL)
pillars = []

pillar_slugs = {
    1: "digital-presence-commerce",
    2: "business-systems-automation",
    3: "ai-solutions-agents",
    4: "tax-compliance-data-protection",
    5: "cybersecurity-managed-it",
    6: "data-business-intelligence",
    7: "training-digital-adoption"
}

# Service pattern: #### X.Y Title \n\n Description \n\n | Table |
service_pattern = re.compile(
    r'#### (\d+)\.(\d+)\s+([^\n]+)\n\n(.*?)\n\n\|\s*\*\*Best customers\*\*\s*\|\s*\*\*What we deliver\*\*\s*\|\s*\*\*Customer value\*\*\s*\|\n\|\s*---\s*\|\s*---\s*\|\s*---\s*\|\n\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|(?:\n\n|\Z)',
    re.DOTALL
)

for p_match in pillar_pattern.finditer(sec4_text):
    p_num = int(p_match.group(1))
    p_title = p_match.group(2).strip().replace(" (Flagship)", "")
    p_promise = p_match.group(3).strip()
    p_body = p_match.group(4)
    
    services = []
    
    ai_principles = None
    if "Our AI delivery principles" in p_body:
        ai_principles = [
            {"title": "1. Human in control", "desc": "AI drafts, recommends and answers routine questions; people approve money, contracts and sensitive decisions. Every agent has an easy handover to a human."},
            {"title": "2. Grounded answers", "desc": "Agents answer from the customer's approved information (prices, policies, FAQs) and say 'let me connect you to our team' when unsure, instead of guessing."},
            {"title": "3. Privacy by design", "desc": "Collect only needed data, get consent, keep chat logs secure, sign data processing agreements, and follow the PDPA's principles even before full enforcement."},
            {"title": "4. Measured results", "desc": "Every AI project has a baseline and a monthly report (response time, leads captured, hours saved, resolution rate)."}
        ]
        
    for s_match in service_pattern.finditer(p_body):
        s_num = int(s_match.group(2))
        s_title = s_match.group(3).strip()
        badge = None
        if "pilot" in s_title.lower():
            badge = "Pilot"
            s_title = re.sub(r'\s*\(pilot.*?\)', '', s_title, flags=re.IGNORECASE).strip()
        elif "supporting" in s_title.lower():
            badge = "Supporting"
            s_title = re.sub(r'\s*\(supporting.*?\)', '', s_title, flags=re.IGNORECASE).strip()
            
        s_desc = s_match.group(4).strip()
        if "| **Our AI delivery principles" in s_desc:
            parts = s_desc.split("| --- |")
            s_desc = parts[-1].split("|")[-1].strip()
            
        best_customers_raw = s_match.group(5).strip()
        what_we_deliver_raw = s_match.group(6).strip()
        customer_value_raw = s_match.group(7).strip()
        
        best_customers = [c.strip() for c in best_customers_raw.split(',') if c.strip()]
        what_we_deliver = [d.strip() for d in re.split(r'[,;]\s*', what_we_deliver_raw) if d.strip()]
        customer_value = [v.strip() for v in re.split(r'[,;]\s*', customer_value_raw) if v.strip()]
        
        # Clean title for slug
        clean_title = re.sub(r'\(.*?\)', '', s_title).strip()
        slug = re.sub(r'[^a-z0-9]+', '-', clean_title.lower()).strip('-')
        
        services.append({
            "id": slug,
            "number": f"{p_num}.{s_num}",
            "title": s_title,
            "badge": badge,
            "description": s_desc,
            "bestFor": best_customers,
            "deliverables": what_we_deliver,
            "businessValue": customer_value
        })
        
    pillars.append({
        "id": pillar_slugs.get(p_num, f"pillar-{p_num}"),
        "number": p_num,
        "title": p_title,
        "promise": p_promise,
        "aiPrinciples": ai_principles,
        "services": services
    })

print(f"Parsed {len(pillars)} pillars and total {sum(len(p['services']) for p in pillars)} services.")

os.makedirs("react-app/src/data", exist_ok=True)

# Write to JS file
js_content = f"// Automatically generated service catalogue data\nexport const serviceCatalogue = {json.dumps(pillars, indent=2)};\n"

with open("react-app/src/data/serviceData.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print("Saved react-app/src/data/serviceData.js successfully!")
