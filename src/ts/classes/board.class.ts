const _ = require('lodash');

import { IDeck } from '../interfaces/deck.interface';
import { ICard } from '../interfaces/card.interface';

export class Board {
	private _size: number;
	private time: number;
	private _score: number;
	private _gameOver: boolean;
	private cards: Array<ICard>;
	private cardsNum: number = 10;
	private _deck: IDeck;
	private _activeCard: number;

	constructor (size: number, time: number, cards: Array<ICard>) {
		this.size = size;
		this.time = time;
		this.cards = cards;
		this.score = 0;

		this.createDeck();
	}

	createDeck (): void {
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
	}

	flipCard (cardID: number, cardIndex: number): boolean {
		let selectedCard: ICard = this.deck.cards[cardIndex];

		if ((this.activeCard == null || this.activeCard == undefined) && selectedCard.inGame == true) {
			// pick first card
			this.activeCard = cardID;
			selectedCard.show == true;

			return true;
		} else if (selectedCard.inGame == true) {
			// pick second card
			this._deck.cards.forEach((card, index) => {
				if (card.id == selectedCard.id) {
					card.show == true;
				}
			});

			/* Check if selected cards match */
			if (selectedCard.id == this.activeCard) 
			{
				/* Cards match */
				this._deck.cards.forEach((card, index) => {
					console.log(card, card.id);
					if (card.id == selectedCard.id) {
						card.inGame = false;
					}
				});
				console.log(selectedCard.id);
				console.log(this._deck.cards);

				this.score = this.score + 1;
				this.activeCard = null;
				return true;
			} 
			else 
			{
				/* Cards dont match */
				this._deck.cards.forEach((card, index) => {
					if (card.id == selectedCard.id) {
						card.show == false;
					}
				});

				this.activeCard = null;
				return false;
			}
		} 
		else 
		{
			// picked non-ingame card
			return false;
		}
	}

	get deck (): IDeck {
		return this._deck;
	}

	set deck (deck: IDeck) {
		this._deck = deck;
	}

	get size (): number {
		return this._size;
	}

	set size (size: number) {
		this._size = size;
	}

	get score (): number {
		return this._score;
	}

	set score (score: number) {
		this._score = score;
	}

	get gameOver (): boolean {
		return this._gameOver;
	}

	set gameOver (state: boolean) {
		this._gameOver = state;
	}

	get activeCard (): number {
		return this._activeCard;
	}

	set activeCard (cardID: number) {
		this._activeCard = cardID;
	}
}
