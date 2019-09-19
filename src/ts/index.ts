import '../scss/main.scss';
import * as data from '../../data/cards.json';

import { Board } from './classes/board.class';
import { Render } from './classes/render.class';

const cards = data.default.cards;
const time: number = 60;
let size: number = 3;

const board = new Board(size, time, cards);
const	render = new Render(board);

function startGame (): void {
	document.querySelector('.start').classList.add('d-none');
	document.querySelector('.game').classList.remove('d-none');

	board.size = size;
	board.score = 0;

	board.createDeck();
	render.render();
}

function resetGame (): void {
	board.size = size;
	board.score = 0;

	board.resetBoard();
	render.render();
}

function changeGameDiff (): void {
	document.querySelector('.start').classList.remove('d-none');
	document.querySelector('.game').classList.add('d-none');

	resetGame();
}

function bootstrap (): void {
	/* Board size */
	let sizeInput: HTMLInputElement = document.querySelector('#boardSize');
	size = parseInt(sizeInput.value);
	sizeInput.addEventListener('change', (event: Event) => {
		size = parseInt(sizeInput.value);
	})

	/* Start btn event */
	let startBtn: Element = document.querySelector('.start-btn');
	startBtn.addEventListener('click', (event: Event) => {
		startGame();
	})

	/* Reset btn event */
	let resetBtn: Element = document.querySelector('.reset-btn');
	resetBtn.addEventListener('click', (event: Event) => {
		resetGame();
	})

	/* Change settings */
	let settingsBtn: Element = document.querySelector('.settings-btn');
	settingsBtn.addEventListener('click', (event: Event) => {
		changeGameDiff();
	})
}

window.addEventListener('DOMContentLoaded', (event) => {
	bootstrap();
});
