let episodesList = [];
let infoEachEpisode = [];
const urlAPI= "http://www.omdbapi.com/?apikey=f8b76cd6&i=tt0804503&Season=7";
const overlay = document.querySelector('.overlay');
const modularContainer = document.querySelector('.modular-content');
const container = document.querySelector('.list-episodes');


//----------------------------------------------------------------------------------
// FETCH FUNCTIONS 
//----------------------------------------------------------------------------------

fetch(urlAPI)
	.then(response => response.json())
	    .then(response => console.log(response.Episodes))
    // .then(response => response.Episodes)
    .then(displayEpisodeList)
    .catch(err => {
        container.innerHTML = '<h3>Something went wrong!</h3>';
        console.log(err);
      })

// function getEachEpisode() {
// 	episodesList = episodesData;
// 	console.log(episodesList);
// }


function displayEpisodeList(episodesData) {
	episodesList = episodesData;
	// console.log(episodesList);

	let episodeHTML = '';
		console.log(episodesList);

	episodesList.forEach((episode, index) => {
		let episodeNumber = episode.Episode;
		let episodeTitle = episode.Title;
		let episodeID = episode.imdbID;
		// console.log(episodeID);


		// fetch('http://www.omdbapi.com/?apikey=f8b76cd6&i='+episodeID)
		// 	.then(response => response.json())
		// 	.then(response => console.log(response))
  //   		.then(getInfoEachEpisode)
  //   		.catch(err => {
  //       	container.innerHTML = '<h3>Something went wrong!</h3>';
  //       	console.log(err);
  //     	})
		
		// function getInfoEachEpisode(episode) {
		// 	infoEachEpisode = episode;
			// console.log(infoEachEpisode.Plot);
			episodeHTML += `
					<div class="episode" data-index="${index}">
						<div>
							<div>
								<img class="thumbnail" src="img/ep${index+1}.jpg" alt="${episodeTitle}">
							</div>
							<div class="episodeNumberSquare"><span>${index+1}</span></div>
						</div>
						<h3>${episodeTitle}</h3>
						<p>${infoEachEpisode.Plot}</p>

					</div>
				`
		container.innerHTML = episodeHTML;
		})

}

	

// <p>${episodeDescription}</p>

//----------------------------------------------------------------------------------
// SLIDE LIST OF EPISODES
//----------------------------------------------------------------------------------

// const arrowNext = document.querySelector('.arrows-next');
// const arrowPrev = document.querySelector('.arrows-prev');

// function slideNext() {

// 	arrowPrev.classList.remove('is-disabled');

// }

// arrowNext.addEventListener("click", slideNext);
// console.log(container);


//----------------------------------------------------------------------------------
// SHOW DETAILS EPISODES MODULAR BOX
//----------------------------------------------------------------------------------

function displayModular(index) {

	let { Title,  } =episodesList[index];

}