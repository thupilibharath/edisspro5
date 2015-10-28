/**
 * Created by Bharath on 10/20/15.
 */


/*
 lineReader will extract the records from amazon-meta.txt one at a time as
 file is too large to read all at once.  In order to add records to a database you need to add code below to insert records

 This code depnds on "line-reader"

 You need to install line-reader by using the following command:
 npm install line-reader

 */
var lineReader = require('line-reader');
var mysql      = require('mysql');
var squel      = require('squel');
var fs         = require('fs');

var record = new Object();
record.categories = [];
var jsonRecord;
var already = false;
var categories = false;
var stop = 0;var data;var query;
var fd = fs.openSync('amazondata.txt', 'w');

lineReader.eachLine('amazon-meta.txt', function(line, last) {
        if (line.indexOf("Id:") >= 0) {
            var subStr = line.substring(line.indexOf("Id:") + 3, line.indexOf("\r")).trim();
            record.Id = subStr;

            if (already) {

                //create JSON object for complete record
                //jsonRecord = JSON.stringify(record);
                //console.log('****-----');
                //console.log(record.Id);
                //console.log(record.ASIN);
                //console.log(record.title);
                //console.log(record.group);
                //console.log(record.categories);
                //console.log('----******');

                var newcat = record.categories.toString();
                if (typeof record.Id == 'undefined')
                    record.Id = '';
                else {
                    var newId = record.Id - 1;
                    console.log('newID -------> ' + newId);
                    record.Id = newId;
                }
                if (typeof record.ASIN == 'undefined')
                    record.ASIN = '';
                if (typeof record.title == 'undefined')
                    record.title = '';
                if (typeof record.group == 'undefined')
                    record.group = '';
                if (typeof newcat == 'undefined')
                    newcat = '';

                var newstr = newcat.replace(/'/g, '');
                var titile = record.title.replace(/'/g, '');

                data = JSON.stringify({
                    Id: record.Id,
                    ASIN: record.ASIN,
                    title: titile,
                    categories: newstr,
                    description: "",
                    quantity: 10
                });
                //console.log(data);
                query = "db.product_details.insert(" + data + ")";
                console.log(query);
                fs.appendFile('amazondata.txt', query.toString() + ';' + '\n', function (err) {
                    if (err) {
                        console.error("Could not write file: %s", err);
                    }
                });
                stop++;

                /****************************************
                 *****************************************
                 add code to insert record in your db here
                 *****************************************
                 ****************************************/


                    //reinitialize record and add Id value
                record = new Object();
                record.categories = [];
                record.Id = subStr;


            } else {
                //For the first record read Id and record it
                var subStr = line.substring(line.indexOf("Id:") + 3, line.indexOf("\r")).trim();
                record.Id = subStr;

                //inidicate that the Id value has been captured so that the next Id value indicates end of current record
                already = true;
                //console.log(record.Id);
            }

        }

        if (line.indexOf("ASIN:") >= 0) {
            //record the ASIN
            var subStr = line.substring(line.indexOf("ASIN:") + 5, line.indexOf("\r")).trim();
            record.ASIN = subStr;
            //console.log(record.ASIN);
        }

        if (line.indexOf("title:") >= 0) {
            //record the title
            var subStr = line.substring(line.indexOf("title:") + 6, line.indexOf("\r")).trim();
            record.title = subStr;
        }

        if (line.indexOf("group:") >= 0) {
            //record the group
            var subStr = line.substring(line.indexOf("group:") + 6, line.indexOf("\r")).trim();
            record.group = subStr;
        }

        if (line.indexOf("categories:") >= 0 || line.indexOf("reviews:") > 0 || categories) {
            //Check if there are more categories to record and make sure we haven't started reading reviews
            if ((line.indexOf("categories:") >= 0 || categories) && !(line.indexOf("reviews:") > 0)) {
                //record the categories -- there might be more than one category so have to continue reading until we get to "reviews"
                var subStr = line.substring(line.indexOf("categories:") + 11, line.indexOf("\r")).trim();
                record.categories.push(subStr);
                categories = true;
            } else {
                categories = false;
            }
        }
        // already=true;
        if (last) {
            return false; // stop reading
        }
});
