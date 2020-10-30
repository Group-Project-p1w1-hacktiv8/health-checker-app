
const server = "http://localhost:3000"

$(document).ready(function () {
    const token = localStorage.getItem("token")
    // console.log(token)
    if(token){
        $("#home-page").show()
        $("#sign-in-page").hide()
        $("#sign-up-page").hide()
        // getUserSymptoms()
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
        getUserSymptoms(e)
        getSymptoms(e)
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

function getSymptoms(e){
  const token = localStorage.getItem('token');
    e.preventDefault()
    $.ajax({
        method: "GET",
        url: server + "/health/symptoms",
        headers: {
          access_token: token
        }
    }).done(response => {
      console.log('masukkkkkkkkk')
      console.log(response);
        response.forEach(element => {
            const id = element.ID;
            const name = element.Name;
            $(`<option value="${id},${name}">${name}</option>`).appendTo('#symptoms')
        });
    }).fail(err => {
        console.log(err)
    })
} 

function addSymptom(e) {
  e.preventDefault();
  const token = localStorage.getItem('token');
  const value = $("#symptoms").val().split(',');
  console.log(value);
  const symptomAPIId = value[0];
  const symptomName = value[1];
  $.ajax({
    method: "POST",
    url: server + "/user-symptoms/add",
    headers: {
      access_token: token
    },
    data: {
      symptomAPIId,
      symptomName
    }
  })
    .done(response => {
      console.log(response); 
      getUserSymptoms(e);  
    })
    .fail(err => {
        console.log(err)
    })
}


function getUserSymptoms(e) {
  const token = localStorage.getItem('token');
  e.preventDefault();
  $.ajax({
    method: "GET",
    url: server + "/user-symptoms",
    headers: {
      access_token: token
    }
  })
    .done(response => {
      $('#listSymptoms').empty();
      response.userSymptoms.forEach(element => {
        const id = element.id;
        const name = element.name;
        $(`<div class="my-2 mx-2 card bg-secondary d-flex flex-row">
        <span>${name}</span>
        <button type="button" class="close bg-dark btn-block pull-right" aria-label="Close" value="${id}" id="${id}">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`).appendTo('#listSymptoms')
    });
    })
    .fail(err => {
        console.log(err)
    })
}

function deleteUserSymptom(e) {
  const token = localStorage.getItem('token');
  e.preventDefault();
  $.ajax({
    method: "GET",
    url: server + "/user-symptoms",
    headers: {
      access_token: token
    }
  })
    .done(response => {
      $('#listSymptoms').empty();
      response.userSymptoms.forEach(element => {
        const id = element.id;
        const name = element.name;
        $(`<div class="my-2 mx-2 card bg-secondary d-flex flex-row">
        <span>${name}</span>
        <button type="button" class="close bg-dark btn-block pull-right" aria-label="Close" value="${id}" id="${id}">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`).appendTo('#listSymptoms')
    });
    })
    .fail(err => {
        console.log(err)
    })
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

function onSignIn(googleUser) {
    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var google_access_token = googleUser.getAuthResponse().id_token;
    // console.log(id_token)
    $.ajax({
        method:"POST",
        url: server + "/users/gooogleSignIn",
        data: {
            google_access_token
        }
    })
    .done(response => {
        console.log(response)
    })  
    .fail(err => {
        console.log(err)
    })
}