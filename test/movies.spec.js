import chai, { expect } from 'chai'
import { describe, it } from 'mocha'
import chaiHttp from 'chai-http'

import app from '../src/index.js'

chai.use(chaiHttp);


describe('Movies: ', () => {
  it('No movies/series found', (done) => {
    chai.request(app)
      .get('/movies')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + 'eyJhbG')
      .query({ name: 'Shrek 3' })
      .end((err, res) => {
        if (err) done()
        expect(res).to.have.status(401)
        done()
      })
  })

  it('The movie/serie not exist!', (done) => {
    chai.request(app)
      .get('/movies/9999')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + 'eyJhbG')
      .end((err, res) => {
        if (err) done()
        expect(res).to.have.status(401)
        done()
      })
  })

  it('Fill in the fields!', (done) => {
    chai.request(app)
      .post('/movies')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + 'eyJhbG')
      .end((err, res) => {
        if (err) done()
        expect(res).to.have.status(401)
        done()
      })
  })

  it('Movie/serie not exist', (done) => {
    chai.request(app)
      .put('/movies/9999')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + 'eyJhbG')
      .send({
        title: 'helloWorld'
      })
      .end((err, res) => {
        if (err) done()
        expect(res).to.have.status(401)
        done()
      })
  })

  it('Movie/serie not exist', (done) => {
    chai.request(app)
      .delete('/movies/999')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + 'eyJhbG')
      .end((err, res) => {
        if (err) done()
        expect(res).to.have.status(401)
        done()
      })
  })
})