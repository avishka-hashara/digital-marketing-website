import re

new_footer = """<footer class="bg-[#0f1115] text-white pt-24 pb-8 border-t border-gray-800 mt-auto">
    <!-- Big CTA Section -->
    <div class="container mx-auto px-6 mb-20 border-b border-gray-800 pb-16 flex flex-col md:flex-row items-center justify-between gap-12 relative">
        <h2 class="text-6xl md:text-[5rem] lg:text-[7rem] font-black uppercase tracking-tighter leading-[0.9] relative inline-block after:content-[''] after:absolute after:-bottom-4 after:left-0 after:w-[95%] after:h-3 after:bg-white after:rounded-sm w-full md:w-auto text-center md:text-left">
            Let's Work<br>Together
        </h2>
        <a href="index.html#contact" class="shrink-0 flex items-center justify-center w-40 h-40 md:w-48 md:h-48 bg-[#f44336] text-white rounded-full font-bold text-center hover:scale-105 transition transform shadow-[0_10px_40px_rgba(244,67,54,0.4)]">
            <div class="flex flex-col items-center">
                <svg class="w-6 h-6 md:w-8 md:h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                <span class="text-xs md:text-sm uppercase tracking-widest font-black leading-tight mt-1">Contact Us<br>Today</span>
            </div>
        </a>
    </div>

    <div class="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
        <!-- Col 1: Logo & Bio -->
        <div class="space-y-6">
            <a href="index.html" class="flex items-center gap-3">
                <img src="logo33.png" alt="Bloom Labs" class="h-10 md:h-12 w-auto object-contain brightness-0 invert">
                <span class="text-2xl md:text-3xl font-black tracking-tight uppercase">Bloom Labs</span>
            </a>
            <p class="text-gray-400 text-sm md:text-base leading-relaxed pr-4">
                We're a digital agency helping brands grow through strategy, design, and innovation. Built for Sri Lankan businesses.
            </p>
        </div>

        <!-- Col 2: Quick Links -->
        <div>
            <h4 class="text-sm font-black uppercase tracking-[0.2em] mb-6 text-gray-100">Quick Links</h4>
            <ul class="grid grid-cols-2 gap-y-4 text-sm text-gray-400 font-medium">
                <li><a href="index.html" class="hover:text-white transition">Home</a></li>
                <li><a href="index.html#process" class="hover:text-white transition">Our Process</a></li>
                <li><a href="services.html" class="hover:text-white transition">Services</a></li>
                <li><a href="index.html#contact" class="hover:text-white transition">Contact Us</a></li>
                <li><a href="index.html#portfolio" class="hover:text-white transition">Portfolio</a></li>
            </ul>
        </div>

        <!-- Col 3: Contact Info -->
        <div>
            <h4 class="text-sm font-black uppercase tracking-[0.2em] mb-6 text-gray-400">Contact Us</h4>
            <div class="space-y-3">
                <p class="text-xl md:text-2xl font-bold tracking-tight">+94 77 123 4567</p>
                <a href="mailto:hello@bloomlabs.lk" class="inline-block text-[#f44336] font-black uppercase tracking-widest text-sm hover:text-white transition">HELLO@BLOOMLABS.LK</a>
            </div>
        </div>

        <!-- Col 4: Location -->
        <div>
            <h4 class="text-sm font-black uppercase tracking-[0.2em] mb-6 text-gray-400">Location</h4>
            <p class="text-lg md:text-xl font-bold leading-snug tracking-tight">
                123 TECH STREET,<br>COLOMBO 07,<br>SRI LANKA
            </p>
        </div>
    </div>

    <!-- Bottom Bar -->
    <div class="container mx-auto px-6 pt-8 border-t border-gray-800/80 flex flex-col xl:flex-row items-center justify-between gap-6 text-xs text-gray-500 font-medium tracking-wide">
        <div>
            &copy; 2026 Bloom Labs. All Rights Reserved.
        </div>
        <div class="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-gray-300 font-black uppercase tracking-[0.15em] text-[10px] md:text-xs">
            <a href="#" class="hover:text-white transition">Facebook</a> &bull;
            <a href="#" class="hover:text-white transition">Instagram</a> &bull;
            <a href="#" class="hover:text-white transition">LinkedIn</a> &bull;
            <a href="#" class="hover:text-white transition">TikTok</a>
        </div>
        <div class="flex items-center gap-4 text-gray-400">
            <a href="#" class="hover:text-white transition">Terms & Conditions</a> <span class="text-gray-600">//</span>
            <a href="#" class="hover:text-white transition">Privacy Policy</a>
        </div>
    </div>
</footer>"""

files_to_update = ['index.html', 'services.html']

for filename in files_to_update:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We replace the whole <footer>...</footer>
    content = re.sub(r'<footer\b[^>]*>.*?</footer>', new_footer, content, flags=re.DOTALL)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Updated footers.")
