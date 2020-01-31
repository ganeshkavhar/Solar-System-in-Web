function createStar(){
    let trajectory = document.createElement("div");
    document.getElementById("solarSystem").appendChild(trajectory);
    trajectory.style=`
        position:fixed;
        width:${parseInt(document.getElementById("size").value)}vmin;
        height:${parseInt(document.getElementById("size").value)}vmin;
        left:50%; top:50%;
        transform:translate(-50%, -50%);
        border:1px solid #444444;
        border-radius:50%;
        transition:all 0.5s;
        animation-iteration-count:infinite;
        animation-duration:${document.getElementById("speed").value}s;
        animation-name:fly;
        animation-timing-function:linear;
        pointer-events:none;
    `;
    
    let planet = document.createElement("div");
    trajectory.appendChild(planet);
    planet.style = `
        position:absolute;
        left:calc(${(parseInt(document.getElementById("size").value) +15)/2}vmin - ${document.getElementById("planetSize").value/2}vmin);
        top:-${document.getElementById("planetSize").value/2}vmin;
        width:${document.getElementById("planetSize").value}vmin;
        height:${document.getElementById("planetSize").value}vmin;
        background:linear-gradient(to bottom, black, ${document.getElementById("color").value});
        border-radius:100%;
        box-shadow:0 0 0 0.25vmin ${document.getElementById("color").value};
        pointer-events:auto;
    `;
    let temperature = 2000 - document.getElementById("size").value * 20;
    const name = document.getElementById("name").value;
    planet.addEventListener("click",function(){
    document.getElementById("planetInfo").style.bottom="0";
        document.getElementById("colorOfPlanet").style.background = planet.style.background;
        document.getElementById("nameOfPlanet").innerText = "Name: "+ name;
        document.getElementById("sizeOfPlanet").innerText = "Size: " + planet.style.width;
        document.getElementById("rotationOfPlanet").innerText = "Rotation time: " + trajectory.style.animationDuration;
        document.getElementById("distanceOfPlanet").innerText = "Distance from Sun: "+ trajectory.style.width;
        document.getElementById("temperatureOfPlanet").innerText="Temperature: "+ temperature + "°C";
        if(temperature >= -10 && temperature <= 35){
            let population = Math.floor(Math.random()*10000);
            document.getElementById("populationOfPlanet").innerText="Population: " + population;
        }
        else{
            document.getElementById("populationOfPlanet").innerText="Population: 0";
        }
    });
}

function clear(){
    document.getElementById("size").value = "";
    document.getElementById("planetSize").value = "";
    document.getElementById("speed").value = "";
     document.getElementById("name").value = "";
}

let open = false;
function newPlanetSettings(){
    closePlanetsInfo();
    if(open === false){
        document.getElementById("modal").style.transform = "scale(1)";
        open = true;
    }
    else{
        document.getElementById("modal").style.transform = "scale(0)";
        open = false;
    }
}

function randomPlanet(){
    let names = ["Planet X", 'Planet Y', "Planet Z", "XY-95","KR-28","New Earth","B-Point","SAR-46Q","Venus","Mercury", "Jupiter", "Mars","M9-Q6Z", "Kepler-10c", "Kepler-39b"];
    let planetName = names[Math.floor(Math.random()* names.length)];
    document.getElementById("planetSize").value = Math.floor(Math.random()*20)+2;
    document.getElementById("size").value = Math.floor(Math.random()*100) + 25;
    document.getElementById("speed").value = Math.floor(Math.random()*30);
    document.getElementById("name").value = planetName;
    document.getElementById("color").value ="#" +( Math.floor(Math.random()*899999) + 100000);
}

function newGuy(){
    newPlanetSettings();
    createStar();
    clear();
}

function scales(){
    document.getElementById("solarSystem").style.transform = `scale(${document.getElementById('scale').value / 100})`;
}

let sett = true;
function openSettings(){
    closePlanetsInfo();
    if(sett === false){
        document.getElementById("settings").style.transform = "scale(1)";
        sett=true;
    }
    else{
        document.getElementById("settings").style.transform = "scale(0)";
        sett=false;
    }
}

function deleteStars(){
    for(k=0;k < document.getElementsByTagName("div").length;k++){
        if(document.getElementsByTagName("div")[k].style.animationName == "fly"){
            document.getElementsByTagName("div")[k].style.display="none";
        }
    }
}

function closePlanetsInfo(){
    document.getElementById("planetInfo").style.bottom="-25%";
}

function makeStars(num){
    for(w = 0; w < document.getElementsByTagName("div").length; w++){
        if(document.getElementsByTagName("div")[w].style.width == "1px" || document.getElementsByTagName("div")[w].style.width == "2px"){
            document.getElementsByTagName("div")[w].style.display="none";
        }
    }
    for(let y = 0; y < num; y++){
        var star = document.createElement("div");
        document.body.appendChild(star);
        let starSize = Math.ceil(Math.random()*2);
        star.style=`
            position:fixed;
            left:${Math.floor(Math.random()*100)}vw;
            top:${Math.floor(Math.random()*100)}vh;
            width:${starSize}px;
            height:${starSize}px;
            background-color:${document.getElementById("stars").value};
            border-radius:50%;
            z-index:-3;
        `;
    }
    openSettings();
    document.getElementById("stars").value = "";
}

window.onload = function(){
    makeStars(80);
    document.getElementById("stars").addEventListener("change",function(){
        makeStars(80,document.getElementById("stars").value);
    });
    document.getElementById("size").value = "3500";
    document.getElementById("planetSize").value = "1600";
    document.getElementById("speed").value = "999";
    document.getElementById("name").value = "The Unknown";
     document.getElementById("color").value = "#ff0000";
    createStar();
    clear();
};
