const fs = require('fs');
const path = require('path');

const articles = [
  {
    slug: 'update-debt-free-apprentice.html',
    id: 'hero-1',
    category: 'Workforce Economics',
    title: 'The Debt-Free Apprentice Revolution: How Rochester Youth Are Bypassing $100K Student Loans',
    subtitle: 'Inside the growing national movement where urban teenagers choose paid commercial construction, precision carpentry, and licensed contracting over crushing college debt.',
    author: 'Justin Ortiz',
    authorRole: 'Founder & Master Contractor, Operation GO',
    authorAvatar: 'images/justin-ortiz-camera-square.jpg',
    authorBio: 'Justin Ortiz is a Rochester City School District alumnus, licensed master contractor, and the visionary founder of Operation GO™, dedicating his life to creating debt-free vocational pathways for urban youth.',
    date: 'November 18, 2026',
    readTime: '6 Min Read',
    image: 'images/operation-go-banner-all-cohort.jpg',
    imageCaption: 'Operation GO Apprenticeship Cohort gathering at the Rochester downtown build foundry.',
    contentHtml: `
      <p class="mag-single-lead">Across the United States, more than 44 million borrowers carry an overwhelming $1.77 trillion in student loan debt. Yet right here in Rochester, New York, a counter-cultural movement is gaining explosive momentum among teenagers ages 12 to 18: paid skilled trade apprenticeships with guaranteed debt-free career trajectories.</p>

      <h2>The Paradigm Shift in Youth Career Pathways</h2>
      <p>For more than four decades, high school students were sold a singular definition of success: enroll in a four-year university, sign for five-figure student loans, and pursue white-collar office careers. However, changing economic realities and skyrocketing tuition costs have triggered a seismic awakening among Rochester youth and their families.</p>
      <p>Through Operation GO, local students aren't just learning how to hold a hammer; they are mastering the fundamentals of commercial framing, electrical blueprint calculation, HVAC diagnostic testing, and licensed contracting. More importantly, every single apprentice graduates with an OSHA-10 safety card, a complete set of Milwaukee professional power tools, and zero dollars in educational debt.</p>

      <div class="mag-single-quote">
        <p class="mag-single-quote-text">"College was pushed as the only route to dignity. Meanwhile, master carpenters and commercial electricians are retiring by the thousands every month. When our graduates step onto a union job site at age 18, they command $28 to $35 an hour with full pensions and health coverage."</p>
        <span class="mag-single-quote-author">— Justin Ortiz, Founder & Master Contractor</span>
      </div>

      <h2>Real Economic Outcomes for Gen Z Builders</h2>
      <p>The statistical outcomes recorded by Operation GO illustrate a powerful reality. Over 87% of youth who complete our 12-to-18-month foundry cycles transition directly into union apprenticeships (IBEW Local 86, UBC Local 276, UA Local 13) or register independent subcontracting enterprises.</p>
      <ul>
        <li><strong>Immediate Living Wage:</strong> Starting apprentice wages ranging from $24.50 to $32.00 per hour with scheduled collective bargaining increases.</li>
        <li><strong>Commercial Tool Grants:</strong> Each graduate receives over $1,500 in industry-standard commercial power tools and protective gear.</li>
        <li><strong>Financial Equity:</strong> Mandatory wealth management modules ensuring students establish Roth IRAs and personal investment portfolios before age 20.</li>
      </ul>

      <div class="mag-single-callout">
        <h4 class="mag-single-callout-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          Key Takeaway: The Unfair Advantage of Trades
        </h4>
        <p>By age 22, an apprentice who started at age 18 has accumulated four years of wage earnings, comprehensive pension contributions, and zero loan repayments—giving them a net worth leap of over $160,000 compared to their college-bound peers.</p>
      </div>

      <h2>Building Communities From Within</h2>
      <p>Beyond personal financial freedom, Operation GO apprentices actively revitalize their own neighborhoods. From restoring historical properties on Rochester’s west side to framing energy-efficient residential infill housing, our students build physical monuments to their own potential.</p>
    `
  },
  {
    slug: 'update-timber-framing.html',
    id: 'ep-1',
    category: 'Carpentry & Codes',
    title: 'Timber & Structural Framing: Building Rochester’s First Student-Constructed Tiny Home',
    subtitle: 'How eight high school juniors engineered, framed, and weatherproofed an energy-efficient 320-square-foot tiny home destined for local transitional housing.',
    author: 'Marcus Vance',
    authorRole: 'Lead Carpentry Instructor, Operation GO',
    authorAvatar: 'images/carpentry-student.jpg',
    authorBio: 'Marcus Vance is an OSHA-500 certified instructor and union journeyman carpenter with over 18 years of commercial framing experience throughout Western New York.',
    date: 'November 15, 2026',
    readTime: '4 Min Read',
    image: 'images/carpentry-drill.jpg',
    imageCaption: 'Operation GO student apprentice securing structural wall studs with a high-torque commercial impact driver.',
    contentHtml: `
      <p class="mag-single-lead">Inside the Operation GO build yard on State Street, eight high school juniors are carefully leveling 2x6 Douglas fir wall studs. This isn't a classroom simulation—it's a real 320-square-foot high-efficiency tiny home destined for a local family in need of transitional housing.</p>

      <h2>Engineering Under Strict Building Codes</h2>
      <p>From floor joists to hurricane ties and rafters, students calculate live load engineering, plumb walls using precision laser levels, and inspect each joint for structural compliance under New York State Uniform Fire Prevention and Building Code standards.</p>
      <p>The curriculum emphasizes hands-on mastery over passive observation. Each student calculates spacing layout on 16-inch centers, masters speed square trigonometry, and operates heavy-duty miter and table saws with strict adherence to job-site safety protocols.</p>

      <div class="mag-single-quote">
        <p class="mag-single-quote-text">"When a teenager realizes they have built a physical home with their own two hands, their self-worth changes forever. You cannot outsource a true structural wall frame to an AI algorithm."</p>
        <span class="mag-single-quote-author">— Marcus Vance, Lead Carpentry Instructor</span>
      </div>

      <h2>Building for Energy Efficiency and Climate Resilience</h2>
      <p>Constructing in upstate New York requires serious thermal engineering. The tiny home project integrates continuous exterior rigid foam insulation, taped air-barrier sheathing, and high-performance double-pane low-E windows to ensure heating costs remain minimal for the occupant.</p>
      <ul>
        <li><strong>Structural Rigidity:</strong> Engineered LVL headers and continuous hold-downs for wind uplift resistance.</li>
        <li><strong>Advanced Weatherproofing:</strong> Self-adhered flashing membranes around all window and door penetrations.</li>
        <li><strong>Eco-Friendly Timber:</strong> Certified sustainably harvested dimensional lumber sourced from regional mills.</li>
      </ul>

      <div class="mag-single-callout">
        <h4 class="mag-single-callout-title">Apprentice Milestone</h4>
        <p>All eight participating youth accrued 160 verified apprenticeship hours toward their New York State Department of Labor carpentry credentials during this build.</p>
      </div>
    `
  },
  {
    slug: 'update-high-voltage-grid.html',
    id: 'ep-2',
    category: 'Electrical Grid',
    title: 'Master Electricians: Why Commercial High-Voltage Trades Are Surging to $95K Salaries',
    subtitle: 'Between renewable microgrids, EV fast-charging corridors, and industrial automation, commercial electricians are commanding historic compensation packages.',
    author: 'Elena Gomez',
    authorRole: 'IBEW Local 86 Journeywoman & Senior Advisor',
    authorAvatar: 'images/women-engineers.jpg',
    authorBio: 'Elena Gomez is an IBEW Local 86 journeyman electrician specializing in 3-phase commercial switchgear, smart metering, and industrial renewable energy installations.',
    date: 'November 12, 2026',
    readTime: '5 Min Read',
    image: 'images/blueprint-class.jpg',
    imageCaption: 'Apprentices analyzing 3-phase commercial electrical schematics in the Operation GO technical lab.',
    contentHtml: `
      <p class="mag-single-lead">Between smart grid automation, EV charging station rollouts, and renewable solar installations, commercial electricians are currently facing the greatest workforce deficit in modern American history.</p>

      <h2>The Electrification Boom in Western New York</h2>
      <p>As state and federal mandates accelerate the transition away from fossil fuel boilers toward heat pump networks and electric vehicle infrastructure, the demand for licensed electricians has outpaced supply by nearly three to one in Monroe County alone.</p>
      <p>In this dispatch, we break down how Operation GO students start with basic circuit theory, Ohm’s law, and conduit bending, advancing through commercial 3-phase panel wiring and residential transfer switches before their high school graduation.</p>

      <div class="mag-single-callout">
        <h4 class="mag-single-callout-title">Career Ladder Breakdown</h4>
        <p>Year 1 Union Apprentice: $22.50/hr + benefits<br>
        Year 3 Journeyworker in Training: $34.00/hr<br>
        Year 5 Licensed Master Electrician: $48.00–$55.00/hr ($95,000–$115,000 annually with overtime & employer pension).</p>
      </div>

      <h2>Hands-On Diagnostic Bench Testing</h2>
      <p>In our electrical workshop, students work on live diagnostic training boards simulating complex ground faults, short circuits, and subpanel overloads. Using digital multimeters, insulation resistance testers, and thermal imaging cameras, youth diagnose issues with forensic precision.</p>
    `
  },
  {
    slug: 'update-apparel-foundry.html',
    id: 'ep-3',
    category: 'Streetwear Foundry',
    title: 'From Sketch to Production: How Rochester Youth Cut, Sew & Launch Apparel Brands',
    subtitle: 'Mastering industrial Juki lockstitch machines, direct-to-film garment printing, and supply chain logistics in the Operation GO Fashion Lab.',
    author: "Darnell 'Nelly' Washington",
    authorRole: 'Creative Director, Bespoke Apparel Lab',
    authorAvatar: 'images/gdrive/custom-sneakers-craft.jpg',
    authorBio: 'Darnell Washington is an urban streetwear designer and manufacturing specialist dedicated to teaching young entrepreneurs how to scale physical clothing brands.',
    date: 'November 10, 2026',
    readTime: '4 Min Read',
    image: 'images/sneaker-lab.jpg',
    imageCaption: 'Students operating heavy-duty industrial sewing equipment inside the Operation GO Streetwear Foundry.',
    contentHtml: `
      <p class="mag-single-lead">Industrial design isn't limited to timber and steel. At the Operation GO Creative Lab, youth deconstruct iconic sneakers, operate commercial heavy-duty Juki sewing machines, and master heat-transfer vinyl and direct-to-film garment printing.</p>

      <h2>The Science of Garment Construction</h2>
      <p>Students learn the full product lifecycle: sourcing raw organic cotton textiles, digitizing vector tech packs, calculating pattern yardage, and engineering structural double-needle seams capable of enduring daily commercial wear.</p>
      <p>Rather than merely printing graphics onto pre-made blanks, our young creators draft patterns from flat paper, cut heavy French terry and raw denim, and assemble bespoke streetwear garments from scratch.</p>

      <h2>Direct Commerce & Pop-Up Brand Showcases</h2>
      <p>Every cohort concludes with an authentic retail pop-up gallery. Students calculate unit costs, determine gross margins, and interact with live retail customers. One hundred percent of retail sales flow directly into student-owned business bank accounts.</p>
    `
  },
  {
    slug: 'update-barber-academy.html',
    id: 'ep-4',
    category: 'Barber Academy',
    title: 'Clipper Mastery: Turning 1,000 Apprenticeship Hours into Licensed Shop Ownership',
    subtitle: 'How disciplined grooming techniques, sanitation protocols, and client hospitality empower urban youth to build high-earning personal service enterprises.',
    author: 'Carlos Rivera',
    authorRole: 'Master Barber & Educator',
    authorAvatar: 'images/barber-academy.jpg',
    authorBio: 'Carlos Rivera owns two premier Rochester barber lounges and leads the Operation GO grooming apprenticeship initiative, mentoring over 120 licensed barbers.',
    date: 'November 08, 2026',
    readTime: '3 Min Read',
    image: 'images/barber-academy.jpg',
    imageCaption: 'Operation GO barber apprentices practicing precision tapering and sanitation standards under master supervision.',
    contentHtml: `
      <p class="mag-single-lead">Barbering is both an art form and a resilient urban business enterprise. In our state-licensed training suites, students log verified chair hours under master educators, mastering fade geometry, razor disinfection protocols, and client hospitality systems.</p>

      <h2>More Than Haircuts: Financial & Client Systems</h2>
      <p>A master barber is fundamentally an entrepreneur. Our curriculum covers digital booking workflows, automated SMS appointment reminders, client retention metrics, and retail grooming product markups.</p>
      <p>Students also study commercial lease negotiation, booth rent vs commission structures, and how to structure a limited liability company (LLC) to protect their personal assets while scaling their clientele.</p>

      <div class="mag-single-callout">
        <h4 class="mag-single-callout-title">The Master Barber Blueprint</h4>
        <p>With an average service ticket of $40 and 15 clients per day, a disciplined full-time barber routinely earns between $60,000 and $90,000 annually with absolute schedule autonomy and zero student debt.</p>
      </div>
    `
  },
  {
    slug: 'update-financial-wealth.html',
    id: 'ep-5',
    category: 'Financial Wealth',
    title: 'Managing Your First $1,200 Weekly Apprenticeship Check: Wealth Building for Gen Z',
    subtitle: 'Why high trade earnings require disciplined budgeting, Roth IRA compounding, and real estate equity strategies to create true generational security.',
    author: 'Foundry Financial Literacy Advisory',
    authorRole: 'Wealth & Investment Desk',
    authorAvatar: 'images/justin-ortiz-camera-square.jpg',
    authorBio: 'The Financial Literacy Advisory is composed of certified financial planners, tax accountants, and licensed general contractors dedicated to youth asset growth.',
    date: 'November 05, 2026',
    readTime: '5 Min Read',
    image: 'images/real-estate-finance.jpg',
    imageCaption: 'Students analyzing personal balance sheets, compounding interest curves, and real estate investment pro formas.',
    contentHtml: `
      <p class="mag-single-lead">Earning great money at age 18 can be dangerous without financial discipline. Operation GO pairs hands-on trade training with mandatory financial literacy workshops designed specifically for high-earning trade apprentices.</p>

      <h2>The 50/30/20 Trade Apprentice Rule</h2>
      <p>When an 18-year-old student starts taking home $1,000 to $1,400 per week, the temptation to buy depreciating liabilities—expensive sports cars, luxury apparel, and consumer tech—is immense. We teach practical wealth discipline from day one.</p>
      <ul>
        <li><strong>50% Living & Emergency Reserves:</strong> Housing, food, and building a 6-month liquid cushion.</li>
        <li><strong>30% Long-Term Compounding:</strong> Maxing out Roth IRA annual allowances ($7,000) invested in broad-market S&P 500 index funds.</li>
        <li><strong>20% Trade Equity & Real Estate Seed:</strong> Accumulating capital for their first multifamily FHA purchase down payment.</li>
      </ul>

      <div class="mag-single-quote">
        <p class="mag-single-quote-text">"Trade skills generate the cash flow; real estate and compounding investments protect the wealth. We don't train laborers; we build generational wealth stewards."</p>
        <span class="mag-single-quote-author">— Operation GO Financial Curriculum</span>
      </div>
    `
  },
  {
    slug: 'update-general-contractor-roadmap.html',
    id: 'bento-1',
    category: 'Trades & Licensing',
    title: 'The General Contractor Roadmap: From Laborer to Licensed GC',
    subtitle: 'The comprehensive milestone roadmap our senior fellows follow to progress from on-site construction workers to seven-figure licensed general contractors.',
    author: 'Justin Ortiz',
    authorRole: 'Founder & Master Contractor, Operation GO',
    authorAvatar: 'images/justin-ortiz-camera-square.jpg',
    authorBio: 'Justin Ortiz holds commercial general contracting licenses across Western New York and has completed multi-million dollar institutional and residential renovations.',
    date: 'November 03, 2026',
    readTime: '6 Min Read',
    image: 'images/construction-student.jpg',
    imageCaption: 'Senior fellow reviewing architectural mechanical prints on an active commercial renovation site.',
    contentHtml: `
      <p class="mag-single-lead">How does a high school apprentice grow into a licensed General Contractor managing seven-figure municipal projects? It starts with mastering sub-trade coordination, permit filing, OSHA compliance, and construction escrow management.</p>

      <h2>The Five Milestones of General Contracting Mastery</h2>
      <p>Transitioning from a tradesperson who works with their hands to an executive who manages multi-million dollar job sites requires a clear, deliberate path:</p>
      <ol>
        <li><strong>Field Credentialing (Years 1–2):</strong> OSHA-30, CPR/First Aid, and multi-trade journeyman experience in framing, electrical, and plumbing rough-ins.</li>
        <li><strong>Estimating & Takeoffs (Years 2–3):</strong> Mastering PlanSwift, Procore, and Bluebeam Revu to calculate exact material quantities, labor hours, and sub-bids.</li>
        <li><strong>Permit & Code Filing (Year 3):</strong> Working directly with local municipal building departments to secure zoning variances and building permits.</li>
        <li><strong>Bonding & Insurance (Year 4):</strong> Establishing commercial liability coverage, builder’s risk policies, and bonding capacity for public works.</li>
        <li><strong>Project Management & Escrow (Year 5+):</strong> Directing simultaneous multi-trade job sites, managing draw schedules, and delivering projects on time and on budget.</li>
      </ol>
    `
  },
  {
    slug: 'update-sneaker-reconstruction.html',
    id: 'bento-2',
    category: 'Creative Labs',
    title: 'Sneaker Reconstruction: Deconstructing Nike & Jordan Silhouettes',
    subtitle: 'Inside our footwear prototyping studio as students take apart classic basketball silhouettes, replace factory liners with custom vegetable-tanned leather, and hand-stitch Goodyear welts.',
    author: 'Apparel Lab Fellows',
    authorRole: 'Footwear Design Team',
    authorAvatar: 'images/gdrive/custom-sneakers-craft.jpg',
    authorBio: 'The Apparel Lab Fellows are advanced student designers who have mastered leather crafting, pattern drafting, and custom sole stitching.',
    date: 'October 30, 2026',
    readTime: '4 Min Read',
    image: 'images/custom-sneakers-pair.jpg',
    imageCaption: 'Handcrafted custom bespoke footwear built entirely from premium grain leather by Operation GO fellows.',
    contentHtml: `
      <p class="mag-single-lead">Go behind the scenes inside our footwear prototyping studio as students take apart classic basketball silhouettes, replace factory liners with custom vegetable-tanned leather, and hand-stitch Goodyear welts.</p>

      <h2>Surgical Deconstruction & Pattern Digitization</h2>
      <p>Before creating a bespoke sneaker, apprentices must dissect factory footwear seam by seam. Using heated scalpels and acetone debonding agents, students separate outsoles, midsoles, heel counters, and strobel boards to map the anatomy of athletic shoes.</p>
      <p>Each panel is subsequently laid out flat, scanned into Adobe Illustrator and CAD software, and translated into precision acrylic cutting templates for Italian leather and Japanese denim.</p>
    `
  },
  {
    slug: 'update-night-shifts.html',
    id: 'bento-3',
    category: 'Foundry Culture',
    title: 'Inside the Night Shifts: When Passion Meets Heavy Machinery',
    subtitle: 'When the sun sets over Lake Ontario, the lights inside the Operation GO metal and timber foundry stay burning. Documenting the dedication of youth who choose craftsmanship over street corners.',
    author: 'Editorial Photo Desk',
    authorRole: 'Documentary Media Team',
    authorAvatar: 'images/media-studio.jpg',
    authorBio: 'The Documentary Media Team chronicles daily life, industrial trade training, and student triumphs across all Operation GO workshops.',
    date: 'October 27, 2026',
    readTime: '4 Min Read',
    image: 'images/careers-hero-timber.jpg',
    imageCaption: 'Late-evening timber joinery session under industrial LED task lights at the Rochester foundry.',
    contentHtml: `
      <p class="mag-single-lead">When the sun sets over Lake Ontario, the lights inside the Operation GO metal and timber foundry stay burning. Documenting the dedication of youth who choose craftsmanship, grit, and pride over street corners and video games.</p>

      <h2>The Atmosphere of Focused Mastery</h2>
      <p>Walk through the bay doors at 7:30 PM on a Tuesday evening, and the sounds of heavy industry greet you: the rhythmic thud of an industrial planer, the hiss of a welding torch, and the low hum of dust collection cyclones.</p>
      <p>For many of our apprentices, the foundry is much more than a vocational school. It is an intellectual and creative sanctuary where teenagers find brotherhood, purpose, and the irreplaceable joy of tangible accomplishment.</p>
    `
  },
  {
    slug: 'update-skilled-labor-shortage.html',
    id: 'pop-1',
    category: 'U.S. & Economics',
    title: 'The 2026 Skilled Labor Shortage: Why Contractors Cannot Hire Fast Enough',
    subtitle: 'A detailed economic breakdown of the national demographic cliff in skilled trades and why high school graduates today hold unprecedented bargaining power.',
    author: 'National Trades Council',
    authorRole: 'Economic Research Group',
    authorAvatar: 'images/instructor-mentoring.jpg',
    authorBio: 'The National Trades Council tracks regional labor data, apprentice wage trajectories, and contractor workforce shortages across North America.',
    date: 'October 24, 2026',
    readTime: '4 Min Read',
    image: 'images/instructor-mentoring.jpg',
    imageCaption: 'Master contractor demonstrating framing tolerances to next-generation apprentices.',
    contentHtml: `
      <p class="mag-single-lead">Across the United States, for every five skilled tradespeople retiring today, only one qualified apprentice enters the workforce. This unprecedented demographic imbalance has created the tightest labor market in modern American construction history.</p>

      <h2>The Numbers Behind the Crisis</h2>
      <p>According to Associated Builders and Contractors (ABC), the construction industry must recruit more than 500,000 additional workers on top of normal hiring pace to satisfy current infrastructure and housing backlogs.</p>
      <p>This reality has flipped the traditional job market on its head. Commercial contractors in Western New York are offering four-figure signing bonuses, paid tool allowances, and rapid merit pay bumps to entice trained apprentices straight out of Operation GO.</p>
    `
  },
  {
    slug: 'update-women-in-trades.html',
    id: 'pop-2',
    category: 'Culture & Equity',
    title: 'Breaking the Hardhat Ceiling: Female Apprentices Leading Commercial Jobsites',
    subtitle: 'Highlighting the brilliant young women who are mastering structural drafting, electrical circuitry, and site management in Rochester, setting a national benchmark for inclusive trades.',
    author: 'Operation GO Women in Trades Initiative',
    authorRole: 'Workforce Diversity Board',
    authorAvatar: 'images/women-engineers.jpg',
    authorBio: 'The Women in Trades Initiative advocates for equal apprentice representation, mentorship, and leadership across commercial union construction.',
    date: 'October 20, 2026',
    readTime: '5 Min Read',
    image: 'images/women-engineers.jpg',
    imageCaption: 'Female apprentices reviewing engineering calculations and commercial wiring configurations.',
    contentHtml: `
      <p class="mag-single-lead">For decades, women represented less than 4% of active commercial tradespeople. Today, in the workshops of Operation GO, young women make up over 28% of our vocational fellows—and they are running job sites with extraordinary precision.</p>

      <h2>Excellence Without Compromise</h2>
      <p>From operating 12-inch sliding compound miter saws to wiring complex 480V three-phase commercial distribution panels, our female apprentices are routinely out-testing and out-performing industry baselines.</p>
      <p>"When you put on the safety glasses and pick up the torch, the metal doesn't care about your gender," says electrical fellow Maya Jenkins. "It only respects knowledge, care, and precision."</p>
    `
  },
  {
    slug: 'update-marcus-osha10-story.html',
    id: 'pop-3',
    category: 'Student Spotlight',
    title: 'How Marcus Earned His OSHA-10 at 16 & Bought His First Work Truck Debt-Free',
    subtitle: 'A true story of transformation: Marcus entered Operation GO with zero tools and no clear direction. Within 14 months, he earned OSHA credentials, joined a union framing crew, and bought a work truck in cash.',
    author: 'Admissions Office',
    authorRole: 'Student Services & Alumni Desk',
    authorAvatar: 'images/carpentry-student.jpg',
    authorBio: 'The Admissions & Student Services team supports youth from their first shop safety orientation through union dispatch and career milestones.',
    date: 'October 16, 2026',
    readTime: '3 Min Read',
    image: 'images/carpentry-student.jpg',
    imageCaption: 'Marcus Vance standing proudly beside his freshly framed structural partition wall.',
    contentHtml: `
      <p class="mag-single-lead">Marcus entered the doors of Operation GO as a quiet 15-year-old with low academic confidence and no clear career trajectory. Fourteen months later, he holds federal safety certifications, commands a $26/hr apprentice wage, and drives his own Ford F-150 with title in hand.</p>

      <h2>Finding Purpose Through Physical Labor</h2>
      <p>Marcus struggled in traditional classroom environments where sitting behind a desk for seven hours failed to engage his kinesthetic intelligence. The moment he picked up a framing square and learned how to calculate rafter cuts, everything clicked.</p>
      <p>"In school, I was told I couldn't focus," Marcus recalls. "At Operation GO, when we were framing the tiny home, I worked six hours straight without looking at my phone once. I realized I didn't have an attention problem—I had a purpose problem."</p>
    `
  },
  {
    slug: 'update-real-estate-equity.html',
    id: 'pop-4',
    category: 'Entrepreneurship',
    title: 'Turning Trade Skills into Real Estate Equity: The Buy-and-Hold Blueprint',
    subtitle: 'Why trade mastery provides the ultimate unfair advantage in real estate investing: slashing rehabilitation costs by 60% and building instant equity on day one.',
    author: 'Real Estate & Wealth Desk',
    authorRole: 'Investment Curriculum Advisory',
    authorAvatar: 'images/justin-ortiz-camera-square.jpg',
    authorBio: 'The Real Estate Desk teaches young contractors how to evaluate distressed single-family and multi-family assets, calculate ARV, and manage rental portfolios.',
    date: 'October 12, 2026',
    readTime: '5 Min Read',
    image: 'images/gdrive/marketing-agency.jpg',
    imageCaption: 'Students evaluating neighborhood parcel maps and historical renovation budgets in Rochester.',
    contentHtml: `
      <p class="mag-single-lead">Why do licensed contractors make the most successful real estate investors? Because they don't have to hire contractors. When you can personally evaluate foundation settlement, wire a 200A service, and frame walls, the economics of property investment completely transform.</p>

      <h2>The Sweaty Equity Advantage</h2>
      <p>For an everyday investor, renovating a distressed duplex in Rochester can cost between $60,000 and $90,000 in retail contractor labor. For an Operation GO graduate, that same renovation costs only the raw materials—slashing capital requirements by more than half.</p>
      <p>Our curriculum teaches students how to utilize FHA 203(k) renovation mortgages and house hack multi-family properties so their tenants cover 100% of mortgage payments while they live rent-free.</p>
    `
  },
  {
    slug: 'update-blueprint-reading.html',
    id: 'blueprint-101',
    category: 'Architecture & Codes',
    title: 'Blueprint Reading 101: Understanding Architectural Scales & Symbols',
    subtitle: 'A comprehensive beginner walkthrough on decoding complex commercial floor plans, elevation schematics, and mechanical callouts before stepping onto the job site.',
    author: 'Marcus Vance',
    authorRole: 'Lead Carpentry Instructor',
    authorAvatar: 'images/carpentry-student.jpg',
    authorBio: 'Marcus Vance trains Operation GO apprentices in architectural drafting, blueprint symbols, and CAD layout interpretation.',
    date: 'October 08, 2026',
    readTime: '5 Min Read',
    image: 'images/blueprint-class.jpg',
    imageCaption: 'Students measuring architectural plan dimensions using an architect scale ruler.',
    contentHtml: `
      <p class="mag-single-lead">Before a single 2x4 is cut or a single wire is pulled, a commercial construction project exists solely as lines on a page. Learning how to read blueprints is the dividing line between being an hourly laborer and a high-earning site supervisor.</p>

      <h2>Decoding the Architectural Language</h2>
      <p>In this guide, we demystify the core components of commercial plan sets: title blocks, scale callouts (1/4" = 1'-0"), section cuts, elevation elevations, and electrical legend symbols.</p>
      <p>Students practice translating 2D drawings into 3D spatial reality, catching dimensional discrepancies between structural and architectural drawings before they cause costly mistakes in the field.</p>
    `
  },
  {
    slug: 'update-cinema-production.html',
    id: 'cinema-4k',
    category: 'Digital Media Foundry',
    title: '4K Cinema Production: How We Document Rochester’s Hands-On Builders',
    subtitle: 'Youth in our digital media studio operate 60fps cinema rigs, record high-fidelity field audio, and produce commercial trade reels for regional employers.',
    author: 'Editorial Photo Desk',
    authorRole: 'Media Arts Director',
    authorAvatar: 'images/media-studio.jpg',
    authorBio: 'The Media Arts Studio trains students in commercial cinematography, drone surveying, and digital post-production for trade industries.',
    date: 'October 04, 2026',
    readTime: '4 Min Read',
    image: 'images/media-studio.jpg',
    imageCaption: 'Operation GO media fellow filming a structural carpentry demonstration with a gimbal-mounted 4K camera.',
    contentHtml: `
      <p class="mag-single-lead">Trades aren't just built with hammer and saw; they are communicated through cinema and digital storytelling. In the Operation GO Media Foundry, youth master broadcast video production, sound engineering, and commercial color grading.</p>

      <h2>Storytelling Meets Commercial Marketing</h2>
      <p>Students produce high-octane documentary reels showcasing their peers in the workshops. In doing so, they master Davinci Resolve, Sony cinema cameras, wireless audio lavaliers, and drone site surveys—providing regional contractors with marketing content while earning lucrative media production stipends.</p>
    `
  },
  {
    slug: 'update-maker-mindset.html',
    id: 'maker-mindset',
    category: 'Youth Psychology',
    title: 'The Maker Mindset: Why Physical Craftsmanship Sharpens Mental Clarity',
    subtitle: 'Recent neurological research demonstrates how woodworking, metal fabrication, and hands-on assembly boost cognitive focus, emotional regulation, and resilience in teenagers.',
    author: 'Dr. Althea Robinson',
    authorRole: 'Youth Behavioral Specialist & Advisory Member',
    authorAvatar: 'images/instructor-mentoring.jpg',
    authorBio: 'Dr. Robinson studies the neurocognitive benefits of hands-on vocational engagement in adolescents and advises the Operation GO mentorship program.',
    date: 'September 28, 2026',
    readTime: '6 Min Read',
    image: 'images/youth-creative-lab.jpg',
    imageCaption: 'Youth apprentice deeply focused on precision joinery at the Operation GO woodworking bench.',
    contentHtml: `
      <p class="mag-single-lead">In an era of relentless algorithmic notifications and screen fatigue, hands-on physical craftsmanship provides an urgent neurocognitive antidote. Working with physical materials grounds the human mind in undeniable, objective reality.</p>

      <h2>The Tactile Feedback Loop</h2>
      <p>When you cut a piece of wood 1/8th of an inch too short, no software update can fix it. You must acknowledge the error, analyze what went wrong with the measurement, and try again. This direct, tangible feedback loop builds grit, emotional equanimity, and authentic problem-solving confidence.</p>
    `
  },
  {
    slug: 'update-justin-ortiz-letter.html',
    id: 'justin-letter',
    category: 'Founder Dispatch',
    title: 'A Letter From Master Contractor Justin Ortiz: Why I Founded Operation GO',
    subtitle: 'Growing up in the Rochester City School District, no one handed me a path to ownership. Here is why we are building a permanent generational ladder for every urban child.',
    author: 'Justin Ortiz',
    authorRole: 'Founder & Master Contractor, Operation GO',
    authorAvatar: 'images/justin-ortiz-camera-square.jpg',
    authorBio: 'Justin Ortiz is the founder of Operation GO, a master builder, and an outspoken community champion for urban youth economic empowerment.',
    date: 'September 22, 2026',
    readTime: '7 Min Read',
    image: 'images/justin-ortiz-mentoring.jpg',
    imageCaption: 'Justin Ortiz reviewing framing geometry with young Rochester apprentices on a community site.',
    contentHtml: `
      <p class="mag-single-lead">I remember walking down North Clinton Avenue as a teenager, looking at broken buildings and vacant lots, wondering who had the authority to fix our city. Nobody told me that we had that authority—if only we had the tools and the skills.</p>

      <h2>From Survival to Construction Mastery</h2>
      <p>I started with a hand-me-down tool belt and a stubborn determination to learn how buildings stand. Over twenty years of commercial general contracting, I realized that the greatest crime committed against urban youth was convincing them that their minds were only valuable if they sat behind computers.</p>
      <p>Operation GO exists so no child in Rochester ever has to feel trapped, undervalued, or burdened by student loan debt. Here, we give them tools, dignity, and real equity in the world they help build.</p>
    `
  },
  {
    slug: 'update-cohort-04-graduation.html',
    id: 'cohort-04-grad',
    category: 'Milestones',
    title: 'Cohort 04 Graduation: 42 Students Sign Union Apprenticeship Contracts',
    subtitle: 'A historic celebration at the Rochester Riverside Convention Center as 42 high school graduates sign contracts with IBEW Electricians, UBC Carpenters, and UA Plumbers.',
    author: 'Admissions Office',
    authorRole: 'Foundry Communications',
    authorAvatar: 'images/justin-ortiz-camera-square.jpg',
    authorBio: 'The Foundry Communications team chronicles apprentice achievements and annual cohort milestone celebrations.',
    date: 'September 15, 2026',
    readTime: '3 Min Read',
    image: 'images/editorial-celebration.jpg',
    imageCaption: 'Graduating fellows celebrating their union contract signings and tool grants in downtown Rochester.',
    contentHtml: `
      <p class="mag-single-lead">Forty-two students, forty-two signed union contracts, and zero dollars in student debt. Cohort 04’s graduation ceremony marked the largest single-day union intake of Rochester youth in the city’s post-war history.</p>

      <h2>The National Signing Day for Trades</h2>
      <p>Modeled after college athletic signing days, our apprentice signing day honors trade workers with the public fanfare they deserve. Business managers from IBEW Local 86, Carpenters Local 276, and Laborers Local 435 were on stage to present hard hats, dispatch cards, and commercial toolboxes to each graduate.</p>
    `
  },
  {
    slug: 'update-corporate-advisory-board.html',
    id: 'corporate-board',
    category: 'Industry Partnerships',
    title: 'Corporate Advisory Board: How Top Regional Contractors Fund Our Toolboxes',
    subtitle: 'Local engineering firms, general contractors, and building suppliers share why investing in Operation GO guarantees them an immediate pipeline of safety-certified talent.',
    author: 'Corporate Partnerships Desk',
    authorRole: 'Industry Relations Team',
    authorAvatar: 'images/gdrive/generation-go-team.jpg',
    authorBio: 'The Corporate Partnerships Desk connects regional construction executives with Operation GO apprentices and workforce sponsorships.',
    date: 'September 10, 2026',
    readTime: '4 Min Read',
    image: 'images/gdrive/generation-go-team.jpg',
    imageCaption: 'Operation GO students and regional general contractor partners on a site safety walkthrough.',
    contentHtml: `
      <p class="mag-single-lead">Why are top general contractors and material suppliers across Monroe County investing six-figure sponsorships into Operation GO? Because our graduates arrive on job sites ready to work on day one.</p>

      <h2>Bridging the Education-Industry Divide</h2>
      <p>Traditional vocational programs often train on twenty-year-old equipment. Our corporate advisory partners ensure our workshops are outfitted with modern Milwaukee M18 Fuel cordless systems, Festool dust extractors, and current digital blueprint tablets.</p>
      <p>In exchange, our corporate partners gain direct recruitment access to our highest-performing graduates before they ever graduate from high school.</p>
    `
  }
];

// Helper to generate the complete HTML for a single update article
function generateArticlePage(art, index, allArticles) {
  const prevArt = index > 0 ? allArticles[index - 1] : allArticles[allArticles.length - 1];
  const nextArt = index < allArticles.length - 1 ? allArticles[index + 1] : allArticles[0];

  // Pick 3 related articles (different from current)
  const relatedArticles = allArticles.filter(a => a.slug !== art.slug).slice(0, 3);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${art.title.replace(/"/g, '&quot;')} | Operation GO™ Updates</title>
  <meta name="description" content="${art.subtitle.replace(/"/g, '&quot;')}">
  
  <link rel="icon" type="image/png" href="images/favicon.png">
  
  <!-- High-Performance Typography: Inter Tight, Barlow Condensed, Inter, Playfair Display -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=Inter+Tight:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,500;1,400;1,500&display=swap" rel="stylesheet">
  
  <!-- Base Site Styles + Magazine & Single Update Specific Stylesheet -->
  <link rel="stylesheet" href="css/style.css?v=20261119_blue155e89_all">
  <link rel="stylesheet" href="css/magazine-blog.css?v=20261119_single_updates_v1">

  <!-- GSAP 3 Modern Animation Engine -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
</head>
<body class="updates-page-body mag-single-page">

  <!-- ==========================================================================
       SITE-WIDE FLOATING FROSTED NAVBAR
       ========================================================================== -->
  <header class="charido-nav-wrapper">
    <div class="container">
      <div class="charido-nav-inner">
        <!-- Brand Logo -->
        <a href="index.html" class="charido-brand" aria-label="Operation GO Home">
          <span class="brand-logo-badge">
            <img src="images/logo.png" alt="Operation GO" class="brand-logo-img">
          </span>
        </a>

        <!-- Menu Links -->
        <nav class="charido-nav-links">
          <a href="index.html" class="charido-nav-link">Home</a>
          <a href="about.html" class="charido-nav-link">About</a>
          <a href="programs.html" class="charido-nav-link">Programs</a>
          <a href="gallery.html" class="charido-nav-link">Gallery</a>
          <a href="updates.html" class="charido-nav-link active-page">Updates</a>
          <a href="careers.html" class="charido-nav-link">Careers</a>
          <a href="get-involved.html" class="charido-nav-link">Get Involved</a>
          <a href="contact.html" class="charido-nav-link">Contact</a>
        </nav>

        <!-- Right Action Button -->
        <div style="display: flex; align-items: center; gap: 12px;">
          <a href="get-involved.html" class="btn-charido-orange">
            <span>Support Us</span>
            <span class="arrow-box">→</span>
          </a>
          <button class="mobile-toggle-btn" id="charidoMobileToggle" aria-label="Toggle navigation">☰</button>
        </div>
      </div>
    </div>
  </header>

  <!-- ==========================================================================
       SINGLE UPDATE ARTICLE CONTAINER
       ========================================================================== -->
  <main class="mag-single-container">
    
    <!-- Topbar: Back to Updates + Breadcrumbs -->
    <div class="mag-single-topbar">
      <a href="updates.html" class="mag-single-back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        <span>Back to All Updates</span>
      </a>

      <div class="mag-single-breadcrumbs">
        <a href="index.html">Home</a>
        <span class="sep">/</span>
        <a href="updates.html">Updates</a>
        <span class="sep">/</span>
        <span class="current">${art.category}</span>
      </div>
    </div>

    <!-- Article Header -->
    <header class="mag-single-header">
      <div class="mag-single-badge-row">
        <span class="mag-single-tag">${art.category}</span>
        <span class="mag-single-meta-time">${art.date} • ${art.readTime}</span>
      </div>

      <h1 class="mag-single-title">${art.title}</h1>
      <p class="mag-single-lead">${art.subtitle}</p>

      <!-- Author Bar & Social Share -->
      <div class="mag-single-author-bar">
        <div class="mag-single-author-info">
          <img src="${art.authorAvatar}" alt="${art.author}" class="mag-single-avatar" onerror="this.src='images/logo.png'">
          <div>
            <div class="mag-single-author-name">${art.author}</div>
            <div class="mag-single-author-role">${art.authorRole}</div>
          </div>
        </div>

        <div class="mag-single-share-group">
          <span class="mag-single-share-label">Share:</span>
          <button class="mag-single-share-btn" onclick="navigator.clipboard.writeText(window.location.href); alert('Article link copied to clipboard!');" title="Copy Link" aria-label="Copy article link">🔗</button>
          <a class="mag-single-share-btn" href="https://twitter.com/intent/tweet?text=${encodeURIComponent(art.title)}&url=${encodeURIComponent('https://operationgo.org/' + art.slug)}" target="_blank" rel="noopener" title="Share on X" aria-label="Share on X">𝕏</a>
          <a class="mag-single-share-btn" href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://operationgo.org/' + art.slug)}" target="_blank" rel="noopener" title="Share on LinkedIn" aria-label="Share on LinkedIn">in</a>
        </div>
      </div>
    </header>

    <!-- Featured Cover Photo -->
    <div class="mag-single-hero-media">
      <img src="${art.image}" alt="${art.title.replace(/"/g, '&quot;')}" loading="eager">
      <div class="mag-single-media-caption">${art.imageCaption}</div>
    </div>

    <!-- 2-Column Content Layout -->
    <div class="mag-single-layout">
      
      <!-- Left Column: Article Body -->
      <article class="mag-single-content">
        ${art.contentHtml}

        <!-- In-Article Career Action Banner -->
        <div class="mag-single-banner-cta">
          <div>
            <h4>Ready to Master a Skilled Trade?</h4>
            <p>Operation GO provides 100% tuition-free vocational training, commercial tools, and direct union placement for Rochester youth ages 12–18.</p>
          </div>
          <a href="programs.html" class="mag-single-banner-btn">
            <span>Explore Pathways</span>
            <span>→</span>
          </a>
        </div>

        <!-- Author Bio Box -->
        <div class="mag-single-author-card">
          <img src="${art.authorAvatar}" alt="${art.author}" class="mag-single-author-card-avatar" onerror="this.src='images/logo.png'">
          <div>
            <h4 class="mag-single-author-card-name">${art.author}</h4>
            <div class="mag-single-author-card-role">${art.authorRole}</div>
            <p class="mag-single-author-card-desc">${art.authorBio}</p>
          </div>
        </div>

        <!-- Prev / Next Navigation -->
        <div class="mag-single-pagination">
          <a href="${prevArt.slug}" class="mag-single-page-card">
            <span class="mag-single-page-dir">← Previous Dispatch</span>
            <p class="mag-single-page-title">${prevArt.title}</p>
          </a>

          <a href="${nextArt.slug}" class="mag-single-page-card" style="text-align: right;">
            <span class="mag-single-page-dir" style="justify-content: flex-end;">Next Dispatch →</span>
            <p class="mag-single-page-title">${nextArt.title}</p>
          </a>
        </div>
      </article>

      <!-- Right Column: Sticky Sidebar -->
      <aside class="mag-single-sidebar">
        
        <!-- About Operation GO Box -->
        <div class="mag-sidebar-box">
          <h3 class="mag-sidebar-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            About Operation GO
          </h3>
          <p class="mag-sidebar-about-p">
            A Rochester-founded community trades and creative foundry equipping urban youth ages 12–18 with OSHA certifications, toolboxes, and debt-free generational careers.
          </p>
          <a href="about.html" class="mag-sidebar-btn">
            <span>Learn Our Story</span>
            <span>→</span>
          </a>
        </div>

        <!-- Related Dispatches -->
        <div class="mag-sidebar-box">
          <h3 class="mag-sidebar-title">Related Dispatches</h3>
          <div class="mag-sidebar-list">
            ${relatedArticles.map(rel => `
              <a href="${rel.slug}" class="mag-sidebar-item">
                <div class="mag-sidebar-thumb">
                  <img src="${rel.image}" alt="${rel.title.replace(/"/g, '&quot;')}" loading="lazy">
                </div>
                <div class="mag-sidebar-meta">
                  <div class="mag-sidebar-tag">${rel.category}</div>
                  <h4 class="mag-sidebar-item-title">${rel.title}</h4>
                </div>
              </a>
            `).join('')}
          </div>
        </div>

        <!-- Pathways Quick Links -->
        <div class="mag-sidebar-box">
          <h3 class="mag-sidebar-title">Foundry Tracks</h3>
          <div class="mag-sidebar-chips">
            <a href="programs.html#trades" class="mag-sidebar-chip">Carpentry & Framing</a>
            <a href="programs.html#trades" class="mag-sidebar-chip">Electrical Grid</a>
            <a href="programs.html#sneaker" class="mag-sidebar-chip">Sneaker Lab</a>
            <a href="programs.html#media" class="mag-sidebar-chip">4K Cinema Studio</a>
            <a href="programs.html#realestate" class="mag-sidebar-chip">Real Estate Equity</a>
            <a href="programs.html#biz" class="mag-sidebar-chip">Biz Brain</a>
          </div>
        </div>

      </aside>

    </div>

  </main>

  <!-- ==========================================================================
       SITE FOOTER (EXACT CHARIDO DESIGN SYSTEM)
       ========================================================================== -->
  <footer class="charido-footer" style="background: #0B0F19; border-top: 1px solid rgba(255,255,255,0.08); padding: 60px 0 30px; color: #94A3B8;">
    <div class="container" style="max-width: 1240px; margin: 0 auto; padding: 0 24px;">
      <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 40px;">
        
        <div>
          <a href="index.html" style="display: inline-flex; align-items: center; gap: 10px; text-decoration: none; margin-bottom: 16px;">
            <img src="images/logo.png" alt="Operation GO" style="height: 38px; width: auto;">
          </a>
          <p style="font-size: 0.92rem; line-height: 1.6; color: #94A3B8; max-width: 320px; margin: 0 0 20px 0;">
            Operation GO™ is a 501(c)(3) nonprofit workforce foundry dedicated to empowering youth through skilled trades, creative design, and financial mastery in Rochester, NY.
          </p>
          <div style="font-size: 0.85rem; color: #64748B;">
            550 State Street, Rochester, NY 14608<br>
            info@operationgo.org • (585) 555-0190
          </div>
        </div>

        <div>
          <h4 style="color: #FFFFFF; font-family: var(--mag-font-head); font-size: 0.95rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px 0;">Navigation</h4>
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; font-size: 0.9rem;">
            <li><a href="index.html" style="color: #94A3B8; text-decoration: none;">Home</a></li>
            <li><a href="about.html" style="color: #94A3B8; text-decoration: none;">About Operation GO</a></li>
            <li><a href="programs.html" style="color: #94A3B8; text-decoration: none;">Vocational Tracks</a></li>
            <li><a href="gallery.html" style="color: #94A3B8; text-decoration: none;">Foundry Gallery</a></li>
            <li><a href="updates.html" style="color: #FFFFFF; text-decoration: none; font-weight: 600;">Updates & Dispatches</a></li>
            <li><a href="careers.html" style="color: #94A3B8; text-decoration: none;">Contractor Mentorship</a></li>
          </ul>
        </div>

        <div>
          <h4 style="color: #FFFFFF; font-family: var(--mag-font-head); font-size: 0.95rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px 0;">Vocational Tracks</h4>
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; font-size: 0.9rem;">
            <li><a href="programs.html#trades" style="color: #94A3B8; text-decoration: none;">Carpentry & Framing</a></li>
            <li><a href="programs.html#trades" style="color: #94A3B8; text-decoration: none;">Electrical Grid</a></li>
            <li><a href="programs.html#sneaker" style="color: #94A3B8; text-decoration: none;">Sneaker & Apparel Lab</a></li>
            <li><a href="programs.html#media" style="color: #94A3B8; text-decoration: none;">4K Media Studio</a></li>
            <li><a href="programs.html#realestate" style="color: #94A3B8; text-decoration: none;">Real Estate Equity</a></li>
            <li><a href="programs.html#biz" style="color: #94A3B8; text-decoration: none;">Biz Brain Enterprise</a></li>
          </ul>
        </div>

        <div>
          <h4 style="color: #FFFFFF; font-family: var(--mag-font-head); font-size: 0.95rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px 0;">Get Involved</h4>
          <p style="font-size: 0.88rem; line-height: 1.5; color: #94A3B8; margin-bottom: 16px;">
            Join our contractor advisory network, mentor an apprentice, or sponsor a young builder's toolbox.
          </p>
          <a href="get-involved.html" style="display: inline-block; background: #FF5722; color: #FFFFFF; text-decoration: none; font-weight: 700; font-size: 0.88rem; padding: 10px 20px; border-radius: 50px;">
            Volunteer or Donate →
          </a>
        </div>

      </div>

      <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; font-size: 0.82rem; color: #64748B;">
        <div>© 2026 Operation GO™. All rights reserved. 501(c)(3) tax-exempt organization.</div>
        <div style="display: flex; gap: 20px;">
          <a href="updates.html" style="color: #64748B; text-decoration: none;">All Updates</a>
          <a href="privacy.html" style="color: #64748B; text-decoration: none;">Privacy Policy</a>
          <a href="terms.html" style="color: #64748B; text-decoration: none;">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Scripts -->
  <script src="js/main.js"></script>
</body>
</html>`;
}

// Generate all article pages
let generatedCount = 0;
articles.forEach((art, idx) => {
  const html = generateArticlePage(art, idx, articles);
  const filePath = path.join(__dirname, art.slug);
  fs.writeFileSync(filePath, html, 'utf8');
  generatedCount++;
  console.log(`Generated: ${art.slug}`);
});

console.log(`Successfully generated ${generatedCount} single update pages!`);
