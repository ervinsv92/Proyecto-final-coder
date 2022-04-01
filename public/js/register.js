const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const txtUser = document.getElementById('txtUser');
const txtAddress = document.getElementById('txtAddress');
const txtAge = document.getElementById('txtAge');
const txtPhoneNumber = document.getElementById('txtPhoneNumber');
const txtUrlAvatar = document.getElementById('txtUrlAvatar');
const btnRegister = document.getElementById('btnRegister');

btnRegister.addEventListener("click", async (e)=>{
    let user = {
        email:txtEmail.value,
        password:txtPassword.value,
        name:txtUser.value,
        address:txtAddress.value,
        age:txtAge.value,
        phoneNumber:txtPhoneNumber.value,
        urlAvatar:txtUrlAvatar.value
    };
console.log("user post: ", user)
    try {
        const saved = await ajax('users/register', user, 'POST');
        if(saved){
            console.log("registrado: ", saved);
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