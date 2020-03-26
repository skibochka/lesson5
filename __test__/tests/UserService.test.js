const chai = require('chai');
const UtilService = require('../../src/components/User/service');

const { expect } = chai;

describe('UserComponent -> service', () => {
    it('UserComponent -> service -> multiply ', (done) => {
        expect(UtilService.multiply(5, 5))
            .to.be.equal(10);

        done();
    });
    it('UserComponent -> service -> findAll ', async () => {
        const res = await UtilService.findAll();
        expect(res).to.be.a('array');
    });
    it('UserComponent -> service -> findOne', async () => {
        const res = await UtilService.findById('5e775ff336b3070d291284e6');
        expect(res).to.be.a('object');
    });
    it('UserComponent -> service -> create', async () => {
        const data = {
            fullName: 'real test',
            email: 'real@mail.mm',
            password: '123',
            token: 'token',
        };
        const res = await UtilService.create(data);
        expect(res).to.be.a('object');
    });
    it('UserComponent -> service -> updateById', async () => {
        const data = {
            fullName: 'New Name',
        };
        const res = await UtilService.updateById('5e7a5f08ea4e8911796b734c', data);
        expect(res).to.be.a('object')
            .and.to.have.property('ok').and.to.be.equal(1);
    });
    it('UserComponent -> service -> deleteOne', async () => {
        const res = await UtilService.deleteById('5e7a5f08ea4e8911796b734c');
        expect(res).to.be.a('object')
            .and.to.have.property('ok').and.to.be.equal(1);
    })
    it('UserComponent -> service -> logIn', async () => {
        const res = await UtilService.logIn('pit@mail.mm', 'notRealToken');
        expect(res).to.be.a('object')
            .and.to.have.property('ok').and.to.be.equal(1);
    });
    it('UserComponent -> service -> signUp', async () => {
        const data = {
            fullName: 'notRealName',
            email: 'notReal@mail.com',
            password: '123',
            token: 'token',
        };
        const res = await UtilService.signUp(data);
        expect(res).to.be.a('object');
    });
    it('UserComponent -> service -> logOut', async () => {
        const res = await UtilService.logOut('pit@mail.mm');
        expect(res).to.be.a('object');
    });
});
