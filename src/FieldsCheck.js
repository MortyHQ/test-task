function  validateEmail(email) {
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

function setupUpdater(){
    let email = document.getElementById('email'),
        name = document.getElementById('name'),
        timeout=null;
    function handleChange(){
        if(validateEmail(email.value) && (name.value !== "")){
            name.style = "background: none";
            email.style = "background: none";
            document.getElementById("OK").disabled = false;
            document.getElementById("OK").style = "background: green; color: white";
        }else {
            email.style = "background: red";
            document.getElementById("OK").disabled = true;
            document.getElementById("OK").style = "background: none; border: 1px black solid; color: black;";
        }
    }
    function eventHandler(){
        if(timeout) clearTimeout(timeout);
        timeout = setTimeout(handleChange, 200);
    }
    email.onkeyup = email.onclick = email.onkeydown = name.onkeyup = name.onclick = name.onkeydown = email.ondblclick = name.ondblclick = eventHandler;
}
function setupStarter() {
    setupUpdater();
    document.getElementById('email').focus();
}
export {
    setupStarter
}