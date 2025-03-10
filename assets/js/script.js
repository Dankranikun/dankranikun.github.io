document.addEventListener("DOMContentLoaded", function () {
	function cambiarIdioma(lang){
		document.documentElement.lang=lang
	}
	function popuLate(place, element){
		place.innerHTML = '';
		extendedItems.forEach(el => {
			const newEl = element.content.cloneNode(true);
			newEl.querySelector('a').setAttribute("href", el.href);
			newEl.querySelector('h2').textContent = el.title;
			newEl.querySelector('p').textContent = el.text;
			newEl.querySelector('img').setAttribute("src", `assets/img/${el.img.src}`);
			newEl.querySelector('img').setAttribute("alt", el.img.alt);
			newEl.querySelector('img').setAttribute("title", el.img.title);
			place.appendChild(newEl);
		});
		updateTransform();
	};

	// Carousel
	const Carousel = document.getElementById("carousel");
	const Cards = Carousel.children[0]
	const prevButton = Carousel.children[1];
	const nextButton = Carousel.children[2];
	const items=[
		{
			href:"https://github.com/Dankranikun/SGEProyectoFinal",
			title:"Seguimiento guardias profesores",
			text:"Módulo de Odoo desarrollado para facilitar el seguimiento de qué profesores cubren las faltas de qué grupos.",
			img:{
				src:"Odoo_icon.png",
				alt:"Logo de Odoo",
				title:""
			}
		},
		{
			href:"https://github.com/Dankranikun/AchievementTrackerApp",
			title:"Achievement Tracker",
			text:"Una aplicación para Android/iOS para el seguimiento de logros de videojuegos en distintas plataformas.",
			img:{
				src:"achievement.webp",
				alt:"",
				title:""
			}
		},
		{
			href:"https://github.com/Dankranikun/Repentance_Dungeon",
			title:"Repentance Dungeon",
			text:"Videojuego rogue-lite, top-down shooter, acción, fantasía multiplataforma.",
			img:{
				src:"godot.png",
				alt:"Imagen promocional del videojuego",
				title:""
			}
		},
		{
			href:"https://github.com/Dankranikun/Acceso-a-datos",
			title:"Repositorio de Acceso a Datos",
			text:"Casi todos los proyectos del módulo Acceso a Datos del curso.",
			img:{
				src:"database.png",
				alt:"",
				title:""
			}
		},
		{
			href:"https://github.com/Dankranikun/U4SitioWeb",
			title:"Sitio web añejo",
			text:"Sitio web desarrollado en 2020 para clase de 'Aplicaciones web'.",
			img:{
				src:"html-5.png",
				alt:"",
				title:""
			}
		}
	];
	const itemsPerSlide = 5;
	const extendedItems = [...items.slice(-itemsPerSlide), ...items, ...items.slice(0, itemsPerSlide)];
	let currentIndex = itemsPerSlide;

	function updateTransform() {
		const offset = -currentIndex * (100 / itemsPerSlide);
		Cards.style.transform = `translateX(${offset}%)`;
	}
	function handleReset() {
		if (currentIndex === 0) {
			currentIndex = extendedItems.length - 2 * itemsPerSlide;
			Cards.style.transition = 'none';
			updateTransform();
			void Cards.offsetWidth;
			Cards.style.transition = 'transform 0.5s ease-in-out';
		} else if (currentIndex >= extendedItems.length - itemsPerSlide) {
			currentIndex = itemsPerSlide;
			Cards.style.transition = 'none';
			updateTransform();
			void Cards.offsetWidth;
			Cards.style.transition = 'transform 0.5s ease-in-out';
		}
	}
	prevButton.addEventListener('click', () => {
		// currentIndex-=itemsPerSlide
		currentIndex--;
		updateTransform();
	});
	nextButton.addEventListener('click', () => {
		// currentIndex+=itemsPerSlide
		currentIndex++;
		updateTransform();
	});
	Cards.addEventListener('transitionend', handleReset);
	popuLate(Cards, document.querySelector("template"));
/*
	// OLD
	function moveCarousel(dir){
		switch(dir){
			case "left":
				if (index > 0) {
					index--;
				} else {
					index = totalCards - 1;
				}
			break;
			case "right":
				if (index < totalCards - 1) {
					index++;
				} else {
					index = 0;
				}
			break;
		}
		updateScroll();
		resetAutoScroll();
	}
	Array.from(document.getElementById("carousel").children).forEach(el =>{
		el.addEventListener('click', () => {
			let i = Array.from(event.currentTarget.attributes).findIndex(function(attr) {
				return attr.name == "data-carousel"
			});
			moveCarousel(event.currentTarget.attributes[i].value)
		});
	});
	function updateScroll() {
		const scrollAmount = cardWidth * index;
		container.scroll({
			left: scrollAmount,
			behavior: "smooth",
		});
	}
	
	let index = 0;
	const container = document.querySelector("div[data-content='cards']");
	const cards = container.children;
	const cardWidth = cards[0].offsetWidth + 5;
	const totalCards = cards.length;
	const intervalTime = 3000;
	let autoScroll = setInterval(() => moveCarousel("right"), intervalTime);
	function resetAutoScroll() {
		clearInterval(autoScroll);
		autoScroll = setInterval(() => moveCarousel("right"), intervalTime);
	}

	// popuLate(document.getElementById("projects").querySelector("div[data-content='cards']"), document.getElementsByTagName("template")[0]);
*/
	// Lang Selector
	// Get all custom select elements
	let customSelect = document.getElementById('custom-select');

	let selectSelected = customSelect.querySelector('#language-selected');
	let selectItems = customSelect.querySelector('.select-language');
	let options = selectItems.querySelectorAll('div');

	// Toggle the dropdown visibility when the select box is clicked
	selectSelected.addEventListener('click', function () {
		if (selectItems.style.display === 'block') {
			selectItems.style.display = 'none';
		} else {
			selectItems.style.display = 'block';
		}
	});

	// Set the selected option and hide the dropdown when an option is clicked
	options.forEach(function (option) {
		option.addEventListener('click', function () {
			let i = Array.from(option.attributes).findIndex(function(attr) {
				return attr.name == "data-lang-value"
			});
			cambiarIdioma(option.attributes[i].value);
			selectSelected.innerHTML = option.innerHTML;
			selectItems.style.display = 'none';
		});
	});

	// Close the dropdown if the user clicks outside of it
	window.addEventListener('click', function (e) {
		if (!customSelect.contains(e.target)) {
			selectItems.style.display = 'none';
		}
	});
	// Grab the HTML Lang, then place the correct Option in `selectSelected`.
});