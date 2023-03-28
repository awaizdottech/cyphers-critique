import React from 'react'
import { StudentContextC } from '../contexts/StudentContext'

export default function Addform(props) {
const {student,setStudent}  = StudentContextC()
console.log(student)
 setStudent(arr=>{
    return {...arr,[props.index]:{...props.details}}
 })
}
