window.addEventListener("load", () => {
  const boxes = document.querySelectorAll(".box");
  const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let playerOnePlays;
  const playerOne = document.getElementById("playerOne");
  const playerTwo = document.getElementById("playerTwo");
  const playerOneAnnouncer = document.getElementById("arrow-one");
  const playerTwoAnnouncer = document.getElementById("arrow-two");
  const announcer = document.getElementById("announcer");

  const restartButton = document.getElementById("rst-btn");
  restartButton.classList.add("hidden");
  restartButton.addEventListener("click", restartGame);

  const clearButton = document.getElementById("clr-btn");
  clearButton.classList.add("hidden");
  clearButton.addEventListener("click", clearGame);

  const startButton = document.getElementById("srt-btn");
  startButton.addEventListener("click", startGame);

  //clear turn pointers
  playerOneAnnouncer.classList.add("hidden");
  playerTwoAnnouncer.classList.add("hidden");

  function fillHandler(event) {
    //if box hit is empty -> fill with correct value
    if (!event.target.innerHTML) {
      event.target.innerHTML = playerOnePlays ? "X" : "O";
      board[event.target.dataset.index] = playerOnePlays ? 1 : 2;
      event.target.removeEventListener("click", fillHandler);
    }

    //check if the game ended
    if (checkWinningConditions()) {
      boxes.forEach((box) => box.removeEventListener("click", fillHandler));
      //if player player one played last he wins and the pointer remains visible
      //also his name is announced
      if (playerOnePlays) {
        playerOneAnnouncer.classList.remove("hidden");
        announcer.innerHTML = `${playerOne.value} WON!!!`;
      }
      //if player player two played last he wins and the pointer remains visible
      //also his name is announced
      else {
        playerTwoAnnouncer.classList.remove("hidden");
        announcer.innerHTML = `${playerTwo.value} WON!!!`;
      }
      return;
    }

    //check if we have a tie
    const tie = board.includes(0);
    if (!tie) {
      announcer.innerHTML = `TIE`;

      //clear turn pointers
      playerOneAnnouncer.classList.add("hidden");
      playerTwoAnnouncer.classList.add("hidden");
      return;
    }

    //change the players turn and show it
    playerOnePlays = !playerOnePlays;
    playerOneAnnouncer.classList.toggle("hidden");
    playerTwoAnnouncer.classList.toggle("hidden");
  }

  function startGame() {
    //check if both players filled their names
    if (playerOne.value == "" || playerTwo.value == "") {
      alert("Please fill both Player Names");
    } else {
      //deside who plays first
      playerOnePlays = Math.random() < 0.5;

      //disable name inputs
      playerOne.disabled = true;
      playerTwo.disabled = true;

      //show correct buttons
      startButton.classList.toggle("hidden");
      restartButton.classList.toggle("hidden");
      clearButton.classList.toggle("hidden");

      //show who is playing
      if (playerOnePlays) {
        playerOneAnnouncer.classList.toggle("hidden");
      } else {
        playerTwoAnnouncer.classList.toggle("hidden");
      }

      //make boxes clickable
      boxes.forEach((box) => box.addEventListener("click", fillHandler));
    }
  }

  function restartGame() {
    //clear board
    boxes.forEach((box) => (box.innerHTML = ""));
    board.fill(0);

    //clear turn pointer
    playerOneAnnouncer.classList.add("hidden");
    playerTwoAnnouncer.classList.add("hidden");

    //clear announcer
    announcer.innerHTML = "";

    //deside who plays
    playerOnePlays = Math.random() < 0.5;

    //show players turn
    if (playerOnePlays) {
      playerOneAnnouncer.classList.toggle("hidden");
    } else {
      playerTwoAnnouncer.classList.toggle("hidden");
    }

    //reset boxes' event listeners
    boxes.forEach((box) => box.removeEventListener("click", fillHandler));
    boxes.forEach((box) => box.addEventListener("click", fillHandler));
  }

  function clearGame() {
    //clear board
    boxes.forEach((box) => (box.innerHTML = ""));
    board.fill(0);

    //clear turn pointer
    playerOneAnnouncer.classList.add("hidden");
    playerTwoAnnouncer.classList.add("hidden");

    //clear announcer
    announcer.innerHTML = "";

    //make the correct buttons visible
    startButton.classList.toggle("hidden");
    restartButton.classList.toggle("hidden");
    clearButton.classList.toggle("hidden");

    //enable and clear the name inputs
    document.getElementById("playerOne").disabled = false;
    document.getElementById("playerTwo").disabled = false;
    document.getElementById("playerOne").value = "";
    document.getElementById("playerTwo").value = "";

    //disable the boxes
    boxes.forEach((box) => box.removeEventListener("click", fillHandler));
  }

  function checkWinningConditions() {
    const isWin =
      /^(?:...)*([12])\1\1|^.?.?([12])..\2..\2|^([12])...\3...\3|^..([12]).\4.\4/.test(
        board.join("")
      );

    return isWin;
  }
});
