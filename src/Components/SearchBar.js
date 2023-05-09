import React from 'react'

export default function SearchBar(props) {
    return (
        <div className="row">
            <div className="col-md-6">
                <h1 className="title">WeatherMetrics</h1>
            </div>

            <div className="col-md-6">
                <form className="region" onSubmit={e=>props.changeWeather(e)}>
                    <input className="regioninput" placeholder="Enter Location" onChange={e=>props.inputChange(e.target.value)} />
                </form>
                
            </div>
            
        </div>
    )
}
