function myajax(){
    return new Promise((resolve,reject)=>{
        let xhr = new XMLHttpRequest();
       xhr.open('GET','https://api.apiopen.top/getJoke');
       xhr.responseType('json');
       xhr.send();
       xhr.onreadystatechange = function(){
           if(xhr.readyState === 4){
                if(xhr.status>=200&&xhr.status<300){
                    // console.log(xhr.response);
                    resolve(xhr.response)
                }else{
                    // console.log(xhr.status);
                    reject(xhr.status)
                }
           }
       }
       })
}
myajax().then(value=>{
    console.log(value);
},reason=>{
    console.log(reason);
})