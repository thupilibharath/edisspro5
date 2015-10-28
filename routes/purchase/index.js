/**
 * Created by Bharath on 10/27/15.
 */
exports.buy = function(req,res){

    var product = req.body.productId;
    console.log('Id is '+product);
    var collection = db.collection('product_details');
    var sess = req.session;
    var shortid = require('shortid');
    var oid = shortid.generate();

    if(sess.username) {
        collection.find({Id: parseInt(product)}).toArray(function (err, rows) {
            if(err||rows.length==0){
                console.log(err);
            }else {
                var currQuan = rows[0].quantity;
                if (currQuan > 0) {
                    // Update Available Quantity
                    collection.update({Id: parseInt(product)},
                        {$set: {quantity: (currQuan - 1)}},
                        {multi: true},
                        function (err, updated) {
                            if (err || !updated) {
                                console.log('Error occured while updating quantity');
                                res.setHeader('Content-Type', 'application/json');
                                res.send(JSON.stringify({message: 'There was a problem with this action'}, null, 3));
                            }
                            else {
                                console.log('Quantity Updated');
                                var orders = db.collection('order_details');

                                orders.insert({orderId: oid, uname: sess.username, productId: parseInt(product)},
                                    function (err, rows) {
                                        if (err) {
                                            console.log('Order not Placed');
                                            res.setHeader('Content-Type', 'application/json');
                                            res.send(JSON.stringify({message: 'There was a problem with this action'}, null, 3));
                                        }
                                        else {
                                            console.log('Order Placed');
                                            res.setHeader('Content-Type', 'application/json');
                                            res.send(JSON.stringify({message: 'the purchase has been made successfully'}, null, 3));

                                        }
                                    }
                                );

                            }

                        }
                    );


                } else {
                    console.log('Required Product not Available');
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({message: 'that product is out of stock'}, null, 3));
                }
            }

        });
    }else {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({message: 'you need to login prior to buying a product'}, null, 3));
    }



};