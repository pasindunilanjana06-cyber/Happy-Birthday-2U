(function () {
  const noBtn = document.getElementById("btn-no");
  const yesBtn = document.getElementById("btn-yes");

  let runawayActive = false;

  function moveNoButton() {
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    const maxX = window.innerWidth - btnWidth - 10;
    const maxY = window.innerHeight - btnHeight - 10;

    const x = Math.max(5, Math.random() * maxX);
    const y = Math.max(5, Math.random() * maxY);

    noBtn.classList.add("btn-runaway");
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
    runawayActive = true;
  }

  noBtn.addEventListener("mouseenter", moveNoButton);
  noBtn.addEventListener("click", moveNoButton);
  noBtn.addEventListener("touchstart", moveNoButton, { passive: true });

  const WORDS = ["You", "are", "So", "Special"];
  let poppedCount = 0;

  function popBalloon(balloon, index) {
    if (balloon.classList.contains("popped")) return;
    balloon.classList.add("popped");

    const rect = balloon.getBoundingClientRect();
    confetti({
      particleCount: 45,
      spread: 70,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
    });

    poppedCount++;
    if (poppedCount === WORDS.length) {
      setTimeout(buildCake, 3000);
    }
  }

  function buildCake() {
    const card = document.querySelector(".card");
    card.remove();

    const cakeWrap = document.createElement("div");
    cakeWrap.className = "cake-wrap";

    const cakeImg = document.createElement("img");
    cakeImg.className = "cake-img";
    cakeImg.id = "cake-img";
    cakeImg.src = "cake_lit.png";
    cakeImg.alt = "Birthday cake with lit candles";

    const blowBtn = document.createElement("button");
    blowBtn.className = "btn btn-yes blow-btn";
    blowBtn.id = "btn-blow";
    blowBtn.textContent = "Blow the candles 🕯️";

    cakeWrap.appendChild(cakeImg);
    cakeWrap.appendChild(blowBtn);
    document.body.appendChild(cakeWrap);

    blowBtn.addEventListener("click", function () {
      cakeImg.src = "cake_unlit.png";
      cakeImg.alt = "Birthday cake with blown candles";
      blowBtn.style.display = "none";

      const wish = document.createElement("div");
      wish.className = "wish-text";
      wish.textContent = "close your eyes and wish";
      cakeWrap.appendChild(wish);

      setTimeout(buildRoses, 3000);
    });
  }

  function buildRoses() {
    const cakeWrap = document.querySelector(".cake-wrap");
    cakeWrap.innerHTML = "";

    const roseTitle = document.createElement("h2");
    roseTitle.className = "rose-title";
    roseTitle.textContent = "Here is your rose bouquet 🌹";

    const roseImg = document.createElement("img");
    roseImg.className = "rose-img";
    roseImg.src = "rose-small.png";
    roseImg.alt = "A bouquet of roses";

    const continueBtn = document.createElement("button");
    continueBtn.className = "btn btn-yes continue-btn";
    continueBtn.textContent = "Continue";

    cakeWrap.appendChild(roseTitle);
    cakeWrap.appendChild(roseImg);
    cakeWrap.appendChild(continueBtn);

    continueBtn.addEventListener("click", function () {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
      });
      setTimeout(buildMoments, 600);
    });
  }

  const MOMENTS_IMGS = [
    "imgs/1.jpg",
    "imgs/2.jpg",
    "imgs/3.jpg",
    "imgs/4.jpg",
    "imgs/5.jpg",
    "imgs/6.jpg",
  ];

  function buildMoments() {
    const cakeWrap = document.querySelector(".cake-wrap");
    cakeWrap.innerHTML = "";

    const section = document.createElement("div");
    section.className = "moments";

    const title = document.createElement("h2");
    title.className = "moments-title";
    title.textContent = "Your Sweet Moments 💕";
    section.appendChild(title);

    const hint = document.createElement("div");
    hint.className = "moments-hint";
    hint.textContent = "(swipe to see the below)";
    section.appendChild(hint);

    const stack = document.createElement("div");
    stack.className = "card-stack";

    MOMENTS_IMGS.forEach(function (src) {
      const card = document.createElement("div");
      card.className = "moment-card";

      const img = document.createElement("img");
      img.src = src;
      img.alt = "Sweet moment";
      img.draggable = false;

      card.appendChild(img);
      stack.appendChild(card);
    });

    section.appendChild(stack);
    cakeWrap.appendChild(section);

    initCardStack(stack);
  }

  function initCardStack(stack) {
    let card = null;
    let startX = 0;
    let startY = 0;
    let curX = 0;
    let curY = 0;
    let dragging = false;

    function finishMoments() {
      const section = stack.closest(".moments");
      section.innerHTML = "";

      const title = document.createElement("h2");
      title.className = "moments-title";
      title.textContent = "Message from my heart 💌";
      section.appendChild(title);

      const wrap = document.createElement("div");
      wrap.className = "video-wrap";

      const letter = document.createElement("img");
      letter.className = "letter-img";
      letter.src = "Letter_closed.png";
      letter.alt = "A sealed letter for you";

      const openBtn = document.createElement("button");
      openBtn.className = "btn btn-yes open-btn";
      openBtn.textContent = "Click here to open";

      wrap.appendChild(letter);
      wrap.appendChild(openBtn);
      section.appendChild(wrap);

      openBtn.addEventListener("click", function () {
        openBtn.style.display = "none";
        letter.src = "Letter_open.png";
        letter.alt = "An open letter for you";
        setTimeout(showFinalPhoto, 1000);
      });

      function showFinalPhoto() {
        section.innerHTML = "";

        const overlay = document.createElement("div");
        overlay.className = "final-overlay";

        const photo = document.createElement("img");
        photo.className = "final-photo";
        photo.src = "liyuma.jpeg";
        photo.alt = "A special message for you";

        const continueBtn = document.createElement("button");
        continueBtn.className = "btn btn-yes final-continue-btn";
        continueBtn.textContent = "Continue";

        overlay.appendChild(photo);
        overlay.appendChild(continueBtn);
        section.appendChild(overlay);

        continueBtn.addEventListener("click", function () {
          showLastPic();
        });
      }

      function showLastPic() {
        section.innerHTML = "";

        const overlay = document.createElement("div");
        overlay.className = "final-overlay";

        const photo = document.createElement("img");
        photo.className = "final-photo final-photo-last";
        photo.src = "lastpic.png";
        photo.alt = "A heartfelt message for you";

        const message = document.createElement("p");
        message.className = "heartfelt-message";
        message.textContent =
          "You mean the world to me. Thank you for every smile, every laugh, and every moment we share. Happy Birthday, my love!";

        overlay.appendChild(photo);
        overlay.appendChild(message);
        section.appendChild(overlay);
      }
    }

    stack.addEventListener("pointerdown", function (e) {
      const top = stack.lastElementChild;
      if (!top) return;
      if (e.target.closest(".moment-card") !== top) return;

      card = top;
      dragging = true;
      card.classList.add("dragging");
      card.setPointerCapture(e.pointerId);
      startX = e.clientX;
      startY = e.clientY;
      curX = 0;
      curY = 0;
    });

    stack.addEventListener("pointermove", function (e) {
      if (!dragging || !card) return;
      curX = e.clientX - startX;
      curY = e.clientY - startY;
      card.style.transform =
        "translate(" + curX + "px," + curY + "px) rotate(" + curX * 0.06 + "deg)";
    });

    stack.addEventListener("pointerup", function () {
      if (!dragging || !card) return;
      const thrown = card;
      dragging = false;

      const w = stack.offsetWidth;
      const h = stack.offsetHeight;

      if (Math.abs(curX) > w * 0.3 || Math.abs(curY) > h * 0.3) {
        const dirX = curX >= 0 ? 1 : -1;
        const dirY = curY >= 0 ? 1 : -1;
        thrown.style.transform =
          "translate(" +
          dirX * w * 1.6 +
          "px," +
          (curY + dirY * 120) +
          "px) rotate(" +
          dirX * 18 +
          "deg)";
        thrown.classList.add("throw");
        setTimeout(function () {
          thrown.remove();
          if (!stack.lastElementChild) {
            finishMoments();
          }
        }, 300);
      } else {
        thrown.style.transform = "";
      }

      thrown.classList.remove("dragging");
      card = null;
    });

    stack.addEventListener("pointercancel", function () {
      if (dragging && card) {
        dragging = false;
        card.style.transform = "";
        card.classList.remove("dragging");
        card = null;
      }
    });
  }

  function buildBalloons() {
    const card = document.querySelector(".card");
    card.innerHTML = "";

    const hint = document.createElement("div");
    hint.className = "balloon-hint";
    hint.textContent = "Pop the balloons! 🎈";
    card.appendChild(hint);

    const balloons = document.createElement("div");
    balloons.className = "balloons";

    WORDS.forEach(function (word, i) {
      const balloon = document.createElement("div");
      balloon.className = "balloon";
      balloon.dataset.index = i;

      const imgEl = document.createElement("img");
      imgEl.className = "balloon-img";
      imgEl.src = "baloon.png";
      imgEl.alt = "Balloon";

      const wordEl = document.createElement("div");
      wordEl.className = "popped-word";
      wordEl.textContent = word;

      balloon.appendChild(imgEl);
      balloon.appendChild(wordEl);

      balloon.addEventListener("click", function () {
        popBalloon(balloon, i);
      });

      balloons.appendChild(balloon);
    });

    card.appendChild(balloons);
  }

  yesBtn.addEventListener("click", function () {
    noBtn.disabled = true;
    noBtn.style.display = "none";

    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.7 },
    });

    setTimeout(function () {
      confetti({
        particleCount: 120,
        angle: 60,
        spread: 80,
        origin: { x: 0 },
      });
    }, 250);

    setTimeout(function () {
      confetti({
        particleCount: 120,
        angle: 120,
        spread: 80,
        origin: { x: 1 },
      });
    }, 500);

    setTimeout(buildBalloons, 700);
  });

  window.addEventListener("resize", function () {
    if (runawayActive) {
      const btnWidth = noBtn.offsetWidth;
      const btnHeight = noBtn.offsetHeight;
      const maxX = window.innerWidth - btnWidth - 10;
      const maxY = window.innerHeight - btnHeight - 10;
      noBtn.style.left = Math.min(parseInt(noBtn.style.left, 10) || 0, maxX) + "px";
      noBtn.style.top = Math.min(parseInt(noBtn.style.top, 10) || 0, maxY) + "px";
    }
  });
})();
