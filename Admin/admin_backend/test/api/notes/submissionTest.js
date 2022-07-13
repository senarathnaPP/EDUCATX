const expect = require('chai').expect;
const request = require('supertest');
const server = require('../../../server.js');
const template = require('../../../routes/adminRoutes');
const conn = require('../../../db/dbConnect.js');
require('../../../models/submissions')

describe('POST /api/admin/submission/create', () => {
    before((done) => {
        conn.connect()
        .then(() => done())
        .catch((error) => done(err));
    })
})

it('OK, THE PROCESS OF MAKING A NEW MARKING WORKS', () =>{
    request(server).post('/api/admin/submission/create')
    .send({submissionId: 'BCAD501', 
    topic: 'Topic submission', 
    type: 'DOCUMENT',
    dueDate: '2022-06-22',
    dueTime: '"05:37',
    description: 'abcdef',
    category: 'B'})
    .then((res) => {
        const body = res.body;
        console.log("YES", body)
        expect(body).to.contain.property('_id');
        expect(body).to.contain.property('submissionId');
        expect(body).to.contain.property('topic');
        expect(body).to.contain.property('type');
        expect(body).to.contain.property('dueDate');
        expect(body).to.contain.property('dueTime');
        expect(body).to.contain.property('description');
        expect(body).to.contain.property('category');
    })

})
