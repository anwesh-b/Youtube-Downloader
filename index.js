// const fs = require('fs');
const ytdl = require('ytdl-core');
const express = require('express');
const app = express();
const port = process.env.PORT||3000;
const bodyParser = require('body-parser');


app.set('view engine','ejs'); 
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/',(req,res)=>{
	res.render("index.ejs",{valid:""})
})

app.post('/video',async (req,res)=>{
	
	if(!req.body.url){
		res.render("index.js",{valid:"You need to enter URL"})
	}

	format = (req.body.filter === "audioandvideo")? "mp4" : "mp3";
	
	let validate = ytdl.validateURL(req.body.url);
	if(!validate) {
		res.render("index.ejs",{valid:"Please enter valid URL"});
	}
	else{
		res.attachment(`video.${format}`);	
		const stream = ytdl(req.body.url, {filter:req.body.filter} , {quality:req.body.quality})
		stream.on('Error', error => {
			logger.error('Error occurred while streaming video', error);
			res.status(502);
		})

		stream.pipe(res)
	}
});

app.listen(port,()=>{
	console.log(`Server is created at port ${port}`);
})

