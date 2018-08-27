import React from 'react';
import YouTube from 'react-youtube';
import {connect} from 'react-redux';
import {getDataFromApi} from '../actions/protected-data';

const videoIdA = 'XxVg_s8xAms';
const videoIdB = '-DX3vJiqxm4';

export class Poo extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          videoId: videoIdA,
          player: null,
          channel: 0,
        };
    
        this.onReady = this.onReady.bind(this);
        this.onChangeVideo = this.onChangeVideo.bind(this);
        this.onPlayVideo = this.onPlayVideo.bind(this);
        this.onPauseVideo = this.onPauseVideo.bind(this);
      }
    componentDidMount() {
       this.props.dispatch(getDataFromApi('puppy'));
    }

    handleChange = e => {
        console.log(this);
        this.setState({ input: e.target.value });
      }
    
      handleClick = e => {
        console.log(this.state.input);
        this.props.dispatch(getDataFromApi(this.state.input))
      }
      
        onReady(event) {
          console.log(`YouTube Player object for videoId: "${this.state.videoId}" has been saved to state.`); // eslint-disable-line
          this.setState({
            player: event.target,
          });
        }
      
        onPlayVideo() {
          this.state.player.playVideo();
        }
      
        onPauseVideo() {
          this.state.player.pauseVideo();
        }
      
        onChangeVideo(i) {
          let channel = this.state.channel+i;
          if(channel < 0){
            channel = this.props.clips.length - 1
          }
          if(channel > this.props.clips.length - 1){
            channel = 0
          }
          this.setState({
            channel: channel,
            //videoId: this.state.videoId === videoIdA ? videoIdB : videoIdA,
            videoId: this.props.clips[channel].id.videoId
          });
        }
      
    render() {
        const opts = {
            height: window.innerHeight - 100,
            width: window.innerWidth - 100,
            playerVars: { // https://developers.google.com/youtube/player_parameters
              //autoplay: 1
            }
          };
        const movies = this.props.clips.map((item, i) =>
        <YouTube
            //onReady={(event) => this.setPlayer(this.state, i)}
            //onPlay={() => this.pauseOtherPlayers(i)}
            videoId= {item.id.videoId}
            opts={opts}
            key ={i}
             />
        /*<li key ={i}><iframe src={`https://www.youtube.com/embed/${item.id.videoId}?autoplay=1`} onLoad={ () => this.handleLoad(item) } frameBorder="0" allowFullScreen></iframe>{item.id.videoId}</li>*/
      );
        return ( 
            <div>Poo
                <div className= 'search'>
                {this.state.channel}
                <YouTube videoId={this.state.videoId} onReady={this.onReady} />
                <button onClick={this.onPlayVideo}>Play</button>
                <button onClick={this.onPauseVideo}>Pause</button>
                <button onClick={()=>{this.onChangeVideo(-1)}}>Previous</button>
                <button onClick={()=>{this.onChangeVideo(1)}}>Next</button>
                    <input type="text" onChange={ this.handleChange } />
                        <input
                        type="button"
                        value="Search"
                        onClick={this.handleClick}
                        />
                </div>
                {movies}{this.props.name}
            </div>
        )
    }
}


const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    name: 'Josh',
    clips: state.protectedData.clips,
    players: state.protectedData.players
});

export default connect(mapStateToProps)(Poo);
