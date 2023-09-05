const API_KEY = '2a800e1bb3594dfe8b4e82d84da58810';
const NUMBER_OF_MOVIES = 12;
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('searchbtn');
const posterContainers = document.querySelectorAll('.posterbox');
const plotElement = document.querySelector('.plot');

document.addEventListener("DOMContentLoaded", () => {
  fetchRandomMovies();

  searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
      searchAndDisplayMovies(query);
    }
  });
});

async function fetchRandomMovies() {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`);
    const data = await response.json();
    const randomMovies = getRandomMovies(data.results, NUMBER_OF_MOVIES);
    displayMovies(randomMovies);
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

async function searchAndDisplayMovies(query) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`);
    const data = await response.json();
    const searchResults = data.results.slice(0, NUMBER_OF_MOVIES);
    displayMovies(searchResults);
  } catch (error) {
    console.error('Error searching movies:', error);
  }
}

function getRandomMovies(movies, count) {
  const shuffledMovies = movies.sort(() => 0.5 - Math.random());
  return shuffledMovies.slice(0, count);
}

function displayMovies(movies) {
  posterContainers.forEach((posterContainer, index) => {
    const posterElement = posterContainer.querySelector('.poster');
    const nameElement = posterContainer.querySelector('.name');
    const ratingElement = posterContainer.querySelector('.rating');

    const movie = movies[index];
    const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'placeholder.jpg';
    posterElement.src = posterPath;
    nameElement.textContent = movie.title;
    ratingElement.textContent = movie.vote_average;

    let timeout;
    posterContainer.addEventListener('mouseenter', () => {
      timeout = setTimeout(() => {
        plotElement.textContent = movie.overview; 
        $(".plot").animate({top: "10vh"}, 800);
      }, 2100);
    });

    posterContainer.addEventListener('mouseleave', () => {
      clearTimeout(timeout);
      $(".plot").animate({top: "-20vh"}, 800);
    });
  });
}
