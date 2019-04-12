let button = document.querySelector('#restart');
button.addEventListener('click', restartGame);

let currentGamerView = document.querySelector('#current-gamer');
let winnerTitle = document.querySelector('#winner');
let cells = getFieldCells('#field td');
let countX = document.querySelector('#countX');
let countO = document.querySelector('#countO');

let currentGamer = 'X';
let counterX = 0;
let counterO = 0;

prepareField();


function getFieldCells(selector) {
	return document.querySelectorAll(selector);
}

//allow global
function prepareField() {
	for (let i = 0; i < cells.length; i++) {
		cells[i].innerHTML = '';
		cells[i].addEventListener('click', nextStep);
	}
	winnerTitle.innerHTML = '';
	countX.innerHTML = counterX;
	countO.innerHTML = counterO;
	showCurrentGamer(currentGamer, currentGamerView);
}

//allow globals
function nextStep() {
	var cell = this;
	fillCell(cell, currentGamer)
	currentGamer = changeGamer(currentGamer);

	showCurrentGamer(currentGamer, currentGamerView);
	
	deactivateCell(cell);

	let winner = checkWin(cells);
	if (winner !== false) {
		endGame(cells, winner, winnerTitle, currentGamerView);
	}
}

function changeGamer(currentGamer) {
	if (currentGamer == 'X') {
		return 'O';
	} else {
		return 'X';
	}
	
}

function fillCell(cell, content) {
	cell.innerHTML = content;
}

function deactivateCell(cell) {
	cell.removeEventListener('click', nextStep);
}

function endGame(cells, winner, winnerTitle, currentGamerView) {
	stopGame(cells);
	showWinner(winner, winnerTitle);
	cleanCurrentGamer(currentGamerView);
	counter(winner);
}

//allow global
function restartGame() {
	prepareField(cells);
}

function stopGame(cells) {
	for (let i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', nextStep);
	}
}

function showWinner(name, winnerTitle) {
	winnerTitle.innerHTML = 'Победил ' + name;
}

function showCurrentGamer(name, elem) {
	elem.innerHTML = 'Следующий ход: ' + name;
}

function cleanCurrentGamer(elem) {
	elem.innerHTML = 'Игра окончена!!!';
}
function counter(name) {
	if (name == 'X') {
		counterX++;
	} else if (name == 'O') {
		counterO++;
	}
}
//false, 'X', 'O'
function checkWin(cells) {
	let combinations = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
	for (let i = 0; i < combinations.length; i++) {
		let combination = combinations[i];

		if (cells[combination[0]].innerHTML == cells[combination[1]].innerHTML &&
		cells[combination[1]].innerHTML == cells[combination[2]].innerHTML &&
		cells[combination[0]].innerHTML != '') {
			return cells[combination[0]].innerHTML;
		}
	}


	return false;
}