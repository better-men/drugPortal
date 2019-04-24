import axios from 'axios'
class VueConfig {
  constructor(file = './static/config/config.json') {
    this.config = {}
    this.isInit = false
    this.file = file
  }
  get(key) {
    return new Promise(function(resolve, reject){
      if(this.isInit) {
        resolve(this.config[key])
      } else {
        axios.get(this.file).then(function(res) {
          this.config = res.data
          this.isInit = true
          resolve(this.config[key])
        }.bind(this))
      }
    }.bind(this))
  }
}

export {
  VueConfig
}
