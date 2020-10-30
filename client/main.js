const { response } = require("express")

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
        getNews(e);
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
    localStorage.clear()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
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
      // console.log(response); 
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
        <button type="button" class="close bg-dark btn-block pull-right" aria-label="Close" onclick="deleteUserSymptom(event,${id})">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`).appendTo('#listSymptoms')
    });
    })
    .fail(err => {
        console.log(err)
    })
}

function changeTitleIssue() {
  $('#title-core').replaceWith('<h5 class="card-title" id="title-core">Click on your issue to get treatment</h5>');
}

function changeTitleTreatment() {
  $('#title-core').replaceWith('<h5 class="card-title" id="title-core">Here is our suggestion</h5>');
}


function deleteUserSymptom(e, id) {
  const token = localStorage.getItem('token');
  const symptomId = id;
  e.preventDefault();
  $.ajax({
    method: "DELETE",
    url: server + `/user-symptoms/delete/${symptomId}`,
    headers: {
      access_token: token
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

function getUserIssue(e) {
  const token = localStorage.getItem('token');
  e.preventDefault();
  $.ajax({
    method: "GET",
    url: server + `/health/issues`,
    headers: {
      access_token: token
    }
  })
    .done(response => {
      // console.log(response);
      changeTitleIssue()
      removeButton()
      const toChange = response.map(el => {
        return `<button class="btn btn-primary mx-2" type="button" onclick="getTreatment(event,${el.ID})">${el.Name}</button>`
      }).join(' ')
      $('#listSymptoms').replaceWith(
        `<div class="container d-flex flex-wrap bg-white" style="width: 100%; overflow-y: auto;" id="issues">${toChange}`);
    })
    .fail(err => {
        console.log(err)
    })
}


function getTreatment(e, issueId) {
  const token = localStorage.getItem('token');
  e.preventDefault();
  $.ajax({
    method: 'POST',
    url: server + '/health/treatment',
    headers: {
      access_token: token
    },
    data: {
      issueId
    }
  })
    .then(response => {
      changeTitleTreatment();
      $('#issues').replaceWith(`<p>${response}</p>`);
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    })
}

function removeButton() {
  $('#buttonIssue').remove();
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
        localStorage.setItem("access_token", response )
        $("#home-page").show()
        $("#sign-in-page").hide()
        $("#sign-up-page").hide()
    })  
    .fail(err => {
        console.log(err)
    })
}

function getDataWiki(e) {
  e.preventDefault()
  const symptoms = $("#check-symptoms").val()
  $.ajax({
    method: "GET",
    url: server + "/wiki",
    data: {
      symptoms
    }
  })
  .done(response => {
    console.log(response)
  })
  .fail( err => {
    console.log(err)
  })

}

function getNews(e){
  const token = localStorage.getItem('token');
  e.preventDefault();
  $.ajax({
    method: "GET",
    url: server + "/news",
    headers: {
      access_token: token
    }
  })
    .done(respone => {
      respone.forEach((el, i) => {
        const img = el.image;
        const url = el.url;
        const tittle = el.title;
        let temp;
        if(i === 0){
          temp = `<div class="carousel-item active">
          <h2>${tittle}</h2>
          <a href="${url}">
            <img src="${img}">
          </a>
        </div>`
        } else {
          temp = `<div class="carousel-item">
          <h2>${tittle}</h2>
          <a href="${url}">
            <img src="${img}">
          </a>
        </div>`
        }
        $('#news').append(temp);
      })
      
    })
    .fail(err => {
      console.log(err);
    })
}