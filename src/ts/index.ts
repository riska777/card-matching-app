import { Board } from './classes/board.class';
import { Render } from './classes/render.class';
import * as data from '../../dist/data/cards.json';

const cards = data.default.cards;

const board = new Board(3,60,cards);
const render = new Render();

console.log(1);
