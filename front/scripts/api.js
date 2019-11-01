function API () {
  this.base_api = axios.create({
    baseURL: 'http://localhost:2222/api/',
    timeout: 1000
  })

  this.addClient = email => {
    return this.base_api
      .post('clientes', { email } )
      .then(response => { return response.data })
      .catch(err => new Error(err))
  }

}

const api = new API()
