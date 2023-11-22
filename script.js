// function fetchCharacter() {
   
//     fetch('https://swapi.dev/api/people/1')
//         .then(response => {
           
//             if (!response.ok) {
//                 throw new Error('Något gick fel vid hämtning av data');
//             }
          
//             return response.json();
//         })
//         .then(data => {
       
//             const name = document.getElementById('characterName');
//             const nameDetail = document.getElementById('characterNameDetail');
//             const height = document.getElementById("height");
//             const mass = document.getElementById("mass");
//             const hair_color = document.getElementById("hair_color");
//             const skin_color = document.getElementById("skin_color");
//             const eye_color = document.getElementById("eye_color");
//             const birth_year = document.getElementById("birth_year");
//             const gender = document.getElementById("gender");
            

//             name.textContent = `${data.name}`;
//             nameDetail.textContent = `${data.name}`;
//             height.textContent = `Height: ${data.height}cm`;
//             mass.textContent = `Mass: ${data.mass}kg`;
//             hair_color.textContent = `Hair Color: ${data.hair_color}`;
//             skin_color.textContent = `Skin Color: ${data.skin_color}`;
//             eye_color.textContent = `Eye Color: ${data.eye_color}`;
//             birth_year.textContent = `Birth Year: ${data.birth_year}`;
//             gender.textContent = `Gender: ${data.gender}`;
//         })
//         .catch(error => {
          
//             console.error('Fel vid hämtning av data:', error);
//         });
// }
  
//   fetchCharacter();




//   function fetchPlanet() {

//     fetch('https://swapi.dev/api/planets/1')
//         .then(response => {
           
//             if (!response.ok) {
//                 throw new Error('Något gick fel vid hämtning av data');
//             }
            
//             return response.json();
//         })
//         .then(data => {
            
//             const planetName = document.getElementById('planetName');
//             const rotation_period = document.getElementById("rotation_period");
//             const orbital_period = document.getElementById("orbital_period");
//             const diameter = document.getElementById("diameter");
//             const climate = document.getElementById("climate");
//             const gravity = document.getElementById("gravity");
//             const terrain = document.getElementById("terrain");
            
//             planetName.textContent = `${data.name}`;
//             rotation_period.textContent = `Rotation Period: ${data.rotation_period}h`;
//             orbital_period.textContent = `Orbital Period: ${data.orbital_period} days`;
//             diameter.textContent = `Diamter: ${data.diameter}km`;
//             climate.textContent = `Climate: ${data.climate}`;
//             gravity.textContent = `Gravity: ${data.gravity}`;
//             terrain.textContent = `Terrain: ${data.terrain}`;
    
//         })
//         .catch(error => {
          
//             console.error('Fel vid hämtning av data:', error);
//         });
// }

//   fetchPlanet();




// document.addEventListener("DOMContentLoaded", function () {
//     var charactersCard = document.getElementById('characterName');
//     var characterDetailCard = document.querySelector('.character-detail');
//     var currentPage = 1;
//     var totalPages;

//     fetchData(currentPage);

//     function fetchData(page) {
//         fetch(`https://swapi.dev/api/people/?page=${page}`)
//             .then(response => response.json())
//             .then(data => {
//                 totalPages = Math.ceil(data.count / 10); // Assuming 10 characters per page
//                 displayData(data.results);
//                 updatePageInfo();
//             })
//             .catch(error => {
//                 console.error('Error fetching character data:', error);
//             });
//     }

//     function displayData(results) {
//         // Clear existing data
//         charactersCard.innerHTML = '';

//         results.forEach((character, index) => {
//             var nameElement = document.createElement('h2');
//             nameElement.textContent = character.name;
//             nameElement.classList.add('clickable-name');
//             charactersCard.appendChild(nameElement);

//             nameElement.onclick = function () {
//                 fetch(character.homeworld)
//                     .then(response => response.json())
//                     .then(planet => {
//                         displayDetails(character, planet, characterDetailCard);
//                     })
//                     .catch(error => {
//                         console.error('Error fetching planet data:', error);
//                     });
//             };
//         });
//     }

//     function displayDetails(character, planet, characterDetailCard) {
//         // Rensa tidigare detaljer
//         characterDetailCard.innerHTML = '';

//         // Visa karaktärsdetaljer
//         var characterNameDetail = document.createElement('h2');
//         characterNameDetail.textContent = character.name;
//         characterDetailCard.appendChild(characterNameDetail);

//         var characterProperties = ['height', 'mass', 'hair_color', 'skin_color', 'eye_color', 'birth_year', 'gender'];
//         characterProperties.forEach(property => {
//             var propertyElement = document.createElement('p');
//             propertyElement.textContent = `${property.replace('_', ' ')}: ${character[property]}`;
//             characterDetailCard.appendChild(propertyElement);
//         });

//         // Visa planetdetaljer
//         var planetName = document.createElement('h2');
//         planetName.textContent = `Homeworld: ${planet.name}`;
//         characterDetailCard.appendChild(planetName);

//         var planetProperties = ['rotation_period', 'orbital_period', 'diameter', 'climate', 'gravity', 'terrain', 'surface_water', 'population'];
//         planetProperties.forEach(property => {
//             var propertyElement = document.createElement('p');
//             propertyElement.textContent = `${property.replace('_', ' ')}: ${planet[property]}`;
//             characterDetailCard.appendChild(propertyElement);
//         });
//     }

//     var prevButton = document.getElementById('prevButton');
//     var nextButton = document.getElementById('nextButton');

//     prevButton.addEventListener('click', function () {
//         if (currentPage > 1) {
//             currentPage--;
//             fetchData(currentPage);
//         }
//     });

//     nextButton.addEventListener('click', function () {
//         if (currentPage < totalPages) {
//             currentPage++;
//             fetchData(currentPage);
//         }
//     });

//     function updatePageInfo() {
//         var pageInfo = document.getElementById('pageInfo');
//         pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
//     }
// });








document.addEventListener("DOMContentLoaded", function () {
    var charactersCard = document.getElementById('characterName');
    var characterDetailCard = document.getElementById('character-detail');
    var currentPage = 1;
    var totalPages;
    var selectedCharacter = null;
    var characterCache = {}; 

    fetchData(currentPage);

    async function fetchData(page) {
        try {
            if (!characterCache[page]) {
                const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
                const data = await response.json();
                totalPages = Math.ceil(data.count / 10); 
                characterCache[page] = data.results;
            }

            displayData(characterCache[page]);
            updatePageInfo();
        } catch (error) {
            console.error('Error fetching character data:', error);
        }
    }

    function displayData(results) {
       
        charactersCard.innerHTML = '';

        results.forEach((character) => {
            var nameElement = document.createElement('h2');
            nameElement.textContent = character.name;
            nameElement.classList.add('clickable-name');
            charactersCard.appendChild(nameElement);

            nameElement.onclick = function () {
                fetch(character.homeworld)
                    .then(response => response.json())
                    .then(planet => {
                        displayDetails(character, planet, characterDetailCard);
                        markSelectedCharacter(nameElement);
                    })
                    .catch(error => {
                        console.error('Error fetching planet data:', error);
                    });
            };
        });
    }

    function displayDetails(character, planet, characterDetailCard) {
       
        characterDetailCard.innerHTML = '';

        // Visa character details
        var characterNameDetail = document.createElement('h2');
        characterNameDetail.textContent = character.name;
        characterDetailCard.appendChild(characterNameDetail);

        var characterProperties = ['height', 'mass', 'hair_color', 'skin_color', 'eye_color', 'birth_year', 'gender'];
        characterProperties.forEach(property => {
            var propertyElement = document.createElement('p');
            propertyElement.textContent = `${property.replace('_', ' ')}: ${character[property]}`;
            characterDetailCard.appendChild(propertyElement);
        });

        // Visa planet details
        var planetName = document.createElement('h2');
        planetName.textContent = `Homeworld: ${planet.name}`;
        characterDetailCard.appendChild(planetName);

        var planetProperties = ['rotation_period', 'orbital_period', 'diameter', 'climate', 'gravity', 'terrain', 'surface_water', 'population'];
        planetProperties.forEach(property => {
            var propertyElement = document.createElement('p');
            propertyElement.textContent = `${property.replace('_', ' ')}: ${planet[property]}`;
            characterDetailCard.appendChild(propertyElement);
        });
    }


    function markSelectedCharacter(selectedElement) {
        if (selectedCharacter) {
            selectedCharacter.classList.remove('selected-character');
        }

        selectedElement.classList.add('selected-character');
        selectedCharacter = selectedElement;
    }


    var prevButton = document.getElementById('prevButton');
    var nextButton = document.getElementById('nextButton');

    prevButton.addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--;
            fetchData(currentPage);
        }
    });

    nextButton.addEventListener('click', function () {
        if (currentPage < totalPages) {
            currentPage++;
            fetchData(currentPage);
        }
    });

    function updatePageInfo() {
        var pageInfo = document.getElementById('pageInfo');
        pageInfo.textContent = ` ${currentPage} / ${totalPages}`;
    }
});
