let fs = require('fs');
const hmacSHA256 =require('./build/hmac-sha256');
// const Base64 =require('./build/enc-base64');



let cleanedData=null;
//同步读文件
try{
  let readStrData=fs.readFileSync('./clean_data.txt','utf8');
  cleanedData=dataHandle(readStrData);
}catch(err){
  console.log(err);
}


/* 数据处理后写成文件 */
function dataHandle(data){
  //字符串
  console.log(data)
  let arr=data&&data.split('\r\n');
  console.log(arr)
  //转化为数组
  let passwordArr=[];
   for(let i=0;i<arr.length;i++){
    var hash = hmacSHA256(arr[i], "salt").toString();
    // console.log(`${arr[i]}+${hash}`)
    passwordArr.push(`${arr[i]}:${hash}`)
   }
   //处理后的需要数据
  let strData=passwordArr.join('\n ');
  console.log(strData)
  return strData
}

//参数：路径 写入内容 返回函数
fs.writeFile('./password.txt',cleanedData,(err)=>{
  if(!err){
    console.log(cleanedData)
    console.log('成功~');
  }else{
    console.log(err);
  };
 });



