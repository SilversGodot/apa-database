const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');

const Point = require('./database/models/point');
const Symptom = require('./database/models/symptom');
const Treatment = require('./database/models/treatment');

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



/*  Points  CRUD  */
app.get('/points', (req, res) => {
    Point.find({})
        .then(points => res.send(points))
        .catch((error) => console.log(error));
});

app.post('/points', (req, res) => {
    (new Point({
        'name': req.body.name,
        'code': req.body.code,
        'function': req.body.function,
        'partOfEar': req.body.partOfEar,
        'bodyPart': req.body.bodyPart,
        'region': req.body.region,
        'videoLink': req.body.videoLink
    })).save()
        .then((point) => res.send(point))
        .catch((error) => console.log(error));
});

app.get('/points/:pointId', (req, res) => {
    Point.findOne({_id: req.params.pointId})
        .then((points) => res.send(points))
        .catch((error) => console.log(error));
});

app.patch('/points/:pointId', (req, res) => {
    Point.findOneAndUpdate( {'_id': req.params.pointId}, {$set: req.body})
        .then((point) => res.send(point))
        .catch((error) => console.log(error));
});

app.delete('/points/:pointId', (req, res) => {
    const removePointFromTreatments = (point) => {
        Treatment.updateMany(
                {  $or: [{master: point._id}, {primary: point._id}, {supplemental: point._id}]  },
                {  $pullAll: {master: [point._id], primary: [point._id], supplemental: [point._id]}  }
            )
            .then(() => point)
            .catch((error) => console.log(error));
    };

    Point.findOneAndDelete({_id: req.params.pointId})
        .then((point) => {
            removePointFromTreatments(point);
            res.send(point);
        })
        .catch((error) => console.log(error));
});



/*  Treatments  CRUD  */
app.get('/treatments', (req, res) => {
    Treatment.find({})
        .then((treatments) => res.send(treatments))
        .catch((error) => console.log(error));
});

// PROBLEM HERE
// The for loop checks the Points table to see if the input points exist
// Currently, only the primary points array given in the new treatment is checked
// Postman returns a 500 status, as the for loop should. 
// However, a treatment document with an invalid point ObjectID is created anyways
app.post('/treatments', (req, res) => {
    let promises = [Promise];
    for (let pointId of req.body.primary) {
        const promise = Point.exists({_id: pointId})
            .then((result) => {
                if (!result) {
                    res.status(500).end();
                }
            })
            .catch((error) => console.log(error));
        promises.push(promise);
    }
    Promise.all(promises)
        .then(result =>  {
            console.log(result);
            (new Treatment({
                'name': req.body.name,
                'primary': req.body.primary,
                'supplemental': req.body.supplemental,
                'master': req.body.master
            }))
            .save()
            .then((treatment) => res.send(treatment))
            .catch((error) => console.log(error));
        });
});

app.get('/treatments/:treatmentId', (req, res) => {
    Treatment.find({_id: req.params.treatmentId})
        .then((treatment) => res.send(treatment))
        .catch((error) => console.log(error));
});

app.patch('/treatments/:treatmentId', (req, res) => {
    Treatment.findOneAndUpdate( {'_id': req.params.treatmentId}, {$set: req.body})
        .then((treatment) => res.send(treatment))
        .catch((error) => console.log(error));
});

app.delete('/treatments/:treatmentId', (req, res) => {
    const removeTreatmentFromSymptoms = (treatment) => {
        Symptom.updateMany(
                {  treatments: treatment._id  },
                {  $pullAll: {treatments: [treatment._id]}  }
            )
            .then(() => treatment)
            .catch((error) => console.log(error));
    };

    Treatment.findOneAndDelete({_id: req.params.treatmentId})
        .then((treatment) => {
            removeTreatmentFromSymptoms(treatment);
            res.send(treatment);
        })
        .catch((error) => console.log(error));
});



/*  Symptoms  CRUD  */
app.get('/symptoms', (req, res) => {
    Symptom.find({})
        .then(symptoms => res.send(symptoms))
        .catch((error) => console.log(error));
});

app.post('/symptoms', (req, res) => {
    (new Symptom({
        'name': req.body.name,
        'treatments': req.body.treatments
    })).save()
        .then((points) => res.send(points))
        .catch((error) => console.log(error));
});

app.get('/symptoms/:symptomId', (req, res) => {
    Symptom.find({_id: req.params.symptomId})
        .then((symptom) => res.send(symptom))
        .catch((error) => console.log(error));
});

app.patch('/symptoms/:symptomId', (req, res) => {
    Symptom.findOneAndUpdate( {'_id': req.params.symptomId}, {$set: req.body})
        .then((symptom) => res.send(symptom))
        .catch((error) => console.log(error));
});

app.delete('/symptoms/:symptomId', (req, res) => {
    Symptom.findOneAndDelete({_id: req.params.symptomId})
        .then((symptom) => {
            removeSymptomFromTreatments(symptom);
            res.send(symptom);
        })
        .catch((error) => console.log(error));
});



app.listen(3000, () => console.log("Server connected on port 3000"));