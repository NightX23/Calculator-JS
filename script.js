class Calculator {
	constructor (calculationScreen, answerScreen, operationInput=""){
		this.calculationScreen = calculationScreen;
		this.answerScreen = answerScreen;
		this.operationInput = operationInput;
	}
	
	clear(){
		this.operationInput = '';
		this.calculationScreen.innerText = this.operationInput;
		this.answerScreen.innerText = this.operationInput;
	}
	
	delete(){
		this.operationInput = this.operationInput.slice(0, -1);
		this.calculationScreen.innerHTML = this.operationInput;
		if(this.operationInput.length > 0)
		this.inputFormatter(this.operationInput);
		else
		this.answerScreen.innerHTML=this.calculationScreen.innerHTML;
	}

	inputFormatter(inputText){
		let formatedText = inputText;
		
		formatedText = formatedText.replace(/✕/g, "*");
		formatedText = formatedText.replace(/÷/g, "/");

		this.calculation(formatedText);
	}
	
	calculation(formatedText){

		try {
			this.answerScreen.innerText = eval(formatedText);
			//this.answerScreen.innerText = formatedText;
			
		} catch (error) {
			this.answerScreen.innerText = "";
		}

	}

	writeOperation(btn){ //Logic optimization pending
		let text = btn.innerText;
		if(btn.hasAttribute("data-operation")){

			if(this.operationInput.length<1)
				text ="";

			else if(signsRestrictions.includes(this.operationInput.slice(-1)))
				this.delete();
		}

		else if(text.slice(-1) == "." && actualDecimal == false)
			text = "";

		else if(text.slice(-1) == "." && actualDecimal == true)
			actualDecimal = false;

		if (signsRestrictions.includes(text) && text != "")
			actualDecimal = true;

		this.updateDisplay(text)
	}

	updateDisplay(text){

		
		this.operationInput += text;
		this.calculationScreen.innerText = this.operationInput;
		this.inputFormatter(this.operationInput);
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


