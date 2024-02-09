try {
    //Leer localStorage
} catch (error) {
    
}




document.getElementById('setupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let player1 = document.getElementById('player1').value;
    let player2 = document.getElementById('player2').value;
    let player3 = document.getElementById('player3').value;
    let player4 = document.getElementById('player4').value;
    let boardSize = document.getElementById('boardSize').value;
    
    if (player1 && player2 && player3 && player4 && boardSize) {
        // Aquí se pueden almacenar los nombres de los jugadores y el tamaño del cartón y proceder con la lógica del juego de Bingo

        drawCards(parseInt(boardSize), player1);
        document.getElementById('container').style.display='none';
        document.getElementById('main').style.display = 'flex';
        document.getElementById('board').style.display = 'grid';

        console.log('Players:', player1, player2, player3, player4);
        console.log('Board Size:', boardSize);
    } else {
        alert('Por favor, complete todos los campos.');
    }
});

function createMatrix (n){

    let matriz = [];
    let all = [];

    for (let i = 1; i <= n; i++) {
        let row = [];
        for (let i = 1; i <= n; i++) {
            let randomNumber = Math.floor(Math.random() * 50) + 1;
            if (all.includes(randomNumber)){
                while (all.includes(randomNumber)){
                    randomNumber = Math.floor(Math.random() * 50) + 1;
                }
            }
            all.push(randomNumber);
            row.push(randomNumber);  
        }
        matriz.push(row);
    }

    return matriz;
}

function drawCards (size, player){
    let matriz = createMatrix(size);
    document.getElementById('board').innerHTML = `<div class="name">${player}</div>`;
    document.getElementById('board').innerHTML += `<div id="matrix"></div>`;
    let matrizHTML = document.getElementById('matrix');
    matrizHTML.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    matriz.forEach(row => row.forEach(element => matrizHTML.innerHTML += `<div class="token">${element}</div>`));
}