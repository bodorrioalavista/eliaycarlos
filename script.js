const gameConfig = {
  finalCode: "2749",
  readinessWords: ["ferri baietz"],
  friends: ["Elia", "Tamara", "Elena", "Sandra", "Amaia", "Izaskun", "Ane", "Carmen", "Lorea", "Nuria", "Naroa", "Paula"],
  quoteQuestions: [
    {
      text: "¿Quién es más probable que haga algo a última hora?",
      answer: "Paula"
    },
    {
      text: "¿Quién es más probable que baile con los brazos hacia arriba?",
      answer: "Carmen"
    },
    {
      text: "¿Quién estaría toda una noche haciendo bromas sobre si viene el camarero con la cena?",
      answer: "Sandra"
    },
    {
      text: "Si se le mete una idea en la cabeza, es más fácil arrancarle la cabeza que la idea.",
      answer: "Elia"
    },
    {
      text: "La que escucha dos segundos de una cancion y ya está cantando el estribillo (pero con la letra que le da la gana).",
      answer: "Izaskun"
    },
    {
      text: "Abre farmacias y cierras bares.",
      answer: "Amaia"
    },
    {
      text: "Es la que mejor se adapta a cualquier sitio, porque habla cualquier idioma (Dios sabe lo que dice) y con cualquier acento.",
      answer: "Elena"
    },
    {
      text: "Se le da muy bien cortar a la juliana.",
      answer: "Tamara"
    },
    {
      text: "¿Quién es más probable que te deje sin palabras si hay un micrófono delante?",
      answer: "Ane"
    },
    {
      text: "Te hace una frase en el idioma que quieras.",
      answer: "Lorea"
    },
    {
      text: "Es capaz de ponerse tapones para no escuchar dentro de un bar a las 00:00 de la madrugada.",
      answer: "Nuria"
    },
    {
      text: "Es capaz de decir 10 cosas cursis en una frase de 11 palabras.",
      answer: "Naroa"
    }
  ],
  photoQuestions: [
    {
      image: "assets/Ane.jpg",
      clue: "Txupao",
      focus: "50% 18%",
      zoom: 1,
      answer: "Ane"
    },
    {
      image: "assets/Elia.jpg",
      clue: "0 dudas",
      focus: "50% 42%",
      zoom: 1,
      answer: "Elia"
    },
    {
      image: "assets/Naroa.jpg",
      clue: "Regalito",
      focus: "68% 34%",
      zoom: 1,
      answer: "Naroa"
    },
    {
      image: "assets/Amaia.jpg",
      clue: "Fácil",
      focus: "35% 45%",
      zoom: 1,
      answer: "Amaia"
    },
    {
      image: "assets/Carmen.jpg",
      clue: "Muy fácil",
      focus: "48% 35%",
      zoom: 1,
      answer: "Carmen"
    },
    {
      image: "assets/Elena.jpg",
      clue: "Se tuerce",
      focus: "50% 18%",
      zoom: 1,
      answer: "Elena"
    },
    {
      image: "assets/Izaskun.jpg",
      clue: "Por descarte",
      focus: "60% 24%",
      zoom: 2,
      answer: "Izaskun"
    },
    {
      image: "assets/Lorea.jpg",
      clue: "Se ríe",
      focus: "42% 40%",
      zoom: 1,
      answer: "Lorea"
    },
    {
      image: "assets/Nuria.jpg",
      clue: "Torci",
      focus: "70% 52%",
      zoom: 1,
      answer: "Nuria"
    },
    {
      image: "assets/Paula.jpg",
      clue: "Joven",
      focus: "30% 30%",
      zoom: 1,
      answer: "Paula"
    },
    {
      image: "assets/Sandra.jpg",
      clue: "Muy fácil",
      focus: "50% 58%",
      zoom: 1,
      answer: "Sandra"
    },
    {
      image: "assets/Tamara.jpg",
      clue: "A pensar",
      focus: "58% 38%",
      zoom: 1,
      answer: "Tamara"
    }
  ]
};

const screens = [...document.querySelectorAll(".screen")];
const stepKicker = document.querySelector("#stepKicker");
const progressText = document.querySelector("#progressText");
const readyForm = document.querySelector("#readyForm");
const readyAnswer = document.querySelector("#readyAnswer");
const readyFeedback = document.querySelector("#readyFeedback");
const quoteQuizForm = document.querySelector("#quoteQuizForm");
const quoteFeedback = document.querySelector("#quoteFeedback");
const resetQuoteAnswers = document.querySelector("#resetQuoteAnswers");
const photoQuizForm = document.querySelector("#photoQuizForm");
const photoFeedback = document.querySelector("#photoFeedback");
const resetPhotoAnswers = document.querySelector("#resetPhotoAnswers");
const finalCode = document.querySelector("#finalCode");
const codeSlots = document.querySelector("#codeSlots");
const playAgain = document.querySelector("#playAgain");
let readyAttempts = 0;

const screenMeta = {
  intro: ["Entrada", "0 / 4"],
  ready: ["Acceso", "1 / 4"],
  quoteQuiz: ["Prueba 1", "2 / 4"],
  photoQuiz: ["Prueba 2", "3 / 4"],
  final: ["Codigo", "4 / 4"]
};

function normalize(value) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function showScreen(name) {
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.screen === name);
  });

  const [kicker, progress] = screenMeta[name];
  stepKicker.textContent = kicker;
  progressText.textContent = progress;
  document.querySelector(".game-panel").scrollTop = 0;
}

function answerOptions() {
  return [
    '<option value="">Elegir amiga</option>',
    ...gameConfig.friends.map((friend) => `<option value="${friend}">${friend}</option>`)
  ].join("");
}

function buildQuoteQuiz() {
  const options = answerOptions();

  quoteQuizForm.innerHTML = gameConfig.quoteQuestions
    .map(
      (question, index) => `
        <article class="question-row" data-index="${index}">
          <div>
            <p class="question-text">${index + 1}. ${question.text}</p>
            <p class="question-result" aria-live="polite"></p>
          </div>
          <select name="quote-${index}" aria-label="Respuesta de la frase ${index + 1}">
            ${options}
          </select>
        </article>
      `
    )
    .join("");
}

function buildPhotoQuiz() {
  const options = answerOptions();

  photoQuizForm.innerHTML = `
    <div class="photo-grid">
      ${gameConfig.photoQuestions
        .map(
          (question, index) => `
            <article class="photo-card" data-index="${index}">
              <div
                class="photo-frame"
                data-clue="${question.clue}"
                style="--focus: ${question.focus}; --zoom: ${question.zoom};"
              >
                <img src="${question.image}" alt="Foto misteriosa ${index + 1}" />
              </div>
              <label>
                Foto ${index + 1}
                <select name="photo-${index}" aria-label="Respuesta de la foto ${index + 1}">
                  ${options}
                </select>
              </label>
              <p class="question-result" aria-live="polite"></p>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function checkAnswers(form, questions, itemSelector) {
  let correctCount = 0;

  questions.forEach((question, index) => {
    const item = form.querySelector(`[data-index="${index}"]`);
    const select = item.querySelector("select");
    const result = item.querySelector(".question-result");
    const isCorrect = select.value === question.answer;

    item.classList.toggle("correct", isCorrect);
    item.classList.toggle("wrong", Boolean(select.value) && !isCorrect);
    result.textContent = isCorrect ? "Correcto" : select.value ? "Aun no." : "";

    if (isCorrect) {
      correctCount += 1;
    }
  });

  return correctCount;
}

function resetFormState(form, feedback, itemSelector) {
  form.reset();
  feedback.textContent = "";
  form.querySelectorAll(itemSelector).forEach((item) => {
    item.classList.remove("correct", "wrong");
    item.querySelector(".question-result").textContent = "";
  });
}

function revealCode() {
  finalCode.textContent = gameConfig.finalCode;
  codeSlots.querySelectorAll("span").forEach((slot, index) => {
    slot.textContent = gameConfig.finalCode[index] || "?";
  });
}

document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.next));
});

readyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const answer = normalize(readyAnswer.value);
  const accepted = gameConfig.readinessWords.map(normalize).includes(answer);

  if (!accepted) {
    readyAttempts += 1;
    const hints = [
      "Estáis cerca... pero Elia, piensa un poco más en lo que respondes: ¿Estás preparada? La respuesta debe ser un sí rotundo.",
      "Creemos que Carlos está preparado, pero Elia... ¿estás realmente preparada? Creemos que sí, por lo que deberias decirnos algo así como noski.",
      "Lleváis muchos intentos ya... ¿Tal vez si lo pensáis en inglés?.",
      "Mmmmmm... ¿Qué tal si nos lo traducís del inglés?.",
      "Venga ya, que no es tan difícil... ¿Qué tal os va un ferri?.",
      "noski baietz?.",
      "pedid ayuda... ¿qué tal si le preguntáis a Izaskun, que es la que más sabe de esto?."
    ];

    readyFeedback.textContent = hints[Math.min(readyAttempts - 1, hints.length - 1)];
    readyAnswer.focus();
    return;
  }

  readyAttempts = 0;
  readyFeedback.textContent = "";
  showScreen("quoteQuiz");
});

quoteQuizForm.addEventListener("submit", (event) => {
  event.preventDefault();
  //const correctCount = gameConfig.quoteQuestions.length;
  const correctCount = checkAnswers(quoteQuizForm, gameConfig.quoteQuestions, ".question-row");

  if (correctCount === gameConfig.quoteQuestions.length) {
    quoteFeedback.textContent = "";
    showScreen("photoQuiz");
    return;
  }

  quoteFeedback.textContent = `Has acertado ${correctCount} de ${gameConfig.quoteQuestions.length}. Revisa las que faltan.`;
});

photoQuizForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const correctCount = checkAnswers(photoQuizForm, gameConfig.photoQuestions, ".photo-card");

  if (correctCount === gameConfig.photoQuestions.length) {
    photoFeedback.textContent = "";
    revealCode();
    showScreen("final");
    return;
  }

  photoFeedback.textContent = `Has acertado ${correctCount} de ${gameConfig.photoQuestions.length}. Mira bien los recortes.`;
});

resetQuoteAnswers.addEventListener("click", () => {
  resetFormState(quoteQuizForm, quoteFeedback, ".question-row");
});

resetPhotoAnswers.addEventListener("click", () => {
  resetFormState(photoQuizForm, photoFeedback, ".photo-card");
});

playAgain.addEventListener("click", () => {
  readyForm.reset();
  readyAttempts = 0;
  readyFeedback.textContent = "";
  resetFormState(quoteQuizForm, quoteFeedback, ".question-row");
  resetFormState(photoQuizForm, photoFeedback, ".photo-card");
  codeSlots.querySelectorAll("span").forEach((slot) => {
    slot.textContent = "?";
  });
  showScreen("intro");
});

buildQuoteQuiz();
buildPhotoQuiz();
