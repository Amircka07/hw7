fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    const personsBlock = document.querySelector(".characters");
    const photo =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz6eqXbQ7VDtUr3ZnEXoXvmdtpyRZ3RTzg6w&s";

    console.log(photo);

    const limitedData = data.slice(0, 3);

    limitedData.forEach((person) => {
      const personCard = document.createElement("div");
      personCard.setAttribute("class", "person-card");
      personCard.innerHTML = `
        <div class="person-image">
          <img src="${photo}" alt="">
        </div>
        <h2 class='title' >${person.title}</h2> 
        <p class='body'>${person.body}</p>
      `;
      personsBlock.appendChild(personCard);
    });
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

// fetchPart2();

// const fetchPart2 = async () => {
//   try {
//     const response = await fetch("part2.json", {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const { name, age, favoriteGame, amountGame } = await response.json();

//     console.log(
//       "name" + " " + name + ",",
//       age + " " + "year" + ",",
//       favoriteGame + " " + "favoriteGame" + ",",
//       amountGame + " " + "amountGame"
//     );
//   } catch (error) {
//     console.error("Error fetching part2 data:", error);
//   }
// };
