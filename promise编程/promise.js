//状态只能改变一次 可以加判断是否为pending
function Promise(exector) {
    //改变状态和返回值
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    this.callbacks = [];
    let onResolve = (data) => {
        if (this.PromiseState !== 'pending') return;
        this.PromiseState = 'fulfilled';
        this.PromiseResult = data;
        // this.callback.value && this.callback.value(data);
        setTimeout(()=>{
            this.callbacks.forEach((item) => {
                item.value(data);
            })
        })
    }
    let onReject = (data) => {
        if (this.PromiseState !== 'pending') return;
        this.PromiseState = 'rejected';
        this.PromiseResult = data;
        // this.callback.reason && this.callback.reason(data);
        setTimeout(()=>{
            this.callbacks.forEach((item) => {
                item.reason(data);
            })
        })
        //then方法 微任务的异步调用实现
    }
    //Promise传入回调同步立即执行 处理throw抛出异常
    try {
        exector(onResolve, onReject);
    } catch (error) {
        onReject(error);
    }

}
//异常穿透的实现
//then()方法的返回值 是一个promise对象
//解决多个then方法执行问题 在exector函数是异步执行的情况下 callback会出现覆盖的现象 因此不能执行全部callback函数 所以要用一个数组存起来 遍历执行
Promise.prototype.then = function (value, reason) {
    /*
    以下两个判断可以解决exector函数同步调用的问题 但异步调用还没解决 因此需要引入第三个判断
    */
    if(typeof reason !== 'function'){
         reason = reason =>{
            throw reason;
        }
    }
    if(typeof value !== 'function'){
         value = value =>{
            return value;
        }
    }
    return new Promise((resolve, reject) => {
        //这个promise对象的状态由里面的回调函数执行结果决定
        let callback = type => {
            //  console.log(this);
            try {
                let result = type(this.PromiseResult);
                if (result instanceof Promise) {
                    result.then(v => {
                        resolve(v);
                    }, r => {
                        reject(r);
                    })
                } else {
                    resolve(result);
                }
            } catch (error) {
                reject(error);
            }
        }
        if (this.PromiseState === 'fulfilled') {
            // console.log(this);
            setTimeout(()=>{
                callback(value);
            })
        }
        if (this.PromiseState === 'rejected') {
            setTimeout(()=>{
                callback(reason);
            })
            
        }
        if (this.PromiseState === 'pending') {
            //保存这两个回调函数
            this.callbacks.push({
                value:() => {
                    callback(value);
                },
                reason:() => {
                    callback(reason);
                }
            })
        }
    })
}
/**
 * catch()的实现其实就是then()方法的阉割版
 * 返回一个promise对象 因为then方法已经完善了 可直接使用
 *
 */
Promise.prototype.catch = function(reason){
    return this.then(undefined,reason);
}
Promise.resolve = function(value){

    return new Promise((resolve,reject)=>{
        if(value instanceof Promise){
            value.then(v=>{
                resolve(v);
            },
                r=>{
                    reject(r);
                })
        }else{
            resolve(value);
        }
    })
    
}
Promise.reject = function(reason){
    return new Promise((resolve,reject)=>{
        reject(reason);
    })
}
/**
 * 
 * 接收一个promise数组 如果数组里的promise全部为成功 就是成功 且返回的promise结果值为这些promise的结果值
 * 如果有一个promise为失败 那么这个返回的promise状态为失败 且结果值为这个失败的promise对象
 */
Promise.all = function(promises){
    let count = 0;
    let arr = [];
    return new Promise((resolve,reject)=>{
        for(let i = 0; i<promises.length;i++){
            promises[i].then(v=>{
                count++;
                arr[i] = v;
                if(count === promises.length){
                    resolve(arr);
                }
            },r=>{
                reject(r);
            })
        }
    })
}
/**
 * 
 * 谁先改变状态就返回谁的结果
 */
Promise.race = function(promises){
    return new Promise((resolve,reject)=>{
        for(let i = 0;i<promises.length;i++){
            promises[i].then(v=>{
                resolve(v);
            },r=>{
                reject(r);
            })
        }
    })
}