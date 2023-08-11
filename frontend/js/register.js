import { base_url } from "./common.js";


function signupmethod() {
    const username = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const confirmpassword = document.querySelector("#confirmpassword").value;
    const data = {
        "username": username,
        "email": email,
        "password": password,
        "confirmpassword": confirmpassword
    }
    signup(data);
}

async function signup(data) {
    try {
        const responce = await fetch(base_url + "/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),

        });
        const result = responce.status;
        if (result == 201) {
            //add pupup
            window.location = window.location.origin + "/login.html";
        }
    }
    catch (error) {
        console.log(error);
    }
}
window.signupmethod = signupmethod