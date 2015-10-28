/**
 * Created by Bharath on 9/10/15.
 */

exports.register = function(req,res){

    console.log('*****REGISTER--------');
    var body = req.body;
    var data = body.number;
    //console.log('Received Data is'+ data);
    data = '';

    var regex = require("regex");
    var emailvalidator = new regex(/\S+@\S+\.\S+/);
    var zipvalidator = new regex(/(^\d{5}$)|(^\d{5}-\d{4}$)/);

    var squel = require("squel");
    var error=false;
    var success = false;
    var email = req.body.email;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var zip = req.body.zip;
    var uname = req.body.username;
    var pwd = req.body.password;

    console.log(email);
    console.log(fname);
    console.log(lname);
    console.log(address);
    console.log(city);
    console.log(state);
    console.log(zip);
    console.log(uname);
    console.log(pwd);

    //VALIDATION
    try{

    if(typeof email=='undefined'||email==''||emailvalidator.test(email)==true) {
        error=true;
        console.log('email error');
        console.log(emailvalidator.test(email));
    }

    if(typeof fname=='undefined'||fname==''||fname.length<2) {
        error=true;
        console.log('fname error');

    }

    if(typeof lname=='undefined'||lname==''||lname.length<2) {
        error=true;
        console.log('lname error');

    }

    if(typeof address=='undefined'||address==''||address.length<4) {
        error=true;
        console.log('address error');

    }

    if(typeof city=='undefined'||city==''||city.length<2) {
        error=true;
        console.log('city error');

    }

    if(typeof zip=='undefined'||zip==''||zipvalidator.test(zip)==true) {
        error=true;
        console.log('zip error');

    }

    if(typeof uname=='undefined'||uname=='') {
        error=true;
        console.log('uname error');

    }
    if(typeof pwd=='undefined'||pwd=='') {
        error=true;
        console.log('pwd error');

    }

    if(error==true){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({message:'there was a problem with your registration'},null,3));
    }


    data = data+' '+email+' '+fname+' '+lname+' '+address+' '+city+' '+state+' '+zip+' '+uname+' '+pwd;
    console.log(data);


    //Check if user already exists
        var collection = db.collection('user_details');
        if(error==false)
        {
        collection.find({$or: [{"uname":uname}, {$and:[{"fname":fname, "lname":lname}]},{$and:[{"uname":uname, "pwd":pwd}]} ]}).toArray(function (err, rows) {
            var exists = false;
            if(err){

            }
            else  {
                console.log('No error');
            }
            if (!err && rows.length > 0) {
                exists = true;
                console.log('User Exists');
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({message:'there was a problem with your registration'},null,3));
            }

            if (!err && exists == false && rows.length == 0) {
                //Insert to Database
                collection.insert({"email":email,"fname":fname,"lname":lname,"address":address,"city":city,"state":state,"zip":zip,"uname":uname,"pwd":pwd,"role":"normal"}, function (err, rows) {
                            if (!err) {
                                console.log('Insert Success');
                                res.setHeader('Content-Type', 'application/json');
                                res.send(JSON.stringify({message:'Your account has been registered '},null,3));

                            }

                            else {
                                console.log('Error while performing Insert' + err);
                                res.setHeader('Content-Type', 'application/json');
                                res.send(JSON.stringify({message:'there was a problem with your registration'},null,3));
                            }

                        });

            }
        });

    }

    }

    catch(ex){

        res.send(JSON.stringify({message:'there was a problem with your registration'}));
        //callback(ex);

    }
        //res.render('responsesuccess');
};