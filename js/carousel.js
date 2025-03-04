document.addEventListener("DOMContentLoaded", function () {
	const container = document.querySelector(".mainContainerCarouselFinal");
	const slides = document.querySelectorAll(".slideTemplate");
	const prevBtn = document.querySelector(".controlerFinalCarousel div:nth-child(1)");
	const nextBtn = document.querySelector(".controlerFinalCarousel div:nth-child(2)");

	let index = 0;
	const totalSlides = slides.length;
	const slideWidth = slides[0].offsetWidth + 20; // Ancho del slide + margen
	const intervalTime = 3000; // Tiempo en milisegundos (3s)

	// Función para mover el carrusel manualmente
	function updateScroll() {
		const scrollAmount = slideWidth * index;
		container.scroll({
			left: scrollAmount,
			behavior: "smooth",
		});
	}

	// Botón siguiente
	nextBtn.addEventListener("click", () => {
		if (index < totalSlides - 1) {
			index++;
		} else {
			index = 0; // Reinicia al inicio si está en el último
		}
		updateScroll();
		resetAutoScroll(); // Reinicia el autoscroll al hacer clic
	});

	// Botón anterior
	prevBtn.addEventListener("click", () => {
		if (index > 0) {
			index--;
		} else {
			index = totalSlides - 1; // Vuelve al final si está en el primero
		}
		updateScroll();
		resetAutoScroll(); // Reinicia el autoscroll al hacer clic
	});

	// Función para el autoscroll automático
	function moveCarousel() {
		if (index < totalSlides - 1) {
			index++;
		} else {
			index = 0; // Reinicia al inicio si está en el último
		}
		updateScroll();
	}

	// Inicia el autoscroll
	let autoScroll = setInterval(moveCarousel, intervalTime);

	// Función para reiniciar el autoscroll cuando el usuario usa los botones
	function resetAutoScroll() {
		clearInterval(autoScroll);
		autoScroll = setInterval(moveCarousel, intervalTime);
	}
});
