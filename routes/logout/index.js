/**
 * Created by Bharath on 9/5/15.
 */

exports.logoutuser = function(req,res){
    if(req.session.username){
        console.log('******LOGOUT------');
        req.session.destroy(function(err){
            if(err){
                console.log(err);
            }
            else
            {
                res.send(JSON.stringify({message:'You have been logged out'}));
            }
        });
    }
    else
        res.send(JSON.stringify({message:'You are currently not logged in'}));

};