// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

function init(){
   //Fetching Planet Info
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      return response.json();
   }).then((json)=>{
      document.getElementById("missionTarget").innerHTML += `<h2>Mission Destination</h2>
      <ol>
         <li>Name: ${json[0].name}</li>
         <li>Diameter: ${json[0].diameter}</li>
         <li>Star: ${json[0].star}</li>
         <li>Distance from Earth: ${json[0].distance}</li>
         <li>Number of Moons: ${json[0].moons}</li>
      </ol>
      <img src="${json[0].image}">`;
   });

   //Form Submission
   let form = document.querySelector("form");

   form.addEventListener("submit", function(e){
      //Create array to house values to pass to validator
      let inputs = [
         document.querySelector("input[name=pilotName]"), 
         document.querySelector("input[name=copilotName]"), 
         document.querySelector("input[name=fuelLevel]"),
         document.querySelector("input[name=cargoMass]")
      ];

      if(validate(inputs)){
         e.preventDefault();
         let pilotName = inputs[0].value;
         let copilotName = inputs[1].value;
         let fuelLevel = inputs[2].value;
         let cargoMass = inputs[3].value;
         document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotName} is ready.`;
         document.getElementById("copilotStatus").innerHTML = `Co Pilot ${copilotName} is ready.`;

         if(fuelLevel < 10000 || cargoMass > 10000){
            document.getElementById("faultyItems").style.visibility = "visible";
            document.getElementById("launchStatus").style.color = "Red";
            document.getElementById("launchStatus").innerHTML = "Shuttle not Ready for Launch";

            if(cargoMass > 10000){
               document.getElementById("cargoStatus").innerHTML = `Cargo too heavy for launch`;
            }else{
               document.getElementById("cargoStatus").innerHTML = `Cargo low enough for launch`;
            }

            if(fuelLevel < 10000){
               document.getElementById("fuelStatus").innerHTML = `Fuel level too low for launch`;
            }else{
               document.getElementById("fuelStatus").innerHTML = `Fuel level high enough for launch`;
            }
         }else{
            document.getElementById("launchStatus").style.color = "Green";
            document.getElementById("launchStatus").innerHTML = "Shuttle Ready for Launch";
         }

      }else{
         e.preventDefault();
         document.getElementById("launchStatus").innerHTML = "Awaiting Information Before Launch";
         document.getElementById("launchStatus").style.color = "Black";
         document.getElementById("faultyItems").style.visibility = "hidden";
      }
   });
   //document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotName} is ready.`;

   
   // document.getElementById("faultyItems").style.visibility = "visible";

   // let pilotReady = document.getElementById("pilotReady");
   // let copilotReady = document.getElementById("copilotReady");
   // let fuelStatus = document.getElementById("fuelStatus");
   // let cargoStatus = document.getElementById("cargoStatus");

   // pilotReady.innerHTML = `${pilotName.value} ready.`;
   // copilotReady.innerHTML = `${copilotName.value} ready.`;

   // //Status Updates
   // if(fuelLevel.value < 10000){
   //    fuelStatus.innerHTML = `Fuel level too low for launch`;
   //    document.getElementById("launchStatus").innerHTML = `Shuttle not ready for launch.`;
   // }

   // if(cargoMass.value > 10000){
   //    cargoStatus.innerHTML = `Cargo too heavy for launch`;
   //    document.getElementById("launchStatus").innerHTML = `Shuttle not ready for launch.`;
   // }
   
}

function validate(inputs){
   
   let wordTest = /^[^\s][a-zA-Z\s]+/;
   let numberTest = /[0-9]/;
   let valid = true;

   for(let i in inputs){
      if(inputs[i].value ===""){
         alert(`All fields must contain a value.`);
         return false;
      }else if(inputs[i].type === "text" && !wordTest.test(inputs[i].value)){
         alert(`${inputs[i].name} field must contain a word.`);
         valid = false;
      }else if(inputs[i].type === "number" && !numberTest.test(inputs[i].value)){
         alert(`${inputs[i].name} field must contain a word.`);
         valid = false;
      }
   }

   return valid;


}


window.onload = init;