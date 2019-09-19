import { Board } from "./board.class";

export class Render {
	private board: Board;
	public boardSelector: string = "board";
	public scoreSelector: string = "score";
	public timeSelector: string = "time";
	public cardSelector: string = "card";
	private renderInterval: number = (1000 / 60);
	private renderIntervalObj: any;

	constructor (board: Board) {
		this.board = board;
		this.renderCards();
		this.renderScore();
		this.setCardEvents();

		/* Test board instance */
		/* console.log(this.board.size);
		this.board.size = 6;
		console.log(this.board.size); */
	}

	renderCards (): void {
		let boardEl: Element = document.querySelector(`.${this.boardSelector}`);

		this.board.deck.cards.forEach((card, index) => {
			let cardEl: Element = document.createElement('div');
			cardEl.setAttribute('class', `${this.cardSelector}`);
			cardEl.setAttribute('data-id', `${card.id}`);
			cardEl.setAttribute('data-index', `${index}`);
			cardEl.textContent = `${card.face}`;

			boardEl.appendChild(cardEl);
		});
	}

	renderScore () {
		this.renderIntervalObj = setInterval(() => {
			let scoreEl: Element = document.querySelector(`.${this.scoreSelector}`);
			scoreEl.textContent = `${this.board.score}`;

		}, this.renderInterval);
	}

	setCardEvents (): void {
		let boardEl: Element = document.querySelector(`.${this.boardSelector}`);
		let cards: NodeListOf<Element> = boardEl.querySelectorAll(`.${this.cardSelector}`);

		console.log(cards);

		cards.forEach(card => {
			card.addEventListener('click', this.clickEvent);
		});
	}

	private clickEvent = (event: Event): void => {
		let cardEl: Element = event.target as Element;
		let cardID: number = parseInt(cardEl.getAttribute('data-id'));
		let cardIndex: number = parseInt(cardEl.getAttribute('data-index'));

		console.log(this.board.flipCard(cardID, cardIndex));
	}
	
}
