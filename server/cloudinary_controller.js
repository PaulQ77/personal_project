const cloudinary = require('cloudinary');
module.exports = {
    upload: (req, res) => {
        //Define your credentials
        //Define the timestamp
        const timestamp = Math.round(new Date().getTime() / 1000);
        ///use your cloudinary api secret.

        const api_secret = process.env.CLOUDINARY_API_SECRET;
        // console.log('API_SECRET---------', process.env.CLOUDINARY_API_SECRET);
        //Use cloudinary helper library to validate timestamp, and secret.
        //THis signs the timestamp with your api secret.
        const signature = cloudinary.utils.api_sign_request({ timestamp: timestamp }, api_secret);
        ///Here is the created signature.
        //We passing the payload in form of a object to the frontend where we append to our formData which we will post to our cloudinary database.
        const payload = {
            signature: signature,
            timestamp: timestamp
        };
        console.log(payload)
        res.json({payload});
    }
}