import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update navigation links
content = content.replace('href="#services"', 'href="services.html"')

# 2. Replace the old services section with the new compact summary
# We need to find the <section id="services"> block and replace it up to <section id="portfolio">
start_tag = '<section id="services"'
end_tag = '<section id="portfolio"'

start_idx = content.find(start_tag)
end_idx = content.find(end_tag)

if start_idx != -1 and end_idx != -1:
    new_section = """<section id="services-summary" class="py-20 md:py-24 bg-white relative text-center">
        <div class="container mx-auto px-6 max-w-4xl">
            <div class="reveal">
                <p class="text-bloom-teal font-bold uppercase text-sm mb-4 tracking-widest">What We Do</p>
                <h2 class="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Practical tech & AI for growing businesses</h2>
                <p class="text-lg text-slate-600 mb-10 leading-relaxed">
                    We provide a comprehensive suite of services ranging from digital presence and commerce to advanced AI solutions, business systems, and cybersecurity. Built specifically for Sri Lankan businesses.
                </p>
                <a href="services.html" class="inline-flex items-center justify-center bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition transform shadow-lg">
                    Explore Our Full Service Portfolio
                    <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </a>
            </div>
            
            <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-left reveal delay-100">
                <a href="services.html#digital-presence-commerce" class="p-4 border border-slate-100 rounded-xl hover:shadow-md transition hover:border-bloom-teal group bg-white">
                    <h3 class="font-bold text-slate-800 text-sm mb-1 group-hover:text-bloom-teal transition">Digital Presence</h3>
                    <p class="text-xs text-slate-500">Websites & E-commerce</p>
                </a>
                <a href="services.html#business-systems-automation" class="p-4 border border-slate-100 rounded-xl hover:shadow-md transition hover:border-bloom-teal group bg-white">
                    <h3 class="font-bold text-slate-800 text-sm mb-1 group-hover:text-bloom-teal transition">Business Systems</h3>
                    <p class="text-xs text-slate-500">ERP, Apps & Automation</p>
                </a>
                <a href="services.html#ai-solutions-agents" class="p-4 border border-slate-100 rounded-xl hover:shadow-md transition hover:border-bloom-teal group bg-white">
                    <h3 class="font-bold text-slate-800 text-sm mb-1 group-hover:text-bloom-teal transition">AI Solutions</h3>
                    <p class="text-xs text-slate-500">Agents & AI Chatbots</p>
                </a>
                <a href="services.html" class="p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition flex flex-col items-center justify-center text-center group">
                    <span class="font-bold text-bloom-coral text-sm group-hover:scale-105 transition">+ 4 More Pillars</span>
                    <span class="text-xs text-slate-500 mt-1">See full list &rarr;</span>
                </a>
            </div>
        </div>
    </section>
    
    """
    
    # We replace from start_idx up to end_idx
    content = content[:start_idx] + new_section + content[end_idx:]
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully replaced services section.")
else:
    print("Could not find start or end tags.")

