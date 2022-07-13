const expect = require('chai').expect;
const request = require('supertest');
const server = require('../../../server.js');
const template = require('../../../routes/apiRoutes');
const conn = require('../../../db/db.js');
require('../../../models/groups')

describe('POST /api/groupDetails/get', () => {
    before((done) => {
        conn.connect()
        .then(() => done())
        .catch((error) => done(err));
    })
})

it('OK, THE PROCESS OF MAKING A NEW GROUP DETAILS WORKS', () =>{
    request(server).post('/api/groupDetails/get')
    .send({groupName: 'Gang', 
    groupLeaderName: 'Lucifer',
    groupLeaderId: 'it34445567',
    memberTwoName: 'sdasd',
    memberTwoId: 'it788',
    memberThreeName: 'asdasd',
    memberThreeId: 'it444',
    memberFourName: 'asdasd',
    memberFourId: 'it566'})
    .then((res) => {
        const body = res.body;
        console.log("YES", body)
        expect(body).to.contain.property('_id');
        expect(body).to.contain.property('groupName');
        expect(body).to.contain.property('groupLeaderName');
        expect(body).to.contain.property('groupLeaderId');
        expect(body).to.contain.property('groupTwoName');
        expect(body).to.contain.property('groupTwoId');  
        expect(body).to.contain.property('groupThreeName');
        expect(body).to.contain.property('groupThreeId'); 
        expect(body).to.contain.property('groupFourName');
        expect(body).to.contain.property('groupFourId'); 
    })
 
})
