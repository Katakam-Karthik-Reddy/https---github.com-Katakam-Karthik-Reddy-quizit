import { base_url } from "./common.js"


async function login() {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    if (validateusernamepassword(username, password)) {
        const data = {
            "username": username,
            "password": password
        }
        try {
            const responce = await fetch(base_url + "/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then(response => {
                if (response.status == 200) {
                    response.json().then(data => ({
                        data: data
                    })
                    ).then(res => {
                        window.localStorage.setItem("JWT_TOKEN", res.data['jwt']);
                        window.location = window.location.origin + "/homepage.html"
                    })
                }
                else {
                    alert("either username or password are wrong");
                }
            });
        }
        catch (error) {
            console.warn = () => { }
        }
    }
    else {
        alert("please enter proper username and password")
    }
}

function validateusernamepassword(username, password) {
    if (username == "") {
        return false;
    }
    else if (!String(username).toLowerCase().match(/\S+@\S+\.\S+/)) {
        return false;
    }
    else if (password == "") {
        return false;
    }
    else {
        return true;
    }
}


window.login = login

