import React, { Component } from 'react'
import * as d3 from 'd3'

class PokemonChart extends Component {

    drawChart() {
        const data = [12, 5, 6, 6, 9, 10]

        const svg = d3.select("body")
            .append("svg")
            .attr("width", 500)
            .attr("height", 500)
            .attr("x", 0)
            .style("padding", 300)
            
            svg.append("rect")
                .attr("x", 100)
                .attr("y", 50)
                .attr("height", 100)
                .attr("width", 200)
            // .style("margin", 100)
        // svg.selectAll("rect")
        //     .data(data)
        //     .enter()
        //     .append("rect")
        //     .attr("x", (d, i) => i * 70)
        //     .attr("y", (d, i) => 300 - 10 * d)
        //     .attr("width", 50)
        //     .attr("height", (d, i) => d * 10)
        //     .attr("fill", "green")



        // svg.selectAll("text")
        //     .data(data)
        //     .enter()
        //     .append("text")
        //     .text((d) => d)
        //     .attr("x", (d, i) => i * 70)
        //     .attr("y", (d, i) => 297 - d * 10)


        // Selection.attr("property", (d, i) => {})
    }

    componentDidMount() {
        this.drawChart()
    }
    render() {
        return <div className="chart"></div>
    }
}

export default PokemonChart;
// this is the website i've been looking at to figure out d3
// https://blog.logrocket.com/data-visualization-in-react-using-react-d3-c35835af16d0/