document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.getElementById('searchForm');
  const searchResults = document.getElementById('searchResults');

  searchForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(searchForm);
    const query = formData.get('q');

    fetch('/search?q=' + encodeURIComponent(query))
      .then(response => response.json())
      .then(data => {
        searchResults.innerHTML = '';

        if (!data.results || data.results.length === 0) {
          searchResults.innerHTML = '<p>No results found.</p>';
          return;
        }

        const ul = document.createElement('ul');
        ul.classList.add('list-group');

        data.results.forEach(track => {
          const li = document.createElement('li');
          li.classList.add('list-group-item', 'bg-dark', 'text-white');

          li.innerHTML = `<a href="${track.url || '#'}" class="text-white text-decoration-none">
                            <strong>${track.title}</strong> — ${track.artist}
                          </a>`;
          ul.appendChild(li);
        });

        searchResults.appendChild(ul);
      })
      .catch(err => {
        searchResults.innerHTML = '<p>Error loading results.</p>';
        console.error(err);
      });
  });
});
