/**
 * 自定义一个函数mineReadFile()
 * 接收一个参数path 文件路径
 * 返回一个promise对象
 * 使用这个对象的then方法 自定义回调函数进行输出
 */
function mineReadFile(path){
    return new Promise((resolve,reject)=>{
        require('fs').readFile(path,(err,data)=>{
            if(err) reject(err);
            resolve(data);
        })
    })
}
mineReadFile('../resourse/content.txt').then(value=>{
    console.log(value.toString())
},reason=>{console.log(reason);})