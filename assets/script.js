class WECA {

	constructor() {
		this.input = document.querySelector('[data-input]');
		this.select = document.querySelector('[data-select]');
		this.button = document.querySelector('[data-button]');
		this.canvas = document.querySelector('[data-canvas]');
		this.context = this.canvas.getContext('2d');
		this.canvas.width = 1000;
		this.canvas.height = 1000;
		this.cellWidth = 5;
		this.cells = [];
		this.ruleset = [0, 0, 0, 1, 1, 1, 1, 0];
		this.generation = 0;
		this.generations = this.input.value;
	}
	
	computeGeneration(a, b, c) {
		if (a === 1 && b === 1 && c === 1) return this.ruleset[0];
		if (a === 1 && b === 1 && c === 0) return this.ruleset[1];
		if (a === 1 && b === 0 && c === 1) return this.ruleset[2];
		if (a === 1 && b === 0 && c === 0) return this.ruleset[3];
		if (a === 0 && b === 1 && c === 1) return this.ruleset[4];
		if (a === 0 && b === 1 && c === 0) return this.ruleset[5];
		if (a === 0 && b === 0 && c === 1) return this.ruleset[6];
		if (a === 0 && b === 0 && c === 0) return this.ruleset[7];
	}
	
	// generate new cells and advance a generation
	generate() {
		let nextgen = new Array(this.cells.length);
		
		for (let i = 0; i <  this.canvas.width / this.cellWidth - 1; i++) {
			let left; // left neighbor state
			let me; // current state
			let right; // right neighbor state

			if (i > 0){
				left = this.cells[i - 1];
			} else {
				left = 0;
			}

			me = this.cells[i];

			if (i <  this.canvas.width / this.cellWidth - 1){
				right = this.cells[i + 1];
			} else {
				right = 0;
			}

			nextgen[i] = this.computeGeneration(left, me, right);
		}

		this.cells = nextgen;
		this.generation++;
	}
	
	// draw a row based on current state of cells
	drawRow() {
		for (let i = 0; i < this.cells.length; i++) {
			if (this.cells[i] === 1) {
				this.context.fillStyle = 'rgba(0, 0, 0, 1)';
			} else {
				this.context.fillStyle = 'rgba(0, 0, 0, 0)';
			}
			this.context.fillRect(i * this.cellWidth, this.generation * this.cellWidth, this.cellWidth, this.cellWidth);
		}
	}

	// clear state of canvas 
	clear() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.generation = 0;
	}
	
	// setup initial generation
	setup() {
		for (let i = 0; i <  this.canvas.width / this.cellWidth; i++) {
			this.cells[i] = 0;	
		}
		this.cells[Math.round(this.cells.length / 2)] = 1; // set first `live` cell to be somewhere near center
	}

	// clear canvas and draw all generations
	draw() {
		this.clear();
		this.setup();
		this.drawRow();

		while (this.generation < this.generations) {
			this.generate();
			this.drawRow();
		}
	}

	// event handler for controls/submit
	events() {
		this.button.addEventListener('click', () => {
			const { value } = this.select;
			const ruleset = value.split(', ');
			let parsed = []
			for (let rule of ruleset) {
				parsed = [...parsed, parseInt(rule)];
			}
			this.ruleset = parsed;
			this.generations = this.input.value;
			this.draw();
		})
	}
	
	init() {
		this.events();
		this.draw();
	}
}

window.WECA = WECA;