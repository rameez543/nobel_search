const express = require('express');
const app = express()
const cors = require('cors')
const prizeJson = require('./prize.json')
const personJson = require('./laurete.json')
const port = process.env.PORT || 2000
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function search(searchText) {
    let person = personJson.laureates.filter(item =>
        (searchText.toUpperCase().includes(`${item.firstname} ${item.surname}`.toUpperCase())) ||
        (searchText.toUpperCase().includes(item.firstname && item.firstname.toUpperCase())) ||
        (searchText.toUpperCase().includes(item.surname && item.surname.toUpperCase()))

    )
    let searchedResult = []
    let laureatesObject = []
    prizeJson.prizes.forEach(element => {
        if (typeof element.laureates === "object") {
            laureatesObject.push(Object.values(element.laureates))
        }
    });
    // convert multiple dimensional array to array of objects
    laureatesObject = laureatesObject.reduce((r, e) => (r.push(...e), r), [])
    for (let i of person) {
        let personObject = {
            id: i.id,
            firstname: i.firstname,
            surname: i.surname,
            country: i.bornCountry,
            field: "",
            shares: [],
            year: "",
            motivation: ""

        }
        for (let j of laureatesObject) {
            i.prizes.forEach(element => {
                personObject.field = element.category
                personObject.year = element.year
                personObject.motivation = element.motivation
                if (element.motivation === j.motivation && i.id !== j.id) {

                    personObject.shares.push(`${j.firstname} ${j.surname}`)
                }
            })
        }
        searchedResult.push(personObject)
    }
    return searchedResult
}



app.post('/getResult', function (req, res) {
    const searchText = req.body.search
    const result = search(searchText)
    try {
        if (result.length > 0) {
            return res.json({ success: true, result: result })
        }
        return res.json({ success: false, result: "sorry,no data found" })
    } catch (ex) {
        res.json({ error: ex })
    }

})

app.listen(port,()=>console.log(`server started in PORT ${port}`))