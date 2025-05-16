document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);
  
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 2,
      effects: true,
      smoothTouch: false,
    });
    const borderUlTL = gsap.timeline({ delay: 0.3 });
    const borderDur = 1.5;
    borderUlTL
    .addLabel('flowers')
    .to('.border-ul', { duration: borderDur, x: -5, y: -5, ease: "sine.inOut", repeat: -1, yoyo: true },'flowers')
    .to('.border-ll', { duration: borderDur, x: -5, y: 5, ease: "sine.inOut", repeat: -1, yoyo: true },'flowers')
    .to('.border-ur', { duration: borderDur, x: 3, y: -3, ease: "sine.inOut", repeat: -1, yoyo: true },'flowers')
    .to('.border-lr', { duration: borderDur, x: 8, y: 4, ease: "sine.inOut", repeat: -1, yoyo: true },'flowers')

    smoother.paused(true);
    const alpsAkiTL = gsap.timeline({ onComplete: () => smoother.paused(false), paused: true, delay: 2, defaults: { ease: 'sine.inOut' } });
    gsap.set(['.alps-container', '.ampersand', '.akire-container'], { opacity: 0 });
    gsap.set('.circle', { opacity: 0, scale: 0.5, rotation: -360 });
    gsap.set('.ring', { opacity: 0, scale: 3 });
    
    alpsAkiTL
    .to('.circle', { duration: 0.8, opacity: 1, scale: 1, rotation: 0 })
    .to('.ring', { duration: 0.8, opacity: 1, scale: 1 }, '<')
    .to(['.circle', '.alps-container', '.ampersand', '.akire-container', '.butterflies1'], { duration: 0.8, opacity: 1 }, '<0.4')

    const heroTL = gsap.timeline({ paused: true, delay: 1, defaults: { ease: 'sine.inOut' } });
    gsap.set(['.heading1', '.heading2', '.ring', '.date', '.footer1', '.footer2'], { opacity: 0 });
    heroTL
    .to('.heading1', { duration: 0.5, opacity: 1 })
    .to('.heading2', { duration: 0.5, opacity: 1 })
    .to('.date', { duration: 0.5, opacity: 1 })
    .to('.footer1', { duration: 0.5, opacity: 1 })
    .to('.footer2', { duration: 0.5, opacity: 1 })
    .to(['.hero-content'], { duration: 1, scale: 2 })
    .to(['.hero-content'], { duration: 1, opacity: 0 }, '-=0.8')

    const heroEnterST = ScrollTrigger.create({
        trigger: '#hero',
        animation: heroTL,
        start: 'top top',
        end: '+=100%',
        scrub: true,
        pin: true,
        pinSpacing: true,
        // markers: true,
    });

    const guestTL = gsap.timeline({ paused: true, delay: 1, defaults: { ease: 'sine.inOut' } });
    gsap.set(['.guest-copy1', '.guest-copy2', '.guest-copy3', '.guest-copy4', '.guest-copy5', '.logo'], { opacity: 0 });
    guestTL
    .to('.guest-copy1', { duration: 0.5, opacity: 1 })
    .to('.guest-copy2', { duration: 0.5, opacity: 1 })
    .to('.guest-copy3', { duration: 0.5, opacity: 1 })
    .to('.guest-copy4', { duration: 0.5, opacity: 1 })
    .to('.guest-copy5', { duration: 0.5, opacity: 1 })
    .to('.logo', { duration: 0.5, opacity: 1 })

    const guestEnterST = ScrollTrigger.create({
        trigger: '#guest',
        animation: guestTL,
        start: 'clamp(top 50%)',
        // start: 'top center',
        end: 'bottom bottom',
        scrub: true,
        // pin: true,
        // pinSpacing: true,
        // markers: true,
    });

    alpsAkiTL.play();
  });
  