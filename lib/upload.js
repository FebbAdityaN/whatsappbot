const axios = require("axios");
const dotenv = require("dotenv");
const FileType = require('file-type');
const FormData = require("form-data");
dotenv.config();

exports.upload = async(buffer) => {
    let file = await FileType.fromBuffer(buffer);

    let form = new FormData();
    form.append('files[]', buffer, `tmp${Date.now()}.${file ? file.ext : ''}`);

    const result = await axios.post('https://uguu.se/upload', form, {
        headers: {
          ...form.getHeaders(),
        },
    });

   return result.data.files[0].url;
}