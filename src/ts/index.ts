import '../scss/main.scss';
import * as data from '../../data/cards.json';

import { Board } from './classes/board.class';
import { Render } from './classes/render.class';

const cards = data.default.cards;
const time = 60;
let size = 3;



function startGame (): void {
	const board = new Board(size, time, cards);
	const render = new Render(board);
}
