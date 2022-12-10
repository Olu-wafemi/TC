const got= require('got')

const request = require('request')
const base64url = require('base64url');
const crypto = require('crypto');

function randomStringAsBase64Url(size) {
    return base64url(crypto.randomBytes(size));
  }
const uniqueRandomID = randomStringAsBase64Url(10)



exports.makepayment = async(total, fullname,phone, email)=>{
    const response = await got.post("https://api.flutterwave.com/v3/payments", {
        headers: {
            Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
        },
        json: {
            tx_ref: uniqueRandomID,
            amount: total,
            currency: "NGN",
            redirect_url: 'https://tasteclanpyserver.herokuapp.com/complete',
            meta: {
                consumer_id: 23,
                consumer_mac: "92a3-912ba-1192a"
            },
            customer: {
                email: email,
                phonenumber: phone,
                name: fullname
            },
            customizations: {
                title: "TasteClan",
                logo: "https://ik.imagekit.io/2x9hiaurm/logos_yaOc4W5hR.png?ik-sdk-version=javascript-1.4.3&updatedAt=1659716523166"
            }
        }
    }).json();
    return response.data.link

}