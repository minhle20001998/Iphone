import React, { Component } from 'react'
import MusicStyle from './Music.css'
import mp3 from './Starboy.mp3'
import Statusbar from '../../Statusbar/Statusbar'
import { AiFillDownSquare } from 'react-icons/ai';

// import music from ''
class Music extends Component {

    constructor(props) {
        super(props);

        this.state = {
            audio: new Audio(),
            isPlaying: false,
            audioDuration: "0:00",
            currentTime: "0:00"
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
        const volumePercent = e.nativeEvent.offsetX / e.target.offsetWidth;
        audio.volume = volumePercent;
        this.moveVolumeSlider(e.nativeEvent.offsetX)
    }

    moveVolumeSlider(pos) {
        const slider = document.querySelector('.volume-slider');
        const sliderWidth = slider.offsetWidth;
        slider.style.left = `${parseInt(pos) - parseInt(sliderWidth / 2)}px`;
    }

    mute() {
        const { audio } = this.state;
        audio.volume = 0;
        this.moveVolumeSlider(0)
    }

    maxVol() {
        const bar = document.querySelector('.bar');
        const barWidth = bar.offsetWidth;
        const { audio } = this.state;
        audio.volume = 1;
        this.moveVolumeSlider(barWidth)
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
        const currentBar = document.querySelector('.current-bar');
        currentBar.style.width = `${len}px`;
    }


    seeking(e) {
        const progressBar = document.querySelector('.progress-bar');
        const { audio } = this.state;
        const percentCurrentTime = e.nativeEvent.offsetX / progressBar.offsetWidth;
        audio.currentTime = percentCurrentTime * audio.duration;

    }

    componentDidMount() {
        const { audio } = this.state;
        const progressBarWidth = document.querySelector('.progress-bar').offsetWidth;
        // 
        audio.src = mp3;
        audio.load();
        // 
        audio.onended = () => {
            this.setState({
                isPlaying: false
            })
        }
        this.handleHover();
        this.update = setInterval(() => {
            this.setState({
                currentTime: this.convertTime(Math.floor(audio.currentTime))
            });
        }, 500);
        this.updateCurrentBar = setInterval(() => {
            const timePercent = (audio.currentTime / audio.duration);
            const currentBarLength = parseFloat(timePercent) * parseFloat(progressBarWidth);
            this.setCurrentBarLength(currentBarLength);
        }, 100)
    }

    handleHover() {
        // const progressBar = document.querySelector('.progress-bar');
        // const currentBar = document.querySelector('.current-bar');
        // const bgcolor = currentBar.style.backgroundColor;
        // progressBar.addEventListener('mouseover', () => {
        //     currentBar.style.backgroundColor = '#fe2d55';
        // })
        // progressBar.addEventListener('mouseout', () => {
        //     currentBar.style.backgroundColor = bgcolor;

        // })

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
                        <div className="progress-bar" onClick={this.seeking}>
                            <div className="current-bar">
                            </div>
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
                                <div className="volume-slider">
                                </div>
                                <div className="volume-bar" onClick={this.adjustVolume}>
                                </div>
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