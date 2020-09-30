import React, { useState } from 'react'
import axios from 'axios'

export default () => {

  const [agreed, setAgreed] = useState(false);

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  })
  const [inputs, setInputs] = useState({
    email: '',
    message: ''
  })
  const handleServerResponse = (ok, msg) => {
    if (ok) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg }
      })
      setInputs({
        email: '',
        message: '',
        name: '',
        telefonnummer: '',
        betreff: '',
      })
    } else {
      setStatus({
        info: { error: true, msg: msg }
      })
    }
  }
  const handleOnChange = e => {
    e.persist()
    setInputs(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
    setStatus({
      submitted: false,
      submitting: false,
      info: { error: false, msg: null }
    })
  }
  const handleOnSubmit = e => {
    e.preventDefault()
    if(!agreed) return;
    setStatus(prevStatus => ({ ...prevStatus, submitting: true }))
    axios({
      method: 'POST',
      url: 'https://formspree.io/f/mwkwprno',
      data: inputs
    })
      .then(response => {
        handleServerResponse(
          true,
          'Thank you, your message has been submitted.'
        )
      })
      .catch(error => {
        handleServerResponse(false, error.response.data.error)
      })
  }
  return (
    <main>
      <form onSubmit={handleOnSubmit}>
        <input
          id="name"
          type="text"
          name="_replyto"
          onChange={handleOnChange}
          required
          value={inputs.name}
          placeholder='Name'
        />
        <input
          id="email"
          type="email"
          name="_replyto"
          onChange={handleOnChange}
          required
          value={inputs.email}
          placeholder='Email'
        />
        <input
          id="telefonnummer"
          type="text"
          name="_replyto"
          onChange={handleOnChange}
          required
          value={inputs.telefonnummer}
          placeholder='Telefonnummer'
        />
        <input
          id="betreff"
          type="text"
          name="_replyto"
          onChange={handleOnChange}
          required
          value={inputs.betreff}
          placeholder='Betreff'
        />
        <textarea
          id="message"
          name="Nachricht"
          onChange={handleOnChange}
          required
          value={inputs.message}
          placeholder='Nachricht'
        />
        <input 
          type="checkbox" 
          id="agreement" 
          name="agreement" 
          checked={agreed}
          onChange={(event) => {
            setAgreed(!agreed);
            console.log('checking');
          }}
        />
        <label for="agreement">Ich habe die Datenschutzerklärung zur Kenntnis genommen und akzeptiert sie.</label>
        <button type="submit" disabled={status.submitting}>
          {!status.submitting
            ? !status.submitted
              ? 'Senden'
              : 'Gesendet'
            : 'Senden...'}
        </button>
      </form>
      {status.info.error && (
        <div className="error">Error: {status.info.msg}</div>
      )}
      {!status.info.error && status.info.msg && <p>{status.info.msg}</p>}
    </main>
  )
}