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
            })
        }
        else {
            window.location = window.location.origin + "/login.html";
        }
    });
}
validating_user();




const quizdata = JSON.parse(localStorage.getItem("quizdata"));
let maindata;
let responsestatus;

async function getdata() {
    const uuid = JSON.parse(window.localStorage.getItem("quizid"));
    let JWT_TOKEN = localStorage.getItem('JWT_TOKEN');
    await fetch((base_url + `/api/question/quizresult/${uuid}`), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${JWT_TOKEN}`,
        },
    }).then(response =>
        response.json().then(data => ({
            data: data,
            status: response.status
        })
        ).then(res => {
            maindata = res.data;
            responsestatus = res.status;
        }));
}

async function getData() {
    await getdata()
    setscorebar();
    addquestions(maindata);
}
getData();


function setscorebar() {
    for (let index = 0; index < maindata["totalnumberofquestions"]; index++) {
        if (index < maindata["numberofcorrectanswers"]) {
            addbar("green");
        }
        else {
            addbar("red");
        }
    }
    const bars = document.querySelectorAll(".bar");
    const width = 70 / bars.length;
    bars.forEach((bar) => {
        bar.style.width = width + "rem";
    })
    const score = document.querySelector(".score");
    score.innerHTML = (maindata["numberofcorrectanswers"] / maindata["totalnumberofquestions"]) * 100 + "%";
}

function addbar(color) {
    const bardiv = document.createElement("div");
    bardiv.classList.add("bar");
    bardiv.style.backgroundColor = color;
    const scrorebar = document.querySelector(".scorebar");
    scrorebar.appendChild(bardiv);
}

function addquestions(maindata) {
    for (let index = 0; index < maindata["totalnumberofquestions"]; index++) {
        createquestionandoptions(maindata["questionanswer"][index]["question"], maindata["questionanswer"][index]["selectedanswer"], index);
    }
}
function createquestionandoptions(question, selectedoptions, questionnumber) {
    let alloptions = [];
    for (let i = 0; i < question["incorrectanswers"].length; i++) {
        alloptions.push(question["incorrectanswers"][i]);
    }
    alloptions.push(question["correctanswer"]);
    alloptions = shuffle(alloptions);


    const questionoptiondiv = document.createElement("div");
    questionoptiondiv.classList.add("questionoptionsdiv");
    const questiondivinner = document.createElement("label");
    questiondivinner.classList.add("questiondivinner");
    questiondivinner.innerHTML = questionnumber + 1 + "." + question['question'];
    questionoptiondiv.appendChild(questiondivinner);

    //optionA
    const optionlabel1 = document.createElement('label');
    optionlabel1.classList.add('option');
    optionlabel1.classList.add('optionA');
    optionlabel1.setAttribute("for", "A");
    if (alloptions[0] == selectedoptions) {
        if (selectedoptions == question["correctanswer"]) {
            optionlabel1.style.backgroundColor = '#2aff17';
        }
        else {
            optionlabel1.style.backgroundColor = '#54b3f3';
        }
    }

    const optioninput1 = document.createElement("input");
    optioninput1.setAttribute("type", "radio");
    optioninput1.setAttribute("name", "opt");
    optioninput1.setAttribute("id", "A");
    optioninput1.setAttribute("class", "optioninput");
    optionlabel1.appendChild(optioninput1);

    const optiondiv1 = document.createElement("div");
    optiondiv1.classList.add('A');
    optiondiv1.innerHTML = alloptions[0];
    optionlabel1.appendChild(optiondiv1);
    questionoptiondiv.appendChild(optionlabel1)

    //optionB
    const optionlabel2 = document.createElement('label');
    optionlabel2.classList.add('option');
    optionlabel2.classList.add('optionA');
    optionlabel2.setAttribute("for", "A");
    if (alloptions[1] == selectedoptions) {
        if (selectedoptions == question["correctanswer"]) {
            optionlabel2.style.backgroundColor = '#2aff17';
        }
        else {
            optionlabel2.style.backgroundColor = '#54b3f3';
        }
    }

    const optioninput2 = document.createElement("input");
    optioninput2.setAttribute("type", "radio");
    optioninput2.setAttribute("name", "opt");
    optioninput2.setAttribute("id", "A");
    optioninput2.setAttribute("class", "optioninput");
    optionlabel2.appendChild(optioninput2);

    const optiondiv2 = document.createElement("div");
    optiondiv2.classList.add('A');
    optiondiv2.innerHTML = alloptions[1];
    optionlabel2.appendChild(optiondiv2);
    questionoptiondiv.appendChild(optionlabel2)

    //optionC
    const optionlabel3 = document.createElement('label');
    optionlabel3.classList.add('option');
    optionlabel3.classList.add('optionA');
    optionlabel3.setAttribute("for", "A");
    if (alloptions[2] == selectedoptions) {
        if (selectedoptions == question["correctanswer"]) {
            optionlabel3.style.backgroundColor = '#2aff17';
        }
        else {
            optionlabel3.style.backgroundColor = '#54b3f3';
        }
    }

    const optioninput3 = document.createElement("input");
    optioninput3.setAttribute("type", "radio");
    optioninput3.setAttribute("name", "opt");
    optioninput3.setAttribute("id", "A");
    optioninput3.setAttribute("class", "optioninput");
    optionlabel3.appendChild(optioninput3);

    const optiondiv3 = document.createElement("div");
    optiondiv3.classList.add('A');
    optiondiv3.innerHTML = alloptions[2];
    optionlabel3.appendChild(optiondiv3);
    questionoptiondiv.appendChild(optionlabel3)

    //optionD
    const optionlabel4 = document.createElement('label');
    optionlabel4.classList.add('option');
    optionlabel4.classList.add('optionA');
    optionlabel4.setAttribute("for", "A");
    if (alloptions[3] == selectedoptions) {
        if (selectedoptions == question["correctanswer"]) {
            optionlabel4.style.backgroundColor = '#2aff17';
        }
        else {
            optionlabel4.style.backgroundColor = '#54b3f3';
        }
    }

    const optioninput4 = document.createElement("input");
    optioninput4.setAttribute("type", "radio");
    optioninput4.setAttribute("name", "opt");
    optioninput4.setAttribute("id", "A");
    optioninput4.setAttribute("class", "optioninput");
    optionlabel4.appendChild(optioninput4);

    const optiondiv4 = document.createElement("div");
    optiondiv4.classList.add('A');
    const optiondivp4 = document.createElement('p');
    optiondivp4.innerHTML = alloptions[3];
    optiondiv4.appendChild(optiondivp4);
    optionlabel4.appendChild(optiondiv4);
    questionoptiondiv.appendChild(optionlabel4)

    //correctans
    const correctans = document.createElement("label");
    correctans.className = "correctans";
    const correctansp1 = document.createElement("p");
    correctansp1.classList.add('correctansp1');
    correctansp1.innerHTML = "Correct ans:";
    correctans.appendChild(correctansp1);
    const correctansp2 = document.createElement("p");
    correctansp2.classList.add('correctansp2');
    correctansp2.innerHTML = question["correctanswer"];
    correctans.appendChild(correctansp2);
    questionoptiondiv.appendChild(correctans);

    const questionandoptionsdiv = document.querySelector('.questionsandoptinsdiv');
    questionandoptionsdiv.appendChild(questionoptiondiv);
}

function shuffle(array) {
    let count = 10;
    while (count-- > 0) {
        let firstindex = Math.floor(Math.random() * array.length);
        let secondindex = Math.floor(Math.random() * array.length);
        let temp = array[firstindex];
        array[firstindex] = array[secondindex];
        array[secondindex] = temp;
    }
    return array;
}
