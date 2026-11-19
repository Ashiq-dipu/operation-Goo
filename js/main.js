/**
 * Operation GO™ — Charido Nonprofit & Charity Interactive Engine
 * Handles Background Video Slider, Dynamic Metric Widget, Modals, FAQ & GSAP Motion
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. VIDMO HERO SECTION: STACKED CARD SLIDE-UP ANIMATION TIED TO SCROLL (EXACT IMN)
     - Panel 1 rises from yPercent 100 to 0 on scroll down, covering Panel 0
     - Panel 2 rises from yPercent 100 to 0 on scroll down, covering Panel 1
     - Reverse on scroll up
     - Silky smooth 1:1 scrub: 0.5 with GSAP ScrollTrigger
     - Minimalist layout: Heading and Button at Bottom only
     ========================================================================== */
  const heroSlider = document.getElementById('videoHeroSlider');
  const panel1 = document.querySelector('.vidmo-hero-wrapper .video-slide-item[data-index="1"]');
  const panel2 = document.querySelector('.vidmo-hero-wrapper .video-slide-item[data-index="2"]');
  const videoSlides = Array.from(document.querySelectorAll('.vidmo-hero-wrapper .video-slide-item'));
  const textSlides = Array.from(document.querySelectorAll('.vidmo-text-slide'));
  const btnSlides = Array.from(document.querySelectorAll('.vidmo-btn-slide'));
  const vidmoDots = Array.from(document.querySelectorAll('.vidmo-dot'));
  const pausePlayBtn = document.getElementById('videoPausePlayBtn');
  const pauseIcon = document.getElementById('pauseIcon');
  const playIcon = document.getElementById('playIcon');

  // Video Lightbox Modal Elements
  const lightboxModal = document.getElementById('videoLightboxModal');
  const lightboxIframe = document.getElementById('lightboxIframe');
  const lightboxClose = document.getElementById('videoLightboxClose');

  let activeSlide = 0;
  let heroTimeline = null;
  const videoIds = ['MrPBNwApS08', 'SBz8zKQDbss', 'G2G6d7bq6Qc'];

  // Autoplay all local HTML5 videos
  const videoEls = Array.from(document.querySelectorAll('.vidmo-hero-wrapper .video-slide-media'));
  function playAllVideos() {
    videoEls.forEach(vid => {
      vid.muted = true;
      vid.playsInline = true;
      const p = vid.play();
      if (p) p.catch(() => {});
    });
  }
  playAllVideos();

  // Setup GSAP 3 Stacked Card Slide-Up Animation tied to Scroll (Exact VidmoHero.jsx)
  if (heroSlider && window.gsap && window.ScrollTrigger && panel1 && panel2) {
    window.gsap.registerPlugin(window.ScrollTrigger);

    // Initial positions for incoming panels (matching VidmoHero.jsx lines 82-84)
    gsap.set(panel1, { yPercent: 100 });
    gsap.set(panel2, { yPercent: 100 });

    let lastIdx = 0;

    function updateSlideState(idx) {
      activeSlide = idx;

      // Update active text slide (Heading)
      textSlides.forEach((ts, i) => {
        ts.classList.toggle('active', i === idx);
      });

      // Update active button at bottom
      btnSlides.forEach((btn, i) => {
        btn.classList.toggle('active', i === idx);
      });

      // Update navigation dots
      vidmoDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === idx);
      });
    }

    heroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: heroSlider,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5, // Silky smooth 1:1 scrub with scroll wheel (exact Vidmo)
        fastScrollEnd: true,
        preventOverlaps: true,
        onUpdate: (self) => {
          const progress = self.progress;
          let idx = 0;
          if (progress >= 0.55) idx = 2;
          else if (progress >= 0.20) idx = 1;

          if (idx !== lastIdx) {
            lastIdx = idx;
            updateSlideState(idx);
          }
        }
      }
    });

    // 1. Slide 2 rises from the bottom and covers Slide 1 (exact VidmoHero.jsx lines 113-117)
    heroTimeline.to(panel1, {
      yPercent: 0,
      ease: 'power1.inOut',
      duration: 1
    })
    // 2. Slide 3 rises from the bottom and covers Slide 2 (exact VidmoHero.jsx lines 119-123)
    .to(panel2, {
      yPercent: 0,
      ease: 'power1.inOut',
      duration: 1
    });

    // Initialize slide state
    updateSlideState(0);
  }

  // Click Navigation Dots -> Scroll smoothly to exact slide position
  vidmoDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      if (!heroTimeline || !heroTimeline.scrollTrigger) return;
      const st = heroTimeline.scrollTrigger;
      const progressTargets = [0, 0.42, 0.88];
      const targetScroll = st.start + (st.end - st.start) * progressTargets[idx];
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    });
  });

  // Pause / Play Button Toggle
  if (pausePlayBtn) {
    pausePlayBtn.addEventListener('click', () => {
      isVideoPlaying = !isVideoPlaying;
      videoEls.forEach(vid => {
        if (isVideoPlaying) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      });
      if (pauseIcon) pauseIcon.style.display = isVideoPlaying ? 'block' : 'none';
      if (playIcon) playIcon.style.display = isVideoPlaying ? 'none' : 'block';
    });
  }

  // Video Lightbox Modal (Watch Story Buttons & Title Click)
  function openVideoLightbox(ytId) {
    if (ytId && lightboxIframe && lightboxModal) {
      lightboxIframe.src = 'https://www.youtube-nocookie.com/embed/' + ytId + '?autoplay=1&mute=0&controls=1&rel=0';
      lightboxModal.classList.add('active');
      // Pause background videos while modal is open
      videoEls.forEach(vid => vid.pause());
    }
  }

  // Bind watch buttons
  const watchButtons = document.querySelectorAll('.vidmo-btn-watch[data-youtube-id], .vidmo-hero-title[data-youtube-id], #vidmoQuickWatch');
  watchButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const ytId = btn.getAttribute('data-youtube-id') || videoIds[activeSlide];
      openVideoLightbox(ytId);
    });
  });

  if (lightboxClose && lightboxModal) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
      if (lightboxIframe) lightboxIframe.src = '';
      if (isVideoPlaying) playAllVideos();
    });

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
        if (lightboxIframe) lightboxIframe.src = '';
        if (isVideoPlaying) playAllVideos();
      }
    });
  }

  /* ==========================================================================
     2. FAQ ACCORDION INTERACTION
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question-btn');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all other items
        faqItems.forEach((other) => other.classList.remove('active'));
        // Toggle current
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  /* ==========================================================================
     3. MODALS (DONATION & STUDENT REGISTRATION)
     ========================================================================== */
  const modalTriggers = document.querySelectorAll('[data-open-modal]');
  const modalCloses = document.querySelectorAll('.modal-close-btn, [data-close-modal]');
  const overlays = document.querySelectorAll('.charido-modal-overlay');

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-open-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Pre-select program track in dropdown if specified
        const trackValue = trigger.getAttribute('data-track-select');
        if (trackValue) {
          const trackDropdown = document.getElementById('applyModalTrackSelect') || document.getElementById('charidoTrackSelect');
          if (trackDropdown) {
            trackDropdown.value = trackValue;
          }
        }
      }
    });
  });

  modalCloses.forEach((closeBtn) => {
    closeBtn.addEventListener('click', () => {
      overlays.forEach((modal) => modal.classList.remove('active'));
      document.body.style.overflow = '';
    });
  });

  overlays.forEach((overlay) => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Preset Donation Buttons
  const presetBtns = document.querySelectorAll('.preset-amount-btn');
  const customAmountInput = document.getElementById('customAmountInput');

  presetBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      presetBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const amount = btn.getAttribute('data-amount');
      if (customAmountInput) {
        customAmountInput.value = amount;
      }
    });
  });

  // Donation Form Submission
  const donationForm = document.getElementById('charidoDonationForm');
  if (donationForm) {
    donationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = donationForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Processing Contribution...';
      submitBtn.disabled = true;

      setTimeout(() => {
        donationForm.innerHTML = `
          <div style="text-align: center; padding: 30px 10px;">
            <div style="width: 60px; height: 60px; border-radius: 50%; background: #1B4D3E; color: #fff; font-size: 2rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">✓</div>
            <h3 style="color: #1B4D3E; font-size: 1.6rem; font-weight: 800; margin-bottom: 10px;">Thank You for Empowering Youth!</h3>
            <p style="color: #5F6B7A; line-height: 1.6; font-size: 1rem;">Your tax-deductible contribution provides tools, safety gear, and paid stipends for young builders in Rochester, NY. A receipt has been sent to your email.</p>
            <button class="btn-charido-orange" style="margin-top: 24px;" data-close-modal>
              <span>Close Window</span>
              <span class="arrow-box">→</span>
            </button>
          </div>
        `;
        const newClose = donationForm.querySelector('[data-close-modal]');
        if (newClose) {
          newClose.addEventListener('click', () => {
            overlays.forEach((m) => m.classList.remove('active'));
            document.body.style.overflow = '';
          });
        }
      }, 1200);
    });
  }

  // Student Apply Form Submission (supports both form IDs)
  const studentForm = document.getElementById('charidoStudentForm') || document.getElementById('studentApplicationForm');
  if (studentForm) {
    studentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = studentForm.querySelector('button[type="submit"]');
      submitBtn.innerHTML = 'Submitting Application...';
      submitBtn.disabled = true;

      setTimeout(() => {
        studentForm.innerHTML = `
          <div style="text-align: center; padding: 30px 10px;">
            <div style="width: 60px; height: 60px; border-radius: 50%; background: #10B981; color: #fff; font-size: 2rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">✓</div>
            <h3 style="color: #0F172A; font-size: 1.6rem; font-weight: 800; margin-bottom: 10px;">Cohort Application Received!</h3>
            <p style="color: #64748B; line-height: 1.6; font-size: 1rem;">Justin Ortiz and our admissions team will contact you and your guardian within 24 hours to schedule your foundry orientation and safety gear sizing.</p>
            <button class="donatia-btn-dark" style="margin: 24px auto 0; justify-content: center;" data-close-modal>
              <span>Return to Programs</span>
              <span class="btn-arrow-icon">→</span>
            </button>
          </div>
        `;
        const newClose = studentForm.querySelector('[data-close-modal]');
        if (newClose) {
          newClose.addEventListener('click', () => {
            overlays.forEach((m) => m.classList.remove('active'));
            document.body.style.overflow = '';
          });
        }
      }, 1200);
    });
  }

  // Donatia Program Track Filters
  const filterPills = document.querySelectorAll('.donatia-filter-pill');
  const trackCards = document.querySelectorAll('.donatia-track-card-detailed');

  if (filterPills.length > 0 && trackCards.length > 0) {
    filterPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        filterPills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        const filterVal = pill.getAttribute('data-filter');

        trackCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          if (filterVal === 'all' || category === filterVal) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });

        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
      });
    });

    // Deep-linking hash navigation for Program Cards
    function handleProgramHashNavigation() {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (!hash) return;

      const hashMapping = {
        'trades': 'track-construction',
        'career-ladder': 'track-construction',
        'construction': 'track-construction',
        'summer': 'track-summer',
        'syep': 'track-summer',
        'sneaker': 'track-sneaker',
        'apparel': 'track-sneaker',
        'media': 'track-media',
        'cinema': 'track-media',
        'realestate': 'track-realestate',
        'real-estate': 'track-realestate',
        'biz': 'track-entrepreneurship',
        'entrepreneurship': 'track-entrepreneurship',
        'reprogram': 'track-leadership',
        'leadership': 'track-leadership',
        'academic': 'track-academic'
      };

      const resolvedId = hashMapping[hash] || hash;
      const targetCard = document.getElementById(resolvedId) || document.querySelector(`#${resolvedId}`) || document.getElementById(hash)?.closest('.donatia-track-card-detailed');

      if (targetCard) {
        // Reset filter pills to 'All Pathways' so card is guaranteed visible
        filterPills.forEach((p) => p.classList.remove('active'));
        const allPill = document.querySelector('.donatia-filter-pill[data-filter="all"]');
        if (allPill) allPill.classList.add('active');

        trackCards.forEach((card) => {
          card.style.display = 'block';
        });

        // Smooth scroll with offset for fixed navbar
        setTimeout(() => {
          const navOffset = 105;
          const rect = targetCard.getBoundingClientRect();
          const targetY = window.pageYOffset + rect.top - navOffset;

          window.scrollTo({
            top: targetY,
            behavior: 'smooth'
          });

          // Soft highlight pulse
          targetCard.classList.add('program-highlight-pulse');
          setTimeout(() => {
            targetCard.classList.remove('program-highlight-pulse');
          }, 2400);
        }, 120);
      }
    }

    // Run on load and hash change
    window.addEventListener('load', handleProgramHashNavigation);
    window.addEventListener('hashchange', handleProgramHashNavigation);
    if (window.location.hash) {
      setTimeout(handleProgramHashNavigation, 80);
    }
  }

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('charidoMobileToggle');
  const navLinks = document.querySelector('.charido-nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = '';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '20px';
        navLinks.style.right = '20px';
        navLinks.style.background = 'rgba(10, 25, 38, 0.96)';
        navLinks.style.padding = '24px';
        navLinks.style.borderRadius = '20px';
        navLinks.style.backdropFilter = 'blur(16px)';
        navLinks.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
        navLinks.style.marginTop = '12px';
      }
    });
  }

  // Ensure autoplay videos play reliably across desktop and mobile
  const autoplayVideos = document.querySelectorAll('video[autoplay]');
  autoplayVideos.forEach((vid) => {
    vid.muted = true;
    const playPromise = vid.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback on first user interaction if blocked by policy
        const resumeOnTouch = () => {
          vid.play().catch(() => {});
          window.removeEventListener('touchstart', resumeOnTouch);
          window.removeEventListener('click', resumeOnTouch);
        };
        window.addEventListener('touchstart', resumeOnTouch, { passive: true });
        window.addEventListener('click', resumeOnTouch, { passive: true });
      });
    }
  });



  /* ==========================================================================
     4. GSAP 3 SCROLL ANIMATIONS (Standard GSAP 3 Syntax)
     ========================================================================== */
  if (window.gsap) {
    const gsap = window.gsap;
    
    // Animate new video hero bottom-left elements
    if (document.querySelector('.video-hero-bottom-left')) {
      gsap.from('.video-hero-bottom-left > *', {
        y: 45,
        opacity: 0,
        duration: 1,
        stagger: 0.16,
        ease: 'power3.out',
        delay: 0.3
      });
      
      gsap.from(['.video-hero-dots-center', '.video-hero-controls-right'], {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.7
      });
    }

    // GSAP ScrollTrigger for 3D Gallery Header
    if (window.ScrollTrigger && document.querySelector('#works')) {
      gsap.from('.gallery-section-header > *', {
        scrollTrigger: {
          trigger: '#works',
          start: 'top 80%'
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out'
      });
    }

    // GSAP ScrollTrigger for About Manifesto Word-by-Word Color Scrub
    if (typeof ScrollTrigger !== 'undefined' && document.querySelector('#manifestoHeadline')) {
      gsap.registerPlugin(ScrollTrigger);

      const words = document.querySelectorAll('#manifestoHeadline .m-word');
      if (words.length > 0) {
        gsap.fromTo(words, 
          { color: '#94A3B8' },
          {
            color: '#0A0D14',
            stagger: 0.08,
            ease: 'none',
            scrollTrigger: {
              trigger: '#about',
              start: 'top 80%',
              end: 'center 42%',
              scrub: 0.75,
              invalidateOnRefresh: true
            }
          }
        );
      }
    }
  }

  /* ==========================================================================
     3.5 EDITORIAL PHOTO & SHORTS SLIDER (CONTINUOUS SLOW AUTO-SCROLLING)
     5 items visible at once: 2nd and 4th are clean, auto-playing YouTube Shorts.
     Continuous smooth slow horizontal progression, dynamic fan angle morphing,
     hover-to-pause, GSAP button nudge, touch swipe support.
     ========================================================================== */
  const railGalleryTrack = document.getElementById('railGalleryTrack');
  const railPrevBtn = document.getElementById('railPrevBtn');
  const railNextBtn = document.getElementById('railNextBtn');
  const gallerySection = document.getElementById('gallery');

  if (railGalleryTrack) {
    const cards = Array.from(railGalleryTrack.querySelectorAll('.rail-photo-card'));
    const N = cards.length; // 8 cards (alternating photos & clean YouTube shorts)
    const stride = 306;     // 268px card width + 38px spacing
    const W = N * stride;   // Total loop cycle width
    const scrollState = { pos: 0 };
    
    let isHovered = false;
    let isVisible = true;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartPos = 0;
    let animFrameId = null;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const baseSpeed = prefersReducedMotion ? 0 : 0.35; // ~21px/sec: calm, slow, continuous drift

    // Position cards dynamically around center with smooth fan curves
    function updateCardPositions() {
      const currentPos = scrollState.pos;

      for (let i = 0; i < N; i++) {
        const card = cards[i];
        const X0 = (i - 2) * stride; // Card 2 is at center (x=0) when scrollState.pos = 0
        let relX = (X0 - currentPos) % W;
        if (relX < -W / 2) relX += W;
        if (relX > W / 2) relX -= W;

        const slotPos = relX / stride; // slot coordinate (-2 = far left, 0 = center, +2 = far right)
        const rot = Math.max(-14, Math.min(14, slotPos * 6.5));
        const ty = Math.pow(Math.abs(slotPos), 1.6) * 16 - 8;
        const zIndex = Math.round(10 - Math.min(8, Math.abs(slotPos) * 2.5));

        // Softly fade cards that travel beyond the visible 5-card fan boundary
        let opacity = 1;
        if (Math.abs(slotPos) > 2.4) {
          opacity = Math.max(0, 1 - (Math.abs(slotPos) - 2.4) / 0.7);
        }

        card.style.transform = `translate3d(${relX}px, ${ty}px, 0) rotate(${rot}deg)`;
        card.style.zIndex = zIndex;
        card.style.opacity = opacity;
      }
    }

    // Continuous auto-movement ticker
    function onTick() {
      if (!isHovered && isVisible && !isDragging) {
        scrollState.pos += baseSpeed;
      }
      updateCardPositions();
      animFrameId = requestAnimationFrame(onTick);
    }

    // Start ticker
    animFrameId = requestAnimationFrame(onTick);

    // Hover track to pause auto-movement
    railGalleryTrack.addEventListener('mouseenter', () => {
      isHovered = true;
    });
    railGalleryTrack.addEventListener('mouseleave', () => {
      isHovered = false;
    });

    // Arrow button triggers (smooth GSAP step progression)
    function nudgeSlider(direction) {
      if (typeof gsap !== 'undefined') {
        gsap.to(scrollState, {
          pos: scrollState.pos + direction * stride,
          duration: 0.7,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      } else {
        scrollState.pos += direction * stride;
        updateCardPositions();
      }
    }

    if (railNextBtn) {
      railNextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nudgeSlider(1);
      });
    }

    if (railPrevBtn) {
      railPrevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nudgeSlider(-1);
      });
    }

    // Touch swipe navigation
    railGalleryTrack.addEventListener('touchstart', (e) => {
      isDragging = true;
      dragStartX = e.touches[0].clientX;
      dragStartPos = scrollState.pos;
    }, { passive: true });

    railGalleryTrack.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      const diffX = dragStartX - currentX;
      scrollState.pos = dragStartPos + diffX;
    }, { passive: true });

    railGalleryTrack.addEventListener('touchend', () => {
      isDragging = false;
    }, { passive: true });

    // IntersectionObserver to run animation only when visible in viewport
    if ('IntersectionObserver' in window && gallerySection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      }, { threshold: 0.1 });
      observer.observe(gallerySection);
    }
  }

  // Legacy Mise Carousel Guard (if elements exist)
  const miseStageViewport = document.getElementById('miseStageViewport');
  const miseCardsDeck = document.getElementById('miseCardsDeck');
  const miseCards = Array.from(document.querySelectorAll('.mise-card'));
  const misePrevBtn = document.getElementById('misePrevBtn');
  const miseNextBtn = document.getElementById('miseNextBtn');

  // Lightbox Modal References
  const cinemaModal = document.getElementById('cinemaLightboxModal');
  const cinemaImg = document.getElementById('cinemaLightboxImg');
  const cinemaVideo = document.getElementById('cinemaLightboxVideo');
  const cinemaTag = document.getElementById('cinemaLightboxTag');
  const cinemaTitle = document.getElementById('cinemaLightboxTitle');
  const cinemaCounter = document.getElementById('cinemaLightboxCounter');
  const cinemaClose = document.getElementById('cinemaLightboxClose');
  const cinemaBackdrop = document.getElementById('cinemaLightboxBackdrop');
  const cinemaPrev = document.getElementById('cinemaLightboxPrev');
  const cinemaNext = document.getElementById('cinemaLightboxNext');

  if (miseStageViewport && miseCards.length > 0) {
    let currentMiseIdx = 0;
    const totalMise = miseCards.length;
    let autoplayTimer = null;
    const AUTOPLAY_INTERVAL = 2600; // 2.6 seconds per card transition
    let isModalOpen = false;

    // Helper: calculate cyclic shortest distance across circular list
    function getCyclicDistance(i, centerIdx, total) {
      let diff = i - centerIdx;
      while (diff > total / 2) diff -= total;
      while (diff < -total / 2) diff += total;
      return diff;
    }

            // Determine responsive step spacing based on viewport width
    function getSpacingParams() {
      const w = window.innerWidth;
      if (w < 640) {
        return { step1: 130, step2: 240, step3: 340 };
      } else if (w < 1024) {
        return { step1: 175, step2: 325, step3: 450 };
      } else {
        // Calibrated fanned deck: ~40px overlap between 250px wide cards
        return { step1: 215, step2: 395, step3: 550 };
      }
    }

    // Main Crescent Deck Slider: Subtle scaling & elegant parabolic drop
    function updateMiseCoverflow(activeIndex, immediate = false) {
      currentMiseIdx = (activeIndex + totalMise) % totalMise;
      const { step1, step2, step3 } = getSpacingParams();

      miseCards.forEach((card, i) => {
        const dist = getCyclicDistance(i, currentMiseIdx, totalMise);
        const absDist = Math.abs(dist);

        card.classList.remove('active-card', 'step-1', 'step-2', 'step-3');

        let targetX = 0;
        let targetY = 0;
        let targetScale = 1;
        let targetOpacity = 1;
        let targetZIndex = 1;

        if (dist === 0) {
          // Center Card: Elevated summit, prominent focus
          card.classList.add('active-card');
          targetX = 0;
          targetY = -24;
          targetScale = 1.05;
          targetOpacity = 1;
          targetZIndex = 10;
        } else if (absDist === 1) {
          // Immediate neighbors (Step 1): Cascades down 28px, 96% scale
          card.classList.add('step-1');
          targetX = dist > 0 ? step1 : -step1;
          targetY = 4;
          targetScale = 0.96;
          targetOpacity = 0.95;
          targetZIndex = 8;
        } else if (absDist === 2) {
          // Second neighbors (Step 2): Cascades down another 30px, 88% scale
          card.classList.add('step-2');
          targetX = dist > 0 ? step2 : -step2;
          targetY = 34;
          targetScale = 0.88;
          targetOpacity = 0.78;
          targetZIndex = 6;
        } else if (absDist === 3) {
          // Third neighbors (Step 3): Cascades down further, 80% scale
          card.classList.add('step-3');
          targetX = dist > 0 ? step3 : -step3;
          targetY = 66;
          targetScale = 0.80;
          targetOpacity = 0.45;
          targetZIndex = 4;
        } else {
          // Offscreen buffer cards
          targetX = dist > 0 ? (step3 + 140) : -(step3 + 140);
          targetY = 90;
          targetScale = 0.68;
          targetOpacity = 0;
          targetZIndex = 1;
        }

        // Apply zIndex immediately so the incoming center card smoothly rises above neighbors without stacking pop
        card.style.zIndex = targetZIndex;

        if (window.gsap && !immediate) {
          window.gsap.to(card, {
            x: targetX,
            y: targetY,
            scale: targetScale,
            opacity: targetOpacity,
            duration: 0.7,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        } else {
          card.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) scale(${targetScale})`;
          card.style.opacity = targetOpacity;
        }
      });
    }

        // Rock-Solid Automatic Infinite Loop (Keeps sliding without getting stuck)
    function startAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
      autoplayTimer = setInterval(() => {
        if (!isModalOpen) {
          updateMiseCoverflow(currentMiseIdx + 1);
        }
      }, AUTOPLAY_INTERVAL);
    }

    function restartAutoplay() {
      startAutoplay();
    }

    // Card click handling
    miseCards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        if (currentMiseIdx === idx) {
          openCinemaModal(idx);
        } else {
          updateMiseCoverflow(idx);
          restartAutoplay();
        }
      });
    });

    // Arrow navigation
    if (miseNextBtn) {
      miseNextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateMiseCoverflow(currentMiseIdx + 1);
        restartAutoplay();
      });
    }

    if (misePrevBtn) {
      misePrevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateMiseCoverflow(currentMiseIdx - 1);
        restartAutoplay();
      });
    }

    // Touch and swipe gestures
    let touchStartX = 0;
    let touchEndX = 0;
    miseStageViewport.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    miseStageViewport.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diffX = touchEndX - touchStartX;
      if (Math.abs(diffX) > 40) {
        if (diffX < 0) {
          updateMiseCoverflow(currentMiseIdx + 1);
        } else {
          updateMiseCoverflow(currentMiseIdx - 1);
        }
        restartAutoplay();
      }
    }, { passive: true });

    // Lightbox Modal Functions
    function openCinemaModal(idx) {
      isModalOpen = true;
      const card = miseCards[idx];
      if (!card) return;

      const mediaType = card.getAttribute('data-type') || 'image';
      const mediaSrc = card.getAttribute('data-src');
      const mediaTitle = card.getAttribute('data-title') || 'Craft Showcase';
      const mediaCat = card.getAttribute('data-category') || 'GENERATION GO';

      if (cinemaTag) cinemaTag.textContent = mediaCat;
      if (cinemaTitle) cinemaTitle.textContent = mediaTitle;
      if (cinemaCounter) cinemaCounter.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(totalMise).padStart(2, '0')}`;

      if (mediaType === 'video') {
        if (cinemaImg) cinemaImg.style.display = 'none';
        if (cinemaVideo) {
          cinemaVideo.style.display = 'block';
          cinemaVideo.src = mediaSrc;
          cinemaVideo.currentTime = 0;
          cinemaVideo.play().catch(() => {});
        }
      } else {
        if (cinemaVideo) {
          cinemaVideo.pause();
          cinemaVideo.style.display = 'none';
        }
        if (cinemaImg) {
          cinemaImg.style.display = 'block';
          cinemaImg.src = mediaSrc;
        }
      }

      if (cinemaModal) {
        cinemaModal.classList.add('active');
        cinemaModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeCinemaModal() {
      isModalOpen = false;
      if (cinemaVideo) {
        cinemaVideo.pause();
        cinemaVideo.src = '';
      }
      if (cinemaModal) {
        cinemaModal.classList.remove('active');
        cinemaModal.setAttribute('aria-hidden', 'true');
      }
      document.body.style.overflow = '';
      restartAutoplay();
    }

    if (cinemaClose) cinemaClose.addEventListener('click', closeCinemaModal);
    if (cinemaBackdrop) cinemaBackdrop.addEventListener('click', closeCinemaModal);

    if (cinemaNext) {
      cinemaNext.addEventListener('click', () => {
        const nextIdx = (currentMiseIdx + 1) % totalMise;
        updateMiseCoverflow(nextIdx);
        openCinemaModal(nextIdx);
      });
    }

    if (cinemaPrev) {
      cinemaPrev.addEventListener('click', () => {
        const prevIdx = (currentMiseIdx - 1 + totalMise) % totalMise;
        updateMiseCoverflow(prevIdx);
        openCinemaModal(prevIdx);
      });
    }

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
      if (cinemaModal && cinemaModal.classList.contains('active')) {
        if (e.key === 'Escape') {
          closeCinemaModal();
        } else if (e.key === 'ArrowRight') {
          const nextIdx = (currentMiseIdx + 1) % totalMise;
          updateMiseCoverflow(nextIdx);
          openCinemaModal(nextIdx);
        } else if (e.key === 'ArrowLeft') {
          const prevIdx = (currentMiseIdx - 1 + totalMise) % totalMise;
          updateMiseCoverflow(prevIdx);
          openCinemaModal(prevIdx);
        }
      }
    });

    // Window resize recalculation
    window.addEventListener('resize', () => {
      updateMiseCoverflow(currentMiseIdx, true);
    });

    // Start on first slide and engage rock-solid automatic infinite slider!
    updateMiseCoverflow(0, true);
    startAutoplay();
  }

  /* ==========================================================================
     VERIFIED IMPACT COUNTER ANIMATION
     Smoothly counts up statistics when scrolled into viewport
     ========================================================================== */
  const counterElements = document.querySelectorAll('[data-counter]');
  if ('IntersectionObserver' in window && counterElements.length > 0) {
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const rawTarget = el.getAttribute('data-counter');
          const isDecimal = rawTarget.includes('.');
          const target = parseFloat(rawTarget);
          const suffix = el.getAttribute('data-suffix') || '';
          const prefix = el.getAttribute('data-prefix') || '';
          let current = 0;
          const duration = 1400;
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              const displayVal = isDecimal ? target.toFixed(1) : Math.round(target).toLocaleString();
              el.textContent = `${prefix}${displayVal}${suffix}`;
              clearInterval(timer);
            } else {
              const displayVal = isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString();
              el.textContent = `${prefix}${displayVal}${suffix}`;
            }
          }, stepTime);

          obs.unobserve(el);
        }
      });
    }, { threshold: 0.35 });

    counterElements.forEach(el => counterObserver.observe(el));
  }

  /* ==========================================================================
     PROGRAMS PAGE: 3-CARD FANNED HERO DECK (HOVER TO BRING TO FRONT)
     When user moves cursor over back video cards, that card animates smoothly
     to the front (zIndex 35, un-tilted 0deg, scale 1.1) so the user can clearly
     see and watch it in full prominence.
     ========================================================================== */
  const donatiaDeckWrap = document.querySelector('.donatia-deck-wrap');
  if (donatiaDeckWrap) {
    const deckCards = Array.from(donatiaDeckWrap.querySelectorAll('.donatia-deck-card'));
    const leftCard = donatiaDeckWrap.querySelector('.deck-card-left');
    const centerCard = donatiaDeckWrap.querySelector('.deck-card-center');
    const rightCard = donatiaDeckWrap.querySelector('.deck-card-right');

    const cardDefaults = new Map([
      [leftCard, { rotation: -12, y: 12, x: 0, scale: 1, zIndex: 1 }],
      [centerCard, { rotation: 0, y: 0, x: 0, scale: 1.02, zIndex: 4 }],
      [rightCard, { rotation: 12, y: 12, x: 0, scale: 1, zIndex: 2 }]
    ]);

    function activateCard(card) {
      if (!card) return;
      deckCards.forEach((c) => c.classList.remove('deck-card-active'));
      card.classList.add('deck-card-active');

      if (typeof gsap !== 'undefined') {
        const isLeft = card === leftCard;
        const isRight = card === rightCard;
        const targetX = isLeft ? 45 : (isRight ? -45 : 0);

        gsap.to(card, {
          rotation: 0,
          scale: 1.1,
          x: targetX,
          y: -14,
          zIndex: 35,
          opacity: 1,
          filter: 'brightness(1)',
          duration: 0.45,
          ease: 'power3.out',
          overwrite: 'auto'
        });

        // Ensure video is playing when brought to front
        const video = card.querySelector('video');
        if (video && video.paused) {
          video.play().catch(() => {});
        }

        // Subtly step down sibling cards
        deckCards.forEach((other) => {
          if (other !== card) {
            const def = cardDefaults.get(other) || { zIndex: 1 };
            gsap.to(other, {
              zIndex: def.zIndex,
              scale: 0.94,
              opacity: 0.82,
              filter: 'brightness(0.9)',
              duration: 0.45,
              ease: 'power3.out',
              overwrite: 'auto'
            });
          }
        });
      }
    }

    function resetDeck() {
      deckCards.forEach((c) => c.classList.remove('deck-card-active'));
      if (typeof gsap !== 'undefined') {
        deckCards.forEach((card) => {
          const def = cardDefaults.get(card) || { rotation: 0, y: 0, scale: 1, zIndex: 1 };
          gsap.to(card, {
            rotation: def.rotation,
            y: def.y,
            x: 0,
            scale: def.scale,
            zIndex: def.zIndex,
            opacity: 1,
            filter: 'brightness(1)',
            duration: 0.5,
            ease: 'power3.out',
            overwrite: 'auto'
          });
        });
      }
    }

    deckCards.forEach((card) => {
      card.addEventListener('mouseenter', () => activateCard(card));
      card.addEventListener('focus', () => activateCard(card));
      card.addEventListener('click', () => activateCard(card));
    });

    donatiaDeckWrap.addEventListener('mouseleave', resetDeck);
  }

  /* ==========================================================================
     HOMEPAGE: AUTO-SCROLLING INSTAGRAM REELS SLIDER (@operationgoroc/reels)
     Continuous rAF loop ticker with hover-to-pause and prev/next nudging
     ========================================================================== */
  const manifestoReelsTrack = document.getElementById('manifestoReelsTrack');
  const manifestoReelsViewport = document.getElementById('manifestoReelsViewport');
  const manifestoReelsPrevBtn = document.getElementById('manifestoReelsPrevBtn');
  const manifestoReelsNextBtn = document.getElementById('manifestoReelsNextBtn');

  if (manifestoReelsTrack) {
    // 8 unique cards + 8 cloned cards = 16 cards total
    // Each card is 230px width + 22px gap = 252px stride
    const cardStride = 252;
    const cycleWidth = 8 * cardStride; // 2016px seamless repeat threshold
    let scrollPos = 0;
    let isPaused = false;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartPos = 0;
    const autoScrollSpeed = 0.55; // Silky smooth ~33px/sec

    function tickerLoop() {
      if (!isPaused && !isDragging) {
        scrollPos += autoScrollSpeed;
        if (scrollPos >= cycleWidth) {
          scrollPos -= cycleWidth;
        }
        manifestoReelsTrack.style.transform = `translate3d(-${scrollPos}px, 0, 0)`;
      }
      requestAnimationFrame(tickerLoop);
    }
    requestAnimationFrame(tickerLoop);

    // Pause on hover
    if (manifestoReelsViewport) {
      manifestoReelsViewport.addEventListener('mouseenter', () => { isPaused = true; });
      manifestoReelsViewport.addEventListener('mouseleave', () => { isPaused = false; });

      // Touch / mouse drag support
      manifestoReelsViewport.addEventListener('mousedown', (e) => {
        isDragging = true;
        dragStartX = e.pageX;
        dragStartPos = scrollPos;
      });

      window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = e.pageX - dragStartX;
        scrollPos = dragStartPos - dx;
        if (scrollPos < 0) scrollPos += cycleWidth;
        if (scrollPos >= cycleWidth) scrollPos -= cycleWidth;
        manifestoReelsTrack.style.transform = `translate3d(-${scrollPos}px, 0, 0)`;
      });

      window.addEventListener('mouseup', () => {
        if (isDragging) isDragging = false;
      });
    }

    // Prev / Next button nudging
    function nudgeReels(direction) {
      const targetPos = scrollPos + (direction * cardStride);
      if (typeof gsap !== 'undefined') {
        const animObj = { p: scrollPos };
        gsap.to(animObj, {
          p: targetPos,
          duration: 0.6,
          ease: 'power2.out',
          onUpdate: () => {
            let p = animObj.p;
            while (p < 0) p += cycleWidth;
            while (p >= cycleWidth) p -= cycleWidth;
            scrollPos = p;
            manifestoReelsTrack.style.transform = `translate3d(-${scrollPos}px, 0, 0)`;
          }
        });
      } else {
        scrollPos = targetPos;
        if (scrollPos < 0) scrollPos += cycleWidth;
        if (scrollPos >= cycleWidth) scrollPos -= cycleWidth;
        manifestoReelsTrack.style.transform = `translate3d(-${scrollPos}px, 0, 0)`;
      }
    }

    if (manifestoReelsNextBtn) {
      manifestoReelsNextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nudgeReels(1);
      });
    }

    if (manifestoReelsPrevBtn) {
      manifestoReelsPrevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nudgeReels(-1);
      });
    }
  }


  // ==========================================================================
  // Careers Page: Left-Hand Category & Priority Filter
  // ==========================================================================
  const careerFilterBtns = document.querySelectorAll('.career-filter-btn');
  const careerJobCards = document.querySelectorAll('.job-card-charido');
  const careerFilterReset = document.getElementById('careerFilterReset');

  if (careerFilterBtns.length > 0 && careerJobCards.length > 0) {
    function applyCareerFilter(filterVal) {
      careerFilterBtns.forEach(btn => {
        if (btn.getAttribute('data-filter') === filterVal) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      careerJobCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const isUrgent = card.getAttribute('data-urgent') === 'true';

        let show = false;
        if (filterVal === 'all') {
          show = true;
        } else if (filterVal === 'urgent') {
          show = isUrgent;
        } else if (category === filterVal) {
          show = true;
        }

        if (show) {
          card.style.display = 'flex';
          // Smooth fade-in
          if (window.gsap) {
            gsap.fromTo(card, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
          } else {
            card.style.opacity = '1';
          }
        } else {
          card.style.display = 'none';
        }
      });
    }

    careerFilterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const filterVal = btn.getAttribute('data-filter');
        applyCareerFilter(filterVal);
      });
    });

    if (careerFilterReset) {
      careerFilterReset.addEventListener('click', (e) => {
        e.preventDefault();
        applyCareerFilter('all');
      });
    }
  }


  // ========================================================================
  // ========================================================================
  // ==========================================================================
  // Dedicated Gallery Page: Category Pill Filtering
  // ==========================================================================
  const galleryPillBtns = document.querySelectorAll('.gallery-pill-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (galleryPillBtns.length > 0 && galleryItems.length > 0) {
    function filterGallery(cat) {
      galleryPillBtns.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-filter') === cat);
      });

      galleryItems.forEach(item => {
        const itemCats = (item.getAttribute('data-category') || '').split(' ');
        const show = (cat === 'all') || itemCats.includes(cat);

        if (show) {
          item.style.display = 'block';
          if (window.gsap) {
            gsap.fromTo(item,
              { opacity: 0, scale: 0.96, y: 14 },
              { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' }
            );
          } else {
            item.style.opacity = '1';
          }
        } else {
          item.style.display = 'none';
        }
      });
    }

    galleryPillBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        filterGallery(btn.getAttribute('data-filter') || 'all');
      });
    });
  }

  // ==========================================================================
  // SECTION 5: Dynamic Testimonial Collage Interval Shuffle (GSAP Flip)
  // Each testimonial card smoothly glides & swaps positions across columns.
  // Center tall hero card alternates graduate stories in sync.
  // ==========================================================================
  (function initTestimonialsShuffle() {
    const section = document.querySelector('.ref-testimonials-section');
    const grid = document.querySelector('.ref-testimonials-grid');
    if (!section || !grid || typeof gsap === 'undefined') return;

    if (typeof Flip !== 'undefined') {
      gsap.registerPlugin(Flip);
    }

    // Accessibility: respect user prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let isHovered = false;
    let isVisible = false;
    let isAnimating = false;
    let timer = null;
    let tickCount = 0;
    let activeFilter = 'all';

    // Interactive Category Filter Bar (Dedicated Testimonials Page)
    const filterBar = document.getElementById('testimonialFilterBar');
    if (filterBar) {
      const filterBtns = Array.from(filterBar.querySelectorAll('.t-filter-btn'));
      filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const targetFilter = btn.getAttribute('data-filter') || 'all';
          activeFilter = targetFilter;

          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const allCards = Array.from(grid.querySelectorAll('.ref-t-card'));
          allCards.forEach(card => {
            const cat = card.getAttribute('data-category') || '';
            const match = (targetFilter === 'all' || cat === targetFilter);

            if (match) {
              if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
                gsap.to(card, {
                  opacity: 1,
                  scale: 1,
                  filter: 'none',
                  duration: 0.35,
                  ease: 'power2.out',
                  overwrite: 'auto'
                });
              } else {
                card.style.opacity = '1';
                card.style.transform = 'none';
                card.style.filter = 'none';
              }
              card.style.pointerEvents = 'auto';
            } else {
              if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
                gsap.to(card, {
                  opacity: 0.18,
                  scale: 0.96,
                  filter: 'grayscale(100%)',
                  duration: 0.35,
                  ease: 'power2.in',
                  overwrite: 'auto'
                });
              } else {
                card.style.opacity = '0.2';
                card.style.filter = 'grayscale(100%)';
              }
              card.style.pointerEvents = 'none';
            }
          });
        });
      });
    }

    // Center tall hero graduate stories pool
    const heroStories = [
      {
        img: 'images/gdrive/studio-portrait-481A9167.jpg',
        text: 'I never believed I could lead framing crews and understand real estate at 19. Operation GO showed me how to build generational wealth.',
        sig: 'Kendra Rowe'
      },
      {
        img: 'images/gdrive/studio-portrait-481A9175.jpg',
        text: 'From having no clear direction to mastering heavy timber framing, blueprint literacy, and OSHA-10 safety—Operation GO gave me a career for life.',
        sig: 'Marcus Vance'
      },
      {
        img: 'images/gdrive/studio-481A9162.jpg',
        text: 'The Sneaker & Apparel Lab turned my creative sketches into commercial-grade 3D prototypes. I graduated high school with union-ready skills.',
        sig: 'Jalen Ortiz'
      }
    ];
    let currentHeroIdx = 0;

    // DOM swap helper
    function swapInDOM(cardA, cardB) {
      if (!cardA || !cardB || cardA === cardB) return;
      const parentA = cardA.parentNode;
      const sibA = cardA.nextSibling === cardB ? cardA : cardA.nextSibling;
      cardB.parentNode.insertBefore(cardA, cardB);
      parentA.insertBefore(cardB, sibA);
    }

    // Transition center tall hero card
    function rotateTallHero() {
      const tallCard = grid.querySelector('.card-tall-hero');
      if (!tallCard) return;

      const img = tallCard.querySelector('.ref-t-tall-img-wrap img');
      const quote = tallCard.querySelector('.ref-t-text');
      const sig = tallCard.querySelector('.ref-t-signature');
      if (!img || !quote || !sig) return;

      currentHeroIdx = (currentHeroIdx + 1) % heroStories.length;
      const nextStory = heroStories[currentHeroIdx];

      gsap.timeline()
        .to(tallCard, {
          scale: 0.96,
          opacity: 0.45,
          y: -6,
          duration: 0.38,
          ease: 'power2.in',
          onComplete: () => {
            img.src = nextStory.img;
            quote.textContent = nextStory.text;
            sig.textContent = nextStory.sig;
          }
        })
        .to(tallCard, {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out'
        });
    }

    // Main tick execution
    function performSwap() {
      if (isHovered || !isVisible || isAnimating || activeFilter !== 'all') return;

      const swappableCards = Array.from(
        grid.querySelectorAll('.ref-t-card:not(.card-tall-hero)')
      );
      if (swappableCards.length < 4) return;

      // Group cards by their current parent column
      const colCards = [];
      const colEls = [
        grid.querySelector('.col-1'),
        grid.querySelector('.col-2'),
        grid.querySelector('.col-4')
      ].filter(Boolean);

      colEls.forEach(col => {
        const cards = Array.from(col.querySelectorAll('.ref-t-card:not(.card-tall-hero)'));
        if (cards.length > 0) colCards.push(cards);
      });

      if (colCards.length < 2) return;

      // Pick two cards from different columns to create an engaging cross-column glide
      const c1Idx = Math.floor(Math.random() * colCards.length);
      let c2Idx = Math.floor(Math.random() * (colCards.length - 1));
      if (c2Idx >= c1Idx) c2Idx++;

      const list1 = colCards[c1Idx];
      const list2 = colCards[c2Idx];

      const cardA = list1[Math.floor(Math.random() * list1.length)];
      const cardB = list2[Math.floor(Math.random() * list2.length)];

      if (!cardA || !cardB || cardA === cardB) return;

      const cardsToAnimate = [cardA, cardB];

      // Occasionally swap a second pair simultaneously for rich multi-card choreography
      const remainingCols = colCards.filter((_, idx) => idx !== c1Idx && idx !== c2Idx);
      if (remainingCols.length > 0 && Math.random() > 0.45) {
        const otherList = remainingCols[0];
        if (otherList.length >= 2) {
          const cardC = otherList[0];
          const cardD = otherList[otherList.length - 1];
          if (cardC && cardD && cardC !== cardD) {
            cardsToAnimate.push(cardC, cardD);
          }
        }
      }

      isAnimating = true;

      // Use GSAP Flip if loaded, otherwise fallback to smooth CSS/GSAP crossfade
      if (typeof Flip !== 'undefined') {
        const state = Flip.getState(cardsToAnimate);

        // Perform DOM swap
        swapInDOM(cardA, cardB);
        if (cardsToAnimate.length === 4) {
          swapInDOM(cardsToAnimate[2], cardsToAnimate[3]);
        }

        cardsToAnimate.forEach(c => c.classList.add('is-flipping'));

        Flip.from(state, {
          duration: 1.15,
          ease: 'power2.inOut',
          absolute: true,
          stagger: 0.05,
          onStart: () => {
            cardsToAnimate.forEach((c, idx) => {
              c.style.zIndex = (30 + idx).toString();
              c.style.boxShadow = '0 24px 48px rgba(15, 23, 42, 0.16)';
            });
          },
          onComplete: () => {
            cardsToAnimate.forEach(c => {
              c.classList.remove('is-flipping');
              c.style.zIndex = '';
              c.style.boxShadow = '';
            });
            isAnimating = false;
          }
        });
      } else {
        // Fallback smooth transition
        gsap.to(cardsToAnimate, {
          opacity: 0.3,
          duration: 0.4,
          onComplete: () => {
            swapInDOM(cardA, cardB);
            if (cardsToAnimate.length === 4) {
              swapInDOM(cardsToAnimate[2], cardsToAnimate[3]);
            }
            gsap.to(cardsToAnimate, { opacity: 1, duration: 0.4, onComplete: () => { isAnimating = false; } });
          }
        });
      }

      tickCount++;
      // Every 3 intervals, also rotate the center tall hero card
      if (tickCount % 3 === 0) {
        rotateTallHero();
      }
    }

    function startTimer() {
      if (timer || prefersReducedMotion) return;
      timer = setInterval(performSwap, 4500);
    }

    function stopTimer() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    // Hover pause controls: freeze interval when reading quotes
    section.addEventListener('mouseenter', () => { isHovered = true; });
    section.addEventListener('mouseleave', () => { isHovered = false; });

    // IntersectionObserver: only animate when in viewport to preserve battery & CPU
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startTimer();
        } else {
          stopTimer();
        }
      });
    }, { threshold: 0.12 });

    observer.observe(section);
  })();

  // ==========================================================================
  // GET INVOLVED: Hero Video Audio / Sound Toggle
  // Allows user to unmute and listen to the presentation video with full sound.
  // Automatically mutes when scrolled out of view.
  // ==========================================================================
  (function initGetInvolvedVideoAudio() {
    const heroVideo = document.getElementById('getInvolvedHeroVideo');
    const soundBtn = document.getElementById('heroSoundToggleBtn');
    if (!heroVideo || !soundBtn) return;

    const iconMuted = soundBtn.querySelector('.icon-muted');
    const iconUnmuted = soundBtn.querySelector('.icon-unmuted');
    const soundLabel = soundBtn.querySelector('.sound-label');

    function updateSoundUI(isMuted) {
      if (isMuted) {
        if (iconMuted) iconMuted.style.display = 'inline-flex';
        if (iconUnmuted) iconUnmuted.style.display = 'none';
        if (soundLabel) soundLabel.textContent = 'Listen with Sound';
        soundBtn.classList.remove('is-playing');
        soundBtn.setAttribute('aria-label', 'Listen with sound');
      } else {
        if (iconMuted) iconMuted.style.display = 'none';
        if (iconUnmuted) iconUnmuted.style.display = 'inline-flex';
        if (soundLabel) soundLabel.textContent = 'Mute Audio';
        soundBtn.classList.add('is-playing');
        soundBtn.setAttribute('aria-label', 'Mute audio');
      }
    }

    soundBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (heroVideo.muted) {
        heroVideo.muted = false;
        heroVideo.volume = 1;
        // If it was already looping midway, start from beginning so the user hears the full speech
        if (heroVideo.currentTime > 5) {
          heroVideo.currentTime = 0;
        }
        heroVideo.play().catch(() => {});
        updateSoundUI(false);
      } else {
        heroVideo.muted = true;
        updateSoundUI(true);
      }
    });

    // Auto-mute if user scrolls down to other sections
    if ('IntersectionObserver' in window) {
      const heroSec = heroVideo.closest('.video-hero-section');
      if (heroSec) {
        const audioObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (!entry.isIntersecting && !heroVideo.muted) {
              heroVideo.muted = true;
              updateSoundUI(true);
            }
          });
        }, { threshold: 0.1 });
        audioObserver.observe(heroSec);
      }
    }
  })();

  // ==========================================================================
  // GET INVOLVED: Modern Interactive Accordion
  // Toggles active state with smooth CSS grid transition & aria accessibility
  // ==========================================================================
  (function initInvolveAccordion() {
    const accordion = document.getElementById('involveAccordion');
    if (!accordion) return;

    const items = Array.from(accordion.querySelectorAll('.involve-acc-item'));

    items.forEach(item => {
      const header = item.querySelector('.involve-acc-header');
      if (!header) return;

      header.addEventListener('click', (e) => {
        e.preventDefault();
        const isActive = item.classList.contains('active');

        // Close all other accordion items for clean focused presentation
        items.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherHeader = otherItem.querySelector('.involve-acc-header');
            if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle clicked item
        if (isActive) {
          item.classList.remove('active');
          header.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          header.setAttribute('aria-expanded', 'true');
        }
      });
    });
  })();

  // ==========================================================================
  // FULL-WIDTH CINEMATIC VIDEO SHOWCASE SLIDER (YOUTUBE, FULL WIDTH)
  // Exact match to user template: Full YouTube Iframe API, Ken Burns zoom,
  // timed fill progress bars, prev/next navigation, counter, mute & play controls,
  // and horizontal thumbnail carousel.
  // ==========================================================================
  (function initVideoShowcaseSlider() {
    const slider = document.getElementById('vssSlider');
    const dotsEl = document.getElementById('vssDots');
    const thumbsEl = document.getElementById('vssThumbs');
    const cur = document.getElementById('vssCur');
    const totalEl = document.getElementById('vssTotal');
    const prevBtn = document.getElementById('vssPrev');
    const nextBtn = document.getElementById('vssNext');
    const playBtn = document.getElementById('vssPlay');
    const muteBtn = document.getElementById('vssMute');

    if (!slider || !dotsEl || !thumbsEl) return;

    const videos = [
      { id: 'wDam_zeOjVw', start: 0, tag: 'FEATURE SPOTLIGHT • HD',    title: 'ESL Feature Spotlight',      desc: 'Watch the official Operation GO story in Rochester — transforming young builders through trade mastery and union pathways.' },
      { id: 'bo6-DGGSKyM', start: 0, tag: 'COMMUNITY IMPACT • HD',     title: 'ESL Operation GO',           desc: 'Real stories from youth and instructors breaking debt barriers and stepping into living-wage careers.' },
      { id: 'xvy1LRnG8Qg', start: 0, tag: 'KEYNOTE PRESENTATION • HD', title: 'Rochester Vision & Story',   desc: 'Founder Justin Ortiz presents the mission and proven economic mobility model of Operation GO.' },
      { id: 'tS_L297KJIY', start: 0, tag: 'LEADERSHIP TALK • HD',      title: 'Unlocking Hope & Purpose',   desc: 'Justin Ortiz & Chris explore how hands-on apprenticeships spark direction and trades mastery.' },
      { id: 'SBz8zKQDbss', start: 0, tag: 'YOUTH FOUNDRY • HD',        title: 'Ecosystem of Opportunity',   desc: 'Building an enduring network of craftsmen, master contractors, and debt-free careers.' },
      { id: 'vddNuipG8sA', start: 0, tag: 'PURPOSE & CRAFT • HD',      title: 'Sparking Visions for Youth', desc: 'How mentorship, emotional discipline, and trade certifications change lives across Rochester.' },
    ];

    const DURATION = 10000;
    if (totalEl) totalEl.textContent = String(videos.length).padStart(2, '0');

    const iconPlay  = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
    const iconPause = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>';
    const iconMute  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6"/></svg>';
    const iconSound = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5zM15.5 8.5a5 5 0 010 7M19 5a9 9 0 010 14"/></svg>';

    let index = 0, timer = null, playing = true, muted = true;
    let isSectionInView = false;
    const slides = [], players = [], ready = [], dots = [], thumbs = [], wraps = [];

    // Helper to control sound state and button UI
    function setSound(turnOn) {
      muted = !turnOn;
      if (muteBtn) {
        muteBtn.innerHTML = muted ? iconMute : iconSound;
        muteBtn.setAttribute('aria-label', muted ? 'Unmute sound' : 'Mute sound');
      }
      if (ready[index] && players[index]) {
        try {
          if (muted) {
            players[index].mute();
          } else {
            players[index].unMute();
            players[index].setVolume(100);
          }
        } catch (e) {}
      }
    }

    // Auto-sound with autoplay safety: keeps video playing smoothly even if browser restricts initial sound
    function autoSoundOn() {
      if (!ready[index] || !players[index]) {
        muted = false;
        if (muteBtn) {
          muteBtn.innerHTML = iconSound;
          muteBtn.setAttribute('aria-label', 'Mute sound');
        }
        return;
      }
      try {
        players[index].unMute();
        players[index].setVolume(100);
        muted = false;
        if (muteBtn) {
          muteBtn.innerHTML = iconSound;
          muteBtn.setAttribute('aria-label', 'Mute sound');
        }
        // Safety verification: if browser paused playback due to unmuted autoplay restriction, re-mute and resume
        setTimeout(() => {
          if (ready[index] && players[index] && playing) {
            try {
              if (players[index].getPlayerState() === 2 /* PAUSED */) {
                players[index].mute();
                players[index].playVideo();
                muted = true;
                if (muteBtn) {
                  muteBtn.innerHTML = iconMute;
                  muteBtn.setAttribute('aria-label', 'Unmute sound');
                }
              }
            } catch (err) {}
          }
        }, 300);
      } catch (e) {}
    }

    // Build DOM
    videos.forEach((v, i) => {
      const s = document.createElement('div');
      s.className = 'vss-slide';
      s.innerHTML = `
        <div class="vss-yt-wrap"><div id="vss-yt-${i}"></div></div>
        <div class="vss-overlay"></div>
        <div class="vss-caption">
          <h2>${v.title}</h2>
          <p>${v.desc}</p>
        </div>`;
      slider.insertBefore(s, prevBtn || slider.firstChild);
      slides.push(s);
      wraps.push(s.querySelector('.vss-yt-wrap'));

      const d = document.createElement('button');
      d.className = 'vss-dot';
      d.setAttribute('aria-label', `Slide ${i + 1}`);
      d.style.setProperty('--dur', DURATION + 'ms');
      d.innerHTML = '<div class="vss-fill"></div>';
      d.onclick = () => go(i);
      dotsEl.appendChild(d);
      dots.push(d);

      const t = document.createElement('div');
      t.className = 'vss-thumb';
      t.innerHTML = `<img src="https://img.youtube.com/vi/${v.id}/hqdefault.jpg" alt="${v.title}" loading="lazy"><span>${v.title}</span>`;
      t.onclick = () => go(i);
      thumbsEl.appendChild(t);
      thumbs.push(t);
    });

    // Make the iframe cover the container edge to edge
    function resize() {
      const W = slider.clientWidth, H = slider.clientHeight;
      if (!W || !H) return;
      const ratio = 16 / 9;
      let w = W, h = W / ratio;
      if (h < H) { h = H; w = H * ratio; }
      w *= 1.1; h *= 1.1; // scale to hide YouTube controls / title edge
      wraps.forEach(el => {
        if (el) {
          el.style.width = Math.round(w) + 'px';
          el.style.height = Math.round(h) + 'px';
        }
      });
    }
    window.addEventListener('resize', resize);
    resize();

    // YouTube IFrame API Initialization
    function initYTPlayers() {
      if (typeof YT === 'undefined' || !YT.Player) return;
      videos.forEach((v, i) => {
        if (players[i]) return;
        try {
          players[i] = new YT.Player('vss-yt-' + i, {
            videoId: v.id,
            playerVars: {
              autoplay: 1,
              controls: 0,
              mute: 1,
              loop: 1,
              playlist: v.id,
              rel: 0,
              showinfo: 0,
              modestbranding: 1,
              playsinline: 1,
              iv_load_policy: 3,
              disablekb: 1,
              fs: 0,
              start: v.start
            },
            events: {
              onReady: (e) => {
                ready[i] = true;
                try {
                  e.target.mute();
                  if (i === index && playing) {
                    e.target.playVideo();
                  }
                  if (isSectionInView && i === index) {
                    autoSoundOn();
                  }
                } catch (err) {}
              },
              onStateChange: (e) => {
                if (e.data === 0 /* ENDED */ && playing) {
                  go(index + 1);
                }
              }
            }
          });
        } catch (err) {
          console.warn('YT Player init notice:', err);
        }
      });
    }

    if (window.YT && window.YT.Player) {
      initYTPlayers();
    } else {
      const prevOnReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prevOnReady === 'function') prevOnReady();
        initYTPlayers();
      };
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
    }

    function play(i) {
      if (ready[i] && players[i] && typeof players[i].playVideo === 'function') {
        try {
          players[i].playVideo();
        } catch (e) {}
      }
    }

    function pause(i) {
      if (ready[i] && players[i] && typeof players[i].pauseVideo === 'function') {
        try { players[i].pauseVideo(); } catch (e) {}
      }
    }

    function go(i, isInitial = false) {
      const prev = index;
      index = (i + videos.length) % videos.length;

      if (slides[prev]) slides[prev].classList.remove('active');
      if (dots[prev]) dots[prev].classList.remove('active');
      if (thumbs[prev]) thumbs[prev].classList.remove('active');
      if (prev !== index) pause(prev);

      if (slides[index]) slides[index].classList.add('active');
      if (thumbs[index] && thumbsEl) {
        thumbs[index].classList.add('active');
        // Only scroll the horizontal thumbnail track internally — NEVER scroll the window or page!
        const targetLeft = thumbs[index].offsetLeft - (thumbsEl.clientWidth / 2) + (thumbs[index].offsetWidth / 2);
        thumbsEl.scrollTo({
          left: Math.max(0, targetLeft),
          behavior: isInitial ? 'auto' : 'smooth'
        });
      }

      if (ready[index] && players[index]) {
        try {
          if (muted) {
            players[index].mute();
          } else {
            players[index].unMute();
            players[index].setVolume(100);
          }
        } catch (e) {}
      }
      if (playing) play(index);

      if (cur) cur.textContent = String(index + 1).padStart(2, '0');

      if (dots[index]) {
        void dots[index].offsetWidth; // force reflow to restart fill animation
        dots[index].classList.add('active');
      }
      restart();
    }

    function restart() {
      clearTimeout(timer);
      if (playing) timer = setTimeout(() => go(index + 1), DURATION);
    }

    if (playBtn) {
      playBtn.innerHTML = iconPause;
      playBtn.onclick = () => {
        playing = !playing;
        playBtn.innerHTML = playing ? iconPause : iconPlay;
        const activeFill = dots[index] ? dots[index].querySelector('.vss-fill') : null;
        if (activeFill) {
          activeFill.style.animationPlayState = playing ? 'running' : 'paused';
        }
        if (playing) {
          if (ready[index] && players[index]) {
            try { players[index].playVideo(); } catch (e) {}
          }
          restart();
        } else {
          pause(index);
          clearTimeout(timer);
        }
      };
    }

    if (muteBtn) {
      muteBtn.innerHTML = muted ? iconMute : iconSound;
      muteBtn.setAttribute('aria-label', muted ? 'Unmute sound' : 'Mute sound');
      muteBtn.onclick = () => {
        // Toggle sound state on direct user click
        setSound(muted);
      };
    }

    if (prevBtn) prevBtn.onclick = () => go(index - 1);
    if (nextBtn) nextBtn.onclick = () => go(index + 1);

    // Keyboard controls when focused or active
    document.addEventListener('keydown', (e) => {
      const rect = slider.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;
      if (e.key === 'ArrowRight') go(index + 1);
      if (e.key === 'ArrowLeft') go(index - 1);
      if (e.key === ' ' && document.activeElement === document.body) {
        e.preventDefault();
        if (playBtn) playBtn.click();
      }
    });

    // Touch swiping
    let startX = 0;
    slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });
    slider.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) go(dx < 0 ? index + 1 : index - 1);
    });

    // Hover pauses auto-slide timer
    slider.addEventListener('mouseenter', () => {
      if (playing) {
        clearTimeout(timer);
        const activeFill = dots[index] ? dots[index].querySelector('.vss-fill') : null;
        if (activeFill) activeFill.style.animationPlayState = 'paused';
      }
    });
    slider.addEventListener('mouseleave', () => {
      if (playing) {
        const activeFill = dots[index] ? dots[index].querySelector('.vss-fill') : null;
        if (activeFill) activeFill.style.animationPlayState = 'running';
        restart();
      }
    });

    // Automatically play video and turn sound ON when scrolled into view, and pause/mute when leaving
    const workshopSection = document.getElementById('workshopVideos') || slider;

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // User scrolled into the video section -> Video plays automatically!
            isSectionInView = true;
            if (playing) {
              play(index);
              restart();
            }
            autoSoundOn();
          } else {
            // User left the section -> Video pauses and sound mutes
            isSectionInView = false;
            setSound(false);
            pause(index);
            clearTimeout(timer);
          }
        });
      }, { threshold: 0.05 });
      obs.observe(workshopSection);
    }

    // Modern browser audio autoplay policy helper:
    // If the section is in view, unmute upon user gesture (click, tap, scroll, key)
    function unlockSoundOnUserGesture() {
      if (isSectionInView && playing && ready[index] && players[index]) {
        try {
          players[index].unMute();
          players[index].setVolume(100);
          players[index].playVideo();
          muted = false;
          if (muteBtn) {
            muteBtn.innerHTML = iconSound;
            muteBtn.setAttribute('aria-label', 'Mute sound');
          }
        } catch (e) {}
      }
    }
    ['pointerdown', 'click', 'touchstart', 'keydown'].forEach(evt => {
      window.addEventListener(evt, unlockSoundOnUserGesture, { passive: true });
    });

    // Start with slide 0 without scrolling the window
    go(0, true);
  })();


  // ==========================================================================
  // DISPATCHES & COHORT UPDATES: CATEGORY FILTERING & MODAL READER
  // ==========================================================================
  (function initDispatchesSystem() {
    const filterBtns = document.querySelectorAll('.framer-filter-btn');
    const cards = document.querySelectorAll('.framer-dispatch-card');
    const modal = document.getElementById('dispatchModal');
    const modalBackdrop = document.getElementById('dispatchModalBackdrop');
    const modalClose = document.getElementById('dispatchModalClose');
    const modalDismiss = document.getElementById('modalDismissBtn');
    
    // Modal Elements
    const modalCat = document.getElementById('modalDispatchCat');
    const modalDate = document.getElementById('modalDispatchDate');
    const modalTitle = document.getElementById('modalDispatchTitle');
    const modalAuthor = document.getElementById('modalDispatchAuthor');
    const modalRead = document.getElementById('modalDispatchRead');
    const modalImg = document.getElementById('modalDispatchImg');
    const modalBody = document.getElementById('modalDispatchBody');
    const modalCta = document.getElementById('modalDispatchCta');

    const dispatchDatabase = {
      "1": {
        category: "ADMISSIONS",
        date: "November 2026",
        read: "3 min read • Official Notice",
        author: "Operation GO Admissions Office",
        title: "Spring 2027 Cohort Open: Paid Youth Apprenticeships ($16/hr) & Milwaukee Toolsets",
        img: "images/editorial-hero-cohort.jpg",
        content: `
          <p>Tuition-free enrollment is now officially live for Rochester high schoolers and young adults ages 14–24. Every admitted student is inducted into a rigorous, hands-on guild curriculum combining trade craftsmanship, design innovation, and executive financial coaching.</p>
          <div class="framer-modal-quote">
            "We do not just teach trade skills; we give our youth the physical tools, paid wages, and legal credentials to walk onto any job site with absolute confidence."
            <cite>— Justin Ortiz, Lead Director & Master Contractor</cite>
          </div>
          <p>Each student receives a brand-new, personalized Milwaukee power tool kit upon induction, OSHA-10 safety credentials, and complete personal protective equipment (PPE) at zero out-of-pocket cost.</p>
          <p>Build shifts are compensated at a baseline of $16.00/hr, ensuring students earn while they learn and support their households while developing lifelong trade mastery.</p>
        `,
        ctaText: "Apply For Spring Cohort",
        ctaHref: "#applyModal"
      },
      "2": {
        category: "DESIGN LABS",
        date: "October 2026",
        read: "2 min read • Lab Feature",
        author: "Design & Apparel Lab",
        title: "Youth Apparel Lab Debuts First 20-Pair Handcrafted Sneaker Capsule",
        img: "images/gdrive/custom-sneakers-craft.jpg",
        content: `
          <p>Our student designers in the Footwear & Apparel Innovation Lab have completed and debuted a limited-edition capsule of 20 bespoke, hand-stitched leather sneakers.</p>
          <div class="framer-modal-quote">
            "Designing shoes taught me geometry, material cost calculations, and industrial stitching. Holding a finished shoe you engineered yourself is unlike anything school ever gave me."
            <cite>— Marcus, Sneaker Lab Apprentice (Age 17)</cite>
          </div>
          <p>Using 3D CAD modeling, industrial leather skiving, and hand-lasted soles, students executed every phase of production. The capsule sold out to regional collectors within 48 hours, with proceeds reinvested directly into student equipment grants and materials.</p>
        `,
        ctaText: "Explore Sneaker Lab Track",
        ctaHref: "programs.html#sneaker"
      },
      "3": {
        category: "UNION TRADES",
        date: "September 2026",
        read: "3 min read • Industry Placement",
        author: "Workforce Placement Desk",
        title: "Carpenters Local 276 Inks Direct Apprenticeship Pipeline for 15 Graduates",
        img: "images/carpentry-student.jpg",
        content: `
          <p>Operation GO has formalized an articulation pipeline with the North Atlantic States Regional Council of Carpenters (Local 276), securing guaranteed apprenticeship interviews and indenture slots for 15 cohort graduates.</p>
          <div class="framer-modal-quote">
            "These young builders arrive on commercial sites already understanding blueprint symbols, OSHA protocols, and tool discipline. They are the future of American craftsmanship."
            <cite>— Local 276 Business Representative</cite>
          </div>
          <p>Graduates entering the union begin at an average wage of $26.50/hr with full medical coverage, dental, and pension benefits, on track to earn $45+/hr as full journeymen within four years.</p>
        `,
        ctaText: "Explore The Career Ladder",
        ctaHref: "programs.html#trades"
      },
      "4": {
        category: "MEDIA STUDIO",
        date: "August 2026",
        read: "2 min read • Client Spotlight",
        author: "Cinema & Audio Studio",
        title: "Student 4K Cinema Crew Contracts First Three Commercial Video Campaigns",
        img: "images/gdrive/film-production-slate.jpg",
        content: `
          <p>Apprentices in the Academic Focus & Creative Media Studio have secured commercial production contracts for three prominent Monroe County enterprises, scripting, lighting, and shooting commercial campaigns.</p>
          <div class="framer-modal-quote">
            "Our youth aren't fetching coffee on set. They are operating $20,000 cinema rigs, mixing multi-track audio, and delivering broadcast-ready commercials."
            <cite>— Lead Media Mentor</cite>
          </div>
          <p>Students operate RED and Sony cinema cameras, wireless Sennheiser audio rigs, and DaVinci Resolve color grading consoles, earning direct commercial commission payouts upon client delivery.</p>
        `,
        ctaText: "Explore Media Track",
        ctaHref: "programs.html#media"
      }
    };

    // Category Filtering
    if (filterBtns.length && cards.length) {
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
          });
          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');

          const filter = btn.dataset.filter;
          cards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
              card.classList.remove('is-hidden');
              card.style.opacity = '0';
              card.style.transform = 'translateY(10px)';
              setTimeout(() => {
                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, 30);
            } else {
              card.classList.add('is-hidden');
            }
          });
        });
      });
    }

    // Modal Opening
    function openDispatch(id) {
      const data = dispatchDatabase[id];
      if (!data || !modal) return;

      modalCat.textContent = data.category;
      modalDate.textContent = data.date;
      modalTitle.textContent = data.title;
      modalAuthor.textContent = data.author;
      modalRead.textContent = data.read;
      modalImg.src = data.img;
      modalImg.alt = data.title;
      modalBody.innerHTML = data.content;
      modalCta.querySelector('span').textContent = data.ctaText;
      modalCta.setAttribute('href', data.ctaHref);

      // Handle apply modal trigger
      if (data.ctaHref === '#applyModal') {
        modalCta.onclick = (e) => {
          e.preventDefault();
          closeModal();
          const applyModal = document.getElementById('applyModal');
          if (applyModal) applyModal.classList.add('active');
        };
      } else {
        modalCta.onclick = null;
      }

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      if (!modal) return;
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    // Bind card clicks
    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        // If clicking on direct link or button, prevent default to open modal
        e.preventDefault();
        const id = card.dataset.dispatchId;
        if (id) openDispatch(id);
      });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
    if (modalDismiss) modalDismiss.addEventListener('click', closeModal);

    // Escape key closes modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeModal();
      }
    });
  })();

  /* ==========================================================================
     TESTIMONIALS REVIEWS CAROUSEL (RESPONSIVE GSAP 3 SLIDER)
     ========================================================================== */
  (function initTestimonialCarousel() {
    const viewport = document.getElementById('refCarouselViewport');
    const track = document.getElementById('refCarouselTrack');
    const prevBtn = document.getElementById('refPrevBtn');
    const nextBtn = document.getElementById('refNextBtn');
    const dotsContainer = document.getElementById('refCarouselDots');

    if (!viewport || !track) return;

    const cards = Array.from(track.querySelectorAll('.ref-review-item, .ref-review-card'));
    if (!cards.length) return;

    let currentIndex = 0;
    let visibleCards = 3;
    let maxIndex = 0;
    let autoPlayTimer = null;
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;

    function getVisibleCount() {
      if (window.innerWidth <= 640) return 1;
      if (window.innerWidth <= 1040) return 2;
      return 3;
    }

    function calculateBounds() {
      visibleCards = getVisibleCount();
      const totalPages = Math.ceil(cards.length / visibleCards);
      maxIndex = Math.max(0, totalPages - 1);
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      renderDots();
      goToSlide(currentIndex, false);
    }

    function renderDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      const totalPages = maxIndex + 1;
      if (totalPages <= 1) return;

      for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('button');
        dot.className = `ref-dot ${i === currentIndex ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to testimonial page ${i + 1}`);
        dot.addEventListener('click', () => {
          goToSlide(i);
          resetAutoPlay();
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateDots() {
      if (!dotsContainer) return;
      const dots = dotsContainer.querySelectorAll('.ref-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }

    function updateButtons() {
      if (prevBtn) {
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
      }
      if (nextBtn) {
        nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
      }
    }

    function goToSlide(pageIndex, animate = true) {
      currentIndex = Math.max(0, Math.min(pageIndex, maxIndex));
      const targetCardIndex = Math.min(currentIndex * visibleCards, cards.length - 1);
      const targetCard = cards[targetCardIndex];
      const targetX = targetCard ? -targetCard.offsetLeft : 0;
      currentTranslate = targetX;

      if (window.gsap) {
        window.gsap.to(track, {
          x: targetX,
          duration: animate ? 0.65 : 0,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      } else {
        track.style.transform = `translateX(${targetX}px)`;
      }

      updateDots();
      updateButtons();
    }

    // Button event listeners (wrap-around for seamless browsing)
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
          goToSlide(currentIndex - 1);
        } else {
          goToSlide(maxIndex);
        }
        resetAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
          goToSlide(currentIndex + 1);
        } else {
          goToSlide(0);
        }
        resetAutoPlay();
      });
    }

    // Touch Swipe Gestures
    viewport.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].clientX;
      clearInterval(autoPlayTimer);
    }, { passive: true });

    viewport.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      const diff = currentX - startX;
      if (window.gsap) {
        window.gsap.set(track, { x: currentTranslate + diff });
      } else {
        track.style.transform = `translateX(${currentTranslate + diff}px)`;
      }
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;

      if (Math.abs(diff) > 40) {
        if (diff < 0) {
          if (currentIndex < maxIndex) goToSlide(currentIndex + 1);
          else goToSlide(0);
        } else {
          if (currentIndex > 0) goToSlide(currentIndex - 1);
          else goToSlide(maxIndex);
        }
      } else {
        goToSlide(currentIndex);
      }
      resetAutoPlay();
    });

    // Auto Play (every 6 seconds, pauses on hover)
    function startAutoPlay() {
      clearInterval(autoPlayTimer);
      autoPlayTimer = setInterval(() => {
        if (currentIndex < maxIndex) {
          goToSlide(currentIndex + 1);
        } else {
          goToSlide(0);
        }
      }, 6500);
    }

    function resetAutoPlay() {
      clearInterval(autoPlayTimer);
      startAutoPlay();
    }

    viewport.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
    viewport.addEventListener('mouseleave', () => startAutoPlay());

    // Resize handling with debounce
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        calculateBounds();
      }, 100);
    });

    // Initial setup
    calculateBounds();
    startAutoPlay();
  })();

  /* ==========================================================================
     CIRCULAR PROGRESS BACK TO TOP BUTTON
     ========================================================================== */
  (function initBackToTop() {
    let btn = document.getElementById('backToTopBtn');
    let progressBar = document.getElementById('bttProgressBar');

    // Auto-create and mount if not present in DOM
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'backToTopBtn';
      btn.className = 'back-to-top-btn';
      btn.setAttribute('aria-label', 'Back to top');
      btn.setAttribute('title', 'Back to top');
      btn.innerHTML = `
        <svg class="btt-progress-svg" viewBox="0 0 48 48">
          <circle class="btt-progress-bg" cx="24" cy="24" r="21"></circle>
          <circle class="btt-progress-bar" id="bttProgressBar" cx="24" cy="24" r="21"></circle>
        </svg>
        <span class="btt-arrow" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
          </svg>
        </span>
      `;
      document.body.appendChild(btn);
      progressBar = btn.querySelector('#bttProgressBar');
    }

    const radius = 21;
    const circumference = 2 * Math.PI * radius; // ~131.95

    function updateProgress() {
      const scrollY = window.scrollY || window.pageYOffset;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollY > 350) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }

      if (scrollHeight > 0 && progressBar) {
        const progress = Math.min(Math.max(scrollY / scrollHeight, 0), 1);
        const offset = circumference - (progress * circumference);
        progressBar.style.strokeDashoffset = offset.toFixed(2);
      }
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Initial check
    updateProgress();
  })();

});