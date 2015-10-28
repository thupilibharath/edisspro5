/**
 * Created by Bharath on 9/3/15.
 */

exports.loginsuccess = function(req, res){
    try {
        console.log('*****LOGIN------------');
        var uname1;
        var pwd1;
        var uname = req.body.username;
        console.log(uname);
        var temp = '\'' + uname + '\'';
        var pwd = req.body.password;
        console.log(pwd);

        var sess = req.session;
        sess.username = uname;

        console.log('sessionID  ' + sess.id);
        console.log(sess.cookie.maxAge);

        var collection = db.collection('user_details');

        var size;
        // Query DB

        collection.find({"uname":uname}).toArray(function (err, rows) {
            if (!err&&rows.length == 0) {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({err_message: 'That username and password combination was not available'},null,3));
            }
                    else if (!err && rows.length > 0) {
                        console.log('The solution is: ', rows);
                        uname1 = rows[0].uname;
                        pwd1 = rows[0].pwd;
                        var role = rows[0].role;
                        sess.role = role;

                        if (uname1 == uname && pwd1 == pwd && role == 'admin' && sess.username) {// Admin user; fetch details of normal users
                            res.setHeader('Content-Type', 'application/json');
                            res.send(JSON.stringify({
                                menu: '{/updateInfo , /logout, /getProducts, /viewUsers, /modifyProducts}'
                            },null,3));

                        }

                        else if (uname1 == uname && pwd1 == pwd && role == 'normal' && sess.username) {
                            res.setHeader('Content-Type', 'application/json');
                            res.send(JSON.stringify({
                                menu: '{/updateInfo , /logout, /getProducts,}'
                            },null,3));
                        }
                        else {
                            res.setHeader('Content-Type', 'application/json');
                            res.send(JSON.stringify({err_message: 'That username and password combination was not available no matches'},null,3));
                        }
                    }
                    else{
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify({err_message: 'Error while performing query'},null,3));
                    console.log(err);
                    }
                });



    }
    catch(ex){
        console.log('Exception Occured'+ex);
    }

};
