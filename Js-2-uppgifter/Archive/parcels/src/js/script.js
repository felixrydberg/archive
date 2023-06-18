import anime from "../../node_modules/animejs/lib/anime.es.js";

console.log("Gamig");

anime({
    targets: ".test",
    rotate: -180,
    direction: 'alternate',
    delay: 1000,
    loop: true,
});