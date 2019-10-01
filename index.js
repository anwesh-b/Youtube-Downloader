const fs = require('fs');
const ytdl = require('ytdl-core');
const express = require('express');
const app = express();
const port = process.env.PORT||80;
const bodyParser = require("body-parser");


app.set('view engine','ejs'); 
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/',(req,res)=>{
	res.render("index.ejs",{valid:""})
})

app.post('/video',(req,res)=>{
	const url = req.body.url;

	if(req.body.filter === "audioandvideo") format = "mp4";
	else if(req.body.filter === "audioonly") format = "mp3";
	
	const path = "video."+format;
	
	let validate = ytdl.validateURL(url);
	if(!validate) {
		res.render("index.ejs",{valid:"Please enter valid URL"});
	}
	else{
		const stream = ytdl(url, {filter:req.body.filter} , {quality:req.body.quality})
		const options = fs.createWriteStream(path)
	
		stream.on('Error', error => {
			logger.error('Error occurred while streaming video', error);
			res.status(502);
		})
			
		stream.pipe(options)
		res.redirect('/');
	}
});

app.listen(port,()=>{
	console.log(`Server is created at port ${port}`);
})

