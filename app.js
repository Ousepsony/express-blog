//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");



const content = require(`${__dirname}/public/content.js`);
const date = require(`${__dirname}/public/date.js`)


const app = express();

var posts = [
  {heading:content.homeHeading,
  body:content.homeStarting,
  url:_.kebabCase(content.homeHeading)
}
]

var postURLs = []
postURLs.push(posts[0].url)

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));





app.get("/",(req,res)=>{
  res.render("home",{EJShomeContent:content.homeStarting,EJSposts:posts})
})

app.get("/about",(req,res)=>{
  res.render("about",{EJSaboutContent:content.about})
})
app.get("/contact",(req,res)=>{
  res.render("contact",{EJScontactContent:content.contact})
})
app.get("/compose",(req,res)=>{
  res.render("compose",{})
})
app.get("/posts/:postName",function(req,res){
  requestedURL = _.kebabCase(req.params.postName);

  for(q in posts){
    if(posts[q].url == requestedURL ){
      res.render("post",{EJSpostHeading:posts[q].heading,EJSpostBody:posts[q].body})
    }    
  }
  res.redirect("/")
})


app.post("/compose",(req,res)=>{

  var newPost = {
    heading: req.body.postHeading,
    url: date.url(_)+"-"+_.kebabCase(req.body.postHeading),
    body: req.body.postBody
  }

  for(i in postURLs){
    if(postURLs[i] == newPost.url){
      newPost.url += "-1"
    }
  }
  postURLs.push(newPost.url)
  posts.push(newPost);
  res.redirect("/");
  // console.log(newPost)

})


app.listen(3000, function() {
  console.log("Server started on port 3000");
  
});
