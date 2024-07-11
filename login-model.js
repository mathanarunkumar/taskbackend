const mongoose =  require("mongoose");

const dataschema = mongoose.Schema({ 
    EmailId: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    }
});
module.exports = mongoose.model("user",dataschema);