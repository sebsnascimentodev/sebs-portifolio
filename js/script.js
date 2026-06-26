const ticker = document.querySelector(".ticker-track");
const typingTarget = document.querySelector(".hero-typing");

if (ticker) {
  const speed = Math.max(24, Math.min(44, window.innerWidth / 36));
  ticker.style.animationDuration = `${speed}s`;
}

if (typingTarget) {
  const phrases = ["SENIOR BACKEND DEVELOPER", "SENIOR FULL STACK DEVELOPER"];
  const typingSpeed = 85;
  const deletingSpeed = 45;
  const holdDelay = 1400;

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const tick = () => {
    if (prefersReducedMotion) {
      typingTarget.textContent = phrases[0];
      return;
    }

    const currentPhrase = phrases[phraseIndex];
    const nextLength = isDeleting ? charIndex - 1 : charIndex + 1;
    typingTarget.textContent = currentPhrase.slice(0, nextLength);
    charIndex = nextLength;

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      window.setTimeout(tick, holdDelay);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    window.setTimeout(tick, isDeleting ? deletingSpeed : typingSpeed);
  };

  window.setTimeout(tick, 500);
}

const emailLink = document.getElementById("contact-email");
if (emailLink) {
  const email = atob(emailLink.dataset.e);
  emailLink.href = "mailto:" + email;
  emailLink.textContent = email;
}

const phoneLink = document.getElementById("contact-phone");
if (phoneLink) {
  phoneLink.href = atob(phoneLink.dataset.p);
  phoneLink.textContent = atob(phoneLink.dataset.t);
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    const target = targetId ? document.querySelector(targetId) : null;
    if (!target) {
      return;
    }
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
