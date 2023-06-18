import {db} from "./db";
import {ref, onValue} from "firebase/database";

(function(){
    const database = ref(db);

    (function(){
        onValue(database, (snapshot) => {
            displayDB(snapshot.val())
        })
    }());

    const displayDB = (data) => {
        const parent:HTMLElement = document.querySelector(".article-db")
        while(parent.firstChild){
            parent.lastChild.remove()
        }
        for(const key in data) {
            const p:HTMLElement = document.createElement("p")
            p.innerText = `${data[key].name}, ${data[key].amount}`;

            parent.appendChild(p)


        }

    }
}());
