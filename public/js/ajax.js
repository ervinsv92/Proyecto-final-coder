
const BASE_URL = 'http://localhost:8080/api/';

const ajax = async (endPoint, data = {}, method = 'GET')=>{
    const url = `${BASE_URL}${endPoint}`;
    const isAdmin = localStorage.getItem(adminSession) || 'false';
    let res;
    if(method === 'GET'){
        res = await fetch(url);
    }else{
        res = await fetch(url, {
            method,
            headers:{
                'Content-type':'application/json',
                'x-admin':isAdmin
            },
            body: JSON.stringify(data)
        });
    }

    return await res.json();
}