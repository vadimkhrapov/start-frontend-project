;(function () {
	'use strict';

	var rules = {
		checkNumberCard: function (event) {
			var chr = getChar(event);

			if (chr < '0' || chr > '9') {
				return false;
			}

			if(this.value.length > 3){
				return false;
			}
		},
		checkNumberCardValid: function () {
			if(this.value.length > 3){
				this.classList.remove('invalid');
				this.classList.add('valid');
			}else{
				this.classList.remove('valid');
				this.classList.add('invalid');
			}
		},
		checkCodeCard: function () {
			var chr = getChar(event);

			if (chr < '0' || chr > '9') {
				return false;
			}

			if(this.value.length > 2){
				return false;
			}
		},
		checkCodeCardValid: function () {
			if(this.value.length > 2){
				this.classList.remove('invalid');
				this.classList.add('valid');
			}else{
				this.classList.remove('valid');
				this.classList.add('invalid');
			}
		},
		checkNameCard: function () {
  			var test = /^[a-z]+\s[a-z]+$/i; // имя и фамилия
  			if (test.test(this.value)) {
  				this.classList.remove('invalid');
  				this.classList.add('valid');
  			}
  			if (!test.test(this.value)) {
  				this.classList.remove('valid');
  				this.classList.add('invalid');
  			}
		},
		checkNameCardBlur: function () {
			this.value = this.value.toUpperCase();

		},
		removeValue: function () {
			this.value = '';
			this.classList.remove('valid');
		}
	};

	var numbersCard = document.querySelectorAll('.front-card__number'),
		codeCard = document.getElementById('codeCard'),
		nameCard = document.getElementById('nameCard'),
		inputs = document.querySelectorAll('input');

	// проверка номера карты
	for (var i = 0; i < numbersCard.length; i++) {
		numbersCard[i].onkeypress = rules.checkNumberCard;
		numbersCard[i].onfocus = rules.removeValue;
		numbersCard[i].onkeyup = rules.checkNumberCardValid;
	}

	// проверка кода CVV2 / CVC2
	codeCard.onkeypress = rules.checkCodeCard;
	codeCard.onfocus = rules.removeValue;
	codeCard.onkeyup = rules.checkCodeCardValid;

	// проверка имени держателя карты
	nameCard.onkeypress = rules.checkNameCard;
	nameCard.onblur = rules.checkNameCardBlur;

	// обработка всех input: запрет на paste

	for (var j = 0; j < inputs.length; j++) {
		inputs[j].onpaste = function (){ 
			return false;
		};
	}

	// проверка при отправке

	document.querySelector('form').addEventListener('submit', function () {
		
		for (i = 0; i < numbersCard.length; i++) {
			var testNumbersCard = /^[0-9]{4}$/g.test(numbersCard[i].value);

			if (!testNumbersCard) {
				event.preventDefault();
				event.stopPropagation();
				console.log('stop');
			}else{
				console.log('st');
			}
		}

		var testCodeCard =  /^[0-9]{3}$/g.test(codeCard.value),
			testNameCard = /^[A-Z]+\s[A-Z]+$/g.test(nameCard.value);	

			if (!(testCodeCard) || !(testNameCard)) {
				event.preventDefault();
				event.stopPropagation();
			}
	});

	// функции

	function getChar(event) {
		if (event.which === null) {
			if (event.keyCode < 32) return null;
        return String.fromCharCode(event.keyCode); // IE
    }

    if (event.which !== 0 && event.charCode !== 0) {
    	if (event.which < 32) return null;
        return String.fromCharCode(event.which); // остальные
    }

      return null; // специальная клавиша
  }

})();


