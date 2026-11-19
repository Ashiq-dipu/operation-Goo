/**
 * Operation GO Magazine & Editorial Blog Interactive Engine
 * Handles hero transitions, interactive article reader modal, and sliders.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Article Database for Reader Modal
  const ARTICLE_DB = {
    'hero-1': {
      category: 'WORKFORCE ECONOMICS',
      title: 'THE DEBT-FREE APPRENTICE REVOLUTION: HOW ROCHESTER YOUTH ARE BYPASSING $100K STUDENT LOANS',
      author: 'Justin Ortiz & Foundry Editorial Board',
      date: 'November 2026 • 6 Min Read',
      image: 'images/operation-go-banner-all-cohort.jpg',
      content: `
        <p>Across the United States, more than 44 million borrowers carry a collective $1.77 trillion in student loan debt. Yet right here in Rochester, New York, a counter-cultural movement is gaining explosive momentum among teenagers ages 12 to 18: paid skilled trade apprenticeships.</p>
        <p>Through Operation GO, youth aren't just learning how to hold a hammer; they are mastering the fundamentals of commercial framing, electrical blueprint calculation, HVAC diagnostic testing, and licensed contracting. More importantly, every single apprentice graduates with an OSHA-10 safety card, a complete set of Milwaukee professional power tools, and zero dollars in educational debt.</p>
        <p>"College was pushed as the only viable route to dignity," explains founder and master contractor Justin Ortiz. "Meanwhile, master carpenters and commercial electricians are retiring by the thousands every month. When our graduates step on a union job site at age 18, they are commanding $28 to $35 an hour with pensions, healthcare, and an immediate pathway to licensed business ownership."</p>
        <p>The numbers speak for themselves: over 87% of Operation GO graduates remain fully employed or launch licensed contracting firms within 18 months of cohort completion.</p>
      `
    },
    'ep-1': {
      category: 'CARPENTRY & CODE',
      title: 'TIMBER & STRUCTURAL FRAMING: BUILDING ROCHESTER’S FIRST STUDENT-CONSTRUCTED TINY HOME',
      author: 'Marcus Vance, Lead Carpentry Instructor',
      date: 'November 2026 • 4 Min Read',
      image: 'images/carpentry-drill.jpg',
      content: `
        <p>Inside the Operation GO build yard on State Street, eight high school juniors are carefully leveling 2x6 Douglas fir wall studs. This isn't a classroom simulation—it's a real 320-square-foot high-efficiency tiny home destined for a local family in need of transitional housing.</p>
        <p>From floor joists to hurricane ties and rafters, students calculate live load engineering, plumb walls using laser levels, and inspect each joint for structural compliance under New York State Uniform Fire Prevention and Building Code standards.</p>
        <p>"When a teenager realizes they have built a physical home with their own two hands, their self-worth changes forever," Vance says. "You can't outsource a wall frame to an AI algorithm."</p>
      `
    },
    'ep-2': {
      category: 'ELECTRICAL GRID',
      title: 'MASTER ELECTRICIANS: WHY COMMERCIAL HIGH-VOLTAGE TRADES ARE SURGING TO $95K SALARIES',
      author: 'Elena Gomez, IBEW Local 86 Journeywoman',
      date: 'November 2026 • 5 Min Read',
      image: 'images/blueprint-class.jpg',
      content: `
        <p>Between smart grid automation, EV charging station rollouts, and renewable solar installations, commercial electricians are currently facing the greatest workforce deficit in modern American history.</p>
        <p>In this dispatch, we break down how Operation GO students start with basic circuit theory, Ohm’s law, and conduit bending, advancing through commercial 3-phase panel wiring and residential transfer switches before high school graduation.</p>
      `
    },
    'ep-3': {
      category: 'STREETWEAR FOUNDRY',
      title: 'FROM SKETCH TO PRODUCTION: HOW ROCHESTER YOUTH CUT, SEW & LAUNCH APPAREL BRANDS',
      author: 'Darnell 'Nelly' Washington, Creative Director',
      date: 'November 2026 • 4 Min Read',
      image: 'images/sneaker-lab.jpg',
      content: `
        <p>Industrial design isn't limited to timber and steel. At the Operation GO Creative Lab, youth deconstruct iconic sneakers, operate commercial heavy-duty Juki sewing machines, and master heat-transfer vinyl and direct-to-film garment printing.</p>
        <p>Students learn the full product lifecycle: sourcing raw materials, digitizing vector tech packs, calculating profit margins, and hosting pop-up gallery showcases where 100% of proceeds fund their business bank accounts.</p>
      `
    },
    'ep-4': {
      category: 'BARBER ACADEMY',
      title: 'CLIPPER MASTERY: TURNING 1,000 APPRENTICESHIP HOURS INTO LICENSED SHOP OWNERSHIP',
      author: 'Carlos Rivera, Master Barber & Educator',
      date: 'November 2026 • 3 Min Read',
      image: 'images/barber-academy.jpg',
      content: `
        <p>Barbering is both an art form and a resilient urban business enterprise. In our state-licensed training suites, students log verified chair hours under master educators, mastering fade geometry, razor disinfection protocols, and client hospitality systems.</p>
        <p>More than haircuts, this track teaches customer acquisition, appointment scheduling software, retail product markup, and commercial lease negotiation for aspiring shop owners.</p>
      `
    },
    'ep-5': {
      category: 'FINANCIAL WEALTH',
      title: 'MANAGING YOUR FIRST $1,200 WEEKLY APPRENTICESHIP CHECK: WEALTH BUILDING FOR GEN Z',
      author: 'Foundry Financial Literacy Advisory',
      date: 'November 2026 • 5 Min Read',
      image: 'images/real-estate-finance.jpg',
      content: `
        <p>Earning great money at age 18 can be dangerous without financial discipline. Operation GO pairs hands-on trade training with mandatory financial literacy workshops.</p>
        <p>Every student creates a high-yield savings account, learns Roth IRA compounding, analyzes vehicle lease vs buy metrics, and discovers how trade wages can be leveraged to buy multifamily rental properties before their 23rd birthday.</p>
      `
    },
    'bento-1': {
      category: 'TRADES & LICENSING',
      title: 'THE GENERAL CONTRACTOR ROADMAP: FROM LABORER TO LICENSED GC',
      author: 'Justin Ortiz, General Contractor',
      date: 'November 2026 • 6 Min Read',
      image: 'images/construction-student.jpg',
      content: `
        <p>How does a high school apprentice grow into a licensed General Contractor managing seven-figure municipal projects? It starts with mastering sub-trade coordination, permit filing, OSHA compliance, and construction escrow management.</p>
        <p>Here is the exact milestone map our senior fellows use to transition from on-site builders to commercial business executives.</p>
      `
    },
    'bento-2': {
      category: 'CREATIVE LABS',
      title: 'SNEAKER RECONSTRUCTION: DECONSTRUCTING NIKE & JORDAN SILHOUETTES',
      author: 'Apparel Lab Fellows',
      date: 'November 2026 • 4 Min Read',
      image: 'images/sneaker-lab.jpg',
      content: `
        <p>Go behind the scenes inside our footwear prototyping studio as students take apart classic basketball silhouettes, replace factory liners with custom vegetable-tanned leather, and hand-stitch Goodyear welts.</p>
      `
    },
    'bento-3': {
      category: 'FOUNDRY CULTURE',
      title: 'INSIDE THE NIGHT SHIFTS: WHEN PASSION MEETS HEAVY MACHINERY',
      author: 'Editorial Photo Desk',
      date: 'November 2026 • 4 Min Read',
      image: 'images/careers-hero-timber.jpg',
      content: `
        <p>When the sun sets over Lake Ontario, the lights inside the Operation GO metal and timber foundry stay burning. Documenting the dedication of youth who choose craftsmanship, grit, and pride over street corners and video games.</p>
      `
    },
    'pop-1': {
      category: 'U.S. & ECONOMICS',
      title: 'THE 2026 SKILLED LABOR SHORTAGE: WHY CONTRACTORS CANNOT HIRE FAST ENOUGH',
      author: 'National Trades Council',
      date: 'November 2026 • 4 Min Read',
      image: 'images/instructor-mentoring.jpg',
      content: `
        <p>Detailed analysis of the demographic cliff in American construction and skilled trades. Why high school students entering the workforce today have unprecedented bargaining power and wage growth.</p>
      `
    },
    'pop-2': {
      category: 'CULTURE & EQUITY',
      title: 'BREAKING THE HARDHAT CEILING: FEMALE APPRENTICES LEADING COMMERCIAL JOBSITES',
      author: 'Operation GO Women in Trades Initiative',
      date: 'November 2026 • 5 Min Read',
      image: 'images/women-engineers.jpg',
      content: `
        <p>Highlighting the brilliant young women who are mastering structural drafting, plumbing, and site management in Rochester, setting a national benchmark for inclusive workforce development.</p>
      `
    },
    'pop-3': {
      category: 'STUDENT SPOTLIGHT',
      title: 'HOW MARCUS EARNED HIS OSHA-10 AT 16 & BOUGHT HIS FIRST WORK TRUCK DEBT-FREE',
      author: 'Admissions Office',
      date: 'November 2026 • 3 Min Read',
      image: 'images/carpentry-student.jpg',
      content: `
        <p>A true story of transformation: Marcus entered Operation GO with zero tools and no clear direction. Within 14 months, he earned OSHA credentials, joined a union framing crew, and bought a reliable Ford F-150 in cash.</p>
      `
    },
    'pop-4': {
      category: 'ENTREPRENEURSHIP',
      title: 'TURNING TRADE SKILLS INTO REAL ESTATE EQUITY: THE BUY-AND-HOLD BLUEPRINT',
      author: 'Real Estate & Wealth Desk',
      date: 'November 2026 • 5 Min Read',
      image: 'images/entrepreneur-pitch.jpg',
      content: `
        <p>Why trade skills provide the ultimate unfair advantage in real estate investing: reducing rehab costs by 60%, spot-checking foundations before purchase, and building immediate equity.</p>
      `
    }
  };

  // Modal Dialog Trigger
  const modal = document.getElementById('magReaderModal');
  const modalCloseBtn = document.getElementById('magModalClose');
  const modalImg = document.getElementById('magModalImg');
  const modalTag = document.getElementById('magModalTag');
  const modalTitle = document.getElementById('magModalTitle');
  const modalAuthor = document.getElementById('magModalAuthor');
  const modalBody = document.getElementById('magModalBody');

  function openReader(articleKey) {
    const data = ARTICLE_DB[articleKey];
    if (!data || !modal) return;

    modalImg.src = data.image;
    modalImg.alt = data.title;
    modalTag.textContent = data.category;
    modalTitle.textContent = data.title;
    modalAuthor.innerHTML = `By <strong>${data.author}</strong> • ${data.date}`;
    modalBody.innerHTML = data.content;

    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeReader() {
    if (!modal) return;
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeReader);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeReader();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeReader();
  });

  const ARTICLE_URL_MAP = {
    'hero-1': 'update-debt-free-apprentice.html',
    'ep-1': 'update-timber-framing.html',
    'ep-2': 'update-high-voltage-grid.html',
    'ep-3': 'update-apparel-foundry.html',
    'ep-4': 'update-barber-academy.html',
    'ep-5': 'update-financial-wealth.html',
    'bento-1': 'update-general-contractor-roadmap.html',
    'bento-2': 'update-sneaker-reconstruction.html',
    'bento-3': 'update-night-shifts.html',
    'pop-1': 'update-skilled-labor-shortage.html',
    'pop-2': 'update-women-in-trades.html',
    'pop-3': 'update-marcus-osha10-story.html',
    'pop-4': 'update-real-estate-equity.html',
    'blueprint-101': 'update-blueprint-reading.html',
    'cinema-4k': 'update-cinema-production.html',
    'maker-mindset': 'update-maker-mindset.html',
    'justin-letter': 'update-justin-ortiz-letter.html',
    'cohort-04-grad': 'update-cohort-04-graduation.html',
    'corporate-board': 'update-corporate-advisory-board.html'
  };

  // Attach click listener to all clickable cards to navigate to single update page
  document.querySelectorAll('[data-article-id]').forEach(el => {
    // If element is already an anchor with href, allow native navigation
    const id = el.getAttribute('data-article-id');
    const targetUrl = ARTICLE_URL_MAP[id] || `update-single.html?id=${id}`;

    if (el.tagName === 'A' && el.getAttribute('href') && el.getAttribute('href') !== '#') {
      return;
    }

    el.style.cursor = 'pointer';
    el.addEventListener('click', (e) => {
      // If clicking inside an explicit child anchor or button, let that handle it
      if (e.target.closest('a') && e.target.closest('a') !== el) {
        return;
      }
      e.preventDefault();
      window.location.href = targetUrl;
    });
  });

  // Newsletter Form Handler
  const newsletterForm = document.getElementById('magNewsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value) {
        alert(`Thank you for subscribing to Operation GO Magazine Dispatches! We have sent a confirmation to ${input.value}.`);
        newsletterForm.reset();
      }
    });
  }

  // Smooth Horizontal Carousel Scrolling for Episodes Strip
  const epCarousel = document.getElementById('magEpisodesCarousel');
  const epNext = document.getElementById('magEpisodesNext');
  const epPrev = document.getElementById('magEpisodesPrev');

  if (epCarousel && epNext && epPrev) {
    epNext.addEventListener('click', () => {
      epCarousel.scrollBy({ left: 320, behavior: 'smooth' });
    });
    epPrev.addEventListener('click', () => {
      epCarousel.scrollBy({ left: -320, behavior: 'smooth' });
    });
  }
});
