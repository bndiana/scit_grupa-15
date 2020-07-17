class Game {
  constructor() {
    this.words = ["apple", "car", "house", "university", "sky"];
    this.lives = 5;
    this.chooseRandomWord();
    this.renderTitle();
    this.renderLetters();
    this.renderUserInput();
  }

  chooseRandomWord() {
    this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
  }

  renderTitle() {
    const title = document.createElement("h2");
    title.innerText = "Hangman Game";

    this.renderInitialLives(title);

    document.body.appendChild(title);
  }

  renderInitialLives(title) {
    this.livesSpan = document.createElement("span");
    this.livesSpan.innerText = ` - Lives: ${this.lives}`;
    title.appendChild(this.livesSpan);
  }

  updateLives() {
    this.livesSpan.innerText = ` - Lives: ${this.lives}`;
  }

  renderLetters() {
    this.displayLetters = new LettersDisplay(this.currentWord);
  }

  renderUserInput() {
    this.input = document.createElement("input");
    this.input.placeholder = "try a letter";
    document.body.appendChild(this.input);

    this.input.addEventListener("keyup", this.reactToUserInput.bind(this));
  }

  reactToUserInput(event) {
    if (this.input.value.length === 1) {
      if (event.key === "Enter") {
        const value = this.input.value;

        if (this.displayLetters.hasLetter(value)) {
          this.displayLetters.displayLetter(value);

          if (this.checkIfWin()) {
            this.showWiningState();
          }
        } else {
          this.lives--;
          this.updateLives();
          if (checkIfLoose()) {
            this.showLoosingState();
          }
        }

        this.input.value = "";
      }
    } else if (this.input.value.length !== 0) {
      this.input.value = event.key;
    }
  }

  checkIfLoose() {
    if (this.lives === 0) true;

    return false;
  }

  showLoosingState() {
    // similar with "showWiningState"
  }

  showWiningState() {
    this.livesSpan.innerText = "You won";
    this.input.disabled = true;
  }

  checkIfWin() {
    // true or false
    // this.displayLetters.letters (is an array)
    // for trough this.displayLetters.letters , check if htmlRef.innerText === "_" then false
  }

  cleanLetters() {
    this.displayLetters.lettersContainer.remove();
  }

  // this must be used in reset button
  resetTheGame() {
    this.input.disabled = false;
    this.chooseRandomWord();
    this.lives = 5;
    this.updateLives();
    this.cleanLetters();
    this.displayLetters();
  }
}

class LettersDisplay {
  //this.displayLetters = new LettersDisplay(this.currentWord); word-ul dintre paranteze e this.currentWord
  constructor(word) {
    this.word = word;
    this.initialDisplay();
  }

  initialDisplay() {
    this.lettersContainer = document.createElement("div");
    this.lettersContainer.classList.add("letters-container");
    const letters = this.word.split(""); //const letters e array
    this.letters = []; // this.letters e o noua entitate, diferita fata de const letters 
    for (const letter of letters) {  // letters DIFERIT de this.letters !!!!!!!!!!!!!!!
      const letterHtml = document.createElement("p");
      letterHtml.innerText = "_";
      this.letters.push({
        htmlRef: letterHtml,
        value: letter,
      });
      this.lettersContainer.appendChild(letterHtml);
    }

    /*
    this.letters = [
      {
        htmlRef: p -> _,
        value: c
      },
      {
        htmlRef: p -> _,
        value: a
      },
      {
        htmlRef: p -> _,
        value : r
      }
    ]
    */

    document.body.appendChild(this.lettersContainer);
  }

  hasLetter(letter) { // const value = this.input.value e letter adica ce litera adauga user-ul in input
    for (const objectLetter of this.letters) {
      if (objectLetter.value === letter) {
        return true;
      }
    }

    return false;
  }

  displayLetter(letter) {
    for (const objectLetter of this.letters) {
      if (objectLetter.value === letter) {
        objectLetter.htmlRef.innerText = letter;
      }
    }
  }
}

new Game();
