import React, {Component} from "react";

import "./App.css"

import {Grommet, Header, Grid, Box, Menu} from 'grommet';


const PLACES = [
    {name: "Moscow", zip: "moscow"},
    {name: "St. Petersburg", zip: "sankt-peterburg"},
    {name: "Kazan", zip: "kazan"},
    {name: "Omsk", zip: "omsk"},
    {name: "Novosibirsk", zip: "novosibirsk"}
];

class WeatherDisplay extends Component {
    constructor() {
        super();
        this.state = {
            weatherData: null
        };
    }

    componentDidMount() {
        const zip = this.props.zip;
        const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
            zip +
            "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
        fetch(URL).then(res => res.json()).then(json => {
            this.setState({weatherData: json});
        });
    }

    render() {
        const weatherData = this.state.weatherData;
        if (!weatherData) return <div>Loading</div>;
        const weather = weatherData.weather[0];
        const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
        return (
            <Grommet className='grommet'>
                <h1>
                    {weather.main} in {weatherData.name}
                    <img src={iconUrl} alt={weatherData.description}/>
                </h1>
                <p>Current: {Math.round((weatherData.main.temp - 32) * 5 / 9)}°С</p>
                <p>High: {Math.round((weatherData.main.temp_max - 32) * 5 / 9)}°С</p>
                <p>Low: {Math.round((weatherData.main.temp_min - 32) * 5 / 9)}°С</p>
                <p>Wind Speed: {Math.round(weatherData.wind.speed * 1.69)} km/hr</p>
            </Grommet>
        );
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            activePlace: 0
        };
    }

    render() {
        const activePlace = this.state.activePlace;
        return (
            <Grommet className='grommet'>
                <Header background="brand">
                    <h1>React Simple Weather App</h1>
                </Header>
                <Grid
                    rows={['xxsmall', 'small']}
                    columns={['small', 'xlarge']}
                    gap="large"
                    areas={[
                        {name: 'nav', start: [0, 0], end: [0, 1]},
                        {name: 'main', start: [1, 0], end: [1, 1]},
                    ]}
                >
                    <Box>
                        <Menu
                            label="Select a city"
                            items={[
                                {
                                    label: 'Moscow', onClick: () => {
                                        this.setState({activePlace: 0})
                                    }
                                },
                                {
                                    label: 'St. Petersburg', onClick: () => {
                                        this.setState({activePlace: 1})
                                    }
                                },
                                {
                                    label: 'Kazan', onClick: () => {
                                        this.setState({activePlace: 2})
                                    }
                                },
                                {
                                    label: 'Omsk', onClick: () => {
                                        this.setState({activePlace: 3})
                                    }
                                },
                                {
                                    label: 'Novosibirsk', onClick: () => {
                                        this.setState({activePlace: 4})
                                    }
                                },
                            ]}
                        />
                    </Box>
                    <Box
                        gridArea="main"
                        background="light-2"
                        height="large">
                        <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip}/>
                    </Box>
                </Grid>
            </Grommet>
        );
    }
}

export default App;