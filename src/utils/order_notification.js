const dotenv = require('dotenv').config();
const base64url = require('base64url');
const crypto = require('crypto');
const request = require('request')
const nodemailer = require('nodemailer')

var transport = nodemailer.createTransport({
    service: process.env.SERVICE,
    
    auth: {
      user:  process.env.USER_NAME,
      pass:process.env.PASS
    }
  });
function randomStringAsBase64Url(size) {
    return base64url(crypto.randomBytes(size));
  }
  const uniqueRandomID = randomStringAsBase64Url(10)



exports.Sendsms = (fullname,Fooddetails,address,phone,token) =>{

    for(let i =0; i < Fooddetails.length; i++){

        const sms = `Hello, ${fullname} made the following Order: Foodname: ${Fooddetails[i]['food_name']}, Quantity: ${Fooddetails[i]['quantity']}, Vendor: ${Fooddetails[i]['restuarant_name']}, Address: ${address}, Phone_Number: ${phone} . The token to receive the Food is: ${token}.The Unique Food Id is : ${uniqueRandomID}`
        
        var data = {
            "to":"2348109616221",
            "from":"TasteClan",
            "sms":sms,
            "type":"plain",
            "api_key": process.env.TERMII_API_KEY,
            "channel":"generic",
            
        };
        var options = {
        'method': 'POST',
        'url': 'https://api.ng.termii.com/api/sms/send',
        'headers': {
        'Content-Type': ['application/json', 'application/json']
        },
        body: JSON.stringify(data)

        };
        request(options, function (error, response) { 
        if (error) throw new Error(error);
        console.log(response.body);
        });

    }


}






exports.Sendorderdetails = (fullname,Fooddetails, address,phone) =>{

    for(let i =0; i < Fooddetails.length; i++){

        
    const output = ` 
        <p>You have a new Order</p>
        <h3> Order Details</h3>
        <ul>
            <li>Name: ${fullname}</li>
            <li>Food: ${Fooddetails[i]['food_name']} </li>
            <li>Quantity: ${Fooddetails[i]['quantity']}</li>
            <li>Vendor: ${Fooddetails[i]['restuarant_name']}</li>
            <li> Address: ${address} </li>
            <li> Food Id: ${uniqueRandomID} </li>
            <li> Sub Total: ${Fooddetails[i]['total']}</li>
            <li> Phone: ${phone}</li>
        </ul>
    `
    


    
    /*
    const output = ` 
        <p>You have a new Order</p>
        <h3> Order Details</h3>
        <ul>
            <li>Name: ${first_name} ${last_name}</li>
            <li>Food: ${Fooddetails[key]} </li>
            <li>Vendor: ${key}</li>
            <li> Address: ${address} </li>
            <li> Food Id: ${uniqueRandomID} </li>
        </ul>
    `
    
   
    const output = ` 
        <p>You have a new Order</p>
        <h3> Order Details</h3>
        <ul>
            <li>Name: ${first_name} ${last_name}</li>
            <li> Address: ${address} </li>
            <li>Order: ${Fooddetails} </li>
            <li>Food Id: ${uniqueRandomID} </li>
        </ul>`
    */
    
    message = {
        from: "info.tasteclan@gmail.com",
        to: "info.tasteclan@gmail.com",
        subject: 'TasteClan',
        html: output}
   
    
    transport.sendMail(message,(err,info)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(info)
        }
    })

}

    return
}
