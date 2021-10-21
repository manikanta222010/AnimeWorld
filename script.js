document.body.innerHTML = `

<section class="container">
  <div class="home">
    <button class="btn-grad" onClick="getPopularAnimes()" type="submit"><i class="fas fa-home"></i></button>
  </div>
  <div class="space">
    <p class="page-title">THE <span>ANIME</span> WORLD</p>
  </div>
  <div class="col search-container"> 
    <form onsubmit="return false">
      <input type="text" placeholder="&#xF002;  Search" style="font-family:Arial, FontAwesome" minlength="3"> 
      <button class="btn-grad search" onClick="getSearchedAnimes()" type="submit"><i class="fas fa-search"></i> Search</button>
    </form>
  </div>
  <div class="row" id="anime-list">

  </div>
</section>
`
// Above section with bootstrap class container is appended to body of HTML. It contains home button, search bar, list of anime.
// Search is present in form tag which helps to get data even with pressing of enter, not just only by mouse click.
// Home button adn search box sticks to top when page gets scrolled

// getPopularAnimes is async function which fetches the 12 animes from API which has higest ratings and convert it to JSON. Next it appends that JSON data to div with id="anime-list" 
// This function also containes a "Modal" which pops up when an poster of Anime was clicked. This modal holds anime poster, title, start-date, end-date, type and score.
// anime?q=&order_by=score&sort=desc&page=1&limit=12 in URL helps to get top 12 rated animes in desending order
async function getPopularAnimes() {
  var data = await fetch(`https://api.jikan.moe/v3/search/anime?q=&order_by=score&sort=desc&page=1&limit=12`,
    { method: "GET" })
  const animes = await data.json()

  document.querySelector('input[type=text]').value = "" //Clears text in input field if present
  var count = 0  //count variable is used to take track of animes which will be later used inside modal(used as an ID)
  const animeContainter = document.querySelector("#anime-list")  // Here div with id="anime-list" is selected later required anime list will be append to it
  animeContainter.innerHTML = "<h2>Top Rated</h2>";
  animes.results.forEach((anime) => {
    animeContainter.innerHTML += `

      <!-- This modal for animes -->
      <div class="modal fade" id="animeModal${count}" tabindex="-1" aria-labelledby="animeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content custom-modal">
            <div class="modal-header">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="row modal-body">
            <div class="col-12 col-sm-7">
              <img class="modal-poster" src="${anime.image_url}" alt=${anime.title}/> 
            </div>
            <div class="col-12 col-sm-5 modal-p">
              <h4 class="anime-title">${anime.title}</h4>
              <p class="start-end"><b>Start Date: </b> ${anime.start_date.substr(0, 10)}</p>
              <p class="start-end"><b>End Data: </b>${anime.end_date.substr(0, 10)}</p>
              <p class="start-end"><b>Type: </b>${anime.type}</p>
              <p class="start-end"><b>IMDB: </b>${anime.score} <i class="fas fa-star"></i></p>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
          </div>
        </div>
      </div>

        <div class="col-12 col-sm-6 col-md-4 col-lg-3 block">
            <div class="card anime-card" >
              <a data-bs-toggle="modal" data-bs-target="#animeModal${count++}"><img class="poster" src="${anime.image_url}" alt=${anime.title} /></a>
              <h5 class="anime-title">${anime.title}</h5>
            </div>
        </div>
        `
  })
}
getPopularAnimes()


// getSearchedAnimes is function which is used to fetch the searched animes from API when input was of atleast of 3 characters, otherwise it displays an Error.
// ${document.querySelector('input[type=text]').value} in URL helps to get animes which contains text which we give as input in their title .
async function getSearchedAnimes() {
  if (document.querySelector('input[type=text]').value.length > 2) {
    var data = await fetch(`https://api.jikan.moe/v3/search/anime?q=${document.querySelector('input[type=text]').value}`,
      { method: "GET" })
    const animes = await data.json()

    var count = 0  //count variable is used to take track of animes which will be later used inside modal(used as an ID)
    const animeContainter = document.querySelector("#anime-list")  // Here div with id="anime-list" is selected later required anime list will be append to it
    animeContainter.innerHTML = ""
    animes.results.forEach((anime) => {
      animeContainter.innerHTML += `

      <!-- This modal for animes -->
        <div class="modal fade" id="animeModal${count}" tabindex="-1" aria-labelledby="animeModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content custom-modal">
              <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="row modal-body">
                <div class="col-12 col-sm-7">
                <img class="modal-poster" src="${anime.image_url}" alt=${anime.title}/> 
              </div>
              <div class="col-12 col-sm-5 modal-p">
                <h4 class="anime-title">${anime.title}</h4>
                  <p class="start-end"><b>Start Date: </b> ${anime.start_date.substr(0, 10)}</p>
                  <p class="start-end"><b>End Data: </b>${anime.end_date.substr(0, 10)}</p>
                  <p class="start-end"><b>Type: </b>${anime.type}</p>
                  <p class="start-end"><b>IMDB: </b>${anime.score} <i class="fas fa-star"></i></p>
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-6 col-md-4 col-lg-3 block">
        <a data-bs-toggle="modal" data-bs-target="#animeModal${count++}"><img class="poster" src="${anime.image_url}" alt=${anime.title} /></a>
            <h5 class="anime-title">${anime.title}</h5>
        </div>
        `
    })
  }
  else {  // This displays error when entered characters counts is less than 3
    const animeContainter = document.querySelector("#anime-list")
    animeContainter.innerHTML = ""
    animeContainter.innerHTML = `<h2>Enter atleast 3 characters</h2>`
  }
}


