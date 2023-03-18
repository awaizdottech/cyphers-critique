'use strict';

import mongoose from 'mongoose'
const { Schema, SchemaTypes } = mongoose;
const feedback = new Schema({
    lecturer:{
        type:SchemaTypes.String,
        required:true
    },
    subjects:{
        type:SchemaTypes.Array,
        required:true
    }
})

export default mongoose.model('itlecturer',feedback)

// subject:{
//     type:String,
//     lowercase:true
// },
// subjectKnowledge:Number,
// preparednessAndPresentation:Number,
// uniformityOfCoverage:Number,
// problemSolving:Number,
// regularity:Number,
// studentParticipation:Number,
// doubtClearing:Number,
// teachersCommitment:Number,
// evaluationProcedures:Number,
// overallRating:Number,
// suggestions:String