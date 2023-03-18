'use strict';

import mongoose from 'mongoose'
const { Schema, SchemaTypes } = mongoose;
const login = new Schema({
    email:{
        type:SchemaTypes.String,
        required:true
    }
})

export default mongoose.model('student',login)