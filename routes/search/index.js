/**
 * Created by Bharath on 9/10/15.
 */
exports.search = function(req,res){
    try{
        console.log('********SEARCH-------');
    var sess = req.session;
    console.log('Remaining Time'+sess.cookie.maxAge);

    var id = req.query.productId;
    var categories = req.query.category;
    var title = req.query.keyword;

    console.log('id is '+id);

        //Validation
        if(typeof id=='undefined')
        id='/.*/';
        if(typeof categories=='undefined')
        categories='.*';
        else
        categories = '.*'+categories+'.*';

        if(typeof title=='undefined')
        title='.*';
        else
        title = '.*'+title+'.*';

        var collection = db.collection('product_details');

        console.log(typeof(id));
        console.log(id+categories+title);
        //Search the DB
            collection.find({$and: [{Id:parseInt(id)}, {categories:{$regex:categories}},
              {title:{$regex:title}} ]}).toArray(function(err, rows) {
                    if(err)
                        console.log(err);
                    if(rows.length==0){
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify({product_list:rows}, null,3));
                    }
                    else if(!err && rows.length > 0){
                        console.log('displaying results');
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify({product_list:rows}, null,3));

                    }
                }
            );
    }
    catch(ex){
        res.send(JSON.stringify({message: 'Error Occured'+ex}));
    }

        };
