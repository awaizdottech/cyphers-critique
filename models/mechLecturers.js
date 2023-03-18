'use strict';

import mongoose from 'mongoose'
const { Schema, SchemaTypes } = mongoose;
const data = new Schema({
    lecturer:{
        type:SchemaTypes.String,
        required:true
    },
    subjects:{
        type:SchemaTypes.Array,
        required:true
    }
})
export default mongoose.model('mechLecturer',data)