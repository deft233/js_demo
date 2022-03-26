function fun1(number){
    return number<=2?1:fun1(number-1)+fun1(number-2);
}
var onmessage = function(event){
    var res = fun1(event.data);
    postMessage(res);
}
