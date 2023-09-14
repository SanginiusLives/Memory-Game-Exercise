const gameContainer = document.getElementById("game");
const startBtn = document.getElementById("start");
const cards = document.querySelectorAll(".card");
const numOf = cards.length
let card1, card2;
let score = 0;
let matchedPairs = 0;
const totalPairs = cards.length / 2;
let noClick = false;
const savedScore = localStorage.getItem('score');


window.addEventListener("beforeunload", function() {
  this.window.scrollTo(0,0)
})

startBtn.addEventListener("click", function() {
  const scrollY = 1000

window.scrollTo({
  top: scrollY,
  behavior: "smooth"
})
})

startBtn.addEventListener("click", startGame);

if (savedScore != null) {
  const prevScore = document.getElementById("prevScore");
  score = parseInt(savedScore, 10);

  prevScore.textContent = score;
}

//const COLORS = [
//  "red",
 // "blue",
//  "green",
//  "orange",
//  "purple",
//  "red",
//  "blue",
//  "green",
//  "orange",
//  "purple"
//];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more

function startGame() {
  score = 0
 const imageURLs = Array.from(cards).map((card) => card.dataset.src);
 const shuffledImgs = shuffle(imageURLs)

 cards.forEach((card, index) => {
  let imageURL = shuffledImgs[index];
  let cardFront = card.querySelector(".back");
  cardFront.src = imageURL
 })
}


function shuffle(array) {
  let arrayCopy = array.slice();
    for (let idx1 = arrayCopy.length - 1; idx1 > 0; idx1--) {
      let idx2 = Math.floor(Math.random() * (idx1 + 1));

      let temp = arrayCopy[idx1];
      arrayCopy[idx1] = arrayCopy[idx2];
      arrayCopy[idx2] = temp;
    }
    return arrayCopy;
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  
  if (noClick) return;
  let currentCard = event.target.parentElement;
  

  if (currentCard.classList.contains("flipped")) return;

  //if cards are not equal remove flipped
   //if cards are equal then no click is true
  //if all cards with noClick then alert game end
if (!card1 || !card2) {
currentCard.classList.add("flipped");
if (!card1) {
  card1 = currentCard;
} else {
  card2 = currentCard;
  noClick = true;
}
}

if (card1 && card2) {
  noClick = true;
  let pic1 = card1.querySelector(".back").src;
  let pic2 = card2.querySelector(".back").src;
  score++;

if (pic1 === pic2) {
  
  matchedPairs++;
  card1.removeEventListener("click", handleCardClick);
  card2.removeEventListener("click", handleCardClick);
  card1 = null;
  card2 = null;
  noClick = false;
  if (matchedPairs === totalPairs) {
    console.log(score);
    localStorage.setItem('score', score.toString());
    ending();
  };
} else {
  setTimeout(function () {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    card1 = null;
    card2 = null;
    noClick = false;
  }, 1000)
}
document.getElementById("score").textContent = score;

};
}

for (let card of cards) {
  card.addEventListener("click", handleCardClick);
};

function ending() {
  const turnOn = document.getElementById("end");
  const endBtn = document.getElementById("again");
  const endScore = document.getElementById("endScore");
  turnOn.style.display = "block";
  endScore.textContent = score;

  endBtn.addEventListener("click", function () {
    location.reload();
  })

}



