function myModule(){
    var msg = 'asdfgh';
    function myFirstMethod(){
        console.log('myFirstMethod()'+ msg.toLowerCase());
    }
    function mySecondMethod(){
        console.log('mySecondMethod()'+ msg.toUpperCase());
    }
    // 暴露出对象/函数 给外部使用
    return {
        myFirstMethod,
        mySecondMethod
    }
}
(function myModule2(w){
    var msg = 'asdfgh';
    function myFirstMethod(){
        console.log('myFirstMethod()'+ msg.toLowerCase());
    }
    function mySecondMethod(){
        console.log('mySecondMethod()'+ msg.toUpperCase());
    }
    // 暴露出对象/函数 给外部使用
    w.myModule2 = {
        myFirstMethod,
        mySecondMethod
    }
})(window);