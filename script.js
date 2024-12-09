// ! Variable Declaration
let bat = document.querySelector(".batting");
let bowl = document.querySelector(".bowling");
let box = document.querySelector(".box");
let gameContainer = document.querySelector(".gameContainer"); //Main Game container
let buttons = document.querySelectorAll(".right button");
let userBox = document.querySelector(".user");
let computerBox = document.querySelector(".computer");
let score = document.querySelector(".scoreCard");
let massage = document.querySelector(".massegeBox");
const batImage = document.querySelector(".imgbat img");
const batContainer = document.querySelector(".imgbat");
const bowlImage = document.querySelector(".imgbowl img");
const bowlContainer = document.querySelector(".imgbowl");
let target = document.querySelector(".targetBox");
let welcome = document.querySelector(".welcome");
// ! Some important counter to handle
gameContainer.style.display = "none";
var userConcern = 0;
var userScore = 0;
var computerScore = 0;
var targetCounter = 0;
target.disabled = true;
let tl = gsap.timeline();
// console.log("Target disabled:", target.disabled);
let gameOver = false;
//! Animation Gsap
function animation() {
  gsap.fromTo(
    ".user",
    {
      scale: 0,
      y: -20, // Start below
    },
    {
      scale: 1,
      duration: 0.5,
      y: 0,
      ease: "power1.out",
    }
  );

  // Animate computerBox
  gsap.fromTo(
    ".computer",
    {
      scale: 0,
      y: 20, // Start below
    },
    {
      scale: 1,
      duration: 0.5,
      y: 0,
      ease: "power1.out",
    }
  );
}

gsap.from(".box", { y: 1000, scale: 0, duration: 3, delay: 2 });

//! buttons animation
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    gsap.to(button, {
      backgroundColor: "rgba(50, 205, 50, 0.6)",
      duration: 0.5,
      onComplete: () => {
        gsap.to(button, {
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          duration: 1.5,
        }); // Fades back after 1 second
      },
    });
  });
});

//!Main Logic
// Game Container does not shown until user chose their decision
//! User Chose Logic
bat.addEventListener("click", () => {
  box.style.display = "none";
  gameContainer.style.display = "block";
  userConcern = 1;
  tl.from(".gameContainer", { duration: 2, scale: 0.1 }, "after");
  tl.from(".massegeBox", { y: -1000, scale: 1, duration: 1 }, "same");
  tl.to(
    ".input",
    { scale: 0.9, duration: 0.5, stagger: 0.15, opacity: 1 },
    "same"
  );
  tl.from(".user", { scale: 0, duration: 1 }, "same2");
  tl.from(".computer", { scale: 0, duration: 1 }, "same2");
  tl.from(".scoreCard", { x: -1000, duration: 2, delay: 0.5 }, "same2");
  tl.from(".targetBox", { x: -1000, duration: 2, delay: 0.5 }, "same2");
  tl.from("span", { scale: 0, duration: 2 }, "same2");
});
bowl.addEventListener("click", () => {
  box.style.display = "none";
  gameContainer.style.display = "block";
  userConcern = 2;
  tl.from(".gameContainer", { duration: 2, scale: 0.1 }, "after");
  tl.from(".massegeBox", { y: -1000, scale: 1, duration: 1 }, "same");
  tl.to(
    ".input",
    { scale: 0.9, duration: 0.5, stagger: 0.15, opacity: 1 },
    "same"
  );
  tl.from(".user", { scale: 0, duration: 1 }, "same2");
  tl.from(".computer", { scale: 0, duration: 1 }, "same2");
  tl.from(".scoreCard", { x: -1000, duration: 2, delay: 0.5 }, "same2");
  tl.from(".targetBox", { x: -1000, duration: 2, delay: 0.5 }, "same2");
  tl.from("span", { scale: 0, duration: 2 }, "same2");
  massage.innerHTML = `Your Bowling First`;
});

//! Getting the Value when User and computer clicked on the buttons
buttons.forEach((elem) => {
  elem.addEventListener("click", () => {
    let userInput = decode(elem.innerHTML);
    console.log(userInput);
    let computerInput = randomNumber();
    if (userConcern === 1) {
      batting(userInput, computerInput); //! when user chose batting
    } else if (userConcern == 2) {
      bowling(userInput, computerInput); //! When user chose bowling
    } else if (userConcern == 3) {
      userBowling(userInput, computerInput); //! user chose batting and after batting bowl to computer
    } else if (userConcern == 4) {
      userBatting(userInput, computerInput); //! user chose bowling and after bowling he is batting
    }
  });
});

// Updated button click event listener with disabling buttons to prevent double-click
// buttons.forEach((elem) => {
//   elem.addEventListener("click", () => {
//     // Disable buttons immediately after click
//     disableButtons();

//     let userInput = decode(elem.innerHTML);
//     console.log(userInput);
//     let computerInput = randomNumber();

//     if (userConcern === 1) {
//       batting(userInput, computerInput); // when user chose batting
//     } else if (userConcern === 2) {
//       bowling(userInput, computerInput); // when user chose bowling
//     } else if (userConcern === 3) {
//       userBowling(userInput, computerInput); // user chose batting and then bowls to computer
//     } else if (userConcern === 4) {
//       userBatting(userInput, computerInput); // user chose bowling and then bats
//     }

//     // Re-enable buttons after a short delay, enough for game state to update
//     setTimeout(enableButtons, 500); // Adjust the time based on animation/logic
//   });
// });

// Disable buttons function
function disableButtons() {
  buttons.forEach((button) => {
    button.disabled = true;
  });
  gameOver = true; // Mark the game as over when buttons are disabled
  console.log("Buttons are now disabled");
}

// Enable buttons function
function enableButtons() {
  buttons.forEach((button) => {
    button.disabled = false;
  });
}

//! Random number Generator between 0-6
function randomNumber() {
  let ran = Math.floor(Math.random() * 7);
  return ran;
}

//! User Batting Logic
function batting(userInput, computerInput) {
  userBox.innerHTML = `${transformer(userInput)}`;
  computerBox.innerHTML = `${transformer(computerInput)}`;
  animation();
  batscoreTracker(userInput, computerInput);
  bowlImage.style.filter = "brightness(0.3)";
  batContainer.style.background =
    "linear-gradient(135deg, #6a0572, #00bfff, #a8e1b5)";
  bowlContainer.style.background =
    "linear-gradient(135deg, #30e3ca, #ff5c00, #ffc107)";
}

function bowling(userInput, computerInput) {
  userBox.innerHTML = `${transformer(userInput)}`;
  computerBox.innerHTML = `${transformer(computerInput)}`;
  //   scoreTracker(userInput, computerInput);
  batImage.style.filter = "brightness(0.3)";
  computerScoreTracker(userInput, computerInput);
}

//! Track the Score
function batscoreTracker(userInput, computerInput) {
  var lastInput = userInput;
  let counter = false;
  //! Applying the method of bit in handCricket
  if (userInput == 0) {
    //! checks in case of bit both input are zero or not if not it catches the value of computer input else user is out
    if (userInput == computerInput) {
      counter = false;
    } else {
      counter = true;
      userInput = Number(computerInput);
    }
  }
  //!Calls a function to detect user is out or not
  if (outDetector(userInput, computerInput, counter)) {
    userScore = userScore + Number(userInput);
    score.innerHTML = `Score : ${userScore}`;
  } else {
    massage.innerHTML =
      "You are Out !! Press  the target button for your bowling";

    buttons.forEach((e) => {
      e.disabled = true;
    });
    disableButtons(); // Disable buttons when out
    score.disabled = true;
    target.innerHTML = `Target : ${userScore + 1}`;
    target.disabled = false;
    targetCounter = 1;
    console.log("Target disabled:", target.disabled);
  }
}

//! Detect anyone out or not
function outDetector(userInput, computerInput, counter) {
  if (userInput == computerInput && counter == false) {
    return false;
  } else {
    return true;
  }
}

//!workdone
target.addEventListener("click", () => {
  if (targetCounter == 1) {
    score.disabled = false;
    score.innerHTML = `Score : 0`;
    enableButtons();
    buttons.forEach((e) => {
      e.disabled = false;
    });
    userConcern = 3;
    targetCounter = 5;
    massage.innerHTML = `Computer is Batting ! You are Bowling`;
  } else if (targetCounter != 5) {
    score.disabled = false;
    score.innerHTML = `Score : 0`;
    enableButtons();
    buttons.forEach((e) => {
      e.disabled = false;
    });
    userConcern = 4;
    targetCounter = 10;
    massage.innerHTML = `Computer is Bowling ! You are Batting`;
  }
});

function userBowling(userInput, computerInput) {
  userBox.innerHTML = `${transformer(userInput)}`;
  computerBox.innerHTML = `${transformer(computerInput)}`;
  animation();
  computerBat(userInput, computerInput);
  batImage.style.filter = "brightness(0.3)";
  bowlImage.style.filter = "brightness(1)";
  bowlContainer.style.background =
    "linear-gradient(135deg, #6a0572, #00bfff, #a8e1b5)";
  batContainer.style.background = "rgba(255, 255, 255, 0.2)";
  batContainer.style.background =
    "linear-gradient(135deg, #30e3ca, #ff5c00, #ffc107)";
}

function computerBat(userInput, computerInput) {
  var lastInput = userInput;
  let counter = false;
  //! Applying the method of bit in handCricket
  if (computerInput == 0) {
    //! checks in case of bit both input are zero or not if not it catches the value of computer input else computer is out
    if (userInput == computerInput) {
      counter = false;
    } else {
      counter = true;
      computerInput = Number(userInput);
    }
  }
  //!Calls a function to detect computer is out or not
  if (winDetector(userInput, computerInput, counter)) {
    computerScore = computerScore + Number(computerInput);
    score.innerHTML = `Score : ${computerScore}`;
    if (computerScore > userScore) {
      massage.innerHTML = "Computer Won !!";
      disableButtons(); // Disable buttons when out
      buttons.forEach((e) => {
        e.disabled = true;
      });
      target.disabled = true;
      score.disabled = true;
    }
  } else {
    massage.innerHTML = "Computer is Out !! You won";
    buttons.forEach((e) => {
      e.disabled = true;
    });
    target.disabled = true;
  }
}
//! Detect the winner when user chose batting
function winDetector(userInput, computerInput, counter) {
  if (userInput == computerInput && counter == false) {
    return false;
  } else {
    return true;
  }
}

function transformer(input) {
  if (input === 1) {
    return "☝️";
  } else if (input === 2) {
    return "✌️";
  } else if (input === 3) {
    return "🤟";
  } else if (input === 4) {
    return "4️⃣";
  } else if (input == 5) {
    return "✋";
  } else if (input === 6) {
    return "👍";
  } else {
    return "✊";
  }
}

//! Use to decode the emoji
function decode(emoji) {
  switch (emoji) {
    case "☝️":
      return 1;
    case "✌️":
      return 2;
    case "🤟":
      return 3;
    case "4️⃣":
      return 4;
    case "✋":
      return 5;
    case "👍":
      return 6;
    case "✊":
      return 0;
    default:
      return "0";
  }
}

//! If user Chose bowling
function computerScoreTracker(userInput, computerInput) {
  batContainer.style.background="linear-gradient(135deg, #30e3ca, #ff5c00, #ffc107)"
  bowlContainer.style.background="linear-gradient(135deg, #6a0572, #00bfff, #a8e1b5)"
  userBox.innerHTML = `${transformer(userInput)}`;
  computerBox.innerHTML = `${transformer(computerInput)}`;
  animation();
  var lastInput = userInput;
  let counter = false;
  //! Applying the method of bit in handCricket
  if (computerInput == 0) {
    //! checks in case of bit both input are zero or not if not it catches the value of computer input else computer is out
    if (userInput == computerInput) {
      counter = false;
    } else {
      counter = true;
      computerInput = Number(userInput);
    }
  }

  if (outDetector(userInput, computerInput, counter)) {
    computerScore = computerScore + Number(computerInput);
    score.innerHTML = `Score : ${computerScore}`;
  } else {
    massage.innerHTML =
      "Computer are Out !! Press  the target button for your batting";
    buttons.forEach((e) => {
      e.disabled = true;
    });
    score.disabled = true;
    target.innerHTML = `Target : ${computerScore + 1}`;
    target.disabled = false;
    targetCounter = 2;
    console.log("Target disabled:", target.disabled);
  }
}

function userBatting(userInput, computerInput) {
  batImage.style.filter="brightness(1)"
  bowlImage.style.filter="brightness(0.3)"
  bowlContainer.style.background="linear-gradient(135deg, #30e3ca, #ff5c00, #ffc107)"
  batContainer.style.background="linear-gradient(135deg, #6a0572, #00bfff, #a8e1b5)"
  userBox.innerHTML = `${transformer(userInput)}`;
  computerBox.innerHTML = `${transformer(computerInput)}`;
  animation();

  let counter = false;
  //! Applying the method of bit in handCricket
  if (userInput == 0) {
    //! checks in case of bit both input are zero or not if not it catches the value of computer input else computer is out
    if (userInput == computerInput) {
      counter = false;
    } else {
      counter = true;
      userInput = Number(computerInput);
    }
  }
  //!Calls a function to detect computer is out or not
  if (winDetector(userInput, computerInput, counter)) {
    userScore = userScore + Number(userInput);
    score.innerHTML = `Score : ${userScore}`;
    if (computerScore < userScore) {
      massage.innerHTML = "You Won !!";
      buttons.forEach((e) => {
        e.disabled = true;
      });
      target.disabled = true;
      score.disabled = true;
    }
  } else {
    massage.innerHTML = "You are Out !! Computer won";
    buttons.forEach((e) => {
      e.disabled = true;
    });
    target.disabled = true;
  }
}
