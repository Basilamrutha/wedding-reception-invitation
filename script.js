/* BASIL & AMRUTHA WEDDING WEBSITE */

/* 1. Wedding countdown: 9 January 2027, 11:00 AM (India time) */
const weddingDate = new Date("2027-01-09T11:00:00+05:30").getTime();

function updateCountdown() {
  const distance = weddingDate - Date.now();
  const ids = ["days", "hours", "minutes", "seconds"];
  if (distance <= 0) {
    ids.forEach(id => {
      const node = document.getElementById(id);
      if (node) node.textContent = "00";
    });
    return;
  }
  const values = [
    Math.floor(distance / 86400000),
    Math.floor((distance % 86400000) / 3600000),
    Math.floor((distance % 3600000) / 60000),
    Math.floor((distance % 60000) / 1000)
  ];
  ids.forEach((id, index) => {
    const node = document.getElementById(id);
    if (node) node.textContent = String(values[index]).padStart(2, "0");
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* 2. Falling gold stars and tiny glitter */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function createFallingStar() {
  const star = document.createElement("span");
  star.className = "falling-star";
  const symbols = ["✦", "✧", "⋆", "·", "✴"];
  star.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  star.style.left = Math.random() * 100 + "vw";
  star.style.fontSize = (Math.random() * 12 + 8) + "px";
  star.style.animationDuration = (Math.random() * 5 + 6) + "s";
  document.body.appendChild(star);
  setTimeout(() => star.remove(), 12000);
}
if (!reduceMotion) setInterval(createFallingStar, 650);

/* 3. Scroll reveal */
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("active"));
}






/* 4. Start wedding music on first screen interaction */

const music = document.getElementById("weddingMusic");
const musicButton = document.getElementById("musicButton");

if (music) {

    let musicStarted = false;

    async function startMusic() {
        if (musicStarted) return;

        try {
            await music.play();
            musicStarted = true;

            if (musicButton) {
                musicButton.textContent = "♫";
                musicButton.setAttribute("aria-pressed", "true");
            }

        } catch (error) {
            console.log("Music could not start:", error);
        }
    }

    // Start music on the first touch, click or keyboard interaction
    document.addEventListener("pointerdown", startMusic, {
        once: true
    });

    document.addEventListener("keydown", startMusic, {
        once: true
    });

    // Golden music button: play and pause
    if (musicButton) {
        musicButton.addEventListener("click", async (event) => {
            event.stopPropagation();

            if (music.paused) {
                try {
                    await music.play();
                    musicStarted = true;
                    musicButton.textContent = "♫";
                    musicButton.setAttribute("aria-pressed", "true");
                } catch (error) {
                    console.log(error);
                }
            } else {
                music.pause();
                musicButton.textContent = "♪";
                musicButton.setAttribute("aria-pressed", "false");
            }
        });
    }
}


/* 5. Gallery lightbox */
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeButton = document.getElementById("lightboxClose");

document.querySelectorAll(".gallery img").forEach(img => {
  img.addEventListener("click", () => {
    lightboxImage.src = img.src;
    lightbox.classList.add("show");
  });
});
function closeLightbox() {
  lightbox.classList.remove("show");
  lightboxImage.src = "";
}
closeButton.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeLightbox();
});

/* 6. Mobile navigation */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});
