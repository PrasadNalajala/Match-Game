import {Component} from 'react'

import './index.css'

// import { generate } from 'fast-glob/out/managers/tasks'

import TabItem from '../TabItem'

import ThumbnailItem from '../ThumbnailItem'

class MatchGame extends Component {
  state = {
    activeTab: 'FRUIT',
    score: 0,
    timer: 60,
    isGameEnded: false,
    randomImg:
      'https://assets.ccbp.in/frontend/react-js/match-game/orange-img.png',
  }

  componentDidMount() {
    this.start()
  }

  runTimer = () => {
    const {timer} = this.state
    if (timer === 0) {
      this.setState({isGameEnded: true})
      clearInterval(this.timerId)
    } else {
      this.setState(prev => ({timer: prev.timer - 1}))
    }
  }

  start = () => {
    this.timerId = setInterval(this.runTimer, 1000)
    this.setState({
      activeTab: 'FRUIT',
      score: 0,
      timer: 60,
      isGameEnded: false,
      randomImg:
        'https://assets.ccbp.in/frontend/react-js/match-game/orange-img.png',
    })
  }

  onChangeTab = id => {
    this.setState({activeTab: id})
  }

  generateRandomImg = () => {
    const {imagesList} = this.props
    // const imagesListLength =
    const randomImgIndex = parseInt(Math.random() * imagesList.length)
    this.setState({randomImg: imagesList[randomImgIndex].imageUrl})
  }

  onclickThumbnail = item => {
    const {randomImg} = this.state
    // console.log(item)
    if (item.imageUrl === randomImg) {
      this.setState(prev => ({score: prev.score + 1}))
      this.generateRandomImg()
    } else {
      this.setState({isGameEnded: true})
      clearInterval(this.timerId)
    }
  }

  render() {
    const {tabsList, imagesList} = this.props
    const {activeTab, score, isGameEnded, randomImg, timer} = this.state
    const filteredThumbnails = imagesList.filter(
      each => each.category === activeTab,
    )
    // console.log(filteredThumbnails)

    return (
      <div className="entire-site">
        <div className="nav">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
            className="logo"
          />
          <div className="flex-row">
            <p className="score">
              Score:<span className="span">{score}</span>
            </p>
            <div className="flex-row">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="timer"
              />
              <p className="span">{timer} sec</p>
            </div>
          </div>
        </div>
        <div className="bg">
          <div className="card">
            {!isGameEnded ? (
              <div className="container">
                <div>
                  <img src={randomImg} className="image" alt="match" />
                </div>
                <ul className="tabsContainer">
                  {tabsList.map(each => (
                    <TabItem
                      tabItem={each}
                      activeTab={activeTab}
                      onChangeTab={this.onChangeTab}
                      key={each.tabId}
                    />
                  ))}
                </ul>
                <ul className="thumbnailContainer">
                  {filteredThumbnails.map(each => (
                    <ThumbnailItem
                      thumbnailItem={each}
                      onclickThumbnail={this.onclickThumbnail}
                      key={each.id}
                    />
                  ))}
                </ul>
              </div>
            ) : (
              <div className="scorecard">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
                  alt="trophy"
                  className="trophy"
                />
                <p className="scoreLabel">YOUR SCORE</p>
                <h1 className="score1">{score}</h1>
                <button className="resetBtn" type="button" onClick={this.start}>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                    alt="reset"
                  />
                  PLAY AGAIN
                </button>
                <p className="info">Made with ❤️ By Prasad</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default MatchGame
