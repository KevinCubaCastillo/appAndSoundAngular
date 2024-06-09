document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('playlistForm');
    const playlistName = document.getElementById('playlistName');
    const playlistDescription = document.getElementById('playlistDescription');
    const formFile = document.getElementById('formFile');

    form.addEventListener('submit', function (event) {
      let errorMessage = '';

      if (!playlistName.value) {
        errorMessage += 'El nombre del álbum es requerido.\n';
      }

      if (!playlistDescription.value) {
        errorMessage += 'La fecha de lanzamiento es requerida.\n';
      }

      if (!formFile.value) {
        errorMessage += 'La portada del álbum es requerida.\n';
      }

      if (errorMessage) {
        alert(errorMessage);
        event.preventDefault();
        event.stopPropagation();
      }
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('playlistForm');
    const songName = document.getElementById('songname');
    const artistName = document.getElementById('Artista');
    const releaseDate = document.getElementById('fdate');
    const formFile = document.getElementById('formFile');

    form.addEventListener('submit', function (event) {
      let errorMessage = '';

      if (!songName.value) {
        errorMessage += 'El nombre de la canción es requerido.\n';
      }

      if (!artistName.value) {
        errorMessage += 'El nombre del artista es requerido.\n';
      }

      if (!releaseDate.value) {
        errorMessage += 'La fecha de lanzamiento es requerida.\n';
      }

      if (!formFile.value) {
        errorMessage += 'Subir la canción es requerido.\n';
      }

      if (errorMessage) {
        alert(errorMessage);
        event.preventDefault();
        event.stopPropagation();
      }
    });
  });