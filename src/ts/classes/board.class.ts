const _ = require('lodash');

import { IDeck } from '../interfaces/deck.interface';
import { ICard } from '../interfaces/card.interface';

export class Board {
	private size: number;
	private time: number;
	private cards: Array<ICard>;
	private cardsNum: number = 10;
	private _deck: IDeck;

	constructor (size: number, time: number, cards: Array<ICard>) {
		this.size = size;
		this.time = time;
		this.cards = cards;

		this.createDeck();
	}

	createDeck () {
		let deck: IDeck = {
			cards: []
		};

		for (let i = 0; i < this.size; i++) {
			for (let j = 0; j < 2; j++) {
				// Deep copy new card
				let cardStr = JSON.stringify(this.cards[i]);
				let cardObj = JSON.parse(cardStr);

				deck.cards.push(cardObj);
			}
		}

		this.deck = deck;
		console.log(this.deck);
	}

	get deck (): IDeck {
		return this._deck;
	}

	set deck (deck: IDeck) {
		this._deck = deck;
	}
}
