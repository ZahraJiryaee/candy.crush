document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid'); //fing the grid class & store it
	const width = 8;
	const squares = [];
	const scoreDisplay = document.getElementById('score');
	let score = 0;

	const candyColors = [
		'url(images/red-candy.png)',
		'url(images/yellow-candy.png)',
		'url(images/orange-candy.png)',
		'url(images/purple-candy.png)',
		'url(images/green-candy.png)',
		'url(images/blue-candy.png)',
	];



	//Create Board
	function createBoard(){
		for(let i =0; i < width*width; i++){
			const square = document.createElement('div');
			square.setAttribute('draggable', true); // to make it draggable:)
			square.setAttribute('id', i);
			let randomColor = Math.floor(Math.random() * candyColors.length)
			//use Math.floor to make sure that we get a int number
			square.style.background = candyColors[randomColor];
			grid.appendChild(square);
			squares.push(square);

		}
	}
	createBoard();


	//Drag The Candy
	let colorBeingDragged;
	let colorBeingReplaced;
	let squareIdBeingDragged;
	let squareIdBeingReplaced;

	squares.forEach(square =>  square.addEventListener('dragstart', dragStart));
	squares.forEach(square =>  square.addEventListener('dragend', dragEnd));
	squares.forEach(square =>  square.addEventListener('dragover', dragOver));
	squares.forEach(square =>  square.addEventListener('dragenter', dragEnter));
	squares.forEach(square =>  square.addEventListener('dragleave', dragLeave));
	squares.forEach(square =>  square.addEventListener('drop', dragDrop));

	function dragStart(){
		colorBeingDragged = this.style.backgroundImage;
		squareIdBeingDragged = parseInt(this.id);
		console.log(colorBeingDragged);
		console.log(this.id, 'dragStart');

	}
	function dragEnd(){
		console.log(this.id, 'dragEnd');
		//what is a valid move?
		let validMoves = [
			squareIdBeingDragged-1, 
			squareIdBeingDragged-width, 
			squareIdBeingDragged+1, 
			squareIdBeingDragged+width, 
		]
		let validMove = validMoves.includes(squareIdBeingReplaced);

		if(squareIdBeingReplaced && validMove){
			squareIdBeingReplaced = null;
		}else if (squareIdBeingReplaced && !validMove){
			squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
			squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
		}else{
			squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
		}
	}
	function dragOver(event){
		event.preventDefault();
		console.log(this.id, 'dragOver');
	}
	function dragEnter(event){
		event.preventDefault();
		console.log(this.id, 'dragEnter');
	}
	function dragLeave(){
		console.log(this.id, 'dragLeave');
	}
	function dragDrop(){
		console.log(this.id, 'dragDrop');
		colorBeingReplaced = this.style.backgroundImage;
		squareIdBeingReplaced = parseInt(this.id);
		this.style.backgroundImage =  colorBeingDragged;
		console.log("colorBeingDragged", colorBeingDragged);
		squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
		console.log("colorBeingReplaced", colorBeingReplaced);


	}


	//drop candies once some have been cleared
	function moveDown(){
		for(i=0; i<55; i++){
			if(squares[i+width].style.backgroundImage === ''){
				squares[i+width].style.backgroundImage = squares[i].style.backgroundImage;
				squares[i].style.backgroundImage = '';

				const firstRow = [0,1,2,3,4,5,6,7];
				const isFirstRow = firstRow.includes(i);
				if(isFirstRow && squares[i].style.backgroundImage === ''){
					let randomColor = Math.floor(Math.random() * candyColors.length);
					squares[i].style.backgroundImage = candyColors[randomColor];
				}
			}
		}
	}



	//checking for matches
	//check for row of 3
	function checkRowForThree(){
		for(i = 0; i < 61; i++){
			let rowOfThree = [i, i+1, i+2];
			let decidedColor = squares[i].style.backgroundImage;
			const isBlank = squares[i].style.backgroundImage === '';

			const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55]; //don't check for matches at this id
			if(notValid.includes(i)) continue;

			if(rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
				score += 3;
				scoreDisplay.innerHTML = score;
				rowOfThree.forEach(index => {
					squares[index].style.backgroundImage = '';
				})
			}
		}
	}
	checkRowForThree();


	//check for column of 3
	function checkColumnForThree(){
		for(i = 0; i < 47; i++){
			let columnOfThree = [i, i+width, i+width*2];
			let decidedColor = squares[i].style.backgroundImage;
			const isBlank = squares[i].style.backgroundImage === '';

			if(columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
				score += 3;
				scoreDisplay.innerHTML = score;
				columnOfThree.forEach(index => {
					squares[index].style.backgroundImage = '';
				})
			}
		}
	}
	checkColumnForThree();



	//check for row of 4
	function checkRowForFour(){
		for(i = 0; i < 60; i++){
			let rowOfFour = [i, i+1, i+2, i+3];
			let decidedColor = squares[i].style.backgroundImage;
			const isBlank = squares[i].style.backgroundImage === '';

			const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55]; //don't check for matches at this id
			if(notValid.includes(i)) continue;

			if(rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
				score += 4;
				scoreDisplay.innerHTML = score;
				rowOfFour.forEach(index => {
					squares[index].style.backgroundImage = '';
				})
			}
		}
	}
	checkRowForFour();


	//check for column of 4
	function checkColumnForFour(){
		for(i = 0; i < 39; i++){
			let columnOfFour = [i, i+width, i+width*2, i+width*3];
			let decidedColor = squares[i].style.backgroundImage;
			const isBlank = squares[i].style.backgroundImage === '';

			if(columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
				score += 4;
				scoreDisplay.innerHTML = score;
				columnOfFour.forEach(index => {
					squares[index].style.backgroundImage = '';
				})
			}
		}
	}
	checkColumnForFour();

	window.setInterval(function(){
		moveDown();
		checkRowForFour();
		checkColumnForFour();
		checkRowForThree();
		checkColumnForThree();
	},100)

})

//we will write all our code in this event listener to the app run the html before the scrip--bc we placed the script in the head tag
// we could also place the script at the bottom of the html & do not use this approach