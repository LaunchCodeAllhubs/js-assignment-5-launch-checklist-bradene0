// Write your helper functions here!
require('isomorphic-fetch');

// Helper functions

// Function to update the mission destination information on the webpage
function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById('missionTarget');
    missionTarget.innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src='${imageUrl}'>
    `;
}

// Function to validate user input
function validateInput(testInput) {
    if (testInput === "" || testInput === null || testInput === 0) {
        return `Empty`;
    } else if (!isNaN(Number(testInput))) {
        return `Is a Number`;
    } else {
        return 'Not a Number';
    }
}

// Function to handle the form submission
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    // DOM elements
    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    let launchStatus = document.getElementById('launchStatus');
    let cargoStatus = document.getElementById('cargoStatus');

    // Check if all fields are filled
    if (validateInput(pilot) === `Empty` || validateInput(copilot) === `Empty` ||
        validateInput(fuelLevel) === `Empty` || validateInput(cargoLevel) === `Empty`) {
        alert(`All fields are required`);
    }
    // Check that fuelLevel and cargoLevel are numbers and pilot and co-pilot are strings
    else if (validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number') {
        alert(`Please enter numerical values for Fuel Level and Cargo Mass`);
    } else if (validateInput(pilot) === `Is a Number` || validateInput(copilot) === `Is a Number`) {
        alert('Please do not enter numerical values for the name of the pilot or co-pilot');
    } else {
        // Update pilot/copilot status
        pilotStatus.innerHTML = `Pilot ${pilot} is ready`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready`;
        list.style.visibility = 'hidden';
    }

    // Check fuel levels and update faulty items
    if (Number(fuelLevel) < 10000) {
        fuelStatus.innerHTML = `Not enough fuel for the journey`;
        list.style.visibility = 'visible';
        launchStatus.innerHTML = `Shuttle not ready for launch`;
        launchStatus.style.color = `red`;
    } else if (Number(cargoLevel) > 10000) {
        cargoStatus.innerHTML = `Cargo too heavy for takeoff`;
        list.style.visibility = `visible`;
        launchStatus.innerHTML = `Shuttle not ready for launch`;
        launchStatus.style.color = `red`;
    } else if (Number(cargoLevel) < 10000 && Number(fuelLevel) > 10000) {
        list.style.visibility = `visible`;
        fuelStatus.innerHTML = `Enough fuel for the journey`;
        cargoStatus.innerHTML = `Cargo light enough for takeoff`;
        launchStatus.innerHTML = `Shuttle ready for launch`;
        launchStatus.style.color = `green`;
    }
}

// Function to fetch the planets from the API
async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json")
        .then(function (response) {
            return response.json();
        });

      return planetsReturned;
}

// Function to pick a random planet from the list of planets
function pickPlanet(planets) {
    let rndx = Math.floor(Math.random() * planets.length);
    return planets[rndx];
}

// Exporting functions to be used in other modules
module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
