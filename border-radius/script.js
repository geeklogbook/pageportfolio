const box = document.querySelector('.box');
const range = document.querySelector('#border-radius');
const valueDisplay = document.querySelector('.value-display'); 

range.addEventListener('input', ({ target: { value } }) => {
	box.style.setProperty('--border-radius', value + 'px');
	valueDisplay.textContent = value + 'px'; 
});