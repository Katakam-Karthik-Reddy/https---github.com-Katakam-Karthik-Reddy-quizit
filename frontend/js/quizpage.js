
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
                window.localStorage.setItem("userDetails", JSON.stringify(res.data));
                startexam();
                setUserDetails();
            })
        }
        else {
            window.location = window.location.origin + "/login.html";
        }
    });
}
validating_user();




var processeddata = {};
const nextbutton = document.querySelector(".nextbutton");
const previousbutton = document.querySelector(".previousbutton");
const finish = document.querySelector(".finishbtn")
const optioninputs = document.querySelectorAll(".optioninput")
let currentquestionnumber = 0;
let maximumquestions;
let questionsdata
let maindata;
let responsestatus;

function setUserDetails() {
    const usernametag = document.querySelector(".usernameptag");
    const userdeatils = JSON.parse(window.localStorage.getItem("userDetails"));
    usernametag.innerHTML = userdeatils["username"];
}



// setanswers(maximumquestions);
function processdata(questionsdata) {
    questionsdata.forEach((qdata, index) => {

        let options = [];
        options.push(qdata['correctanswer']);
        qdata["incorrectanswers"].forEach(option => {
            options.push(option);
        });
        options = shuffle(options);

        processeddata[index] = {
            "questionid": qdata['id'],
            "question": qdata['question'],
            "options": options,
            "selectedoption": ""
        }

    });
    setQuestion(processeddata[0]);
}


async function startexam() {
    await getData()
    previousbutton.disabled = true;
    processdata(questionsdata);
}
async function getdata() {
    const currentquiz = JSON.parse(localStorage.getItem("currentquiz"));
    const count = currentquiz['noofquestions'];
    maximumquestions = count;
    const catogory = currentquiz['catogory'];
    const difficulty = currentquiz['difficulty']
    let JWT_TOKEN = window.localStorage.getItem('JWT_TOKEN');
    const response = await fetch(base_url + `/api/question/random?count=${count}&category=${catogory}&difficulty=${difficulty}`, {
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
    await getdata().then((questions) => {
        questionsdata = questions
    }).catch((error) => {
        console.log("This is the error", error)
    })
}



function setQuestion(question) {
    const questionnumberlabel = document.querySelector(".questionnumber");
    questionnumberlabel.innerHTML = currentquestionnumber + 1 + ".";
    const questiontext = document.querySelector("#questiontext");
    questiontext.innerHTML = question['question'];
    let optionsElements = document.querySelectorAll(".option div");
    Object.keys(optionsElements).forEach(function (key, index) {
        optionsElements[key].innerHTML = question['options'][index];
    })
    setalloptionsunchecked();
    setoptiontoselected();
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



// to go to next question
nextbutton.addEventListener("click", () => {
    if (currentquestionnumber < maximumquestions - 1) {
        currentquestionnumber++;
        previousbutton.disabled = false;
        setQuestion(processeddata[currentquestionnumber]);
    }
    else {
        nextbutton.disabled = true;
    }
});




//to go to previous question
previousbutton.addEventListener("click", () => {
    nextbutton.disabled = false;
    if (currentquestionnumber > 0) {
        currentquestionnumber--;
        setQuestion(processeddata[currentquestionnumber]);
    }
    if (currentquestionnumber == 0) {
        previousbutton.disabled = true;
    }
});



//finishquiz
finish.addEventListener("click", () => {
    finishquiz();
});


async function finishquiz() {
    const quizdata = processquizdata();

    const uuid = await getData1(quizdata);
    window.localStorage.setItem("quizid", JSON.stringify(uuid));
    window.location = window.location.origin + "/resultpage.html";
}


function setalloptionsunchecked() {
    optioninputs.forEach((option) => {
        option.checked = false;
    })
}

// optionupdate
optioninputs.forEach((option) => {
    option.addEventListener("click", (event) => {
        const id = "." + event.target.getAttribute("id")
        const ans = document.querySelector(`${id}`).innerHTML;;
        processeddata[currentquestionnumber]['selectedoption'] = ans;
    })

})


function setoptiontoselected() {
    const currentquestionoptions = processeddata[currentquestionnumber]['options'];
    const selectedoptionindata = processeddata[currentquestionnumber]['selectedoption'];
    for (let index = 0; index < currentquestionoptions.length; index++) {
        if (currentquestionoptions[index] == selectedoptionindata) {
            optioninputs[index].checked = true;
            break;
        }
    }
}

function processquizdata() {
    var results = [];
    for (let index = 0; index < maximumquestions; index++) {
        results.push({
            id: processeddata[index]['questionid'],
            selectedoption: processeddata[index]['selectedoption'],
        });
    }
    return results;
}





async function getdata1(quizdata) {
    const currentquiz = JSON.parse(localStorage.getItem("currentquiz"));
    const count = currentquiz['noofquestions'];
    const catogory = currentquiz['catogory'];
    const difficulty = currentquiz['difficulty'];

    let JWT_TOKEN = window.localStorage.getItem('JWT_TOKEN');
    const response = await fetch(base_url + `/api/question/validateresults?category=${catogory}&difficulty=${difficulty}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${JWT_TOKEN}`,
        },
        body: JSON.stringify(quizdata),
    })
    const data = response.json();
    return data;
}

async function getData1(quizdata) {
    return await getdata1(quizdata);
}

