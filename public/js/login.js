const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnInicio = document.getElementById('btnInicio');

btnInicio.addEventListener("click", async (e)=>{
    let user = {
        email:txtEmail.value,
        password:txtPassword.value
    };
//console.log("user post: ", user)
    try {
        const saved = await ajax('users/login', user, 'POST');
        if(saved){
            console.log("logueado: ", saved);
            localStorage.setItem(tokenSession, saved.token);
            window.location = 'index.html';
            //limpiarForm();
            //alert("Producto creado.")
            //getProducts();
            //window.location = '/';
        }
    } catch (error) {
        console.error(error)
        alert("Ups, pasó un error")
    }
});