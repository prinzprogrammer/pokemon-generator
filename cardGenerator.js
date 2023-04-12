const generateInput = document.querySelector("#generate-input");
const generateBtn = document.querySelector("#generate-btn");
const section = document.querySelector("section");
const sectionChildren = document.querySelector("section > div");
const pokemonCardDefault = document.querySelector(".pokemon-card");

generateInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    displayCards();
  }
});

// convert generateInput.value(x) to number
const convertInput = () => {
  const amount = Number(generateInput.value);
  return amount;
};

const setSectionGrid = () => {
  // set pokemonCard container to display of "grid"
  let w = window.innerWidth;
  if (w === 375) {
    section.style.display = "flex";
    section.style.flexDirection = "column";
  } else {
    section.style.display = "grid";
    section.style.gap = "5px";
    section.style.gridTemplateColumns = "repeat(4, minmax(290px, 1fr) )";
  }
};

const displayCards = () => {
  if (generateInput.value > 0 && generateInput.value < 1000) {
    // set pokemonCard container to display of "grid"
    setSectionGrid();
    // console.log(sectionChildren);
    // remove default(Charizard)pokemonCard
    pokemonCardDefault.remove();
    sectionChildren.remove();
    for (let i = 0; i < convertInput(); i++) {
      generateCard();
      console.log(sectionChildren);
    }
  } else {
    generateInput.value = "";
    alert("Enter a number between 1 and 1000");
  }
  generateInput.value = "";
};

const generateCard = () => {
  // create pokemon-card div
  const pokemonCard = document.createElement("div");
  pokemonCard.classList.add("pokemon-card");
  section.append(pokemonCard);
  // create image-container div
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");
  pokemonCard.appendChild(imageContainer);
  // create pokemon-img img
  const pokemonImg = document.createElement("img");
  pokemonImg.classList.add("pokemon-img");
  pokemonImg.src = "/Images/6.png";
  imageContainer.appendChild(pokemonImg);
  // create pokemon-info div
  const pokemonInfo = document.createElement("div");
  pokemonInfo.classList.add("pokemon-info");
  pokemonCard.appendChild(pokemonInfo);
  // create pokemon-info ul
  const pokemonInfoUl = document.createElement("ul");
  pokemonInfo.appendChild(pokemonInfoUl);
  // create pokemon-info li
  const li = document.createElement("li");
  pokemonInfoUl.appendChild(li);
  // create pokemon-name h1
  const pokemonName = document.createElement("h1");
  pokemonName.classList.add("pokemon-name");
  pokemonName.textContent = "Charizard";
  li.appendChild(pokemonName);
  // create pokemon-info li
  const li2 = document.createElement("li");
  pokemonInfoUl.appendChild(li2);
  // create pokemon-info pi
  const p = document.createElement("p");
  li2.appendChild(p);
  // create pokemon type span
  const pokemonType = document.createElement("span");
  pokemonType.classList.add("pokemon-type");
  pokemonType.textContent = "Fire";
  p.appendChild(pokemonType);
  // create pokemon type2 span
  const pokemonType2 = document.createElement("span");
  pokemonType2.classList.add("pokemon-type2");
  pokemonType2.textContent = "Flying";
  p.appendChild(pokemonType2);
  // gnrtRandomPokemonCard
  let randomNumber = Math.floor(Math.random() * 1001);
  console.log(randomNumber);
  // get random pokemon
  fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`)
    .then((response) => response.json())
    .then((pokemonObject) => {
      const name = pokemonObject.name;
      console.log("Name:", name);
      pokemonName.textContent = upperCase(name);
      const img = pokemonObject.sprites.other["official-artwork"].front_default;
      console.log(img);
      pokemonImg.src = img;
      const typeArray = pokemonObject.types;
      const type = pokemonObject.types[0].type.name;
      changePokemonCardBgColor(type, typeArray);
      if (typeArray.length > 1) {
        console.log(typeArray);
        console.log("Type:", type);
        pokemonType.textContent = upperCase(`${type} `);
        const type2 = pokemonObject.types[1].type.name;
        console.log("Type2:", type2);
        pokemonType2.textContent = upperCase(type2);
      } else {
        pokemonType.textContent = upperCase(type);
        pokemonType2.textContent = "";
      }
    });

  const changePokemonCardBgColor = (pokemonType, arrayCount) => {
    if (arrayCount.length > 1) {
      console.log("arrayCount.length > 1");
      pokemonCard.style.backgroundImage = `linear-gradient(to bottom, #000000, ${changeColor(
        pokemonType
      )})`;
    } else {
      console.log("else");
      pokemonCard.style.backgroundColor = `${changeColor(pokemonType)}`;
    }
  };
};

const changeColor = (pokemonType) => {
  let color = "#FFFFFF";
  switch (pokemonType) {
    case "fire":
      color = "#EE8130";
      break;
    case "water":
      color = "#6390F0";
      break;
    case "electric":
      color = "#F7D02C";
      break;
    case "grass":
      color = "#7AC74C";
      break;
    case "ice":
      color = "#96D9D6";
      break;
    case "fighting":
      color = "#C22E28";
      break;
    case "poison":
      color = "#A33EA1";
      break;
    case "ground":
      color = "#E2BF65";
      break;
    case "flying":
      color = "#A98FF3";
      break;
    case "psychic":
      color = "#F95587";
      break;
    case "bug":
      color = "#A6B91A";
      break;
    case "rock":
      color = "#B6A136";
      break;
    case "ghost":
      color = "#735797";
      break;
    case "dragon":
      color = "#6F35FC";
      break;
    case "dark":
      color = "#705746";
      break;
    case "steel":
      color = "#B7B7CE";
      break;
    case "fairy":
      color = "#D685AD";
      break;
    default:
      color = "#A8A878";
  }
  return color;
};

const upperCase = (string) => {
  let upperCasedString = "";
  for (let i = 0; i < string.length; i++) {
    if (i === 0) {
      upperCasedString += string[i].toUpperCase();
    } else {
      upperCasedString += string[i];
    }
  }
  return upperCasedString;
};

generateBtn.addEventListener("click", displayCards);

//Create a pokemonCard section - that display the first 100 cards. and has pagination ang has a load more button
