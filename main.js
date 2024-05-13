const words = {
	5: [
		"cat",
		"dog",
		"sun",
		"moon",
		"tree",
		"bird",
		"fish",
		"ball",
		"book",
		"pen",
	],
	4: [
		"banana",
		"computer",
		"guitar",
		"piano",
		"coffee",
		"table",
		"chair",
		"window",
		"flower",
		"garden",
	],
	3: [
		"elephant",
		"universe",
		"adventure",
		"wonder",
		"mountain",
		"waterfall",
		"fireworks",
		"butterfly",
		"chocolate",
	],
};
const levelSelection = document.getElementById("level");
const startButton = document.querySelector(".start");
const timeLeft = document.querySelector(".stats .time-left span");
const gotScore = document.querySelector(".stats .score span.got");
const totalScore = document.querySelector(".stats .score span.total");
const inputWord = document.querySelector("#input-word");

let tries = 10;
let wordToWrite = document.querySelector(".word-to-write");
let levelSeconds = levelSelection.value;
let start;
let usedWords = [];

timeLeft.textContent = levelSeconds;
totalScore.textContent = tries;
levelSelection.onchange = () => {
	levelSeconds = levelSelection.value;
	timeLeft.textContent = levelSeconds;
};
inputWord.onpaste = () => false;
inputWord.disabled = true;
inputWord.addEventListener("keydown", (e) => {
	if (e.key == "Enter") {
		check();
	}
});
wordToWrite.oncopy = () => false;

startButton.onclick = startGame;

function startGame() {
	startButton.disabled = true;
	inputWord.disabled = false;
	inputWord.focus();

	gotScore.textContent = 0;
	generateWord();
}
function generateWord() {
	let word =
		words[levelSeconds][Math.floor(Math.random() * words[levelSeconds].length)];
	if (word in usedWords) {
		console.log("used");
		return generateWord();
	}
	usedWords.push(word);
	wordToWrite.textContent = word;
	control();
}
function control() {
	start = setInterval(() => {
		timeLeft.textContent--;
		if (timeLeft.textContent == "0") check();
	}, 1000);
}

function check() {
	if (wordToWrite.textContent === inputWord.value.toLowerCase())
		gotScore.textContent++;
	clearInterval(start);
	timeLeft.textContent = levelSeconds;
	inputWord.value = "";
	tries--;

	if (tries > 0) {
		generateWord();
	} else {
		endGame();
	}
}

function endGame() {
	inputWord.value = "";
	inputWord.disabled = true;
	startButton.disabled = false;
	tries = 10;
}
