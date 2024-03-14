const siguiente = document.getElementById("siguiente");
const opciones = document.getElementById("opciones").children;
const respuesta = document.getElementById("respuesta");

const preguntas = [
  {
    "statement": "JavaScript fue inventado en 1995",
    "answer": "true",
    "explanation": "Brendan Eich creó JS en Netscape en 1995. La versión inicial del lenguaje fue escrita en solo 10 días."
  },
  {
    "statement": "Las cadenas en JS son valores editables",
    "answer": "false",
    "explanation": "En JavaScript, las cadenas son valores inmutables, lo que significa que no pueden ser editadas; sin embargo, pueden ser reemplazadas con nuevas cadenas diferentes."
  },
  {
    "statement": "1 + 1 === 2",
    "answer": "true",
    "explanation": "El operador de suma da la suma de dos números."
  },
  {
    "statement": "'1' + '1' === '2'",
    "answer": "false",
    "explanation": "El operador de suma concatena (une) cadenas, por lo que '1' + '1' === '11'."
  },
  {
    "statement": "typeof ['J', 'S'] === 'array'",
    "answer": "false",
    "explanation": "Los arrays tienen el tipo 'object'. En JS, todo es o un tipo de dato primitivo (por ejemplo, 'string', 'number') o un objeto. Los arrays son un tipo de objeto con algunas propiedades especiales."
  }
]

const desabilitar = (button) => {
  button.setAttribute("disabled", "true")
}
const habilitar = (button) => {
  button.removeAttribute("disabled")
}
const ocultar = (element) => {
  element.classList.add('hidden')
}

const mostrar = (element) => {
  element.classList.remove('hidden')
}

let correcto = 0;
let completados = 0;
let fact;

function obtenerSiguientePregunta() {
  fact = preguntas.shift();

  document.getElementById('pregunta').textContent = fact.statement;
  ocultar(respuesta)

  for (let opcion of opciones) {
    opcion.classList.remove("correct")
    opcion.classList.remove("incorrect")
    habilitar(opcion)
  }
  desabilitar(siguiente)
}

siguiente.addEventListener('click', obtenerSiguientePregunta)

for (let opcion of opciones) {
  opcion.addEventListener("click", e => {
    
    for (let button of opciones) {
      desabilitar(button);
    }

    
    if (preguntas.length > 0) {
      habilitar(siguiente);
    } else {
      siguiente.textContent = "No más preguntas!"
    }

    const guess = e.target.value;
    if (guess === fact.answer) {
      
      e.target.classList.add("correct");
      correcto += 1;
    } else {
      // wrong answer!
      e.target.classList.add("incorrect");
    }

    respuesta.textContent = fact.explanation;
    mostrar(respuesta);

    // actualiza puntuacion
    completados += 1;
    document.getElementById("correct").textContent = correcto;
    document.getElementById("completed").textContent = completados;

  })
}

obtenerSiguientePregunta();