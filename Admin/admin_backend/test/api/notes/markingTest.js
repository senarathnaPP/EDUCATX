const expect = require('chai').expect;
const request = require('supertest');
const server = require('../../../server.js');
const template = require('../../../routes/adminRoutes');
const conn = require('../../../db/dbConnect.js');
require('../../../models/markings')

describe('POST /api/admin/marking/create', () => {
    before((done) => {
        conn.connect()
        .then(() => done())
        .catch((error) => done(err));
    })
})

it('OK, THE PROCESS OF MAKING A NEW SUBMISSION WORKS', () =>{
    request(server).post('/api/admin/marking/create')
    .send({markingId: '50112', 
    title: 'Topic Evaluation', 
    category: 'A',
    updatedDate: '2022-06-22',
    description: 'ABC'})
    .then((res) => {
        const body = res.body;
        console.log("YES", body)
        expect(body).to.contain.property('_id');
        expect(body).to.contain.property('markingId');
        expect(body).to.contain.property('title');
        expect(body).to.contain.property('category');
        expect(body).to.contain.property('updatedDate');
        expect(body).to.contain.property('description');
        
    })
 
})
