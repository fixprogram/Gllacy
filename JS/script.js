	var formLink = document.querySelector(".adress__btn");
	var formShow = document.querySelector(".site__form--popup_overlay");
	var close = document.querySelector(".btn-close-popup");
	var siteWrapper = document.querySelector(".site-wrapper");

	formLink.addEventListener("click", function(event){
		event.preventDefault();
		formShow.classList.add("site__form--popup_overlay-show");
	});

	close.addEventListener("click", function(event){
		event.preventDefault();
		formShow.classList.remove("site__form--popup_overlay-show");
	});

	window.addEventListener("keydown", function(event){
		if(event.keyCode===27){
			if(formShow.classList.contains("site__form--popup_overlay-show")){
				formShow.classList.remove("site__form--popup_overlay-show");
			}
		}
	});

///////////// MAP ///////////////// MAP ///////////// MAP ///////////// MAP ///////////// MAP ///////////// 

ymaps.ready(init);

function init() {
var myMap = new ymaps.Map("map", {
center: [59.938979223084836,30.329105563537592],
zoom: 16,
controls: [] // Delete Controls
}, {}),

// Adding a pin 

myGeoObject = new ymaps.GeoObject({}, {}),
myPieChart = new ymaps.Placemark([
59.93864421465666,30.323254655100822
], {}, {
        iconLayout: 'default#image',
        iconImageHref: '../Site/Images/SVG/pin.svg',
        iconImageSize: [80, 142],
        iconImageOffset: [-60, -122]
});

myMap.geoObjects
.add(myPieChart);
}