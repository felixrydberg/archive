const body = document.querySelector("body");
let numbers = ["ett", "två", "tre", "fyra", "fem", "sex", "sju", "åtta", "nio", "tio"];
let ul = document.createElement("ul"),
container = document.createElement("div");
body.appendChild(ul);
ul.style.listStyle="none";
ul.style.padding="0";
ul.style.margin="0";

for(i=0; i < 5; i++) {
    let li = document.createElement("li"),
    number = i + 1;
    color = i * 10;
    thiccness = (i+20)*number;
    ul.appendChild(li);
    li.innerHTML= "Rad " + number;
    li.style.background=`hsl(${color}, 100%, 50%)`;
    li.style.listStyle="none";
    li.style.textAlign="center";
    li.style.margin=`${i*10}px 1rem 1rem 1rem`;
    li.style.height=`${thiccness}px`;
    li.style.fontSize=`${thiccness}px`;
}

body.appendChild(container);
container.style.display="flex";
container.style.border="1px solid black";
container.style.justifyContent="space-evenly"

for(let i=0; i < 3; i++) {
    let ul3 = document.createElement("ul");
    container.appendChild(ul3);
    ul3.style.listStyle="none";
    ul3.style.border="1rem solid purple";
    ul3.style.padding="0";
    ul3.style.width="4rem";
    ul3.style.background="purple";
    if(i===0){
        for(let i=0; i < 10; i++) {
            let li = document.createElement("li");
            ul3.appendChild(li);
            li.innerHTML=i;
            li.style.textAlign="left";
            if (i%2===0){
                li.style.background="white";
            }
            else if(i===4) {
                li.style.background="transparent";
            }
            else {
                li.style.background="black";
                li.style.color="white";
            }
        }
    }
    else if(i===1){
        for(let i=10; i > 0; i--) {
            let li = document.createElement("li");
            ul3.appendChild(li);
            li.innerHTML=i;
            li.style.textAlign="center";
            if (i%2===0){
                li.style.background="black";
                li.style.color="white";
            }
            else if(i===8) {
                li.style.background="transparent";
            }
            else {
                li.style.background="white";
            }
        }
    }
    else if(i===2){
        for(let i=0; i < numbers.length; i++) {
            let li = document.createElement("li");
            ul3.appendChild(li);
            li.innerHTML=numbers[i];
            li.style.textAlign="right";
            if (i%2===0){
                li.style.background="white";
            }
            else if(i===6) {
                li.style.background="transparent";
            }
            else {
                li.style.background="black";
                li.style.color="white";
            }
        }
    }
    else {
        console.log("Varför kör du fortfarande :(")
    }
}
