function login(){

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if(email==="" || password===""){
        alert("Please enter your email and password.");
    }else{
        alert("Welcome to LohOption!");
    }

}function register(){

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if(name === "" || email === "" || password === ""){
        alert("Please fill in all fields.");
    }else{
        alert("Account created successfully!");
    }

}