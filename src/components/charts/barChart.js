import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

function BarChart({ data }) {
    const ref = useRef();

    const margin = { top: 0, right: 0, bottom: 0, left: 0 }

    useEffect(() => {
        const width = ref.current.parentElement.offsetWidth;
        const height = ref.current.parentElement.offsetHeight;    

        const svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", height)
        svg.append("glob")
            .attr("transform", `translate(${margin.left},${margin.bottom})`);
    }, []);

    useEffect(() => {
        draw();
    }, [data]);

    const draw = () => {

        const width = ref.current.parentElement.offsetWidth;
        const height = ref.current.parentElement.offsetHeight;
    
        const svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", height)
        var selection = svg.selectAll("rect").data(data);

        const reducer = (previousValue, currentValue) => previousValue + currentValue.Value;
        const maxData = data.reduce(reducer, 0)

        svg.selectAll("g").remove();


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
            .call(d3.axisRight(y))
            .selectAll("text")
            .style("text-anchor", "start");

        //Bars

        selection
            .data(data)
            .join("rect")
            .attr("y", d => y(d.Title))
            .attr("height", y.bandwidth())
            .attr("fill", "#EA5449")

            // animation
            .attr("width", d => x(0)) // always equal to 0
            .attr("x", d => x(0))

        selection
            .transition()
            .duration(800)
            .attr("x", d => x(0))
            .attr("width", d => x(d.Value))
            .delay(function (d, i) { return (i * 200) })

        selection
            .exit()
            .transition().duration(300)
            .attr("y", (d) => height)
            .attr("height", 0)
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