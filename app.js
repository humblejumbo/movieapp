
var express=require("express");
var app=express();
require('dotenv').config();
var request=require("request");
var bodyparser=require("body-parser");

app.use(bodyparser.urlencoded({extended:true}));

app.get('/',function(req,res)
{
    res.render("home.ejs");
});

app.get('/type',function(req,res){
    
    res.render("type.ejs");
});

app.get('/search',function(req,res)
{
    var string=req.query.search;
    var url="https://api.themoviedb.org/3/search/movie?api_key="+process.env.API+"&query=" + string;
    //console.log(url);
    request(url,function(error,response,body){
        if(!error && response.statusCode==200)
        {
            var parsedData=JSON.parse(body);
             var results=parsedData.results;
            
            res.render("search.ejs",{results:results});

        }
     });
 
});
app.listen(process.env.PORT,process.env.IP,function()
{
    console.log("SERVER HAS STARTED");
});