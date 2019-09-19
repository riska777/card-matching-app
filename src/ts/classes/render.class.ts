import { Board } from "./board.class";

export class Render {
	private board: Board;
	public boardSelector: string = "c-deck";
	public scoreSelector: string = "score";
	public timeSelector: string = "time";
	public cardSelector: string = "c-deck__card";
	public moveInProgress: boolean = false;
	private moveInProgressTimeout: any;
	private renderInterval: number = (1000 / 60);
	private renderIntervalObj: any;

	constructor (board: Board) {
		this.board = board;

		/* Test board instance */
		/* console.log(this.board.size);
		this.board.size = 6;
		console.log(this.board.size); */
	}

	render (): void {
		this.renderCards();
		this.renderScore();
		this.setCardEvents();
	}

	renderCards (): void {
		let boardEl: Element = document.querySelector(`.${this.boardSelector}`);
		boardEl.textContent = '';

		this.board.deck.cards.forEach((card, index) => {
			let cardEl: Element = document.createElement('div');
			cardEl.setAttribute('class', `${this.cardSelector} col-6 col-sm-4 col-md-3`);

			let cardElInner: Element = document.createElement('div');
			cardElInner.setAttribute('class', `${this.cardSelector}__inner ${this.cardSelector}__inner--inactive`);
			cardElInner.setAttribute('data-id', `${card.id}`);
			cardElInner.setAttribute('data-index', `${index}`);

			let cardElBack: Element = document.createElement('span');
			cardElBack.textContent = `${card.face}`;

			cardElInner.appendChild(cardElBack);
			cardEl.appendChild(cardElInner);
			boardEl.appendChild(cardEl);
		});
	}

	renderScore () {
		clearInterval(this.renderIntervalObj);
		this.renderIntervalObj = setInterval(() => {
			let scoreEl: Element = document.querySelector(`.${this.scoreSelector}`);
			scoreEl.textContent = `Score: ${this.board.score}`;
		}, this.renderInterval);
	}

	setCardEvents (): void {
		let boardEl: Element = document.querySelector(`.${this.boardSelector}`);
		let cards: NodeListOf<Element> = boardEl.querySelectorAll(`.${this.cardSelector}__inner`);

		cards.forEach(card => {
			card.addEventListener('click', this.clickEvent);
		});
	}

	resetRender (): void {
		this.renderCards();
		this.renderScore();
		this.setCardEvents();
	}

	private clickEvent = (event: Event): void => {
		if (this.moveInProgress) {
			return;
		}

		let cardEl: Element = event.srcElement as Element;
		let cardID: number = parseInt(cardEl.getAttribute('data-id'));
		let cardIndex: number = parseInt(cardEl.getAttribute('data-index'));

		cardEl.classList.remove(`${this.cardSelector}__inner--inactive`);

		let firstFlip: boolean = false;

		if (this.board.activeCard == null || this.board.activeCard == undefined) {
			/* First flip */
			firstFlip = true;
		} else {
			/* Second flip */
			firstFlip = false;
		}

		let isMatch = this.board.flipCard(cardID, cardIndex);
		let cards = document.querySelectorAll(`.${this.cardSelector}__inner[data-id="${cardID}"]`);
		let cardsAll = document.querySelectorAll(`.${this.cardSelector}__inner`);

		if (isMatch) {
			/* Remove click events from matched cards */
			cards.forEach((card) => {
				card.classList.add(`${this.cardSelector}__inner--disabled`);
				card.removeEventListener('click', this.clickEvent);
			});
		} else {
			if (firstFlip) {

			} else {
				/* Set back the inactive card state */
				this.moveInProgress = true;

				this.moveInProgressTimeout = setTimeout(() => {
					cardsAll.forEach((card) => {
						if (!card.classList.contains(`${this.cardSelector}__inner--disabled`)) {
							card.classList.add(`${this.cardSelector}__inner--inactive`);
						}

						this.moveInProgress = false;
					})
				}, 1000);
			}
		}

		console.log('match: ', isMatch);
	}
	
}
