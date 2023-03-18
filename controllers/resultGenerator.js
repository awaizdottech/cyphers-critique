import fs from 'fs'
function csvWriter( subjArr, dept )
{
    const xResult = fs.createWriteStream( `./results/${dept}Result.csv`, { 'flags':'a' } )
    let [ firstyr, secondyr, thirdyr, fourthyr ] = [ [ [], [] ], [ [], [] ], [ [], [] ], [ [], [] ] ]
    let copy
    subjArr.forEach( obj => {
        obj.subjects.forEach( a => {
            if( a.yr==1 && a.section=='a' ){
                copy = { ...a }
                copy['lecturer'] = obj.lecturer
                firstyr[0].push(copy)
            }
            else if( a.yr==1 && a.section=='b' )
            {
                copy = { ...a }
                copy['lecturer'] = obj.lecturer
                firstyr[1].push(copy)
            }
            if( a.yr==2 && a.section=='a' ){
                copy = { ...a }
                copy['lecturer'] = obj.lecturer
                secondyr[0].push(copy)
            }
            else if( a.yr==2 && a.section=='b' )
            {
                copy = { ...a }
                copy['lecturer'] = obj.lecturer
                secondyr[1].push(copy)
            }
            if( a.yr==3 && a.section=='a'){
                copy = { ...a }
                copy['lecturer'] = obj.lecturer
                thirdyr[0].push(copy)
            }
            else if( a.yr==3 && a.section=='b' )
            {
                copy = { ...a }
                copy['lecturer'] = obj.lecturer
                thirdyr[1].push(copy)
            }
            if( a.yr==4 && a.section=='a'){
                copy = { ...a }
                copy['lecturer'] = obj.lecturer
                fourthyr[0].push(copy)
            }
            else if( a.yr==4 && a.section=='b' )
            {
                copy = { ...a }
                copy['lecturer'] = obj.lecturer
                fourthyr[1].push(copy)
            }
        })
    });
    firstyr.forEach( x => {
        x.forEach( a => {
            a.feedback.forEach( b => {
                xResult.write( '\n' + a.yr + ',')
                xResult.write( a.sem + ',')
                xResult.write( a.section + ',')
                xResult.write( a.lecturer + ',')
                xResult.write( a.subject + ',')
                for (let i = 0; i < b.length; i++)
                    xResult.write( b[i] + ',')
            })
        })
    })
    secondyr.forEach( x => {
        x.forEach( a => {
            a.feedback.forEach( b => {
                xResult.write( '\n' + a.yr + ',')
                xResult.write( a.sem + ',')
                xResult.write( a.section + ',')
                xResult.write( a.lecturer + ',')
                xResult.write( a.subject + ',')
                for (let i = 0; i < b.length; i++)
                    xResult.write( b[i] + ',')
            })
        })
    })
    thirdyr.forEach( x => {
        x.forEach( a => {
        a.feedback.forEach( b => {
            xResult.write( '\n' + a.yr + ',')
            xResult.write( a.sem + ',')
            xResult.write( a.section + ',')
            xResult.write( a.lecturer + ',')
            xResult.write( a.subject + ',')
            for (let i = 0; i < b.length; i++)
                xResult.write( b[i] + ',')
        })
    })
    })
    fourthyr.forEach( x => {
        x.forEach( a => {
        a.feedback.forEach( b => {
            xResult.write( '\n' + a.yr + ',')
            xResult.write( a.sem + ',')
            xResult.write( a.section + ',')
            xResult.write( a.lecturer + ',')
            xResult.write( a.subject + ',')
            for (let i = 0; i < b.length; i++)
                xResult.write( b[i] + ',')
        })
    })
    })
}
const subarr =
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
csvWriter( subarr, 'it' )