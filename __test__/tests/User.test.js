const request = require('supertest');
const chai = require('chai');

const server = require('../../src/server/server');

const agent = request.agent(server);
const { expect } = chai;

const name = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
const mail = `${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}@mail.mm`;
describe('UserComponent -> controller', () => {
    it('UserComponent -> controller -> /v1/users/register', (done) => {
        agent.post('/v1/users/register')
            .send({
                fullName: name,
                email: mail,
                password: '123',
                token: 'token',
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then(({ body }) => {
                const expectBody = expect(body);

                expectBody.to.have.property('data');

                done();
            })
            .catch((err) => done(err));
    });


    it('UserComponent -> controller -> /v1/users/login', (done) => {
        agent.post('/v1/users/login')
            .send({
                email: 'pit@mail.mm',
                password: 'pit',
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then(({ body }) => {
                const expectBody = expect(body);

                expectBody.to.have.property('data');

                done();
            })
            .catch((err) => done(err));
    });


    it('UserComponent -> controller -> /v1/users/findall', (done) => {
        agent.post('/v1/users/findall')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                const expectBody = expect(res.body);

                expectBody.to.have.property('data').and.to.be.a('array');

                done();
            })
            .catch((err) => done(err));
    });

    it('UserComponent -> controller -> /v1/users/findone', (done) => {
        agent.post('/v1/users/findone')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .send({
                id: '5e6b82c82e89980a4e2a942e',
            })
            .expect(200)
            .then((res) => {
                const expectBody = expect(res.body);

                expectBody.to.have.property('data');

                done();
            })
            .catch((err) => done(err));
    });

    it('UserComponent -> controller -> /v1/users/create', (done) => {
        agent.post('/v1/users/create')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .send({
                fullName: 'test name',
                email: 'test@mail.mm',
                password: '123',
                token: 'token',
            })
            .expect(200)
            .then((res) => {
                const expectBody = expect(res.body);

                expectBody.to.have.property('data');

                done();
            })
            .catch((err) => done(err));
    });

    it('UserComponent -> controller -> /v1/users/update', (done) => {
        agent.post('/v1/users/update')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .send({
                id: '5e6b82c82e89980a4e2a942e',
                fullName: 'New Name',
            })
            .expect(200)
            .then((res) => {
                const expectBody = expect(res.body);

                expectBody.to.have.property('data').and.to.be.a('object')
                    .and.to.have.property('ok').and.to.be.equal(1);

                done();
            })
            .catch((err) => done(err));
    });

    it('UserComponent -> controller -> /v1/users/delete', (done) => {
        agent.post('/v1/users/delete')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .send({
                id: '5e6b82c82e89980a4e2a942e',
            })
            .expect(200)
            .then((res) => {
                const expectBody = expect(res.body);

                expectBody.to.have.property('data').and.to.be.a('object')
                    .and.to.have.property('ok').and.to.be.equal(1);

                done();
            })
            .catch((err) => done(err));
    });

    it('UserComponent -> controller -> /v1/users/register (invalid params)', (done) => {
        agent.post('/v1/users/register')
            .send({
                fullName: 123,
                email: 'email',
                password: '123',
                token: 'token',
            })
            .expect('Content-Type', /json/)
            .expect(422)
            .then(({ body }) => {
                const expectBody = expect(body);

                expectBody.to.have.property('message')
                    .and.to.be.equal('E_MISSING_OR_INVALID_PARAMS');

                done();
            })
            .catch((err) => done(err));
    });

    it('UserComponent -> controller -> /v1/users/login (invalid params)', (done) => {
        agent.post('/v1/users/login')
            .send({
                email: 'pit',
                password: 'pit',
            })
            .expect('Content-Type', /json/)
            .expect(422)
            .then(({ body }) => {
                const expectBody = expect(body);

                expectBody.to.have.property('message')
                    .and.to.be.equal('E_MISSING_OR_INVALID_PARAMS');

                done();
            })
            .catch((err) => done(err));
    });

    it('UserComponent -> controller -> /v1/users/findone (invalid params)', (done) => {
        agent.post('/v1/users/findone')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .send({
                id: 123,
            })
            .expect(500)
            .then((res) => {
                const expectBody = expect(res.body);

                expectBody.to.have.property('message')
                    .and.to.be.equal('CastError');

                done();
            })
            .catch((err) => done(err));
    });

    it('UserComponent -> controller -> /v1/users/create (invalid params)', (done) => {
        agent.post('/v1/users/create')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .send({
                fullName: 123,
                email: 'test',
                password: '123',
                token: 'token',
            })
            .expect(422)
            .then((res) => {
                const expectBody = expect(res.body);

                expectBody.to.have.property('message')
                    .and.to.be.equal('E_MISSING_OR_INVALID_PARAMS');

                done();
            })
            .catch((err) => done(err));
    });

    it('UserComponent -> controller -> /v1/users/update (invalid params)', (done) => {
        agent.post('/v1/users/update')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .send({
                id: '5e6b82c82e89980a4e2a942e',
                fullName: 123,
            })
            .expect(422)
            .then((res) => {
                const expectBody = expect(res.body);

                expectBody.to.have.property('message')
                    .and.to.be.equal('E_MISSING_OR_INVALID_PARAMS');

                done();
            })
            .catch((err) => done(err));
    });

    it('UserComponent -> controller -> /v1/users/delete (invalid params)', (done) => {
        agent.post('/v1/users/delete')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .send({
                id: {
                    some: 'data',
                },
            })
            .expect(422)
            .then((res) => {
                const expectBody = expect(res.body);

                expectBody.to.have.property('message')
                    .and.to.be.equal('E_MISSING_OR_INVALID_PARAMS');

                done();
            })
            .catch((err) => done(err));
    });

    it('UserComponent -> controller -> /v1/users/logout', (done) => {
        agent.post('/v1/users/logout')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                const expectBody = expect(res.body);

                expectBody.and.to.have.property('message').and.to.be.equal('log out');

                done();
            })
            .catch((err) => done(err));
    });
});
