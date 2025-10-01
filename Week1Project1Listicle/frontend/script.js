const trackList = document.getElementById("track-list");

async function loadTracks() {
    try {
        const response = await fetch("http://localhost:3000/tracks");
        const tracks = await response.json();

        trackList.innerHTML = ""; // clear old items

        tracks.forEach(track => {
            const li = document.createElement("li");
            li.className = "track";

            // Create button
            const button = document.createElement("button");
            button.textContent = "See more details";
            button.className = `
                mt-3
                px-4 py-2
                bg-purple-600 hover:bg-pink-500
                text-white font-semibold
                rounded-full
                shadow-lg
                transition-all duration-300
                transform hover:scale-105
                `;
            button.addEventListener("click", () => window.location.href = `/tracks/${track.id}`);

            li.innerHTML = `
                <h3>${track.title}</h3>
                <p><strong>Artist:</strong> ${track.artist}</p>
                <p><strong>Category:</strong> ${track.category}</p>
            `;
            li.appendChild(button);

            trackList.appendChild(li);
        });

    } catch (error) {
        console.error("Error loading tracks:", error);
    }
}

async function loadOneTrack(id) {
    try {
        const response = await fetch(`http://localhost:3000/tracks/${id}`);
        const track = await response.json();

        trackList.innerHTML = ""; // clear list and show only one

        const li = document.createElement("li");
        li.className = "track";
        const backbtn = document.createElement("button");
        backbtn.textContent = "Go back";
        backbtn.addEventListener("click", () => loadTracks());
        li.innerHTML = `
            <h2>${track.title}</h2>
            <p><strong>Artist:</strong> ${track.artist}</p>
            <p><strong>Year:</strong> ${track.year}</p>
            <p><strong>Category:</strong> ${track.category}</p>
            <p>${track.description}</p>
        `;

        trackList.appendChild(li);
        trackList.appendChild(backbtn);

    } catch (error) {
        console.error("Error loading track:", error);
    }
}

loadTracks();
