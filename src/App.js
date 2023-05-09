import {React,Component} from 'react';
import Axios from 'axios';
import './App.css';
import RenderWeather from './Components/RenderWeather';
import SearchBar from './Components/SearchBar';

class App extends Component {

  state={
    Coords:{
      latitude:26,
      longitude:56
    },
    data:{},
    userinput:""
  }

  componentDidMount(){
    //to get the device location
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{

        // console.log(position.coords.latitude);
        // console.log(position.coords.longitude);

        this.setState({Coords:{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
          
        }});

        Axios.get(`http://api.weatherstack.com/current?access_key=fa485b69ed0694abfa62af3ec33b0aae&query=${this.state.Coords.latitude},${this.state.Coords.longitude}`).then(res=>{
          let weatherInfo = {
            location:res.data.location.name,
            temperature:res.data.current.temperature,
            description:res.data.current.weather_descriptions[0],
            region:res.data.location.region,
            country:res.data.location.country,
            wind_speed:res.data.current.wind_speed,
            pressure:res.data.current.pressure,
            precip:res.data.current.precip,
            humidity:res.data.current.humidity,
            img: res.data.current.weather_icons
          }
          this.setState( {data: weatherInfo });
        }
        );

        // this.setState( {data: weatherInfo });

      })
    }
    else{
      console.log("Not Supported");
    }
  }

  //grab user input

  inputHandler = (value)=>{
    this.setState({userinput:value});

  }

  handleWeather = (e)=>{
    e.preventDefault();

    Axios.get(`http://api.weatherstack.com/current?access_key=fa485b69ed0694abfa62af3ec33b0aae&query=${this.state.userinput}`).then(res=>{

      let weatherInfo = {
        location:res.data.location.name,
        temperature:res.data.current.temperature,
        description:res.data.current.weather_descriptions[0],
        region:res.data.location.region,
        country:res.data.location.country,
        wind_speed:res.data.current.wind_speed,
        pressure:res.data.current.pressure,
        precip:res.data.current.precip,
        humidity:res.data.current.humidity,
        img: res.data.current.weather_icons
      }
      this.setState( {data: weatherInfo });


    });


  }

  render(){
    return (
      <div className="App">
        <div className="container">
          <SearchBar changeWeather = { this.handleWeather} inputChange = {this.inputHandler} />
        
          <RenderWeather weatherData = {this.state.data}/>
        </div>
      </div>
    );
  }
  
}

export default App;
