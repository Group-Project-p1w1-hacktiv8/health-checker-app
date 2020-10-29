const { response } = require("express")

const server = "http://localhost:3000"

$(document).ready(function () {
    const token = localStorage.getItem("token")
    console.log(token)
    if(token){
        $("#home-page").show()
        $("#sign-in-page").hide()
        $("#sign-up-page").hide()
    }
    else{
        $("#home-page").hide()
        $("#sign-in-page").show()
        $("#sign-up-page").hide()
    }
})

function signIn(e){
    e.preventDefault()
    // console.log("button terclick")
    const email = $("#email").val()
    const password = $("#password").val()
    console.log(email)
    $.ajax({
        method: "POST",
        url: server + "/users/sign-in",
        data: {
            email,
            password
        }
    }).done(response =>{
        console.log(response)
        const token = response.accessToken
        localStorage.setItem("token", token)
        // console.log(response)
        $("#home-page").show()
        $("#sign-in-page").hide()
        $("#sign-up-page").hide()
        $("#email").val("")
        $("#password").val("")
    }).fail(err => {
        console.log(err)
    })
}

function showSignUp(e){
    e.preventDefault()
    $("#sign-up-page").show()
    $("#home-page").hide()
    $("#sign-in-page").hide()

}
function signUp(e){
    e.preventDefault()
    const email = $("#sign-up-email").val()
    const password = $("#sign-up-password").val()
    const first_name = $("#first_name").val()
    const last_name = $("#last_name").val()
    const birth_year = new Date().getFullYear() - +$("#age").val()
    const gender = $("#gender").val()
    console.log(email, "ini email")
    $.ajax({
        method: "POST",
        url: server + "/users/sign-up",
        data: {
            email,
            password,
            first_name,
            last_name,
            birth_year,
            gender
        }
    }).done(response =>{
        // console.log(response)
        $("#home-page").hide()
        $("#sign-in-page").show()
        $("#sign-up-page").hide()
       
    }).fail(err => {
        console.log(err)
    })
}

function logOut(e){
    e.preventDefault()
    $("#home-page").hide()
    $("#sign-in-page").show()
    $("#sign-up-page").hide()
    localStorage.removeItem("token")
    // const token = localStorage.getItem("token")
    // console.log(token)
}

function getSymptomps(e){
    e.preventDefault()
    $.ajax({
        method: "GET",
        url: server + "/health/symptoms",
    }).done(response => {
        response.forEach(element => {
            id = element.ID,
            name = element.Name
        });
    }).fail(err => {
        console.log(err)
    })
} 