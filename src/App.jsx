import { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faKeycdn } from "@fortawesome/free-brands-svg-icons"
import { faClipboard, faGear, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      value: 8,
      checked: false,
      generatedPassword: "Click the Generate button",
      copied: false
    }

    this.rangeOnInput = this.rangeOnInput.bind(this)
    this.boxChecked = this.boxChecked.bind(this)
    this.generate = this.generate.bind(this)
    this.copyPassword = this.copyPassword.bind(this)
  }

  rangeOnInput = (event) => {
    this.setState({value: event.target.value})
  }

  boxChecked = (event) => {
    this.setState({checked: event.target.checked})
  }

  generate = () => {
    let password =  ""
    const chars =  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const specialChars = '!@#$%^&*()_-+[]{}|/' 
    
    
    for(let i = 0; i < this.state.value; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length)
      password += chars.charAt(randomIndex)
    }

    if(this.state.checked) {
      const randomSpecialIndex = Math.floor(Math.random() * specialChars.length)
      password = password.slice(0, randomSpecialIndex) + specialChars.charAt(randomSpecialIndex) + password.slice(randomSpecialIndex + 1)
    }
    this.setState({count: this.state.count + 1})
    this.setState({generatedPassword: password})
    this.setState({copied: false})
  }

  copyPassword = async () => {
    try {
      await navigator.clipboard.writeText(this.state.generatedPassword)
      this.setState({copied: true})
    } catch (err) {
      this.setState({copied: false})
    }
  }

  render() {
    return (
      <div className="App">
        <div className="generator-box">
          <div className="card">
            <button 
              className='count-btn'
              onClick={this.counter}>Generated {this.state.count} {this.state.count === 0 || this.state.count === 1 ? "time" : "times"}
            </button><FontAwesomeIcon icon={faGear} spin/>
          </div>
          <div className="container">
            <h3>Password Generator</h3>
            <div className="slider">
              <input 
                type="range"
                value={this.state.value}
                min="1"
                max="50"
                onChange={this.rangeOnInput}
              />
              <output>{this.state.value}</output>
            </div>
            <button className='generate-btn' onClick={this.generate}>
              Generate <FontAwesomeIcon icon={faKeycdn}/>
            </button>
            <div className="checkbox">
              <label htmlFor="checkbox">Include special characters</label>
              <input 
                type="checkbox"
                checked={this.state.checked}
                id='checkbox'
                onChange={this.boxChecked} 
              />
            </div>
          </div>
          <div className="output">
            <h5><span>
              {this.state.generatedPassword}
              <FontAwesomeIcon icon={faArrowRight} />
            </span></h5>
            <button className='clipboard' disabled={!this.state.generatedPassword} onClick={this.copyPassword}>
              <FontAwesomeIcon icon={faClipboard}/>
            </button>
          </div>
          <div className="copy">
            {this.state.copied ? 
              this.state.count !== 0 ?
              (
                <span className='span-copy'>
                  password copied
                </span>
              ) : 
              (
                <span className='span-notcopy'>
                  password not generated
                </span>
              ) :
              ""
            }
          </div>
        </div>
      </div>
    )
  }
}

export default App
