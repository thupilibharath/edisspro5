/**
 * Created by Bharath on 9/11/15.
 */
exports.updateitems=function(req,res){

    try{
        console.log('*******UPDATE PRODUCTS---------');
    var sess = req.session;
    var id = '\''+req.body.productId+'\'';
    var groups = '\''+req.body.productDescription+'\'';
    var title = '\''+req.body.productTitle+'\'';

    var success = false;
    console.log('id is '+id);

    if(id=='\'\''&&sess.role=='admin'||groups=='\'\''&&sess.role=='admin'||title=='\'\''&&sess.role=='admin'){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({message:'There was a problem with this action'},null,3));
    }
    else if(sess.username&&sess.role=='admin') {
        var collection = db.collection('product_details');

        collection.update({Id:parseInt(req.body.productId)},
            {
                $set:
                {groups:req.body.ProductDescription,
                    tiile:req.body.productTitle
                }
            },
            {multi:true
            },
            function (err, updated) {
            if(err||!updated){
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({message:'There was a problem with this action'},null,3));
            }
            if (!err) {

                success = true;
                console.log('updated items');
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({message:'The product information has been updated'},null,3));
            }
            else {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({message:'There was a problem with this action'},null,3));

            }
        });
    }

    else{
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({message:'There was a problem with this action'},null,3));

    }}
    catch(ex){
        res.send(JSON.stringify({message: 'Error ccured'+ex}));
    }
};