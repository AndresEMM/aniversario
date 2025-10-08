const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const gif = document.getElementById("gif");
const text = document.getElementById("text");
const vid = document.querySelector("video");

// Contenedor donde están tus botones Sí/No
const yesNoWrap = document.querySelector(".yes-no");

/* =========================
   1) INTRO (antes del ciclo)
   =========================
   Puedes cambiar textos y gifs a tu gusto.
   Usa <br> si quieres saltos de línea.
*/
const introSteps = [
  {
    gif: "recursos/happy-cat.gif",
    text: "Hola, mi flaca bella 💫"
  },
  {
    gif: "recursos/heart-crasy-cat.gif",
    text: "Felices <b>9 meses</b> 🥺❤️<br>Te quiero infinitamente!."
  },
  {
    gif: "recursos/smile-cat.gif",
    text: "Siempre te tengo presente en mis pensamientos, y pienso en tu bella sonrisa 😍."
  },
  {
    gif: "recursos/efe.gif",
    text: "Adoro cuando me hablas sobre tus pensamientos, acontecimientos y sentimientos.. aunque estés que te lleva la vg.. siempre hay días mejores que otros 😅."
  },
  {
    gif: "recursos/cat-heart.gif",
    text: "Ok… ahora sí 😌"
  }
];

let introIndex = 0;
let introDone = false;

// Botón Continuar (lo creamos desde JS para no tocar tu HTML)
const continueBtn = document.createElement("button");
continueBtn.id = "continue";
continueBtn.className = "yes"; // reutiliza tu estilo del botón "Si"
continueBtn.textContent = "Continuar";

// Inserta el botón antes de los otros
yesNoWrap.prepend(continueBtn);

// Al inicio: ocultamos Sí/No hasta terminar la intro
yesBtn.style.display = "none";
noBtn.style.display = "none";

// Render de intro
function renderIntro() {
  const s = introSteps[introIndex];
  gif.src = s.gif;
  text.innerHTML = s.text;
}

// Cuando termina intro → mostrar UI normal
function finishIntro() {
  introDone = true;

  // Quita botón continuar
  continueBtn.remove();

  // Restaura pregunta original y gif original
  gif.src = "recursos/cat-heart.gif";
  text.innerHTML = "¿Te gustaría ser mi San Valentín?";

  // Muestra Sí/No
  yesBtn.style.display = "";
  noBtn.style.display = "";

  // Limpia estilos por si acaso (deja solo los de tu CSS)
  yesBtn.style.height = "";
  yesBtn.style.width = "";
  yesBtn.style.fontSize = "";
  noBtn.style.height = "";
  noBtn.style.width = "";
  noBtn.style.fontSize = "";
  noBtn.style.display = "";
}

// Click en continuar
continueBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  introIndex++;
  if (introIndex < introSteps.length) {
    renderIntro();
  } else {
    finishIntro();
  }
});

// Muestra el primer mensaje de intro
renderIntro();

/* =========================
   2) TU CICLO NORMAL (San Valentín)
   ========================= */
const steps = [
  {
    gif: "recursos/rusure.gif",
    text: "¿Quisiste decir que SÍ, verdad? 🤨",
    yesStyle: { height: "65%", width: "60%" },
    noStyle: { width: "30%" }
  },
  {
    gif: "recursos/3shocked-1.gif",
    text: "Se te resbaló el dedo, ¿no? 🥹",
    yesStyle: { height: "70%", width: "70%" },
    noStyle: { width: "20%" }
  },
  {
    gif: "recursos/4.crying.gif",
    text: "Voy a llorar 😭",
    yesStyle: { height: "80%", width: "80%" },
    noStyle: { width: "10%", fontSize: "4vh" }
  },
  {
    gif: "recursos/5.crying.gif",
    text: "Por favorcito 🥺😘",
    yesStyle: { height: "90%", width: "96%" },
    noStyle: { display: "none" }
  }
];

let stepIndex = 0;

// Preload gifs (incluye intro + steps + final)
const allGifs = introSteps.map(s => s.gif)
  .concat(steps.map(step => step.gif))
  .concat(["recursos/idc.gif"]);

allGifs.forEach(src => {
  const img = new Image();
  img.src = src;
});

// No funciona el “No” hasta que termine la intro
noBtn.addEventListener("click", () => {
  if (!introDone) return;

  if (stepIndex < steps.length) {
    const currentStep = steps[stepIndex];
    gif.src = currentStep.gif;
    text.innerHTML = currentStep.text;

    Object.assign(yesBtn.style, currentStep.yesStyle);
    Object.assign(noBtn.style, currentStep.noStyle);
    stepIndex++;
  }
});

// No funciona el “Sí” hasta que termine la intro
yesBtn.addEventListener("click", () => {
  if (!introDone) return;

  gif.src = "recursos/idc.gif";
  text.innerHTML = "¡Lo sabía! 🥰";

  noBtn.style.display = "none";
  yesBtn.style.height = "90%";
  yesBtn.style.width = "96%";

  yesBtn.innerHTML = '<a href="https://www.youtube.com/watch?v=I8qUYSJ5CPg&list=RDI8qUYSJ5CPg&start_radio=1" class="boton-final">Te kiero ¬3¬</a>';

  if (vid) {
    vid.style.display = "block";
    vid.play().catch(e => console.log("Autoplay bloqueado o video no cargado.."));
    setTimeout(() => {
      vid.style.display = "none";
    }, 9000);
  }
});
