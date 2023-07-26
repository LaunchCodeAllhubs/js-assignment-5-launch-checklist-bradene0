// Write your JavaScript code here!

// When the window loads, execute this function
window.addEventListener("load", () => {
    // Get the form element
    const form = document.querySelector("form");
    
    // Get the list element to try to prevent the error
    const list = document.getElementById('faultyItems');
    // Set the list visibility to hidden
    list.style.visibility = 'hidden';
    // Add a submit event listener to the form
    form.addEventListener("submit", (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();
        
        // Get user inputs from the form
        let pilot = document.querySelector("input[name=pilotName]").value;
        let copilot = document.querySelector("input[name=copilotName]").value;
        let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
        let cargoLevel = document.querySelector("input[name=cargoMass]").value;
        let list = document.getElementById('faultyItems');
        //list.style.visibility = 'hidden'; // Set the initial visibility to 'hidden'

        // Use the formSubmission function to validate and update the list
        formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel);
    });
    //list.style.visibility = 'hidden';
    // Define a variable to hold the planet information
    let listedPlanets;

// !!! Commenting out the below block to reimplement it to pass the github autograder
/*
    // Fetch the list of planets and store the response in listedPlanetsResponse
    let listedPlanetsResponse = myFetch();

    // After fetching the planets, update the listedPlanets variable and display the result
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function () {
        console.log(listedPlanets);
*/
// !!! End commented out block

//New fetch
myFetch().then(function (result) {
    listedPlanets = result;
    console.log(listedPlanets);
        // Below this comment, call the appropriate helper functions to pick a planet from the list of planets 
        // and add that information to your destination.
        let planet = pickPlanet(listedPlanets);
        let name = planet.name;
        let diameter = planet.diameter;
        let star = planet.star;
        let distance = planet.distance;
        let imageUrl = planet.image;
        let moons = planet.moons;
        
        // Add the destination information to the webpage
        addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl);
    }).catch(function (error) {
        console.error("Error fetching planets:", error);
    });
});
// The catch function above handles any errors in the fetch. If one occurs it will console.log that error
