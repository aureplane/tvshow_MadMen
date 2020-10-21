let episodesList = [];
let infoEachEpisode = [];
const urlAPIMadMen = "http://www.omdbapi.com/?apikey=f8b76cd6&i=tt0804503";
const urlAPISeason= "http://www.omdbapi.com/?apikey=f8b76cd6&i=tt0804503&Season=7";
const modularContainer = document.querySelector('.modular-content');
const container = document.querySelector('.list-episodes');
const containerDesc = document.querySelector('.plot');
const overlay = document.querySelector('.overlay');
const arrows = document.querySelector('.arrows');



//----------------------------------------------------------------------------------
// FETCH FUNCTIONS 
//----------------------------------------------------------------------------------
fetch(urlAPIMadMen)
	.then(response => response.json())
	.then(response => response.Plot)
    .then(displayPlotMadMen)
    .catch(err => {
        container.innerHTML = '<h3>Something went wrong!</h3>';
        console.log(err);
      })


fetch(urlAPISeason)
	.then(response => response.json())
	.then(response => response.Episodes)
    .then(displayEpisodeList)
    .catch(err => {
        container.innerHTML = '<h3>Something went wrong!</h3>';
        console.log(err);
      })

// function getEachEpisode() {
// 	episodesList = episodesData;
// 	console.log(episodesList);
// }
function displayPlotMadMen(plotData) {
	let plotHTML = '';
	plotHTML += `${plotData}`
	containerDesc.innerHTML = plotHTML;
	}


function displayEpisodeList(episodesData) {
	episodesList = episodesData;
	let episodeIDarray = [];

	episodesList.forEach((episode, index) => {
	episodeIDarray.push(episode.imdbID);
	})

		// for (let i=0; i<episodeIDarray.length; i++) {
		// 	let URL = "http://www.omdbapi.com/?apikey=f8b76cd6&i="+episodeIDarray[i];
		// 	episodeIDURL.push(URL);
		// }
		// console.log(episodeIDURL);


		//----------------------------------------------------------------------------------
		// Await Function
		//----------------------------------------------------------------------------------
	let promises=[];

	const fn = async() => {
	for (let i=0; i<episodeIDarray.length; i++) {
   		promises.push(
      	fetch('http://www.omdbapi.com/?apikey=f8b76cd6&i=' + episodeIDarray[i])
      	.then(response => response.json())
    	)
		}

  		await Promise.all(promises).then(data => {
  			infoEachEpisode = data;
    	let episodeHTML = '';
    		data.forEach((episode, index) => {
				let episodeNumber = episode.Episode;
				let episodeTitle = episode.Title;
				let episodePlot = episode.Plot;

				let x = window.matchMedia("(max-width: 700px)")
				
					if (x.matches) { // If media query matches
						episodeHTML += `
						<div class="episode" data-index="${index}">
							<div>
								<div>
									<img class="thumbnail" src="img/ep${index+1}.jpg" alt="${episodeTitle}">
								</div>
								<div class="episodeNumberSquare"><p>${index+1}</p></div>
							</div>
							<h3>${episodeTitle}</h3><div class=smallInfosRight>
							<svg width="28px" height="28px" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
								<title>Shape</title>
								<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
									<g id="Home" transform="translate(-1314.000000, -579.000000)">
										<g id="Episode-info-sidebar" transform="translate(926.000000, -2.000000)">
											<rect id="Rectangle-3" fill="#000000" x="1" y="2" width="513" height="832"></rect>
											<polygon id="Shape" fill="#EFD358" fill-rule="nonzero" points="402 581.69229 406.323632 590.453491 415.992335 591.858721 408.996168 598.677985 410.647263 608.30771 402 603.761201 393.352737 608.30771 395.003832 598.677985 388.007665 591.858721 397.676368 590.453491"></polygon>
										</g>
									</g>
								</g>
							</svg>
							<p><span style='font-family:HelveticaNeue-Bold'>${episode.imdbRating}</span>/10</p>
						</div>
							<p class="episodes-plot">${episodePlot}</p>
							
						</div>
					`
					} else {
						episodeHTML += `
						<div class="episode" data-index="${index}">
							<div>
								<div class="thumb-div">
									<img class="thumbnail" src="img/ep${index+1}.jpg" alt="${episodeTitle}">
								</div>
								<div class="episodeNumberSquare"><p>${index+1}</p></div>
							</div>
							<h3>${episodeTitle}</h3>
							<p class="episodes-plot">${episodePlot}</p>

						</div>
					`
					}
			})
				
				container.innerHTML = episodeHTML;
		})
  	}
		
	
		fn();	
}


window.addEventListener("load",
function() {
	setTimeout(function(){
		container.classList.add("active");
	}, 1000);
});


// function changeOpacity(index) {
// 	!index
	// if (episodesIMG.classList.contains('thumb-active')) {
	// 	episodesIMG.classList.remove('thumb-active');
	// }
	// episodesIMG.classList.add('thumb-active');
	 // else () {

	 // }

// }	const episodesIMG = document.querySelectorAll('.thumbnail');



//----------------------------------------------------------------------------------
// SHOW DETAILS EPISODES MODULAR BOX
//----------------------------------------------------------------------------------

function displayModular(index) {
	let { Title, Released, imdbRating, Plot} = infoEachEpisode[index];
	const modularHTML = `
		<div class=content-item-modal>
				<div class="big-picture"><img src="img/ep${index+1}_big.jpg" alt="${Title}">
				</div>
				<div class="info-details-episode">
					<div class="smallInfosEpisode">
						<div class=smallInfosLeft>
							<p>Episode ${index+1} - ${Released}</p>
						</div>
						<div class=smallInfosRight>
							<svg width="28px" height="28px" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
							<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
								<g id="Home" transform="translate(-1314.000000, -579.000000)">
									<g id="Episode-info-sidebar" transform="translate(926.000000, -2.000000)">
										<rect id="Rectangle-3" fill="#FFFFFF" x="1" y="2" width="513" height="832"></rect>
										<polygon id="Shape" fill="#EFD358" fill-rule="nonzero" points="402 581.69229 406.323632 590.453491 415.992335 591.858721 408.996168 598.677985 410.647263 608.30771 402 603.761201 393.352737 608.30771 395.003832 598.677985 388.007665 591.858721 397.676368 590.453491"></polygon>
									</g>
								</g>
							</g>
							</svg>
							<p><span style='font-family:HelveticaNeue-Bold'>${imdbRating}</span>/10</p>
						</div>
						
							
					</div>
					<div class="smallInfosEpisodeSecondLine">
						<h3>${Title}</h3>
						<p>${Plot}</p>
					</div>



				</div>
	       		
	    </div>
	`;
	overlay.classList.remove("hidden");
	arrows.style.right = "490px";
	modularContainer.innerHTML = modularHTML;
}


//----------------------------------------------------------------------------------
// HIDE DETAILS EPISODES MODULAR BOX
//----------------------------------------------------------------------------------

overlay.addEventListener('click', (e) => {
	overlay.classList.add("hidden");
	arrows.style.right = "30px";
})






container.addEventListener('click', (e) => {
	const episodeBox = e.target.closest(".episode");
    index = parseInt(episodeBox.getAttribute('data-index'));

		//----------------------------------------------------------------------------------
		// Change opacity pictures on click
		//----------------------------------------------------------------------------------


	let images = document.querySelectorAll('.thumbnail');
	if (e.target.classList.contains('thumb-disabled')) {
		// console.log(event.target.value);
		for (let i=0; i<images.length;i++) {
			if (images[i].classList.contains('thumb-active')) {
				// images[i].style.opacity="0.4";
				images[i].classList.remove('thumb-active');
				images[i].classList.add('thumb-disabled');

			}
		}
		e.target.classList.add('thumb-active');
		e.target.classList.remove('thumb-disabled');
		

		// for (let i=0; i<images.length;i++) {
		// if (!images[i].classList.contains('thumb-active')) {
		// 	// images[i].style.opacity="0.4";
		// 	images[i].classList.add('thumb-disabled');

		// }}

	} else {
	e.target.classList.add('thumb-active');
		for (let i=0; i<images.length;i++) {
			if (!images[i].classList.contains('thumb-active')) {
				// images[i].style.opacity="0.4";
				images[i].classList.add('thumb-disabled');

			}
		}	

	}

	let x = window.matchMedia("(min-width: 768px)")		
	if (x.matches) { // If media query matches
	displayModular(index);
	}

})


