//SEARCH FUNCTION
const search = () => {
  //DOM ELEMENTS
  //SEARCH BTN
  const searchTitle = document.getElementById("button-search");
  //Input
  const searchField = document.getElementById("searchField").value;
  //Results
  const artist = document.getElementById("eminem");
  const albums = document.getElementById("eminemSection");
  const albumText = document.getElementById("albums-title");
  const albumSongs = document.getElementById("album-songs");

  //MODAL
  const modal = document.getElementById("btn-modal");
  // MODAL TABLE ELEMENTS
  const tableBody = document.getElementById("table-body");

  //API
  const API_URL = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchField
    .toLowerCase()
    .replace(/ /g, "-")}`;
  console.log(API_URL);

  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let newSearch = false;
      //Filter Artists as per search and save it in an array
      const filteredArtists = [];
      const filteredArtistsPictures = [];
      const filteredArtistAlbums = [];
      const filteredArtistAlbumsPictures = [];
      data.data.forEach((result) => {
        if (!filteredArtists.includes(result.artist.name)) {
          filteredArtists.push(result.artist.name);
        }
        if (!filteredArtistsPictures.includes(result.artist.picture_big)) {
          filteredArtistsPictures.push(result.artist.picture_big);
        }
        if (!filteredArtistAlbums.includes(result.album.title)) {
          filteredArtistAlbums.push(result.album.title);
        }
        if (!filteredArtistAlbumsPictures.includes(result.album.cover_big)) {
          filteredArtistAlbumsPictures.push(result.album.cover_big);
        }
      });

      console.log(filteredArtistAlbums);

      //Remove .d-none from 'content'
      artist.classList.remove("d-none");
      albumText.classList.remove("d-none");
      tableBody.innerHTML = "";
      //Loop through the filtered queries of artists
      if (filteredArtists.length === 1) {
        for (let i = 0; i < filteredArtistAlbumsPictures.length; i++) {
          albums.innerHTML += `<div class='col text-center p-3 mb-3 mr-3 rounded album-card'>
                                <a href="#album-songs" class="text-primary"> 
                                  <img src='${filteredArtistAlbumsPictures[i]}' class='w-100 rounded' alt='Album title: ${data.data[i].album.title}'>
                                  <h5 class='mb-4 mt-3'> ${data.data[i].title} </h5>
                                </a>
                                <span class="text-secondary"> • ${data.data[i].album.type} </span>
                              </div>`;
        }

        for (let i = 0; i < filteredArtists.length; i++) {
          artist.innerHTML += `<div class='col-4 text-center mb-3'>
                                <img src='${filteredArtistsPictures[0]}' class='w-100 rounded-circle' alt='Artist name ${data.data[0].artist.name}'>     
                                <h3 class='mb-5 mt-3'> ${filteredArtists[0]} </h3>
                                </div>`;
        }
      } else {
        albumText.classList.add("d-none");
        for (let i = 0; i < filteredArtists.length; i++) {
          artist.innerHTML += `<div class='col-3 text-center mb-3'>
                                <a href="#album-songs" >
                                  <img src='${filteredArtistsPictures[i]}' class='w-100 rounded-circle' alt='Artist name: ${data.data[i].artist.name}'>     
                                  <h3 class='pb-4'> ${filteredArtists[i]} </h3>
                                </a> 
                              </div>`;
        }
      }
      //MODAL ELEMENTS
      for (let i = 0; i < filteredArtistAlbums.length; i++) {
        const tableRow = document.createElement("tr");
        const tableHead = document.createElement("th");
        const tableData = document.createElement("td");

        tableBody.appendChild(tableRow).appendChild(tableHead).innerText =
          i + 1;

        tableRow.appendChild(tableData).innerText = filteredArtistAlbums[i];
      }
    })
    .catch((err) => console.log(err));

  artist.innerHTML = "";
  albums.innerHTML = "";
};

window.addEventListener("load", search);