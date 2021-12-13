var mod2 = require('./craw_final.js');

// 做了哪些debug： 更改process.env.PORT

// 以 Express 建立 Web 伺服器
var fs = require('fs');
var express = require("express");
var app = express();

// 允許跨域使用本服務
var cors = require("cors");
app.use(cors());

// Web 伺服器的靜態檔案置於 public 資料夾
app.use( express.static( "public" ) );

// 以 body-parser 模組協助 Express 解析表單與JSON資料
var bodyParser = require('body-parser');
// const { futimes, fstat } = require("fs");
// const { setTimeout } = require('timers/promises');
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended: false}) );

// 一切就緒，開始接受用戶端連線
app.listen(process.env.PORT|| 3333);
// app.listen(3333);
console.log("Web伺服器就緒，開始接受用戶端連線.");
console.log("鍵盤「Ctrl + C」可結束伺服器程式.");

// ---------------

// app.get("/hello/:text", function (request, response) {
// 	// 模擬程式三秒鐘延遲
// 	var stop = new Date().getTime();
//     while(new Date().getTime() < stop + 3000) {
//         ;
//     }	
	
// 	response.send("Hello! " + request.params.text);
// });


app.get('/get', function(req, res){

	res.download("./demo.zip")
	
	
	
	// console.log("getok");
	// res.setHeader("ContentType","application/txt");
	// res.setHeader("Content-Disposition","attachment");
	// console.log(res.header());
	
    // res.download('_LabSteps.txt',(err)=>{
	// 	if(err){
	// 		console.log(err);
	// 		console.log(res.headersSent);
			
	// 	}else{
			
	// 		console.log("no err");
	// 	}
	// });
});

app.post("/test2", function (request, response) {
	
	// console.log("getPost");
	var url = request.body.account;
	async function test(){
		// console.log("before");
		// var modobj = await mod2(url);
		try{
			var modobj = await mod2(url);
			console.log("craw-ok");
			response.send("true");
		}
		catch(err){
			console.error(err);
			console.log("craw-fail");
			response.send("fail");
		}
	}
	test();
	// new mod2(firstName);
	

	// async function waittogo(){
	// 	console.log("before await");
	// 	await mod2(firstName);
	// 	console.log("after await");
	// 	response.send(firstName);
	// }
	// waittogo();
	

	// 最後辦法
	//setTimeout(response.send(firstName),10000);
	
	// response.redirect("/get")
	// response.setHeader('Content-Disposition', 'attachment; filename=file.zip');
	// response.setHeader('Content-type',' application/txt');
	// response.setHeader(('Content-Type', 'application/octet-stream'));
	// response.download("./_LabSteps.txt");
	// response.getHeader;
	// response.download("./_LabSteps.txt",(err)=>{
	
	// 	if(err){
	// 		console.log(err);
	// 		console.log("------------");
	// 		console.log(response.headersSent);
	// 	}else{
	// 		console.log("OK");
	// 	}
	// });
	
	//response.send(firstName + " ");
		
});

// 引入函式 可能要解決同步問題


