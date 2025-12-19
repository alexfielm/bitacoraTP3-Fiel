
var modal = document.getElementById("donation-modal");

var btn = document.getElementById("donate-btn");

var span = document.getElementsByClassName("close-btn")[0];
if (btn) {
    btn.onclick = function () {
        modal.style.display = "flex";
    }
}

if (span) {
    span.onclick = function () {
        modal.style.display = "none";
    }
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

const darkModeBtn = document.getElementById('mode-toggle');

function setDarkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");

    // Save preference to localStorage
    if (element.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
}

if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
}

function toggleMenu() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "flex") {
        x.style.display = "none";
    } else {
        x.style.display = "flex";
    }
}

if (darkModeBtn) {
    darkModeBtn.addEventListener('click', setDarkMode);
}

//aca empieza el juego
document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');

    if (quizContainer) {
        const questions = [
            {
                question: "¿Cuál es el propósito principal de HTML en el desarrollo web?",
                options: ["Definir la estructura y semantica de la página", "Gestionar la lógica de programación y base de datos.", "Dar estilo, colores y animaciones a los elementos."],
                correct: 0
            },
            {
                question: "¿Qué técnica de CSS se utiliza para que un diseño se adapte a diferentes tamaños de pantalla (móvil, tablet, escritorio)?",
                options: ["Flexbox exclusively.", "Media Queries.", "Sistema de coordenadas Z"],
                correct: 1
            },
            {
                question: "¿Qué hace el método .map() en un arreglo (Array) de JavaScript?",
                options: ["Elimina el último elemento del arreglo.", "Filtra los elementos que no cumplen una condición.", "Crea un nuevo arreglo con los resultados de llamar a una función para cada elemento del arreglo original."],
                correct: 2
            },
            {
                question: "¿Para qué sirve el atributo 'alt' en una etiqueta de imagen ()?",
                options: ["Para definir la altura de la imagen", "Para dar un texto descriptivo de la imagen si la imagen no carga", "Para enlazar la imagen a una base de datos"],
                correct: 1
            },
            {
                question: "¿Para qué sirve el método .filter() en un arreglo de JavaScript?",
                options: ["Para crear un nuevo arreglo que contiene solo los elementos que cumplen una condición específica.", "Para modificar los elementos del arreglo original directamente.", "Para encontrar la posición (índice) de un elemento específico."],
                correct: 0
            }
        ];

        let currentQuestion = 0;
        let score = 0;
        let userAnswers = new Array(questions.length).fill(null);
        function showQuestion() {
            const currentQuestionElement = document.getElementById('current-question');
            currentQuestionElement.textContent = currentQuestion + 1;
            quizContainer.innerHTML = '';
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question-container';

            const questionText = document.createElement('div');
            questionText.className = 'question';
            questionText.textContent = questions[currentQuestion].question;
            questionDiv.appendChild(questionText);

            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'options';
            questions[currentQuestion].options.forEach((option, index) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'option';
                if (userAnswers[currentQuestion] === index) {
                    optionDiv.classList.add('selected');
                }
                optionDiv.textContent = option;
                optionDiv.addEventListener('click', () => {
                    document.querySelectorAll('.option').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    optionDiv.classList.add('selected');
                    userAnswers[currentQuestion] = index;
                });
                optionsDiv.appendChild(optionDiv);
            });

            questionDiv.appendChild(optionsDiv);
            quizContainer.appendChild(questionDiv);

            const submitBtn = document.getElementById('submit-btn');
            if (currentQuestion === questions.length - 1) {
                submitBtn.textContent = 'Ver Resultados';
            } else {
                submitBtn.textContent = 'Siguiente Pregunta';
            }
        }

        function showResults() {
            score = 0;
            userAnswers.forEach((answer, index) => {
                if (answer === questions[index].correct) {
                    score++;
                }
            });

            const percentage = (score / questions.length) * 100;
            let message;
            if (percentage === 100) {
                message = "¡Excelente! Has obtenido un 100%";
            } else if (percentage >= 80) {
                message = "¡Muy bien! Has obtenido un " + percentage + "%";
            } else if (percentage >= 60) {
                message = "Bien. Has obtenido un " + percentage + "%";
            } else if (percentage >= 40) {
                message = "Regular. Has obtenido un " + percentage + "%";
            } else {
                message = "Necesitas aprender más. Has obtenido un " + percentage + "%";
            }

            alert(message);

            if (confirm("¿Quieres volver a intentar la trivia?")) {
                currentQuestion = 0;
                score = 0;
                userAnswers = new Array(questions.length).fill(null);
                showQuestion();
            }
        }

        function handleButtonClick() {
            if (userAnswers[currentQuestion] === null) {
                alert("Por favor, selecciona una respuesta antes de continuar.");
                return;
            }

            if (currentQuestion === questions.length - 1) {
                showResults();
            } else {
                currentQuestion++;
                showQuestion();
            }
        }

        showQuestion();

        const submitBtn = document.getElementById('submit-btn');
        if (submitBtn) {
            submitBtn.addEventListener('click', handleButtonClick);
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const donationOptions = document.querySelectorAll('.donation-options .btn');
    const confirmDonateBtn = document.getElementById('confirm-donate-btn');
    const modal = document.getElementById("donation-modal");

    if (donationOptions.length > 0 && confirmDonateBtn) {
        const resetModal = () => {
            donationOptions.forEach(b => b.classList.remove('selected'));
            confirmDonateBtn.disabled = true;
        };

        donationOptions.forEach(btn => {
            btn.addEventListener('click', function () {
                donationOptions.forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');
                confirmDonateBtn.disabled = false;
            });
        });

        confirmDonateBtn.addEventListener('click', function () {
            if (modal) {
                modal.style.display = "none";
            }
            resetModal();
        });

        const closeBtn = document.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', resetModal);
        }
        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                resetModal();
            }
        });
    }
});
