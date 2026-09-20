import re

markdown_content = """### 4.2 Pillar 2: Business Systems & Automation

**Promise:** Run the business on reliable systems instead of paper, memory and scattered Excel files.

#### 2.1  Custom Web & Mobile Applications

Software built for a specific workflow when off-the-shelf products don't fit: customer portals, job tracking, service management, supplier portals.

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| Growing SMEs with unique processes, logistics firms, construction contractors, service companies | Requirements workshop, UI design, development, testing, deployment, documentation, support plan | Processes that match the business; data in one place |

#### 2.2  ERP & CRM Implementation (open-source based)

Implement and localise open-source ERP/CRM platforms such as Odoo Community or ERPNext for sales, purchasing, inventory, accounting and customer management, configured for Sri Lankan VAT, invoice format and payroll rules.

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| Distributors, wholesalers, small manufacturers, importers, trading companies | Process mapping, configuration, data migration from Excel, Sri Lankan invoice templates, user training, support retainer | Real-time stock and receivables; ready for e-invoicing; lower licence costs than foreign SaaS |

#### 2.3  Distribution & Field Sales Apps

Mobile apps for sales representatives who visit shops: take orders, check stock and credit limits, collect payments and capture GPS visit records. This is a very common need in Sri Lanka's FMCG distribution model.

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| Distributors, FMCG agents, pharmaceutical and hardware distributors | Rep mobile app (offline-capable), manager dashboard, route planning, integration with ERP/accounting | Faster order-to-cash cycle, fewer errors, visibility of rep performance |

#### 2.4  HR, Payroll & Attendance

Payroll with EPF, ETF and APIT calculations, leave management, and fingerprint or face attendance integration.

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| Factories, hotels, security firms, retail chains, BPOs | Payroll setup, attendance device integration, payslips by email/WhatsApp, statutory reports | Accurate payroll, compliance, less HR admin time |

#### 2.5  Workflow Automation

Connect the tools a business already uses so data moves automatically: forms to spreadsheets, orders to invoices, payments to accounting, daily reports to the owner's WhatsApp. Uses platforms like n8n, Make or Power Automate.

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| Any business doing repeated copy-paste work | Process audit, automation design, build, monitoring, monthly maintenance | Hours saved every week; quick return on investment |

#### 2.6  POS & Billing Systems (supporting service)

Offered only as part of a wider solution, preferably by reselling or white-labelling a proven POS product, then integrating it with inventory, accounting and the new VAT invoice format.

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| Retail shops, restaurants, pharmacies moving from manual billing | POS selection, setup, hardware sourcing via partners, integration, invoice format compliance | Completes the system; we avoid competing on price alone |

#### 2.7  Education Institute Management

Sri Lanka has a very large private tuition and training sector. A management system covering student registration, fee collection, attendance via QR, online class access, results and parent notifications has strong repeat potential and can later become a SaaS product.

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| Tuition classes, language schools, IT/professional institutes, international schools, pre-schools | Student and fee management, QR attendance, SMS/WhatsApp notifications, online payments, recorded lesson access | Less cash handling, fewer fee defaults, better parent communication |

### 4.3 Pillar 3: AI Solutions & Agents (Flagship)

**Promise:** Serve customers around the clock and remove repetitive work, safely and in local languages.

| **Our AI delivery principles (put these in every proposal)** **1. Human in control:** AI drafts, recommends and answers routine questions; people approve money, contracts and sensitive decisions. Every agent has an easy handover to a human. **2. Grounded answers:** Agents answer from the customer's approved information (prices, policies, FAQs) and say 'let me connect you to our team' when unsure, instead of guessing. **3. Privacy by design:** Collect only needed data, get consent, keep chat logs secure, sign data processing agreements, and follow the PDPA's principles even before full enforcement. **4. Measured results:** Every AI project has a baseline and a monthly report (response time, leads captured, hours saved, resolution rate). |
| --- |

#### 3.1  AI Customer Service Agent (WhatsApp, Messenger, Instagram, Website)

A trilingual AI agent that answers customer questions in Sinhala, Tamil and English, including mixed 'Singlish' and 'Tanglish' style messages. It shares prices and availability, takes orders or bookings, sends payment links, and hands over to staff when needed. Built on the official WhatsApp Business Platform.

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| Hotels and villas, clinics, online stores, tuition classes, car sales, real estate, insurance agents, restaurants | Knowledge base setup, conversation design, integration with booking/order systems, human handover, analytics dashboard, monthly optimisation | Instant replies at night and on holidays, more captured leads, fewer staff hours on repeated questions |

#### 3.2  AI Sales & Lead Qualification Agent

Replies within seconds to leads from Facebook ads, website forms and WhatsApp; asks qualifying questions; books appointments or site visits; and follows up automatically.

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| Real estate developers, vehicle dealers, education institutes, solar companies, insurance, travel agents | Lead capture integrations, qualification scripts, calendar booking, CRM sync, follow-up sequences | Higher conversion from ad spend; sales teams focus on serious buyers |

#### 3.3  AI Knowledge Assistant (private 'company brain')

A secure internal assistant that answers staff questions using the company's own documents: SOPs, product manuals, HR policies, price lists and past proposals. Uses retrieval-augmented generation (RAG) so answers cite the source document.

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| Mid-sized companies, hotels (staff training), manufacturers, banks' branch teams, BPOs, NGOs | Document collection and cleaning, secure deployment, role-based access, source citations, usage analytics | Faster onboarding of new staff; less dependence on a few experienced people |

#### 3.4  Intelligent Document Processing

AI reads invoices, purchase orders, bank deposit slips, delivery notes, forms and ID documents, extracts the data, checks it and pushes it into ERP, accounting or Excel. It handles scanned and photographed documents.

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| Accounting firms, importers, distributors, finance companies, logistics firms, hospitals | Document types setup, extraction and validation rules, human review screen, integration, accuracy reporting | Large reduction in manual data entry; fewer errors; faster month-end |

#### 3.5  AI Back-Office Agents

Agents that handle defined office tasks: sorting and drafting replies to emails, preparing quotations from price lists, chasing overdue payments with polite reminders, summarising daily sales, and preparing reports. Each agent has limited permissions and approval steps.

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| Trading companies, service firms, travel agents, export companies | Task analysis, agent build with tool access, approval workflow, audit logs, monitoring | Owners and managers get time back; nothing falls through the cracks |

#### 3.6  AI Content & Marketing Studio

An AI-assisted content system that produces on-brand social posts, product descriptions, ad copy and simple creatives in three languages, with human review before publishing.

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| Retail brands, restaurants, hotels, education institutes, SMEs without marketing staff | Brand voice guide, content templates, monthly content calendar, review workflow, performance tracking | Consistent marketing at a fraction of agency cost |

#### 3.7  AI Analytics & Forecasting

Machine-learning models for demand forecasting, reorder suggestions, customer churn warnings, and pricing insights such as hotel occupancy trends. Only offered once the customer has reliable data (Level 3+).

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| Distributors, supermarkets, pharmacies, hotels, manufacturers | Data assessment, model build, dashboard, monthly model review | Less dead stock, fewer stock-outs, better cash flow |

#### 3.8  AI Voice Agent (pilot now, scale 2027–2028)

An AI that answers phone calls, books appointments, confirms orders and sends reminders. English works well today; Sinhala and Tamil voice quality is improving, so start with pilots and simple use cases.

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| Clinics, channelling centres, restaurants, service centres, delivery businesses | Call flows, voice testing with real customers, telephony integration, human transfer | No missed calls; important for customers who prefer calling over typing |

#### 3.9  AI Readiness Assessment & Roadmap

A paid, structured assessment of where AI can create value, what data and systems are needed, the risks and a costed 12-month plan.

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| Mid-sized companies, boards and owners unsure where to start | Interviews, process review, opportunity scoring, risk review, roadmap and business case | Clear priorities; avoids wasted AI spending; natural entry to projects |

### 4.4 Pillar 4: Tax, Compliance & Data Protection

**Promise:** Be ready for new invoice rules, e-invoicing and data protection without stress.

#### 4.1  VAT Invoice Format Compliance Upgrade

Review and update billing systems, POS receipts, ERP templates and accounting software so tax invoices match the revised IRD format that is mandatory from 1 October 2026.

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| All VAT-registered businesses (annual taxable supplies above LKR 60 million, plus voluntary registrants) | Gap check against the gazetted format, template and system changes, testing, staff briefing, sign-off checklist | Avoid rejected invoices and compliance problems; quick, clearly scoped project |

#### 4.2  RAMIS e-Invoicing Web API Integration

Connect the customer's ERP or billing system to the IRD's RAMIS platform through the official Web API, with validation before sending (because submitted records cannot be edited) and error handling.

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| VAT-registered mid-sized businesses, exporters, distributors, companies on local or custom ERPs | IRD specification study, middleware/connector build, data validation, testing, monitoring dashboard, support retainer | Real-time compliance, less manual VAT schedule work, audit-ready records |

#### 4.3  PDPA Readiness Programme

A practical preparation programme so businesses can meet Personal Data Protection Act obligations when the core parts come into operation. Done together with a legal partner for the legal documents.

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| Hotels, clinics, schools, finance-related companies, e-commerce, BPOs, any business handling customer data | Data inventory, gap assessment, privacy notices, consent flows on websites and chat, retention rules, access-request process, vendor agreements, staff training | Customer trust, readiness for enforcement, easier dealings with foreign partners |

#### 4.4  Digital Record-Keeping & Document Management

Move paper files to secure, searchable digital storage with access control and retention rules.

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| Accounting firms, law firms, schools, hospitals, government suppliers | Scanning workflow, folder and naming structure, permissions, retention policy, AI search (optional) | Find documents in seconds; safer storage; ready for audits |

### 4.5 Pillar 5: Cybersecurity & Managed IT

**Promise:** Stay safe from fraud, hacking and data loss, and keep systems running.

#### 5.1  SME Cyber Health Check

A quick, affordable security review of email, passwords, devices, Wi-Fi, website, backups and staff habits, with a clear traffic-light report.

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| Every SME; especially those making online payments or holding customer data | Questionnaire and technical checks, external website scan, report with top 10 fixes, optional fix package | Understand risk in plain language; low-cost entry product |

#### 5.2  Email & Account Security Hardening

Stop business email compromise and payment fraud by setting up multi-factor authentication, SPF/DKIM/DMARC email records, admin controls and payment verification procedures.

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| Importers, exporters, finance teams, any business paying suppliers by bank transfer | Configuration, policies, payment verification process, staff briefing | Protects against fake-invoice and payment-diversion scams |

#### 5.3  Backup & Disaster Recovery

Automated, tested backups (including off-site and offline copies) so ransomware or hardware failure doesn't destroy the business.

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| Businesses with accounting data, customer records or design files | Backup design, setup, monthly restore tests, recovery runbook | Business continuity; peace of mind |

#### 5.4  Phishing Awareness Training

Short, practical training in Sinhala, Tamil or English, with simulated phishing tests.

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| Companies with office staff | Workshops, simulated campaigns, results report, refresher sessions | People become the first line of defence |

#### 5.5  Managed IT Support Retainer

A monthly plan covering helpdesk support, device and licence management, security updates, user onboarding and offboarding, and IT planning. It is the IT department for businesses that can't afford one.

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| Offices with 5–100 staff, clinics, schools, hotels | Remote and on-site support hours, monitoring, monthly report, quarterly review | Predictable IT costs; stable recurring revenue for us |

#### 5.6  Cloud Migration & Hosting Management

Move servers, files and applications to the cloud or to local data centres, with cost control and monitoring.

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| Businesses with old in-house servers | Assessment, migration plan, execution, cost optimisation, ongoing management | Less downtime, remote access, lower hardware risk |

### 4.6 Pillar 6: Data & Business Intelligence

**Promise:** See the numbers clearly and decide faster.

#### 6.1  Management Dashboards

Live dashboards (Power BI, Looker Studio or custom) that show sales, stock, receivables, staff performance and profitability.

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| Owners and managers of distributors, retail chains, hotels, manufacturers | Data source connection, KPI design with management, dashboard build, mobile view, training | Decisions based on today's data, not last month's |

#### 6.2  Data Cleanup & Migration

Clean years of messy Excel and old-software data and move it into new systems correctly.

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| Any customer moving to ERP, CRM or AI systems | Data audit, cleaning rules, deduplication, migration, validation report | Essential foundation for systems and AI to work |

#### 6.3  Automated Owner Reports

Daily or weekly summaries sent automatically to the owner's WhatsApp or email: yesterday's sales, cash position, top overdue customers, low stock.

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| Owner-managed SMEs | Report design, automation, delivery, monthly tweaks | Owners stay informed without logging in anywhere |

### 4.7 Pillar 7: Training & Digital Adoption

**Promise:** Make sure people actually use the technology well.

#### 7.1  'AI at Work' Workshops (Sinhala / Tamil / English)

Hands-on workshops teaching staff to use AI tools safely for writing, analysis, customer replies and planning, with company-specific examples.

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| Corporate teams, chambers of commerce, associations, universities, SME development programmes | Half-day or full-day sessions, practical exercises, prompt guide, safe-use rules | Quick productivity gains; builds trust and leads for bigger projects |

#### 7.2  AI Usage Policy & Governance Setup

A clear company policy on which AI tools may be used, what data must never be entered, review requirements and accountability.

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| Mid-sized companies, finance, healthcare, education | Policy draft, approved tools list, staff briefing, review process | Reduces data leakage and reputational risk |

#### 7.3  Digital Transformation Coaching for Owners

Monthly advisory sessions helping owners prioritise technology investments.

| **Best customers** | **What we deliver** | **Customer value** |
| --- | --- | --- |
| Family businesses and growing SMEs | Monthly meeting, roadmap updates, vendor evaluation help | Better decisions; long-term trusted relationship |
"""

import sys

def slugify(text):
    text = text.lower()
    text = re.sub(r'\(.*?\)', '', text)
    text = text.replace('&', 'and')
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'\s+', '-', text).strip('-')
    return text

def parse_pillar(text):
    lines = text.strip().split('\n')
    title_line = lines[0]
    m = re.search(r'Pillar \d+:\s*(.*)', title_line)
    if not m:
        return None
    title = m.group(1).strip()
    
    promise = ""
    for line in lines[1:]:
        if line.startswith('**Promise:**'):
            promise = line.replace('**Promise:**', '').strip()
            break
            
    sections = re.split(r'#### \d+\.\d+\s+', text)
    
    services = []
    for sec in sections[1:]:
        sec_lines = sec.strip().split('\n')
        srv_title = sec_lines[0].strip()
        
        desc = ""
        best_for = ""
        what_we_deliver = ""
        customer_value = ""
        
        i = 1
        while i < len(sec_lines):
            line = sec_lines[i].strip()
            if not line:
                i += 1
                continue
            if line.startswith('|'):
                # table started
                break
            desc += line + " "
            i += 1
            
        desc = desc.strip()
        
        # parse table
        for j in range(i, len(sec_lines)):
            line = sec_lines[j].strip()
            if line.startswith('|') and not line.startswith('| ---'):
                parts = [p.strip() for p in line.split('|')[1:-1]]
                if parts[0] == '**Best customers**':
                    continue
                if len(parts) >= 3:
                    best_for = parts[0]
                    what_we_deliver = parts[1]
                    customer_value = parts[2]
                break
                
        services.append({
            'title': srv_title,
            'desc': desc,
            'best_for': best_for,
            'what_we_deliver': what_we_deliver,
            'customer_value': customer_value
        })
        
    return {
        'title': title,
        'promise': promise,
        'services': services
    }

pillars = re.split(r'### 4\.\d+\s+', markdown_content)
parsed_pillars = []
for p in pillars[1:]:
    p_data = parse_pillar("### 4.X " + p) # dummy title to make regex work in parse_pillar
    if p_data:
        parsed_pillars.append(p_data)

icons = [
    '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>',
    '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M10 9l5 3-5 3z"></path></svg>',
    '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>',
    '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>',
    '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>',
    '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>'
]
colors = ['bg-bloom-teal/10 text-bloom-teal', 'bg-purple-100 text-purple-600', 'bg-blue-100 text-blue-600', 'bg-green-100 text-green-600', 'bg-amber-100 text-amber-600', 'bg-pink-100 text-pink-600']

html = ""
for idx, p in enumerate(parsed_pillars):
    g_slug = slugify(p['title'])
    icon = icons[idx]
    color = colors[idx]
    
    html += f'''
            <!-- Group {idx+2}: {p['title']} -->
            <section id="{g_slug}" class="group-section scroll-mt-32">
                <div class="flex items-center gap-4 mb-3">
                    <div class="w-12 h-12 rounded-xl {color} flex items-center justify-center">
                        {icon}
                    </div>
                    <h2 class="text-2xl md:text-3xl font-bold text-slate-900">{p['title']}</h2>
                </div>
                <p class="text-lg text-slate-600 mb-8 font-medium">{p['promise']}</p>
                <div class="space-y-4 accordion-container">
    '''
    
    for s_idx, s in enumerate(p['services']):
        s_slug = slugify(s['title'])
        search_terms = slugify(s['title']).replace('-', ' ') + ' ' + slugify(s['desc']).replace('-', ' ')
        
        best_for_chips = ""
        for b in [x.strip() for x in s['best_for'].split(',') if x.strip()]:
            best_for_chips += f'<span class="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium border border-slate-200">{b}</span>\n'
            
        what_we_deliver_list = ""
        for w in [x.strip() for x in s['what_we_deliver'].split(',') if x.strip()]:
            what_we_deliver_list += f'<li class="flex items-start gap-2"><svg class="w-4 h-4 text-bloom-teal mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {w}</li>\n'
            
        biz_value_list = ""
        for v in [x.strip() for x in s['customer_value'].split(';') if x.strip()]:
            biz_value_list += f'<li>{v}</li>\n'
            
        badge = ""
        title_disp = s['title']
        if 'flagship' in title_disp.lower() or 'pilot' in title_disp.lower() or 'time-sensitive' in title_disp.lower():
            if 'time-sensitive' in title_disp.lower():
                badge = '<span class="ml-2 px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold uppercase rounded-full tracking-wider whitespace-nowrap">Time-Sensitive</span>'
            elif 'flagship' in title_disp.lower():
                badge = '<span class="ml-2 px-2 py-0.5 bg-bloom-gold text-slate-900 text-[10px] font-bold uppercase rounded-full tracking-wider whitespace-nowrap">Flagship</span>'
            else:
                badge = '<span class="ml-2 px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-bold uppercase rounded-full tracking-wider whitespace-nowrap">Pilot</span>'
            title_disp = re.sub(r'\(.*?\)', '', title_disp).strip()
            
        html += f'''
                    <!-- Service -->
                    <article id="{s_slug}" class="service-item" data-search="{search_terms}">
                        <details class="group">
                            <summary aria-expanded="false">
                                <div class="flex items-center gap-4 w-full pr-4">
                                    <svg class="w-6 h-6 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                    <div class="flex-grow text-left">
                                        <div class="flex items-center flex-wrap">
                                            <h3 class="font-bold text-lg text-slate-900">{title_disp}</h3>
                                            {badge}
                                        </div>
                                        <p class="text-sm text-slate-500 mt-1 line-clamp-1 group-open:line-clamp-none transition-all">{s['desc'][:100]}...</p>
                                    </div>
                                    <svg class="w-5 h-5 text-slate-400 chevron shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </summary>
                            <div class="details-content">
                                <div class="details-content-inner">
                                    <p class="text-slate-600 mb-6 leading-relaxed">
                                        {s['desc']}
                                    </p>
                                    <div class="grid md:grid-cols-3 gap-6 mb-8">
                                        <div>
                                            <h4 class="font-semibold text-slate-900 mb-3 text-sm tracking-wide uppercase">Best For</h4>
                                            <div class="flex flex-wrap gap-2">
                                                {best_for_chips}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 class="font-semibold text-slate-900 mb-3 text-sm tracking-wide uppercase">What You Get</h4>
                                            <ul class="space-y-2 text-sm text-slate-600">
                                                {what_we_deliver_list}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 class="font-semibold text-slate-900 mb-3 text-sm tracking-wide uppercase">Business Value</h4>
                                            <ul class="space-y-2 text-sm text-slate-600 list-disc pl-4 marker:text-bloom-coral">
                                                {biz_value_list}
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-4 pt-4 border-t border-slate-100">
                                        <a href="index.html#contact?service={s_slug}" class="inline-flex items-center justify-center px-4 py-2 bg-bloom-coral text-white font-bold rounded-lg hover:bg-orange-600 transition text-sm shadow-sm">Discuss this service</a>
                                    </div>
                                </div>
                            </div>
                        </details>
                    </article>
        '''
        
    html += '''
                </div>
            </section>
    '''

with open('services_groups.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("done")
