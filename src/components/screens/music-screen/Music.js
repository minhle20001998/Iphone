import React, { Component } from 'react'
import MusicStyle from './Music.css'
import mp3 from './Starboy.mp3'
import Statusbar from '../../Statusbar/Statusbar'

// import music from ''
class Music extends Component {

    constructor(props) {
        super(props);

        this.state = {
            audio: new Audio(),
            isPlaying: false,
            audioDuration: "0:00",
            currentTime: "00:00"
        }
        this.adjustVolume = this.adjustVolume.bind(this);
        this.mute = this.mute.bind(this);
        this.maxVol = this.maxVol.bind(this);
        this.seeking = this.seeking.bind(this);
    }

    play() {
        this.setMusicDuration();
        const { audio, isPlaying } = this.state;
        // this.state.audio.src = mp3;
        // this.state.audio.play();
        this.setState({
            isPlaying: !isPlaying
        })
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
    }

    adjustVolume(e) {
        const { audio } = this.state;
        const volume = e.target.value / 100;
        audio.volume = volume;
    }

    moveVolumeSlider(pos) {
        const slider = document.querySelector('.volume-slider');
        const sliderWidth = slider.offsetWidth;
        slider.style.left = `${parseInt(pos) - parseInt(sliderWidth / 2)}px`;
    }

    mute() {
        const { audio } = this.state;
        document.querySelector(".volume-bar").value = 0;
        audio.volume = 0;
    }

    maxVol() {
        const { audio } = this.state;
        document.querySelector(".volume-bar").value = 100;
        audio.volume = 1;
    }


    setMusicDuration() {
        this.setState({
            audioDuration: this.convertTime(Math.floor(this.state.audio.duration))
        })
    }

    convertTime(time) {
        var minutes = Math.floor(time / 60);
        var seconds = time - minutes * 60;
        function str_pad_left(string, pad, length) {
            return (new Array(length + 1).join(pad) + string).slice(-length);
        }
        var finalTime = str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2);
        return finalTime;
    }

    setCurrentBarLength(len) {
        const currentBar = document.querySelector('.progress-bar');
        currentBar.value = `${len}`;
    }


    seeking(e) {
        const { audio } = this.state;
        const progress = document.querySelector('.progress-bar');
        const value = progress.value;
        const moveTo = (value / 1000) * audio.duration;
        audio.currentTime = moveTo;
    }

    componentDidMount() {
        const { audio } = this.state;
        // 
        audio.src = mp3;
        audio.load();
        // 
        audio.onended = () => {
            this.setState({
                isPlaying: false
            })
        }
        this.update = setInterval(() => {
            this.setState({
                currentTime: this.convertTime(Math.floor(audio.currentTime))
            });
        }, 500);
        this.updateCurrentBar = setInterval(() => {
            const timePercent = (audio.currentTime / audio.duration) * 1000;
            // console.log("did mount ", timePercent)
            // const currentBarLength = parseFloat(timePercent) * parseFloat(progressBarWidth);
            document.querySelector(".trail").style.width = `${(timePercent / 1000) * 200 - 1}px`;
            this.setCurrentBarLength(timePercent);
        }, 100)
    }


    componentWillUnmount() {
        const { audio } = this.state;
        audio.src = ""
        audio.load();
        clearInterval(this.update);
        clearInterval(this.updateCurrentBar);

    }

    render() {
        const { isPlaying, audioDuration, currentTime } = this.state;
        return <>
            <Statusbar size="12px" />
            <div className="music">
                <audio >
                    {/* <source src={mp3} type="audio/ogg" /> */}
                </audio>
                <div className="audio-player">
                    <div className="album-cover"></div>

                    <div className="media-player">
                        <div className="bar">
                            <div className="trail"></div>
                            <input type="range" min="0" max="1000" className="progress-bar" onChange={this.seeking} />
                        </div>
                        <div className="audio-time">
                            <span className="current-duration">{`${currentTime}`}</span>
                            <span className="song-duration">{`-${audioDuration}`}</span>
                        </div>
                        <span className="song-name">Starboy</span>
                        <div className="controllers">
                            <i className="fas fa-backward"></i>
                            {(isPlaying) ? <i className="fas fa-pause fa-lg" onClick={() => { this.play() }}></i>
                                : <i className="fas fa-play play-button fa-lg" onClick={() => { this.play() }}></i>
                            }
                            <i class="fas fa-forward"></i>
                        </div>
                        <div className="volume">
                            <i className="fas fa-volume-down " onClick={this.mute}></i>
                            <div className="bar">
                                <input type="range" min="0" max="100" className="volume-bar" onInput={this.adjustVolume} />
                            </div>
                            <i className="fas fa-volume-up" onClick={this.maxVol}></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }
}

export default Music;