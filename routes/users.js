

/* GET users listing. */
exports.list = function(req, res){
  try {
    console.log('*****VIEW USERS--------')
    var sess = req.session;

    var fname, lname;

    console.log(req.query.fname);
    console.log(req.query.lname);

    //Validation
    if (typeof req.query.fname == 'undefined')
      fname = '.*';
    else
      fname = '.*' + req.query.fname + '.*';

    if (typeof req.query.lname == 'undefined')
      lname = '.*';
    else
      lname = '.*' + req.query.lname + '.*';

    console.log('fname is ' + fname);
    console.log('lname is ' + lname);


    if (sess.username && sess.role == 'admin') {
      var collection = db.collection('user_details');
      collection.find({$and:[{fname:{$regex:fname}},{lname:{$regex:lname}}]}, {
        _id:0,fname:1,lname:1}).toArray(function (err, rows) {
            if(!err) {
              res.setHeader('Content-Type', 'application/json');
              res.send(JSON.stringify({user_list: rows},null,3));
            }
            else
            {
              res.setHeader('Content-Type', 'application/json');
              res.send(JSON.stringify({message: 'No users for the given criteria are available'},null,3));
              }
          }

      );
    }
    else {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({message: 'You are not authorized to perform this operation'},null,3));
    }
  }
  catch(ex){
    res.send(JSON.stringify({message: 'Error occured'+ex}));
  }

};
