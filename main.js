const api = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const imgPath = "https://image.tmdb.org/t/p/w1280";
const SearchApi = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const Main = document.querySelector("main");
const form = document.querySelector("form");
const search = document.querySelector("#search");

// CALL FUNCTION STARTING 20 MOVIES 
getMovies(api)
    // GET MOVIES INFO  
async function getMovies(url) {
    const getApi = await fetch(url);
    const jsonData = await getApi.json();
    showMovies(jsonData.results)
}
// SHOW MOVIES 
function showMovies(move) {
    if (move.length <= 0) {
        Main.innerHTML = "<div class='results'><lottie-player src='https://assets2.lottiefiles.com/packages/lf20_hGR0uS.json' background='transparent' speed='1' style='width: 400px; height: 400px;' loop autoplay></lottie-player><br><h1>Result is Not Found</h1></div>";
    } else {
        Main.innerHTML = "";
        move.forEach(movie => {
            const { poster_path, title, vote_average, overview, backdrop_path } = movie
            const moveEl = document.createElement("div");
            moveEl.classList.add("movies");
            moveEl.innerHTML = `   
                                <img src="${imgPath+poster_path}" alt="${title}">
                                <div class="movies-info">
                                    <h1>${title}</h1>
                                    <span class="${getClassRate(vote_average)}">${vote_average}</span>
                                </div>
                                <div class="overView">
                                <h1>${title}</h1>
                                 <img src="${imgPath+ backdrop_path}" alt="${title}">
                                ${overview}</div>
                            `
            if (poster_path == null) {
                moveEl.classList.add("display");
            }
            Main.appendChild(moveEl)
        });
    }
}

// SHOW MOVIES RATTING COLOR 
function getClassRate(vote) {
    if (vote >= 8) {
        return "green"
    } else if (vote >= 5) {
        return "orange"
    } else {
        return "red"
    }
}

// SEARCH MOVIES NAME 
form.addEventListener("submit", function(e) {
    e.preventDefault();
    const searchTeam = search.value;
    getMovies(SearchApi + searchTeam);
})