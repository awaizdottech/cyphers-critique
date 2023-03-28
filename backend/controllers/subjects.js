function dataGiver(arr, yr)
{
    let subjects = []
    let a = {}
    arr.forEach(lecturerObj => {
        lecturerObj.subjects.forEach( subObj => {
            if(subObj.yr == yr)
            {
                a.lecturer = lecturerObj.lecturer
                a.subject = subObj.subject
                subjects.push( Object.assign({},a) )
            }
        } )
    });
    return subjects
}

const collection =
[{
        lecturer:'awaiz',
        subjects:[
            {
                subject:'abc',
                yr:1,
                section:'b',
                sem:2,
                feedback:[ [1,2,3,4,5,4,3,2,1,2,'bad'], [5,4,3,2,1,2,3,4,5,4,'very bad'], ]
            },
            {
                subject:'def',
                yr:2,
                section:'a',
                sem:3,
                feedback:[ [5,4,3,2,1,2,3,4,5,4,'good'], [1,2,3,4,5,4,3,2,1,2,'bad'] ]
            },
        {
            subject:'ghi',
            yr:4,
            section:'a',
            sem:3,
            feedback:[ [5,4,3,2,1,2,3,4,5,4,'good'], [1,2,3,4,5,4,3,2,1,2,'excellent'] ]
        },
        {
            subject:'jkl',
            yr:3,
            section:'a',
            sem:5,
            feedback:[ [5,4,3,2,1,2,3,4,5,4,'ok'], [1,2,3,4,5,4,3,2,1,2,'satisfactory'] ]
        },
    ]
    },{
        lecturer:'mubashir',
        subjects:[
        {
            subject:'mno',
            yr:1,
            section:'a',
            sem:2,
            feedback:[ [1,2,3,4,5,4,3,2,1,2,'bad'], [5,4,3,2,1,2,3,4,5,4,'very bad'], ]
        },
        {
            subject:'pqr',
            yr:2,
            section:'a',
            sem:3,
            feedback:[ [5,4,3,2,1,2,3,4,5,4,'good'], [1,2,3,4,5,4,3,2,1,2,'bad'] ]
        },
        {
            subject:'stu',
            yr:4,
            section:'a',
            sem:3,
            feedback:[ [5,4,3,2,1,2,3,4,5,4,'good'], [1,2,3,4,5,4,3,2,1,2,'excellent'] ]
        },
        {
            subject:'vw',
            yr:3,
            section:'a',
            sem:5,
            feedback:[ [5,4,3,2,1,2,3,4,5,4,'ok'], [1,2,3,4,5,4,3,2,1,2,'satisfactory'] ]
        },
    ]
    },{
        lecturer:'uzair',
        subjects:[
        {
            subject:'m1',
            yr:4,
            section:'a',
            sem:3,
            feedback:[ [5,4,3,2,1,2,3,4,5,4,'good'], [1,2,3,4,5,4,3,2,1,2,'excellent'] ]
        },
        {
            subject:'m2',
            yr:2,
            section:'a',
            sem:3,
            feedback:[ [5,4,3,2,1,2,3,4,5,4,'good'], [1,2,3,4,5,4,3,2,1,2,'bad'] ]
        },
        {
            subject:'m3',
            yr:1,
            section:'a',
            sem:2,
            feedback:[ [1,2,3,4,5,4,3,2,1,2,'bad'], [5,4,3,2,1,2,3,4,5,4,'very bad'], ]
        },
        {
            subject:'m4',
            yr:3,
            section:'a',
            sem:5,
            feedback:[ [5,4,3,2,1,2,3,4,5,4,'ok'], [1,2,3,4,5,4,3,2,1,2,'satisfactory'] ]
        },
    ]
    },{
        lecturer:'wajid',
        subjects:[
        {
            subject:'p1',
            yr:3,
            section:'a',
            sem:5,
            feedback:[ [5,4,3,2,1,2,3,4,5,4,'ok'], [1,2,3,4,5,4,3,2,1,2,'satisfactory'] ]
        },
        {
            subject:'p2',
            yr:2,
            section:'a',
            sem:3,
            feedback:[ [5,4,3,2,1,2,3,4,5,4,'good'], [1,2,3,4,5,4,3,2,1,2,'bad'] ]
        },
        {
            subject:'p3',
            yr:1,
            section:'a',
            sem:2,
            feedback:[ [1,2,3,4,5,4,3,2,1,2,'bad'], [5,4,3,2,1,2,3,4,5,4,'very bad'], ]
        },
        {
            subject:'p4',
            yr:4,
            section:'a',
            sem:3,
            feedback:[ [5,4,3,2,1,2,3,4,5,4,'good'], [1,2,3,4,5,4,3,2,1,2,'excellent'] ]
        },
    ]
    }]

    export default dataGiver