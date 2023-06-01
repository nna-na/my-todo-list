const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTBhNmY2MGU3NmIwYWFhYTAzY2IwNDE2MmNmNDU3MCIsInN1YiI6IjY0NzUwNTk0OTI0Y2U2MDBiZmQzZDFkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KDpz8MGGX4Efumq1C0YTOqxMZuQ0LW_tupoawKP41nQ",
  },
};

//-------------------------------------------------------------------------------------기본 화면
let movies;
let filterArray = [];
fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", // fetch가 이 url을 서버에게 요청
  options
)
  .then((response) => response.json()) // 요청이 끝나면 response객체를 입력값으로 주면서 json값을 저장
  .then((response) => {
    movies = response["results"];
    movies.forEach((data) => {
      // TMDB json 배열 값에서 필요한 데이터 가져오기 위한 forEach
      let title = data.title;
      let overview = data.overview;
      let poster_path = data.poster_path;
      let vote_average = data.vote_average;
      let id = data.id;
      let img_url = `https://image.tmdb.org/t/p/w300${poster_path}`;

      let temp_html = ``;
      temp_html = `
            <div class="movie-card" onclick="alert('영화 id: ${id}')">
              <div class="movie-img">
                <img src="${img_url}" />
              </div>
              <p>${title}</p>
              <p>${overview}</p>
              <p>${vote_average}</p>
            </div>
            `;
      document.getElementById("movie").innerHTML += temp_html;
    });

    // ------------------------------------------------------------------------검색하면 필터를 통해 검색한것만 뜨게 함
    function filterMovies(movieTitle) {
      filterArray = movies.filter((item) =>
        item.title.toLowerCase().includes(movieTitle)
      );

      document.getElementById("movie").innerHTML = "";
      filterArray.forEach((data) => {
        let title = data.title;
        let overview = data.overview;
        let poster_path = data.poster_path;
        let vote_average = data.vote_average;
        let id = data.id;
        let img_url = `https://image.tmdb.org/t/p/w300${poster_path}`;
        let temp_html = ``;
        temp_html = `
            <div class="movie-card" onclick="alert('영화 id: ${id}')">
              <div class="movie-img">
                <img src="${img_url}" />
              </div>
              <p>${title}</p>
              <p>${overview}</p>
              <p>${vote_average}</p>
            </div>
            `;
        document.getElementById("movie").innerHTML += temp_html;
      });
    }

    //----------------------------------------------------------------------------------------버튼 누르면 호출
    const searchInput = document.querySelector("#search-form input");
    const searchButton = document.querySelector("#search-form button");

    function btnClick() {
      // 입력한 영화제목을 가져올 btnClick
      let movieTitle = searchInput.value.toLowerCase().trim(); // 입력한 input값을 넣어줌
      if (movieTitle === "") {
        alert("영화 제목을 입력해주세요!");
      } else {
        filterMovies(movieTitle); // 위에서 필터링 된 영화 호출
      }
    }
    searchButton.addEventListener("click", btnClick); // 버튼 클릭시 위에서 필터링 해온 값을 호출
  })

  .catch((err) => console.error(err));
