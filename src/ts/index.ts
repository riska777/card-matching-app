import '../scss/main.scss';
import * as data from '../../data/cards.json';

import { Board } from './classes/board.class';
import { Render } from './classes/render.class';

const cards = data.default.cards;

const board = new Board(3,60,cards);
const render = new Render(board);
