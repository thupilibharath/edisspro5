/**
 * Created by Bharath on 9/4/15.
 */

exports.updatedetails = function(req, res){

    console.log('*******UPDATE USER DETAILS-------');
    var sess = req.session;
    data = '';
    var squel = require("squel");
    var mysql = require('mysql');

    var success = false;


            if(!sess.username){
                console.log('Unauthorized user');
                res.send(JSON.stringify({message:'There was a problem with this action'}));
            }

            else {
                var collection = db.collection('user_details');
                console.log('User is '+sess.username);
                collection.find({uname:sess.username}).toArray(function(err, rows) {
                    if(!err){
                        var email = rows[0].email;
                        var fname = rows[0].fname;
                        var lname = rows[0].lname;
                        var address = rows[0].address;
                        var city = rows[0].city;
                        var state = rows[0].state;
                        var zip = rows[0].zip;
                        var uname = rows[0].uname;
                        var pwd = rows[0].pwd;

                        //Update content based on existing details
                                if(!sess.username){
                                    console.log('Unauthorized user');
                                    res.setHeader('Content-Type', 'application/json');
                                    res.send(JSON.stringify({message:'There was a problem with this action'},null,3))
                                }

                                else {

                                    if(typeof req.body.email!='undefined')
                                        email = req.body.email;
                                    if(typeof req.body.fname!='undefined')
                                        fname = req.body.fname;
                                    if(typeof req.body.lname!='undefined')
                                        lname = req.body.lname;
                                    if(typeof req.body.address!='undefined')
                                        address = req.body.address;
                                    if(typeof req.body.city!='undefined')
                                        city = req.body.city;
                                    if(typeof req.body.state!='undefined')
                                        state = req.body.state;
                                    if(typeof req.body.zip!='undefined')
                                        zip = req.body.zip;
                                    if(typeof req.body.username!='undefined')
                                        uname = req.body.username;
                                    if(typeof req.body.password!='undefined')
                                        pwd = req.body.password;

                                    collection.update({uname:sess.username},
                                        {$set:{"email":email,"fname":fname,"lname":lname,"address":address,
                                            "city":city,"state":state,"zip":zip,
                                            "uname":uname,"pwd":pwd,"role":"normal"}},
                                        {multi:true},
                                        function(err, rows) {
                                        if(!err){
                                            console.log('Update Success');
                                            success=true;
                                            res.setHeader('Content-Type', 'application/json');
                                            res.send(JSON.stringify({message:'Your information has been updated'},null,3));
                                        }
                                        else {
                                            res.setHeader('Content-Type', 'application/json');
                                            res.send(JSON.stringify({message: 'There was a problem with this action'}, null, 3));
                                        }


                                    });


                                }
                                sess.username = uname;
                    }
                    else{
                        console.log('Error while fetching existing records');
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify({message:'There was a problem with this action'},null,3));
                    }

                });


            }

};


