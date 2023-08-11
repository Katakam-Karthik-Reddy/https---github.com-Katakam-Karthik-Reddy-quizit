
import { base_url } from "./common.js";

// validating user
async function validating_user() {
    let JWT_TOKEN = window.localStorage.getItem('JWT_TOKEN');
    const responce = await fetch(base_url + "/user/getuser", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${JWT_TOKEN}`,
        },
    }).then(response => {
        if (response.status == 200) {
            response.json().then(data => ({
                data: data
            })
            ).then(res => {
                window.localStorage.setItem("userDetails", res.data);
                getquizzes();
            })
        }
        else {
            window.location = window.location.origin + "/login.html";
        }
    });
}
validating_user();



let Completedquizzes;
const logoutbutton = document.querySelector("#logoutbutton");
const useroptions = document.querySelector(".userimage");




logoutbutton.addEventListener("click", () => {
    window.localStorage.removeItem("JWT_TOKEN");
    window.location = window.location.origin + "/login.html";
})




async function getquizzes() {
    await getData();
    populatequizzesdata(Completedquizzes);
}


async function getdata() {
    let JWT_TOKEN = window.localStorage.getItem('JWT_TOKEN');
    const response = await fetch(base_url + `/api/question/quizresults`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${JWT_TOKEN}`,
        },
    });
    let data = response.json();
    return data;
}


async function getData() {
    await getdata().then((quizzes) => {
        Completedquizzes = quizzes;
    }).catch((error) => {
        console.log("This is the error", error);
    });


}


function populatequizzesdata(quizzes) {
    quizzes.forEach((quiz, index) => {
        createresultdiv(quiz, quiz["totalnumberofquizzes"] - index)
    });
}


function createresultdiv(quiz, index) {
    const resultdiv = document.createElement("div");
    resultdiv.className = "resultdiv";
    resultdiv.classList.add(quiz["quizid"]);

    //heading div
    const resultheading = document.createElement("div");
    resultheading.className = "resultheading";
    const headingp = document.createElement("p");
    headingp.innerHTML = index + " quiz";
    resultheading.appendChild(headingp);
    resultdiv.appendChild(resultheading);

    //result details div
    const resultdetailsdiv = document.createElement("div");
    resultdetailsdiv.className = "resultdetailsdiv";

    //table
    const table = document.createElement("table");

    //first row
    const tr1 = document.createElement("tr");
    const td11 = document.createElement("td");
    td11.innerHTML = "Catogory :"
    tr1.appendChild(td11);
    const td12 = document.createElement("td");
    td12.innerHTML = quiz["category"];
    tr1.appendChild(td12);
    table.appendChild(tr1);

    //second row
    const tr2 = document.createElement("tr");
    const td21 = document.createElement("td");
    td21.innerHTML = "Difficulty :"
    tr2.appendChild(td21);
    const td22 = document.createElement("td");
    td22.innerHTML = quiz["difficulty"];
    tr2.appendChild(td22);
    table.appendChild(tr2);

    //third row
    const tr3 = document.createElement("tr");
    const td31 = document.createElement("td");
    td31.innerHTML = "Quiz Completed Date :"
    tr3.appendChild(td31);
    const td32 = document.createElement("td");
    td32.innerHTML = quiz["date"].substring(12, 16) + " " + quiz["date"].substring(0, 10);
    tr3.appendChild(td32);
    table.appendChild(tr3);

    //fourth row
    const tr4 = document.createElement("tr");
    const td41 = document.createElement("td");
    td41.innerHTML = "Total No. Questions :"
    tr4.appendChild(td41);
    const td42 = document.createElement("td");
    td42.innerHTML = quiz["totalnumberofquestions"];
    tr4.appendChild(td42);
    table.appendChild(tr4);

    //fifth row
    const tr5 = document.createElement("tr");
    const td51 = document.createElement("td");
    td51.innerHTML = "Total No. Correct Answer :"
    tr5.appendChild(td51);
    const td52 = document.createElement("td");
    td52.innerHTML = quiz["numberofcorrectanswers"];
    tr5.appendChild(td52);
    table.appendChild(tr5);

    resultdetailsdiv.appendChild(table);

    resultdiv.appendChild(resultdetailsdiv);

    //button div
    const resultreviewbtndiv = document.createElement("div");
    resultreviewbtndiv.className = "resultreviewbtndiv";

    //btn
    const quizreviewbtn = document.createElement("button");
    quizreviewbtn.setAttribute("type", "button");
    quizreviewbtn.classList.add("button");
    quizreviewbtn.classList.add("quizreviewbtn");
    quizreviewbtn.setAttribute("id", quiz["quizid"]);
    quizreviewbtn.addEventListener("click", (event) => {
        const uuid = event.target.getAttribute("id");
        console.log(uuid);
        window.localStorage.setItem("quizid", JSON.stringify(uuid));
        window.location = window.location.origin + "/resultpage.html";
    })
    quizreviewbtn.innerHTML = "Review Quiz";
    resultreviewbtndiv.appendChild(quizreviewbtn);

    resultdiv.appendChild(resultreviewbtndiv);

    const results = document.querySelector(".results");
    results.appendChild(resultdiv);

}






function modelvisibility(visibility) {
    const model = document.querySelector(".startquizmodel");
    if (visibility) {
        model.style.display = "flex";
    }
    else {
        model.style.display = "none";
    }
}

function startexam() {
    const catogory = document.querySelector("#catogory");
    const difficulty = document.querySelector("#difficulty");
    const noofquestions = document.querySelector("#noofquestions");


    const currentquiz = {
        "catogory": catogory.value,
        "difficulty": difficulty.value,
        "noofquestions": noofquestions.value
    }
    localStorage.setItem("currentquiz", JSON.stringify(currentquiz));
    window.location = window.location.origin + "/quizpage.html"
}

window.modelvisibility = modelvisibility;
window.startexam = startexam