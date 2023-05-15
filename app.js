const express= require("express");
const bodyParser= require("body-parser");
const request = require("request");
const https= require("https");


const app= express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/sign-up.html");
});

app.post("/",function(req,res){
    const firstname= req.body.Fname;
    const lastname= req.body.Sname;
    const email= req.body.Email;
    const data={
        members:[
            {
                email_address: email,
                status:"subscribed",
                merge_fields:{
                    FNAME: firstname,
                    LNAME: lastname,
                }
            }
        ]
    };
    // const jsonData= JSON.stringify(data);
    // const url="https://us21.admin.mailchimp.com/3.0/lists/bb47d39090"

    // const options={
    //     method: "POST",

    // }
    const client = require("@mailchimp/mailchimp_marketing");

    client.setConfig({
    apiKey: "05fc47dd63c6666975405fc622ea4e06-us21",
    server: "https://us21.admin.mailchimp.com",
    });

    const run = async () => {
    const response = await client.lists.getList("bb47d39090");
    console.log(response);
    };

    run();


    // const request =https.request(url,options,function(response){
    //     response.on("data", function(response){
    //         console.log(JSON.parse(data));
    //     })

    // })
    // request.write(jsonData);
    // request.end();


})
app.listen(3000, function(){
    console.log("server started.");
});


//name = DD-Newsletter
