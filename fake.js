const Youtube = require('youtube-api');
const ytdl = require('ytdl-core');

async function test(){
    const url = "https://www.youtube.com/watch?v=x8C8MDfpKUY"

    console.log(url);

    var vid = await ytdl.getVideoID(url);

    console.log(vid)
    
    var a = await Youtube.search({"id": {"videoId": vid}})

    console.log(a)
}

test()