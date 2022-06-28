import chai, { expect } from 'chai'
import { describe, it } from 'mocha'
import chaiHttp from 'chai-http'

import app from '../src/index.js'

chai.use(chaiHttp);

describe('Register: ', () => {
    it('You must complete all the fields', (done) => {
      chai.request(app)
        .post('/auth/register')
        .send({ email: 'test@gmail.com', username: 'imTester' })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .end((err, res) => {
            
          if (err) done()
          expect(res).to.have.status(400)
          done()
        })
    })

    it('Success', (done) => {
        chai.request(app)
          .post('/auth/register')
          .send({ email: 'test@gmail.com', password: '123456789', username: 'imTester' })
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .end((err, res) => {
            if (err) done()
            expect(res).to.have.status(200)
            done()
          })
    })
  
    it('The password must exceed 5 characters', (done) => {
      chai.request(app)
        .post('/auth/register')
        .send({ email: 'email@gmail.com', password: '1234' })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) done()
          expect(res).to.have.status(400)
          done()
        })
    })
  
    it('The username must exceed 3 characters', (done) => {
      chai.request(app)
        .post('/auth/register')
        .send({email: 'test@gmail.com', password: 'testtest', username: 'tom' })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) done()
          expect(res).to.have.status(400)
          done()
        })
    })
  
    it('Your email is invalid', (done) => {
      chai.request(app)
        .post('/auth/register')
        .send({username: 'tom', password: 'test' })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) done()
          expect(res).to.have.status(400)
          done()
        })
    })
  })
  
  describe('Login: ', () => {
    it('fill in the fields!', (done) => {
      chai.request(app)
        .post('/auth/login')
        .send({  })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) done()
          expect(res).to.have.status(400)
          done()
        })
    })
  
    it('Success', (done) => {
      chai.request(app)
        .post('/auth/login')
        .send({ email: 'gmail@gmail.com', password: 'correct' })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) done()
          expect(res).to.have.status(200)
          done()
        })
    })
  })

 