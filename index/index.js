'use strict'

if (typeof(cache) === 'undefined') {
    var cache = require('./cache');
 }
 
 // List of subjects
 var subjectList;

// Calls the banner proxy and returns the list of subjects 
async function getSubjects() {
    let bannerParams = {
        "school": "temple",
        "term": 202036,
        "method": "getSubjects",
        "params": {
            "term": 202036,
            "subject": "MATH",
            "offset": 0,
            "pageSize": 25
        }
    };
    
     let input = {
            FunctionName: 'arn:aws:lambda:us-east-2:741865850980:function:banner-proxy:live',
            InvocationType: 'RequestResponse',
            Payload: JSON.stringify(bannerParams)
        };

    try {
        let data = await cache.bannerLambda.invoke(input).promise();
        data.Payload = data.Payload.replace(/\+/g, '');
        return JSON.parse(data.Payload);

    }
    catch (err) {
        console.log(err);
        return err;
    }
}

// Loops through subjects and calls subjectLambda for each one
async function update(params) {
    for(var index = 0; index < params.length; index++) {
        let temp = {
            "subject": String(params[index].code)
        };
        
        let param = {
            FunctionName: 'arn:aws:lambda:us-east-2:741865850980:function:updateSubject',
            InvocationType: 'Event',
            Payload: JSON.stringify(temp)
        };      
        await cache.subjectLambda.invoke(param).promise();
    }
}

exports.handler = async (event) => {
     
    // Gets all the subjects
    if(typeof subjectList == "undefined") {
         subjectList = await getSubjects();
         console.log("Cache Miss");
    } else {
        console.log("Cache Hit");
    }
   
    // Gets all the classes for each subject
    await update(subjectList);
};
