import '../scss/main.scss';
import * as data from '../../data/cards.json';

import { Board } from './classes/board.class';
import { Render } from './classes/render.class';

const cards = data.default.cards;
const time: number = 60;
let size: number = 3;

function startGame (): void {
	const board = new Board(size, time, cards);
	const render = new Render(board);

	document.querySelector('.start').classList.add('d-none');
	document.querySelector('.game').classList.remove('d-none');
}

function resetGame (): void {

}

function bootstrap (): void {
	let sizeInput: HTMLInputElement = document.querySelector('#boardSize');
	size = parseInt(sizeInput.value);

	sizeInput.addEventListener('change', (event: Event) => {
		size = parseInt(sizeInput.value);
	})

	let startBtn: Element = document.querySelector('.start-btn');

	startBtn.addEventListener('click', (event: Event) => {
		startGame();
	})
}

window.addEventListener('DOMContentLoaded', (event) => {
	bootstrap();
});
