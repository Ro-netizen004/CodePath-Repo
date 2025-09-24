const trackList = document.getElementById("track-list");

async function loadTracks(){
    try{
        const response = await fetch("http://localhost:3000/tracks")
        const tracks = await response.json()
        tracks.forEach(track => {
            const li = document.createElement("li")
            li.className = "track"
            li.innerHTML = `<h3>${track.title}</h3>
                            <p><strong>Artist:</strong> ${track.artist}</p>
                            <p><strong>Category:</strong> ${track.category}</p>
                            <button>See more details</button>`
            trackList.appendChild(li);
        });
        
    }
    catch(error){
        console.error("Error loading tracks:", error);
    }
}

loadTracks()