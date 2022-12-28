import React from 'react'

function Mylist() {

//     const names=["Usmaan", "Caalaa", "Abdii", "Bahar"]
//     const namelist=names.map(name=><h1>{name}</h1>)
//   return <div> {namelist } </div> 

    const persons=[
        {
            id: 1,
            name: 'Abdii',
            age: 22
        },
        {
            id: 1,
            name: 'Caalaa',
            age: 23
        },
        {
            id: 1,
            name: 'Usmaan',
            age: 30
        },
        {
            id: 1,
            name: 'Bahar',
            age: 20
        }
    ]
    const personlist=persons.map(person=><h1>I am {person.name} and {person.age} years old.</h1>)
    return <div> {personlist } </div> 
}

export default Mylist
