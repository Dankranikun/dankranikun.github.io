// Añadir una escucha de evento "DOMContentLoaded" que ejecuta una función "vacia" - Sé que tiene un nombre este tipo de funciones sin nombres pero bueno.
// DOMContentLoaded = Cuando todo el contenido del web se haya cargado.
document.addEventListener("DOMContentLoaded", function () {
	/*
		Funcion para cambiar el atributo LANG de `HTML`.
		Aquí irá toda la lógica de cambio de idioma.
		Se podría hacer con JSON y que cambie los textos y ya.
	*/
	function cambiarIdioma(lang) {
		document.documentElement.lang = lang;
	}
	// Función para llenar las cartas. Coge el objeto extendedItems y crea una carta para cada elemente basandose en un lugar donde poner la carta final, y un template designado.
	function popuLate(place, element) {
		place.innerHTML = "";
		extendedItems.forEach((el) => {
			const newEl = element.content.cloneNode(true);
			newEl.querySelector("a").setAttribute("href", el.href);
			newEl.querySelector("h2").textContent = el.title;
			newEl.querySelector("p").textContent = el.text;
			newEl
				.querySelector("img")
				.setAttribute("src", `assets/img/${el.img.src}`);
			newEl.querySelector("img").setAttribute("alt", el.img.alt);
			newEl.querySelector("img").setAttribute("title", el.img.title);
			place.appendChild(newEl);
		});
		updateTransform();
	}

	// Carousel
	const Carousel = document.getElementById("carousel");
	const Cards = Carousel.children[0];
	const prevButton = Carousel.children[1];
	const nextButton = Carousel.children[2];
	const items = [
		{
			href: "https://github.com/Dankranikun/SGEProyectoFinal",
			title: "Seguimiento guardias profesores",
			text: "Módulo de Odoo desarrollado para facilitar el seguimiento de qué profesores cubren las faltas de qué grupos.",
			img: {
				src: "Odoo_icon.png",
				alt: "Logo de Odoo",
				title: "",
			},
		},
		{
			href: "https://github.com/Dankranikun/AchievementTrackerApp",
			title: "Achievement Tracker",
			text: "Una aplicación para Android/iOS para el seguimiento de logros de videojuegos en distintas plataformas.",
			img: {
				src: "achievement.webp",
				alt: "",
				title: "",
			},
		},
		{
			href: "https://github.com/Dankranikun/Repentance_Dungeon",
			title: "Repentance Dungeon",
			text: "Videojuego rogue-lite, top-down shooter, acción, fantasía multiplataforma.",
			img: {
				src: "godot.png",
				alt: "Imagen promocional del videojuego",
				title: "",
			},
		},
		{
			href: "https://github.com/Dankranikun/Acceso-a-datos",
			title: "Repositorio de Acceso a Datos",
			text: "Casi todos los proyectos del módulo Acceso a Datos del curso.",
			img: {
				src: "database.png",
				alt: "",
				title: "",
			},
		},
		{
			href: "https://github.com/Dankranikun/U4SitioWeb",
			title: "Sitio web añejo",
			text: "Sitio web desarrollado en 2020 para clase de 'Aplicaciones web'.",
			img: {
				src: "html-5.png",
				alt: "",
				title: "",
			},
		},
	];
	const itemsPerSlide = 5;
	/*
		Los últimos 5 items, los items y los primeros 5 items.
		En tu lista es oslo tu lista 3 veces porque son 5 items.
		¿Por qué?
		Genera una sensación falsa de movimiento ciclico.Cuando pasas al primere o último conjunto, vuelves al conjunto del centro. Esto es para hacer la animación con translateX.
		e1 e2 e3 e4 e5 - e1 e2 e3 e4 e5 - e1 e2 e3 e4 e5 <- Representación de lo que estarías viendo en pantalla.
	*/
	const extendedItems = [
		...items.slice(-itemsPerSlide),
		...items,
		...items.slice(0, itemsPerSlide),
	];

	/*
		Establece en que conjunto estás. ( Me gustaría pensar en una mejor manera, pero se realizará más adelante ). De momento, el indice marca donde estoy posicionado - en vez del conjunto en el que me encuentro, siendo 0-(N/Slides)-(N/Slides)+1 la mejor opción.
	*/
	let currentIndex = itemsPerSlide;

	/*
		Actualiza el "movimiento circular".
		Desplaza el elemento Cards X porcentaje para un lado u otro dependiendo del botón clickeado.
	*/
	function updateTransform() {
		const offset = -currentIndex * (100 / itemsPerSlide);
		Cards.style.transform = `translateX(${offset}%)`;
	}
	/*
		Función para restablecer falsamente las cartas y que no haga un salto para que parezca circular.
		Desactiva o activa la transformación dependiendo de si ha llegado al tope o no.
		TODO: Corregirlo, porque no hace la vuelta correctamente.
	*/
	function handleReset() {
		if (currentIndex === 0) {
			currentIndex = extendedItems.length - 2 * itemsPerSlide;
			Cards.style.transition = "none";
			updateTransform();
			void Cards.offsetWidth;
			Cards.style.transition = "transform 0.5s ease-in-out";
		} else if (currentIndex >= extendedItems.length - itemsPerSlide) {
			currentIndex = itemsPerSlide;
			Cards.style.transition = "none";
			updateTransform();
			void Cards.offsetWidth;
			Cards.style.transition = "transform 0.5s ease-in-out";
		}
	}
	// EventLister de Click en los Botones.
	prevButton.addEventListener("click", () => {
		// currentIndex-=itemsPerSlide <-- This is a Test
		currentIndex--;
		updateTransform();
	});
	nextButton.addEventListener("click", () => {
		// currentIndex+=itemsPerSlide
		currentIndex++;
		updateTransform();
	});
	// Añade una escucha en la transición, para ver si ha de restablecer, o no, las cartas.
	Cards.addEventListener("transitionend", handleReset);
	// Rellena Cards, con el template - Solo hay uno, así que con querySelector va bien. Podría usarse querySelectorAll(...)[0].
	popuLate(Cards, document.querySelector("template"));

	// Lang Selector
	// Get all custom select elements
	let customSelect = document.getElementById("custom-select");

	let selectSelected = customSelect.querySelector("#language-selected");
	let selectItems = customSelect.querySelector(".select-language");
	let options = selectItems.querySelectorAll("div");

	// Toggle the dropdown visibility when the select box is clicked
	selectSelected.addEventListener("click", function () {
		if (selectItems.style.display === "block") {
			selectItems.style.display = "none";
		} else {
			selectItems.style.display = "block";
		}
	});

	// Set the selected option and hide the dropdown when an option is clicked
	options.forEach(function (option) {
		option.addEventListener("click", function () {
			// Transforma los atributos de option - elemento a seleccionar del recuadro de idioma - en una matriz, para que devuelva el indice del atributo con nombre tal, para obtener el valor de idioma y cambiar la web.
			let i = Array.from(option.attributes).findIndex(function (attr) {
				return attr.name == "data-lang-value";
			});
			cambiarIdioma(option.attributes[i].value);
			selectSelected.innerHTML = option.innerHTML;
			selectItems.style.display = "none";
		});
	});

	// Close the dropdown if the user clicks outside of it
	window.addEventListener("click", function (e) {
		if (!customSelect.contains(e.target)) {
			selectItems.style.display = "none";
		}
	});
	// Grab the HTML Lang, then place the correct Option in `selectSelected`.
});
