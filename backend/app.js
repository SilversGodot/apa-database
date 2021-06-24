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
    Point.findOneAndDelete({_id: req.params.pointId})
        .then((Point) => res.send(Point))
        .catch((error) => console.log(error));
});



/*  Treatments  CRUD  */
app.get('/treatments', (req, res) => {
    Treatment.find({})
        .then((treatments) => res.send(treatments))
        .catch((error) => console.log(error));
});

app.post('/treatments', (req, res) => {
    (new Treatment({
        'name': req.body.name,
        'owner': req.body.owner,
        'primary': req.body.primary,
        'supplemental': req.body.supplemental,
        'master': req.body.master
    })).save()
        .then((points) => res.send(points))
        .catch((error) => console.log(error));
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
    Treatment.findOneAndDelete({_id: req.params.treatmentId})
        .then((treatment) => res.send(treatment))
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
        'owner': req.body.owner,
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
        .then((symptom) => res.send(symptom))
        .catch((error) => console.log(error));
});



app.listen(3000, () => console.log("Server connected on port 3000"));