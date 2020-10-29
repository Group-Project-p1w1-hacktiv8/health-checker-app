const server = "http//localhost:3000"

function signIn(e){
    e.preventDefault()
    // console.log("button terclick")
    const email = $("#email").val()
    const password = $("#email").val()
    $.ajax({
        method: "POST",
        url: server + "/sign-in",
        data: {
            email,
            password
        }
    }).done(response =>{
        console.log(response)
    }).fail(err => {
        console.log(err)
    })
}

function signUp(e){
    e.preventDefault()
    const email = $("#email").val()
    const password = $("#email").val()
    const first_name = $("#first_name").val()
    const last_name = $("#last_name").val()
    const birth_year = $("#birth_date").val()
    const gender = $("#gender").val()
    $.ajax({
        method: "POST",
        url: server + "/sign-up",
        data: {
            email,
            password,
            first_name,
            last_name,
            birth_year,
            gender
        }
    }).done(response =>{
        console.log(response)
    }).fail(err => {
        console.log(err)
    })
}