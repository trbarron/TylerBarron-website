import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

function BarChart({ width, height, data }) {
    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", height)
            .style("border", "0")
    }, []);

    useEffect(() => {
        draw();
    }, [data]);

    const draw = () => {
        const svg = d3.select(ref.current);
        var selection = svg.selectAll("rect").data(data);

        const reducer = (previousValue, currentValue) => Math.max(previousValue, currentValue.Value);
        const maxData = data.reduce(reducer,0)

        const x = d3.scaleLinear()
            .domain([0, maxData])
            .range([0, width]);
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // Y axis
        const y = d3.scaleBand()
            .range([0, height])
            .domain(data.map(d => d.Title))
            .padding(.1);
        svg.append("g")
            .call(d3.axisLeft(y))



        //Bars

        // selection
        //     .transition().duration(300)
        //     .attr("width", (d) => x(d))
        //     .attr("x", (d) => height - x(d))

        selection
            .data(data)
            .join("rect")
            .attr("x", x(0))
            .attr("y", d => y(d.Title))
            .attr("width", d => x(d.Value))
            .attr("height", y.bandwidth())
            .attr("fill", "#EA5449")

        selection
            .exit()
            .transition().duration(300)
            .attr("x", () => width)
            .attr("width", 0)
            .remove()
    }


    return (
        <div className="chart">
            <svg ref={ref}>
            </svg>
        </div>

    )

}

export default BarChart;