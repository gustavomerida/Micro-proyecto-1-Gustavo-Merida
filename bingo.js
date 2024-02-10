document.addEventListener("DOMContentLoaded", function() {
    let storedPlayers = JSON.parse(localStorage.getItem("jugadores"));
    if (storedPlayers) {
      // Los jugadores están guardados, ocultar el div y mostrar el resto de elementos
      document.getElementById("container").style.display = "none";
      document.getElementById("header").style.display = "block";
      document.getElementById("main").style.display = "flex";
      let boards= document.getElementsByClassName("boards");
      for(let i=0; i< boards.length; i++){
        boards[i].style.display = "grid";
      }
      player1 = storedPlayers.jugador1;
      drawCard(0, player1.nombre, "board");
      drawCard(0, storedPlayers.jugador2.nombre, "board-2");
      drawCard(0, storedPlayers.jugador3.nombre, "board-3");
      drawCard(0, storedPlayers.jugador4.nombre, "board-4");
      drawTable(storedPlayers);
    
      
    document.getElementById('Start').addEventListener("click", function() {
        // Código a ejecutar cuando se haga clic en el botón
        let boardSize = document.getElementById('Size').value;
        if (boardSize) {
            drawCard(boardSize, storedPlayers.jugador1.nombre, "board");
            drawCard(boardSize, storedPlayers.jugador2.nombre, "board-2");
            drawCard(boardSize, storedPlayers.jugador3.nombre, "board-3");
            drawCard(boardSize, storedPlayers.jugador4.nombre, "board-4");
            drawTable(storedPlayers);
            document.getElementById("Stop").style.display = "block";
            document.getElementById("barra").style.display = "none";   
        }
    });
    
    document.getElementById('Stop').addEventListener("click", function() {
        // Código a ejecutar cuando se haga clic en el botón Reanudar
        
        document.getElementById("Stop").style.display = "none";
        document.getElementById("barra").style.display = "flex";
        drawCard(0, storedPlayers.jugador1.nombre);
        drawTable(storedPlayers);
    });
      
    } else {
      // Los jugadores no están guardados, mostrar el formulario
      document.getElementById("container").style.display = "block";
      document.getElementById("header").style.display = "none";
      document.getElementById("main").style.display = "none";
      let boards= document.getElementsByClassName("boards");
      for(let i=0; i< boards.length; i++){
        boards[i].style.display = "none";
      }

      document.getElementById('setupForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Crear objetos de jugador
        let player1 = {
          nombre: document.getElementById('player1').value,
          // Otras características del jugador
        };
        let player2 = {
          nombre: document.getElementById('player2').value,
          // Otras características del jugador
        };
        let player3 = {
            nombre: document.getElementById('player3').value,
            // Otras características del jugador
        };
        let player4 = {
            nombre: document.getElementById('player4').value,
            // Otras características del jugador
        };
        
        let Players= { jugador1: player1, jugador2: player2, jugador3: player3, jugador4: player4 }
        // Guardar los objetos de jugador en localStorage
        localStorage.setItem("jugadores", JSON.stringify({ jugador1: player1, jugador2: player2, jugador3: player3, jugador4: player4 }));
        let boardSize = document.getElementById('boardSize').value;
        document.getElementById("Stop").style.display = "block";
        document.getElementById("barra").style.display = "none";

        document.getElementById('Start').addEventListener("click", function() {
            // Código a ejecutar cuando se haga clic en el botón
            let boardSize = document.getElementById('Size').value;
            if (boardSize) {
                drawCard(boardSize, Players.jugador1.nombre, "board");
                drawCard(boardSize, Players.jugador2.nombre, "board-2");
                drawCard(boardSize, Players.jugador3.nombre, "board-3");
                drawCard(boardSize, Players.jugador4.nombre, "board-4");
                drawTable(Players);
                document.getElementById("Stop").style.display = "block";
                document.getElementById("barra").style.display = "none";   
            }
        });
        
        document.getElementById('Stop').addEventListener("click", function() {
            // Código a ejecutar cuando se haga clic en el botón Reanudar
            
            document.getElementById("Stop").style.display = "none";
            document.getElementById("barra").style.display = "flex";
            drawCard(0, Players.jugador1.nombre, "board");
            drawCard(0, Players.jugador2.nombre, "board-2");
            drawCard(0, Players.jugador3.nombre, "board-3");
            drawCard(0, Players.jugador4.nombre, "board-4");
            drawTable(Players);
        });
        drawCard(parseInt(boardSize), player1.nombre, "board");
        drawCard(parseInt(boardSize), Players.jugador2.nombre, "board-2");
        drawCard(parseInt(boardSize), Players.jugador3.nombre, "board-3");
        drawCard(parseInt(boardSize), Players.jugador4.nombre, "board-4");
        drawTable(Players);
        // Mostrar los elementos necesarios para empezar el juego
        document.getElementById("container").style.display = "none";
        document.getElementById("header").style.display = "block";
        document.getElementById("main").style.display = "flex";
        let boards= document.getElementsByClassName("boards");
        for(let i=0; i< boards.length; i++){
            boards[i].style.display = "grid"
        }
      });
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

function drawCard (size, player, card){
    let matriz = createMatrix(size);
    document.getElementById(`${card}`).innerHTML = `<div class="name">${player}</div>`;
    document.getElementById(`${card}`).innerHTML += `<div id="matrix${card}"></div>`;
    let matrizHTML = document.getElementById(`matrix${card}`);
    matrizHTML.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    matriz.forEach(row => row.forEach(element => matrizHTML.innerHTML += `<div class="token">${element}</div>`));
}

function drawTable(players){
    document.getElementById("players-table").innerHTML = `<tr>
    <td data-title="Nombre">${players.jugador1.nombre}</td>
    <td data-title=""> 0 </td>
    <td data-title=""> 0 </td>
  </tr>
  <tr>
    <td data-title="Nombre">${players.jugador2.nombre}</td>
    <td data-title=""> 0 </td>
    <td data-title=""> 0 </td>
  </tr>
  <tr>
    <td data-title="Nombre">${players.jugador3.nombre}</td>
    <td data-title=""> 0 </td>
    <td data-title=""> 0 </td>
  </tr>
  <tr>
    <td data-title="Nombre">${players.jugador4.nombre}</td>
    <td data-title=""> 0 </td>
    <td data-title=""> 0 </td>
  </tr>`
}

function verifyButtons(boardSize, storedPlayers){
    document.getElementById('Start').addEventListener("click", function() {
        // Código a ejecutar cuando se haga clic en el botón
        if (boardSize) {
            drawCards(boardSize, storedPlayers.jugador1.nombre);
            drawTable(storedPlayers);
            document.getElementById("Stop").style.display = "block";
            document.getElementById("barra").style.display = "none";   
        }
    });
    
    document.getElementById('Stop').addEventListener("click", function() {
        // Código a ejecutar cuando se haga clic en el botón Reanudar
        
        document.getElementById("Stop").style.display = "none";
        document.getElementById("barra").style.display = "flex";
        drawCards(0, storedPlayers.jugador1.nombre);
        drawTable(storedPlayers);
    });
  };





/*let player1 = {};
let player2= {};
let player3= {};
let player4= {};
let boardSize;



try {
    //Leer localStorage
    read_LocalStorage(player1, player2, player3, player4);
    document.getElementById('container').innerHTML = ``;
    document.getElementById('header').style.display = 'block';
    document.getElementById('main').style.display = 'flex';
    document.getElementById('board').style.display = 'grid';

} catch {
    document.getElementById('main').style.display = 'none';
    document.getElementById('header').style.display = 'none';
    document.getElementById('board').style.display = 'none';
    document.getElementById('container').style.display='block';

    document.getElementById('setupForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        player1.nombre = document.getElementById('player1').value;
        player2.nombre = document.getElementById('player2').value;
        player3.nombre = document.getElementById('player3').value;
        player4.nombre = document.getElementById('player4').value;
        boardSize = document.getElementById('boardSize').value;
        
        if (player1.nombre && player2.nombre && player3.nombre && player4.nombre && boardSize) {
            // Aquí se pueden almacenar los nombres de los jugadores y el tamaño del cartón y proceder con la lógica del juego de Bingo
    
            drawCards(parseInt(boardSize), player1);
            document.getElementById('container').style.display='none';
            document.getElementById('header').style.display = 'block';
            document.getElementById('main').style.display = 'flex';
            document.getElementById('board').style.display = 'grid';
    
            console.log('Players:', player1, player2, player3, player4);
            console.log('Board Size:', boardSize);
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });
    save_LocalStorage(player1, player2, player3, player4);
}


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

function read_LocalStorage(player1, player2, player3, player4){
    player1 = JSON.parse(localStorage.getItem("player1"));
    player2= JSON.parse(localStorage.getItem("player2"));
    player3= JSON.parse(localStorage.getItem("player3"));
    player4= JSON.parse(localStorage.getItem("player4"));
}

function save_LocalStorage(player1, player2, player3, player4){
    localStorage.setItem("player1", JSON.stringify(player1));
    localStorage.setItem("player2", JSON.stringify(player2));
    localStorage.setItem("player3", JSON.stringify(player3));
    localStorage.setItem("player4", JSON.stringify(player4));
}*/