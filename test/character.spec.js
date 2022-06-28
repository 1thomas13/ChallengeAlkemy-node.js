import chai, { expect } from 'chai'
import { describe, it } from 'mocha'
import chaiHttp from 'chai-http'

import app from '../src/index.js'

chai.use(chaiHttp);

describe('Characters: ', () => {
  it('No character found', (done) => {
    chai.request(app)
      .get('/characters')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + 'eyJhbG')
      .query({ name: 'nombre12354' })
      .end((err, res) => {
        if (err) done()
        expect(res).to.have.status(401)
        done()
      })
  })

  it('Character not found', (done) => {
    chai.request(app)
      .get('/characters/9999')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + 'eyJhbG')
      .end((err, res) => {
        if (err) done()
        expect(res).to.have.status(401)
        done()
      })
  })

  it('Character not found', (done) => {
    chai.request(app)
      .put('/characters/9999')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + 'eyJhbG')
      .send({
        age: 87
      })
      .end((err, res) => {
        if (err) done()
        expect(res).to.have.status(401)
        done()
      })
  })

  it('Character not found', (done) => {
    chai.request(app)
      .delete('/characters/999')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUzOTQ1MTk5LCJleHAiOjE2NjM5NDUxOTl9.scLRqZdhL250x1ApIzdknLdm6b50HIPVhLcNi-NGnEM')
      .end((err, res) => {
        if (err) done()
        expect(res).to.have.status(401)
        done()
      })
  })
})