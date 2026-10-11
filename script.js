
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // ==========================================
  // 1. PERSONAL SETTINGS
  // ==========================================

  // Change this to the actual birthday.
  // Format: YYYY-MM-DDTHH:MM:SS
  const birthdayDate = "2026-10-19T00:00:00";

  const loveLetter = `Happy Birthday, Renu(Sonu)! ❤️

Every day with you feels like a beautiful dream.
Your smile brightens my darkest days, and your love
makes my world more beautiful.

Thank you for being my happiness, my comfort,
and my favorite person in the entire universe.

I wish you endless happiness, beautiful adventures,
success in everything you do, and a lifetime full of love.

No matter where life takes us, I will always be cheering
for you, holding your hand, and choosing you.

You deserve every beautiful thing this world has to offer.

Happy Birthday, sweetheart. I love you more than words
could ever explain. ❤️🎂✨`;

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // ==========================================
  // 2. BIRTHDAY COUNTDOWN
  // ==========================================

  const countdownMessage = $("#countdownMessage");
  const daysEl = $("#days");
  const hoursEl = $("#hours");
  const minutesEl = $("#minutes");
  const secondsEl = $("#seconds");

  const birthday = new Date(birthdayDate).getTime();

  function updateCountdown() {
    if (Number.isNaN(birthday)) {
      countdownMessage.textContent =
        "Please set a valid birthday date in script.js.";
      return;
    }

    let remaining = birthday - Date.now();

    if (remaining <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";

      countdownMessage.textContent =
        "Happy Birthday, my love! Today is your special day! ❤️🎂";

      return;
    }

    const days = Math.floor(remaining / 86400000);
    remaining %= 86400000;

    const hours = Math.floor(remaining / 3600000);
    remaining %= 3600000;

    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");

    countdownMessage.textContent =
      "Every second is worth celebrating. 💗";
  }

  updateCountdown();

  const countdownTimer = setInterval(updateCountdown, 1000);

  // ==========================================
  // 3. FLOATING HEARTS
  // ==========================================

  const heartContainer = $("#floatingHearts");
  const heartSymbols = ["♡", "♥", "💕", "💗", "✿"];

  let heartTimer = null;

  function createHeart() {
    if (!heartContainer || reduceMotion) return;

    const heart = document.createElement("span");

    heart.className = "float-item";
    heart.textContent =
      heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${14 + Math.random() * 14}px`;
    heart.style.animationDuration = `${8 + Math.random() * 6}s`;
    heart.style.color = ["#ed8eaf", "#c94e7b", "#f5b5cb"][
      Math.floor(Math.random() * 3)
    ];

    heartContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 15000);
  }

  if (!reduceMotion) {
    heartTimer = setInterval(createHeart, 800);
  }

  // ==========================================
  // 4. CAKE AND CANDLES
  // ==========================================

  const cakeBtn = $("#cakeBtn");
  const cakeMessage = $("#cakeMessage");
  const flames = $$(".flame");

  let candlesOff = false;

  cakeBtn.addEventListener("click", () => {
    candlesOff = !candlesOff;

    flames.forEach((flame) => {
      flame.classList.toggle("off", candlesOff);
    });

    if (candlesOff) {
      cakeMessage.textContent =
        "Wish made! May all your dreams come true! ✨❤️";

      launchFireworks(45);
    } else {
      cakeMessage.textContent =
        "Three little flames, a million wishes. ✨";
    }
  });

  // ==========================================
  // 5. TYPING LOVE LETTER
  // ==========================================

  const typedMessage = $("#typedMessage");
  let letterStarted = false;
  let letterTimer = null;

  function typeLetter(index = 0) {
    if (index >= loveLetter.length) return;

    typedMessage.textContent += loveLetter[index];

    const delay = loveLetter[index] === "\n" ? 100 : 28;

    letterTimer = setTimeout(() => {
      typeLetter(index + 1);
    }, delay);
  }

  function showLetter() {
    if (letterStarted) return;

    letterStarted = true;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      typedMessage.textContent = loveLetter;
      return;
    }

    typeLetter();
  }

  if ("IntersectionObserver" in window && !reduceMotion) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          showLetter();
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(typedMessage);
  } else {
    showLetter();
  }

  // ==========================================
  // 6. SURPRISE GIFT MODAL
  // ==========================================

  const giftBtn = $("#giftBtn");
  const giftModal = $("#giftModal");
  const closeModal = $("#closeModal");
  const closeModalBtn = $("#closeModalBtn");

  let previousFocus = null;

  function openGift() {
    previousFocus = document.activeElement;

    giftModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    closeModal.focus();

    launchFireworks(60);
  }

  function closeGift() {
    giftModal.classList.add("hidden");
    document.body.style.overflow = "";

    if (previousFocus && typeof previousFocus.focus === "function") {
      previousFocus.focus();
    } else {
      giftBtn.focus();
    }
  }

  giftBtn.addEventListener("click", openGift);
  closeModal.addEventListener("click", closeGift);
  closeModalBtn.addEventListener("click", closeGift);

  giftModal.addEventListener("click", (event) => {
    if (event.target === giftModal) {
      closeGift();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      !giftModal.classList.contains("hidden")
    ) {
      closeGift();
    }
  });

  // ==========================================
  // 7. LOVE QUIZ
  // ==========================================

  const questions = [
    {
      question: "What is my favorite thing about you?",
      answers: [
        "Your beautiful smile ❤️",
        "Your kindness and heart 💗",
        "Absolutely everything about you 🥰",
        "Your cute little habits ✨"
      ],
      correct: 2,
      feedback: "Everything about you is special to me! ❤️"
    },
    {
      question: "What is my favorite place to be?",
      answers: [
        "At a fancy restaurant 🍽️",
        "Anywhere, as long as I am with you 🫶",
        "On a beach alone 🏖️",
        "Watching movies 🎬"
      ],
      correct: 1,
      feedback: "Every place is perfect when we're together! 💕"
    },
    {
      question: "What is my biggest wish for us?",
      answers: [
        "Travel around the world 🌍",
        "Eat all the desserts 🍰",
        "Build a lifetime of happy memories 💖",
        "Sleep all day 😴"
      ],
      correct: 2,
      feedback: "My favorite adventure is the life we build together! 💍"
    }
  ];

  const quizProgress = $("#quizProgress");
  const quizQuestion = $("#quizQuestion");
  const quizAnswers = $("#quizAnswers");
  const quizFeedback = $("#quizFeedback");
  const nextBtn = $("#nextQuestion");
  const restartBtn = $("#restartQuiz");

  let questionIndex = 0;
  let score = 0;
  let answered = false;

  function displayQuestion() {
    const question = questions[questionIndex];

    answered = false;

    quizProgress.textContent =
      `QUESTION ${questionIndex + 1} OF ${questions.length}`;

    quizQuestion.textContent = question.question;
    quizAnswers.replaceChildren();
    quizFeedback.textContent = "";

    nextBtn.classList.add("hidden");
    restartBtn.classList.add("hidden");

    question.answers.forEach((answer, index) => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "answer-btn";
      button.textContent = answer;

      button.addEventListener("click", () => {
        if (answered) return;

        answered = true;

        const buttons = quizAnswers.querySelectorAll("button");

        buttons.forEach((item) => {
          item.disabled = true;
        });

        if (index === question.correct) {
          button.classList.add("correct");
          score++;

          quizFeedback.textContent = question.feedback;
        } else {
          button.classList.add("wrong");
          buttons[question.correct].classList.add("correct");

          quizFeedback.textContent =
            "Almost, sweetheart! The correct answer is highlighted. 💗";
        }

        if (questionIndex < questions.length - 1) {
          nextBtn.classList.remove("hidden");
          nextBtn.focus();
        } else {
          showQuizResult();
        }
      });

      quizAnswers.appendChild(button);
    });
  }

  function showQuizResult() {
    quizProgress.textContent = "QUIZ COMPLETED 💖";
    quizQuestion.textContent = "You made it to the end, my love!";

    quizFeedback.textContent =
      score === questions.length
        ? `Perfect score: ${score}/${questions.length}! You know our love so well! 🥰❤️`
        : `Your score: ${score}/${questions.length}. You're still my favorite person! 💗`;

    nextBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");
    restartBtn.focus();

    launchFireworks(score === questions.length ? 90 : 35);
  }

  nextBtn.addEventListener("click", () => {
    if (questionIndex < questions.length - 1) {
      questionIndex++;
      displayQuestion();
    }
  });

  restartBtn.addEventListener("click", () => {
    questionIndex = 0;
    score = 0;
    displayQuestion();
  });

  displayQuestion();

  // ==========================================
  // 8. FIREWORKS
  // ==========================================

  const canvas = $("#fireworks");
  const ctx = canvas.getContext("2d");
  const fireworksBtn = $("#fireworksBtn");

  let particles = [];
  let animationFrame = null;
  let canvasWidth = window.innerWidth;
  let canvasHeight = window.innerHeight;

  function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    canvas.width = Math.round(canvasWidth * ratio);
    canvas.height = Math.round(canvasHeight * ratio);

    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  resizeCanvas();

  window.addEventListener("resize", resizeCanvas);

  function createBurst(x, y, count = 55) {
    const colors = [
      "#ff8db4",
      "#ffd166",
      "#ffffff",
      "#f78fb3",
      "#c77dff",
      "#ff6b6b"
    ];

    const color = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 3.5;

      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        radius: 1 + Math.random() * 2.2,
        color
      });
    }

    // Limit the total workload on mobile devices.
    if (particles.length > 900) {
      particles = particles.slice(-900);
    }
  }

  function animateFireworks() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    particles = particles.filter((particle) => particle.alpha > 0.04);

    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      particle.vx *= 0.985;
      particle.vy *= 0.985;
      particle.vy += 0.025;
      particle.alpha -= 0.014;

      ctx.globalAlpha = Math.max(0, particle.alpha);
      ctx.fillStyle = particle.color;

      ctx.beginPath();
      ctx.arc(
        particle.x,
        particle.y,
        particle.radius,
        0,
        Math.PI * 2
      );

      ctx.fill();
    });

    ctx.globalAlpha = 1;

    if (particles.length > 0) {
      animationFrame = requestAnimationFrame(animateFireworks);
    } else {
      animationFrame = null;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }
  }

  function launchFireworks(amount = 60) {
    if (reduceMotion || !ctx) return;

    // Avoid generating excessive particles.
    amount = Math.min(amount, 100);

    for (let i = 0; i < amount; i++) {
      createBurst(
        Math.random() * canvasWidth,
        Math.random() * canvasHeight * 0.7,
        5 + Math.floor(Math.random() * 5)
      );
    }

    if (animationFrame === null) {
      animationFrame = requestAnimationFrame(animateFireworks);
    }
  }

  fireworksBtn.addEventListener("click", () => {
    if (reduceMotion) {
      fireworksBtn.textContent = "Happy Birthday! ❤️🎂";
      return;
    }

    createBurst(canvasWidth * 0.25, canvasHeight * 0.3, 65);
    createBurst(canvasWidth * 0.5, canvasHeight * 0.22, 75);
    createBurst(canvasWidth * 0.75, canvasHeight * 0.32, 65);

    if (animationFrame === null) {
      animationFrame = requestAnimationFrame(animateFireworks);
    }

    fireworksBtn.textContent = "You make my world sparkle! ❤️";

    setTimeout(() => {
      fireworksBtn.textContent = "Make the sky sparkle ✨";
    }, 2500);
  });

  // ==========================================
  // 9. SMOOTH SCROLL
  // ==========================================

  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = $(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });
    });
  });

  // ==========================================
  // 10. STARTUP CHECK
  // ==========================================

  console.log("Birthday website loaded successfully! ❤️");

  // Clean up repeating timers if the page is being hidden.
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearInterval(countdownTimer);
      clearInterval(heartTimer);
      clearTimeout(letterTimer);
    } else {
      updateCountdown();

      if (!reduceMotion && !heartTimer) {
        heartTimer = setInterval(createHeart, 800);
      }

      // Resume letter animation if the tab was hidden mid-letter.
      if (letterStarted && typedMessage.textContent.length < loveLetter.length) {
        clearTimeout(letterTimer);
        typeLetter(typedMessage.textContent.length);
      }

      if (particles.length && animationFrame === null) {
        animationFrame = requestAnimationFrame(animateFireworks);
      }
    }
  });
});