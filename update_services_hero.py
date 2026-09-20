import re

new_hero = """    <header class="relative pt-36 pb-24 overflow-hidden bg-slate-50 border-b border-gray-200">
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <!-- Distinct Background styling for services page -->
            <div class="absolute top-0 right-0 w-1/2 h-full bg-bloom-coral/5 rounded-bl-[100px] sm:rounded-bl-[200px]"></div>
            <div class="absolute bottom-0 left-0 w-72 h-72 bg-bloom-teal/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
            <!-- Very subtle dot grid to keep the tech vibe -->
            <div class="absolute inset-0 opacity-30" style="background-image: radial-gradient(#cbd5e1 1px, transparent 1px); background-size: 24px 24px;"></div>
        </div>
        <div class="container mx-auto px-6 z-10 relative">
            <div class="flex flex-col md:flex-row items-center justify-between gap-12">
                <div class="reveal active max-w-2xl text-left">
                    <p class="text-bloom-teal font-bold uppercase text-sm mb-4 tracking-widest flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                        Service Directory
                    </p>
                    <h1 class="font-extrabold mb-6 leading-[1.1] text-slate-900 tracking-tight" style="font-size: clamp(2.5rem, 5vw, 4rem);">
                        End-to-End Solutions for <span class="text-bloom-coral relative inline-block">Digital Growth.<svg class="absolute -bottom-2 left-0 w-full h-3 text-bloom-coral/20" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="4" fill="none"/></svg></span>
                    </h1>
                    <p class="text-lg text-slate-600 leading-relaxed">
                        Explore our comprehensive portfolio of 30+ services across 7 distinct pillars. We build, automate, and secure the systems that drive your business forward.
                    </p>
                    <div class="mt-10 flex flex-wrap gap-4">
                        <a href="#services-list" class="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition transform shadow-lg shadow-slate-200/50 flex items-center group">
                            Browse Catalog
                            <svg class="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                        </a>
                        <a href="index.html#contact" class="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition shadow-sm hover:shadow-md flex items-center justify-center">
                            Talk to an Expert
                        </a>
                    </div>
                </div>
                
                <!-- Decorative Right Side -->
                <div class="hidden md:block relative w-full max-w-sm lg:max-w-md reveal delay-100 active">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transform translate-y-8 hover:-translate-y-1 transition duration-300">
                            <div class="w-10 h-10 bg-bloom-coral/10 rounded-lg flex items-center justify-center mb-4">
                                <svg class="w-5 h-5 text-bloom-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                            </div>
                            <h3 class="font-bold text-slate-900 text-sm">Digital Presence</h3>
                        </div>
                        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-1 transition duration-300">
                            <div class="w-10 h-10 bg-bloom-teal/10 rounded-lg flex items-center justify-center mb-4">
                                <svg class="w-5 h-5 text-bloom-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <h3 class="font-bold text-slate-900 text-sm">Automation</h3>
                        </div>
                        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transform translate-y-8 hover:-translate-y-1 transition duration-300">
                            <div class="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
                                <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            </div>
                            <h3 class="font-bold text-slate-900 text-sm">AI Solutions</h3>
                        </div>
                        <div class="bg-slate-900 p-6 rounded-2xl shadow-lg flex items-center justify-center flex-col text-center border-t-4 border-bloom-coral hover:-translate-y-1 transition duration-300">
                            <span class="text-3xl font-black text-white mb-1">30+</span>
                            <span class="text-xs text-slate-400 font-bold uppercase tracking-widest">Services<br>Available</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>"""

with open('services.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the old hero block
# The old hero block starts with `<header class="relative pt-32 pb-24 overflow-hidden bg-grid">`
# and ends right before `<!-- Main Content Container -->`
pattern = r'<header class="relative pt-32 pb-24 overflow-hidden bg-grid">.*?</header>'
new_content = re.sub(pattern, new_hero, content, flags=re.DOTALL)

with open('services.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated services.html hero.")
