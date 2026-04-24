"use strict";

class App {

addInputListeners() {
    this.textInputMortgageAmount.addEventListener("input", () => {
        this.symbolMoney.classList.remove("bg-red", "text-white");
    });

    this.textInputTerm.addEventListener("input", () => {
        this.mortgageYears.classList.remove("bg-red", "text-white");
    });

    this.textInputInterestRate.addEventListener("input", () => {
        this.mortgageInterest.classList.remove("bg-red", "text-white");
    });
    this.radiogroup.addEventListener("change", () => {
        this.removeAllErrorMessages();
    })
}


    constructor() {
        this.form = document.querySelector("#mortgage-form");
        this.textInputMortgageAmount = document.querySelector("#amount");
        this.textInputTerm = document.querySelector("#term");
        this.textInputInterestRate = document.querySelector("#interest");
        this.submitButton = document.querySelector(".submitButton");
        this.radioInputInterest = document.querySelector("#interest_only");
        this.radiogroup =document.querySelector("fieldset")
        this.symbolMoney = document.querySelector(".symbol_money")
        this.mortgageInterest= document.querySelector (".mortgage_interest")
        this.mortgageYears=document.querySelector(".years")
        this.resetButton = document.querySelector(".reset");
        this.monthlyPaymentElement = document.querySelector("#monthly-payment");
        this.totalRepaymentElement = document.querySelector("#total-repayment");
        this.initialState = document.querySelector(".initial_state");
         this.resultContainer = document.querySelector(".result__container");

   
        //  this.initialState.style.display = "block";
        //  this.resultContainer.style.display = "none";
        this.show(this.initialState);
        this.hide(this.resultContainer);

        this.addEventListeners();
        this.addInputListeners(); 
    }
   

    addEventListeners() {
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();

            const mortgageAmount = this.textInputMortgageAmount.value.trim();
            const term = this.textInputTerm.value.trim();
            const interestRate = this.textInputInterestRate.value.trim();
            const selected = document.querySelector('input[name="radios"]:checked');

            let isValid = true;


            const amount = parseFloat(mortgageAmount);
            const termValue = parseInt(term);
            const interest = parseFloat(interestRate);


            this.symbolMoney.classList.remove("bg-red-500", "text-white");
            this.mortgageInterest.classList.remove("bg-red-500", "text-white");
            this.mortgageYears.classList.remove("bg-red-500", "text-white");
            this.removeAllErrorMessages();


               

            function calculateMortgage(){
                const monthlyInterestRate = interest / 100 / 12;
                const numberOfPayments = termValue * 12;

               
                let monthlyPayment;
                let totalPayment;
               
                       
            if (selected && selected.id === "interest_only") {
                 monthlyPayment = (amount * (interest / 100)) / 12;
                 totalPayment = monthlyPayment * numberOfPayments;
                console.log("Monthly Payment (Interest Only): $" + monthlyPayment.toFixed(2));
            } else if(selected && selected.id === "repayment") {
                monthlyPayment = (amount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
                totalPayment = monthlyPayment * numberOfPayments;
                console.log("Monthly RePpayment: $" + monthlyPayment.toFixed(2));
              
            }
            return { monthlyPayment, totalPayment };

            
        }


            if (isNaN(amount) || amount <=0) {
                
                isValid = false;
                this.symbolMoney.classList.add("bg-red", "text-white");
          
            }
            

            if (isNaN(termValue) || termValue <= 0) {
               
                isValid = false;
                this.mortgageYears.classList.add("bg-red", "text-white");
            
            }

            if (isNaN(interest)|| interest <= 0 || interest > 100) {
                isValid = false;
                this.mortgageInterest.classList.add("bg-red", "text-white");
           
            }

            if (!selected) {
                this.showErrorMessage(this.radiogroup, this.createErrorMessage("Select one option"));
                isValid = false;
            }
     

           if (isValid) {
                const { monthlyPayment, totalPayment } = calculateMortgage();

               if (typeof monthlyPayment === "number" && typeof totalPayment === "number") {

                   const formatter = new Intl.NumberFormat('en-AU', {
                        style: 'currency',
                        currency: 'AUD'
                    });
                    this.monthlyPaymentElement.textContent = formatter.format(monthlyPayment);
                    this.totalRepaymentElement.textContent = formatter.format(totalPayment);

                    this.hide(this.initialState);
                     this.show(this.resultContainer);
                } else {
                    console.log("Calculation error");
                }
    }

           
        });

        this.resetButton.addEventListener("click", () => {
        this.resetForm();
    });



        

    }

   

 

    createErrorMessage(text) {
        const error = document.createElement("p");
        error.textContent = text;
        error.style.color = "red";
        error.style.fontSize = "0.9rem";
        return error;
    }

    showErrorMessage(inputElement, errorMessage) {
        const existingError = inputElement.nextElementSibling;
        if (existingError && existingError.tagName === "P") {
            existingError.remove();
        }
        inputElement.insertAdjacentElement("afterend", errorMessage);
    }

    removeAllErrorMessages() {
        const errorMessages = this.form.querySelectorAll("p");
        errorMessages.forEach(error => error.remove());
    }

    show(element) {
    element.classList.remove("hidden");
    }

    hide(element) {
    element.classList.add("hidden");
    }


    resetForm() {
    // 1. Clear inputs
    this.textInputMortgageAmount.value = "";
    this.textInputTerm.value = "";
    this.textInputInterestRate.value = "";

    // 2. Uncheck radio buttons
    const radios = document.querySelectorAll('input[name="radios"]');
    radios.forEach(r => r.checked = false);

    // 3. Reset outputs
    this.monthlyPaymentElement.textContent = "$0.00";
    this.totalRepaymentElement.textContent = "$0.00";

    // 4. Remove error styles
    this.symbolMoney.classList.remove("bg-red", "text-white");
    this.mortgageYears.classList.remove("bg-red", "text-white");
    this.mortgageInterest.classList.remove("bg-red", "text-white");

    // 5. Remove error messages
    this.removeAllErrorMessages();

    // 6. Reset view to initial state
    this.hide(this.resultContainer);
    this.show(this.initialState);
}
}

    


document.addEventListener("DOMContentLoaded", () => {
    new App();
});