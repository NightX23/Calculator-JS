class Calculator {
	constructor (calculationScreen, answerScreen, operationInput=""){
		this.calculationScreen = calculationScreen;
		this.answerScreen = answerScreen;
		this.operationInput = operationInput;
	}
	
	clear(){

		this.operationInput = '';
		this.calculationScreen.innerText = this.operationInput;
	}
	
	delete(){
		this.operationInput = this.operationInput.slice(0, -1);
		calculationScreen.innerHTML = this.operationInput;
	}
	
	calculation(){
		
	}

	writeOperation(btn){ //Login optimization pending
		let text = btn.innerText;
		if(btn.hasAttribute("data-operation")){

			if(this.operationInput.length<1){
				text ="";
			}

			else if(signsRestrictions.includes(this.operationInput.slice(-1))){
				this.delete();
			}
		}

		this.updateDisplay(text)
	}

	updateDisplay(text){
		this.operationInput += text;
		this.calculationScreen.innerText = this.operationInput;
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


