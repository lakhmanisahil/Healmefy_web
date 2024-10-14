const questions = [
    { question: "What is your child's age?", options: ["Under 1 year", "1-2 years", "3-5 years", "6+ years"], values: [4, 3, 2, 1] },
    { question: "How many children do you have?", options: ["1", "2", "3", "4 or more"], values: [4, 3, 2, 1] },
    { question: "How often do you spend time with your child?", options: ["Daily", "A few times a week", "Once a week", "Rarely"], values: [4, 3, 2, 1] },
    { question: "What kind of activities do you engage in with your child?", options: ["Reading", "Outdoor games", "Crafts", "Watching TV"], values: [4, 3, 3, 2] },
    { question: "What is your main concern for your child?", options: ["Health", "Education", "Behavior", "Social skills"], values: [4, 3, 3, 2] },
    { question: "Do you set rules for screen time?", options: ["Yes", "No", "Sometimes", "Never thought about it"], values: [4, 1, 2, 1] },
    { question: "Do you involve your child in household chores?", options: ["Yes", "No", "Sometimes", "Depends on the task"], values: [4, 1, 3, 2] },
    { question: "How do you manage your child's tantrums?", options: ["Ignore", "Talk to them", "Punish", "Give in to demands"], values: [2, 4, 2, 1] },
    { question: "What do you prioritize more?", options: ["Discipline", "Freedom", "Creativity", "Obedience"], values: [4, 2, 3, 3] },
    { question: "What type of education do you prefer for your child?", options: ["Public school", "Private school", "Homeschooling", "Alternative education"], values: [2, 3, 4, 3] }
];

// Questions for the child
const childQuestions = [
    { question: "How often do you feel sad or lonely?", options: ["Never", "Sometimes", "Often", "Always"], values: [4, 3, 2, 1] },
    { question: "Do you feel safe at home?", options: ["Yes, always", "Mostly", "Rarely", "Never"], values: [4, 3, 2, 1] },
    { question: "Do you have friends to talk to?", options: ["Yes", "Sometimes", "Rarely", "No"], values: [4, 3, 2, 1] },
    { question: "Do you feel stressed about school?", options: ["Never", "Sometimes", "Often", "Always"], values: [4, 3, 2, 1] },
    { question: "How often do you feel anxious or scared?", options: ["Never", "Sometimes", "Often", "Always"], values: [4, 3, 2, 1] },
    { question: "Do you enjoy time with your family?", options: ["Yes", "Sometimes", "Rarely", "No"], values: [4, 3, 2, 1] },
    { question: "Do you sleep well?", options: ["Yes", "Mostly", "Sometimes", "No"], values: [4, 3, 2, 1] },
    { question: "How often do you feel overwhelmed?", options: ["Never", "Sometimes", "Often", "Always"], values: [4, 3, 2, 1] },
    { question: "Do you feel understood by your parents?", options: ["Yes", "Sometimes", "Rarely", "No"], values: [4, 3, 2, 1] },
    { question: "Are you able to express your emotions?", options: ["Yes", "Sometimes", "Rarely", "No"], values: [4, 3, 2, 1] }
];

let currentQuestionIndex = 0;
let totalScore = 0;
let childScore = 0;
const maxScore = questions.reduce((total, question) => total + 4, 0);
const childMaxScore = childQuestions.reduce((total, question) => total + 4, 0);

const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option-btn");
const resultContainer = document.getElementById("result");
const careScoreElement = document.getElementById("care-score");
const resultTips = document.getElementById("result-tips");
const askChildBtn = document.getElementById("ask-child-btn");

const childQuizContainer = document.getElementById("child-quiz-container");
const childQuestionElement = document.getElementById("child-question");
const childOptionButtons = document.querySelectorAll(".child-option-btn");
const childResultContainer = document.getElementById("child-result");
const childScoreElement = document.getElementById("child-score");
const childTips = document.getElementById("child-tips");
const consultExpertBtn = document.getElementById("consult-expert-btn");

// Start Parent Quiz
startBtn.addEventListener("click", () => {
    startBtn.style.display = "none";
    quizContainer.style.display = "block";
    showQuestion();
});

// Show next parent question
function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        optionButtons.forEach((button, index) => {
            button.textContent = currentQuestion.options[index];
            button.onclick = () => selectOption(index);
        });
    } else {
        showParentResult();
    }
}

// Handle parent option selection
function selectOption(index) {
    totalScore += questions[currentQuestionIndex].values[index];
    currentQuestionIndex++;
    showQuestion();
}

// Show parent result
function showParentResult() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    const careScore = Math.round((totalScore / maxScore) * 100);
    careScoreElement.textContent = careScore;

    askChildBtn.style.display = "block"; // Always show the option to ask child questions
    
    if (careScore < 50) {
        resultTips.innerHTML = `<h3>Intensive Parenting Tips</h3>
                                <ul>
                                    <li>Spend more one-on-one quality time with your child to strengthen the bond.</li>
                                    <li>Be extra cautious about your child's emotional needs and provide consistent support.</li>
                                    <li>Engage in positive discipline techniques and avoid punitive actions.</li>
                                    <li>Foster a safe and nurturing environment for the child to express themselves.</li>
                                </ul>`;
    } else {
        resultTips.innerHTML = `<h3>General Parenting Tips</h3>
                                <ul>
                                    <li>Maintain a consistent schedule for spending time with your child.</li>
                                    <li>Encourage open communication by asking your child how they feel regularly.</li>
                                    <li>Introduce constructive activities such as creative games and educational tasks.</li>
                                    <li>Set boundaries while giving the child enough freedom to make decisions.</li>
                                </ul>`;
    }
}

// Start child quiz
askChildBtn.addEventListener("click", () => {
    resultContainer.style.display = "none";
    childQuizContainer.style.display = "block";
    currentQuestionIndex = 0;
    childScore = 0;
    showChildQuestion();
});

// Show next child question
function showChildQuestion() {
    if (currentQuestionIndex < childQuestions.length) {
        const currentQuestion = childQuestions[currentQuestionIndex];
        childQuestionElement.textContent = currentQuestion.question;
        childOptionButtons.forEach((button, index) => {
            button.textContent = currentQuestion.options[index];
            button.onclick = () => selectChildOption(index);
        });
    } else {
        showChildResult();
    }
}

// Handle child option selection
function selectChildOption(index) {
    childScore += childQuestions[currentQuestionIndex].values[index];
    currentQuestionIndex++;
    showChildQuestion();
}

// Show child result
function showChildResult() {
    childQuizContainer.style.display = "none";
    childResultContainer.style.display = "block";
    const childScorePercentage = Math.round((childScore / childMaxScore) * 100);
    childScoreElement.textContent = childScorePercentage;

    if (childScorePercentage < 50) {
        childTips.style.display = "none";
        consultExpertBtn.style.display = "block";
    } else {
        consultExpertBtn.style.display = "none";
        childTips.style.display = "block";
        childTips.innerHTML = `<h3>Child Well-being Tips</h3>
                               <ul>
                                   <li>Ensure your child feels safe and supported.</li>
                                   <li>Encourage your child to express their emotions.</li>
                                   <li>Foster healthy friendships and social connections.</li>
                                   <li>Monitor your child's mental well-being regularly.</li>
                               </ul>`;
    }
}
