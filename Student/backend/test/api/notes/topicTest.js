const expect = require('chai').expect;
const request = require('supertest');
const server = require('../../../server.js');
const template = require('../../../routes/apiRoutes');
const conn = require('../../../db/db.js');
require('../../../models/registerResearchTopic')

describe('POST /api/reserchTpoic/getbySup', () => {
    before((done) => {
        conn.connect()
        .then(() => done())
        .catch((error) => done(err));
    })
})

it('OK, THE PROCESS OF MAKING A NEW TOPIC WORKS', () =>{
    request(server).post('/api/reserchTpoic/getbySup')
    .send({groupName: 'assdd', 
    researchField: 'IT', 
    researchTopic: 'Computer Sytems',
    supervisor: 'Ishani Pig',
    status: 'Approved'})
    .then((res) => {
        const body = res.body;
        console.log("YES", body)
        expect(body).to.contain.property('_id');
        expect(body).to.contain.property('groupName');
        expect(body).to.contain.property('researchField');
        expect(body).to.contain.property('researchTopic');
        expect(body).to.contain.property('supervisor');
        expect(body).to.contain.property('description');     
    })
 
})
