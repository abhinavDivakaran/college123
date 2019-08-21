const Express=require('express');

const Mongoose=require('mongoose');
var app= Express();
var bodyparser = require('body-parser');

var request=require('request');

app.set('view engine','ejs');

app.use(Express.static(__dirname+"/public"));
app.use(bodyparser.json());

app.use(bodyparser.urlencoded({extended:true}));
app.use(Express.urlencoded());

const student=Mongoose.model("studentdetails",
    {
        name:String,
        rollno:String,
        adno:String,
        college:String

    }


);

//Mongoose.connect("http://localhost:27017/studentsdb")

//Mongoose.connect("mongodb+srv://abhinavdivakaran:abhinavdivakaran@cluster0-ksuet.mongodb.net/test?retryWrites=true&w=majority");

Mongoose.connect("mongodb://localhost:27017/collegedb");    

app.get('/',(req,res)=>{

    res.render("index");


});


app.post('/',(req,res)=>{

    console.log(req.body);

    var studentobj=new student(req.body);
    var result=studentobj.save((error,data)=>{//error indengil mathram ee condition kodukkanam.
        console.log(data);
    });

    // res.send(result);


//     var name= req.body.name;
//     var rollno= req.body.rollno;
//     var adno= req.body.adno;
//     var college= req.body.college;
//    console.log("Name :"+ name);
//    console.log("Rollno :"+rollno);
//    console.log("Adno :"+adno);
//    console.log("College :"+college);
});


app.get('/getdetailsapi/:name',(req,res)=>{

    var nam=req.params.name;
    student.find({name:nam},(error,data)=>{
        if(error){
            throw error;
        }
        else{
            res.send(data);
        }
    });
});

app.get('/getdata',(req,res)=>{
    result=student.find((error,data)=>{
        if(error){
            throw error;
        }
        else{
            res.send(data);
        }
    }

    )});
                const getdataapi="http://localhost:3456/getdata"//ivideaanu calling nadakkunnath.


app.get('/view',(req,res)=>{
   
    request(getdataapi,(error,response,body)=>{
        var data=JSON.parse(body);

        console.log(data)

        res.render('view1',{'data':data});


    });

});


app.listen(process.env.PORT || 3456,()=>{
    console.log("Working Server...::3456...");
});
