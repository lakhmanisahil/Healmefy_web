const questions = [
    {
        question: "What is your child's age?",
        options: ["Under 1 year", "1-2 years", "3-5 years", "6+ years"],
        values: [4, 3, 2, 1]
    },
    {
        question: "How many children do you have?",
        options: ["1", "2", "3", "4 or more"],
        values: [4, 3, 2, 1]
    },
    {
        question: "How often do you spend time with your child?",
        options: ["Daily", "A few times a week", "Once a week", "Rarely"],
        values: [4, 3, 2, 1]
    },
    {
        question: "What kind of activities do you engage in with your child?",
        options: ["Reading", "Outdoor games", "Crafts", "Watching TV"],
        values: [4, 3, 3, 2]
    },
    {
        question: "What is your main concern for your child?",
        options: ["Health", "Education", "Behavior", "Social skills"],
        values: [4, 3, 3, 2]
    },
    {
        question: "Do you set rules for screen time?",
        options: ["Yes", "No", "Sometimes", "Never thought about it"],
        values: [4, 1, 2, 1]
    },
    {
        question: "Do you involve your child in household chores?",
        options: ["Yes", "No", "Sometimes", "Depends on the task"],
        values: [4, 1, 3, 2]
    },
    {
        question: "How do you manage your child's tantrums?",
        options: ["Ignore", "Talk to them", "Punish", "Give in to demands"],
        values: [2, 4, 2, 1]
    },
    {
        question: "What do you prioritize more?",
        options: ["Discipline", "Freedom", "Creativity", "Obedience"],
        values: [4, 2, 3, 3]
    },
    {
        question: "What type of education do you prefer for your child?",
        options: ["Public school", "Private school", "Homeschooling", "Alternative education"],
        values: [2, 3, 4, 3]
    },
    // New Questions:
    {
        question: "How often do you visit your child's school or attend school events?",
        options: ["Frequently", "Sometimes", "Rarely", "Never"],
        values: [4, 3, 2, 1]
    },
    {
        question: "How often do you talk to your child about their feelings?",
        options: ["Daily", "A few times a week", "Once a week", "Rarely"],
        values: [4, 3, 2, 1]
    },
    {
        question: "Do you monitor your child's academic progress?",
        options: ["Yes, regularly", "Sometimes", "Rarely", "Not at all"],
        values: [4, 3, 2, 1]
    },
    {
        question: "Do you encourage your child to explore hobbies and interests?",
        options: ["Yes", "No", "Sometimes", "Only if related to school"],
        values: [4, 1, 3, 2]
    },
    {
        question: "How do you reward your child for good behavior?",
        options: ["Praise", "Material rewards", "More freedom", "I don't reward"],
        values: [4, 2, 3, 1]
    },
    {
        question: "How do you discipline your child?",
        options: ["Calm discussion", "Time-out", "Punishments", "No discipline"],
        values: [4, 3, 2, 1]
    }
];

let currentQuestionIndex = 0;
let totalScore = 0;
const maxScore = questions.reduce((total, question) => total + 4, 0);

const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option-btn");
const resultContainer = document.getElementById("result");
const careScoreElement = document.getElementById("care-score");
const resultTips = document.getElementById("result-tips");
const askChildBtn = document.getElementById("ask-child-btn");

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
    startBtn.style.display = "none";
    quizContainer.style.display = "block";
    showQuestion();
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    optionButtons.forEach((button, index) => {
        button.innerText = currentQuestion.options[index];
        button.setAttribute("data-value", currentQuestion.values[index]);  // Attach value for each button
    });
}

// Add event listeners to option buttons
optionButtons.forEach(button => {
    button.addEventListener("click", function() {
        const selectedValue = parseInt(this.getAttribute("data-value"));
        totalScore += selectedValue;  // Update total score with selected option's value
        
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();  // Show next question if available
        } else {
            showResult();  // Show result if no more questions
        }
    });
});

function showResult() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";

    const carePercentage = (totalScore / maxScore) * 100;
    careScoreElement.innerText = carePercentage.toFixed(2);  // Display the calculated care score

    if (carePercentage < 50) {
        resultTips.style.display = "none";
        askChildBtn.style.display = "block";  // Show button to ask questions to the child
    } else {
        askChildBtn.style.display = "none";
        resultTips.style.display = "block";  // Show tips if score is above 50
        displayTips();
    }
}

function displayTips() {
    resultTips.innerHTML = `
        <h3>Parenting Tips:</h3>
        <ul>
            <li>Spend more quality time with your child, even if it's just for a short while daily.</li>
            <li>Encourage open communication. Ask about their day, feelings, and thoughts regularly.</li>
            <li>Set clear boundaries for screen time and help them engage in more creative or physical activities.</li>
            <li>Reward good behavior with positive reinforcement rather than material gifts.</li>
            <li>Take part in your child's education by attending school events and tracking their progress.</li>
        </ul>
    `;
}
