// ---- Navigation ----
function goToPage(page) {
  window.location.href = page;
}

// ---- Smooth scroll ----
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// ---- Reveal on scroll ----
const photos = document.querySelectorAll('img.photo');
const listItems = document.querySelectorAll('ul li');
const slides = document.querySelectorAll('.slide');

function reveal() {
  photos.forEach(photo => {
    const top = photo.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) photo.classList.add('show');
  });

  listItems.forEach(li => {
    const top = li.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) li.classList.add('show');
  });

  slides.forEach(slide => {
    const top = slide.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) slide.classList.add('show');
  });
}

window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// ---- Confetti hearts & falling images ----
if (
  document.body.classList.contains('index-page') ||
  document.body.classList.contains('story-page') ||
  document.body.classList.contains('games-page')
) {
  // --- Heart Confetti ---
  function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = '💖';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (3 + Math.random() * 2) + 's';
    heart.style.fontSize = '16px';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
  }
  setInterval(createHeart, 350);

  // --- Falling Image Confetti ---
  const fallImages = [
    "assets/fall1.png",
    "assets/fall2.png"
  ];

  function createFaller() {
    const img = document.createElement('img');
    img.classList.add('faller');
    img.src = fallImages[Math.floor(Math.random() * fallImages.length)];
    
    // Random horizontal position
    img.style.left = Math.random() * 100 + "vw";

    // Tiny fixed size like hearts
    img.style.width = "30px";
    img.style.height = "auto";

    // Fall animation duration
    img.style.animationDuration = (3 + Math.random() * 2) + "s";

    // Fixed styling
    img.style.position = "fixed";
    img.style.top = "-10px";
    img.style.pointerEvents = "none";
    img.style.zIndex = 9999;

    document.body.appendChild(img);

    // Remove after animation ends
    setTimeout(() => img.remove(), 5000);
  }
  setInterval(createFaller, 650);
}

document.addEventListener("DOMContentLoaded", () => {
  const game = document.getElementById("game");
  let balloons = Array.from(game.querySelectorAll(".balloon"));
  let poppedCount = 0;

  // Save original balloons as templates for restoration
  const balloonTemplates = balloons.map(b => b.cloneNode(true));

  // Function to attach click behavior to a balloon
  function attachBalloonClick(balloon) {
    balloon.addEventListener("click", function handleClick() {
      const msg = balloon.getAttribute("data-msg");

      // Pop animation: shrink and fade
      balloon.style.transition = "transform 0.3s ease, opacity 0.3s ease";
      balloon.style.transform = "scale(0)";
      balloon.style.opacity = "0";

      setTimeout(() => {
        // Replace balloon with message
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
        messageDiv.innerHTML = msg;
        balloon.replaceWith(messageDiv);

        poppedCount++;
      }, 300); // wait for pop animation
    });
  }

  // Function to restore balloons
  function restoreBalloons() {
    game.innerHTML = ""; // clear all messages
    poppedCount = 0;

    balloonTemplates.forEach((template, index) => {
      const clone = template.cloneNode(true);
      clone.style.opacity = "0";
      clone.style.transform = "scale(0.5)";
      game.appendChild(clone);

      // Animate in with staggered delay
      setTimeout(() => {
        clone.style.transition = "transform 0.5s ease, opacity 0.5s ease";
        clone.style.opacity = "1";
        clone.style.transform = "scale(1)";
      }, index * 200);

      // Reattach click behavior
      attachBalloonClick(clone);
    });
  }

  // Attach click to all starting balloons
  balloons.forEach(attachBalloonClick);

  // 🔄 Manual Reset Button
  const resetBalloonsBtn = document.getElementById("reset-balloons");
  if (resetBalloonsBtn) {
    resetBalloonsBtn.addEventListener("click", restoreBalloons);
  }

  // --- Gifts Section ---
  const giftGame = document.getElementById("gift-game");
  let gifts = Array.from(giftGame.querySelectorAll(".gift"));
  let openedCount = 0;

  const giftTemplates = gifts.map(g => g.cloneNode(true));

  function attachGiftClick(gift) {
    gift.addEventListener("click", function handleClick() {
      const msg = gift.getAttribute("data-msg");

      // Open animation
      gift.style.transition = "transform 0.3s ease, opacity 0.3s ease";
      gift.style.transform = "scale(0)";
      gift.style.opacity = "0";

      setTimeout(() => {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
        messageDiv.innerHTML = msg;
        gift.replaceWith(messageDiv);

        openedCount++;
        // Removed automatic 5s restore
      }, 300);
    });
  }

  function restoreGifts() {
    giftGame.innerHTML = "";
    openedCount = 0;

    giftTemplates.forEach((template, index) => {
      const clone = template.cloneNode(true);
      clone.style.opacity = "0";
      clone.style.transform = "scale(0.5)";
      giftGame.appendChild(clone);

      setTimeout(() => {
        clone.style.transition = "transform 0.5s ease, opacity 0.5s ease";
        clone.style.opacity = "1";
        clone.style.transform = "scale(1)";
      }, index * 150);

      attachGiftClick(clone);
    });
  }

  gifts.forEach(attachGiftClick);

  const resetGiftsBtn = document.getElementById("reset-gifts");
  if (resetGiftsBtn) {
    resetGiftsBtn.addEventListener("click", restoreGifts);
  }
});
