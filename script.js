class Calculator {
	constructor (calculationScreen, answerScreen, inputScreenText = "", calculationOutput = ""){
		this.calculationScreen = calculationScreen;
		this.answerScreen = answerScreen;
		this.inputScreenText = inputScreenText;
		this.calculationOutput   = calculationOutput ; 

	}
	
	clear(){
		this.inputScreenText = "";
		this.calculationOutput   = "";
		this.calculationScreen.innerText = this.inputScreenText;
		this.answerScreen.innerText = this.calculationOutput ; 
	}
	
	delete(){
		this.inputScreenText = this.inputScreenText.slice(0, -1);
		this.calculationScreen.innerText = this.inputScreenText;
		if(this.inputScreenText.length > 0)
		this.inputFormatter(this.inputScreenText);
		else
		this.answerScreen.innerText = this.calculationScreen.innerText;
	}
	
	calculation(formatedText){

		try {
			this.answerScreen.innerText = eval(formatedText);
			//this.answerScreen.innerText = formatedText;
			
		} catch (error) {
			this.answerScreen.innerText = "";
		}

	}

	equalsFunction(){
		this.calculationScreen.innerText = this.answerScreen.innerText;
		this.answerScreen.innerText = "";
	}

	writeOperation(btn){ //Logic optimization pending
		let calculationText = btn.value;
		let showedText = calculationText;

		if(btn.hasAttribute("data-expresion"))
			showedText = btn.dataset.expresion;

		if(btn.hasAttribute("data-operation")){

			if(this.inputScreenText.length < 1){
				showedText ="";
				ansText = "";
			}

			else if(signsRestrictions.includes(this.inputScreenText.slice(-1)))
				this.delete();
		}

		else if(showedText.slice(-1) == "." && actualDecimal == false)
			showedText = "";

		else if(showedText.slice(-1) == "." && actualDecimal == true)
			actualDecimal = false;

		if (signsRestrictions.includes(showedText) && showedText != "")
			actualDecimal = true;		

		if(btn.hasAttribute("data-equals") && this.calculationScreen.innerText != "")
			this.equalsFunction();

		this.updateDisplay(showedText, calculationText)
	}

	updateDisplay(showText, calcText){

		this.inputScreenText += showText;
		this.calculationOutput += calcText;
		
		this.calculationScreen.innerText = this.inputScreenText;
		//this.inputFormatter(this.inputScreenText);
		this.calculation(this.calculationOutput	);
	}
}

const numberButtons = document.querySelectorAll('[data-number]');
const writedButtons = document.querySelectorAll('[data-write]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');

const delButton = document.querySelector('#btn-del');
const clearButton = document.querySelector('#btn-clear');

const calculationScreen = document.querySelector('[data-calculation]');
const answerScreen = document.querySelector('[data-answer]');

const signsRestrictions = "%+-÷✕";
let actualDecimal = true;

const calculator = new Calculator(calculationScreen, answerScreen);

writedButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.writeOperation(button)
	})
});

delButton.addEventListener('click', () => {
	calculator.delete()
});

clearButton.addEventListener('click', () => {
	calculator.clear()
});


