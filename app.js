document.addEventListener('DOMContentLoaded', function() {
    const playerForm = document.getElementById('playerForm');
    const playersList = document.getElementById('playersList');
    const filterClubInput = document.getElementById('filterClub');

    playerForm.addEventListener('submit', addPlayer);
    filterClubInput.addEventListener('input', filterPlayers);

    function addPlayer(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const club = document.getElementById('club').value;

        const player = { name,   };
        let players = JSON.parse(localStorage.getItem('players')) || [];
        players.push(player);
        localStorage.setItem('players', JSON.stringify(players));

        displayPlayers(players);
        playerForm.reset();
    }

    function displayPlayers(players) {
        playersList.innerHTML = '';
        players.forEach((player, index) => {
            const playerDiv = document.createElement('div');
            playerDiv.classList.add('player');

            playerDiv.innerHTML = `
                <span>${player.name} - ${player.club}</span>
                <button onclick="transferPlayer(${index})">Transfer</button>
            `;

            playersList.appendChild(playerDiv);
        });
    }

    function filterPlayers() {
        const club = filterClubInput.value.toLowerCase();
        const players = JSON.parse(localStorage.getItem('players')) || [];

        const filteredPlayers = players.filter(player => player.club.toLowerCase().includes(club));
        displayPlayers(filteredPlayers);
    }

    window.transferPlayer = function(index) {
        const newClub = prompt('Enter new club name:');
        if (newClub) {
            let players = JSON.parse(localStorage.getItem('players')) || [];
            players[index].club = newClub;
            localStorage.setItem('players', JSON.stringify(players));
            displayPlayers(players);
        }
    }

    // Initial display
    const players = JSON.parse(localStorage.getItem('players')) || [];
    displayPlayers(players);
});
