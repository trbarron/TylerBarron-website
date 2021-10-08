import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

function EvalBar({ data }) {
    const ref = useRef();

    const margin = { top: 0, right: 0, bottom: 0, left: 0 }

    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

    const value = (5 + parseFloat(data.evalScore * (data.orientation === "black" ? 1 : -1)));

    const evalData = [{
        Title: "Eval",
        Value: clamp(value, 0.1, 9.9)
    }];

    const prevDataVal = clamp((5 - parseFloat(data.prevEvalScore)), 0.1, 9.9);

    console.log("Current: ", value, " Next: ", prevDataVal);

    useEffect(() => {
        const width = ref.current.parentElement.parentElement.offsetWidth;
        const height = ref.current.parentElement.parentElement.offsetHeight;

        const svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", height)
        svg.append("glob")
            .attr("transform", `translate(${margin.left},${margin.bottom})`);
    }, []);

    useEffect(() => {
        draw();
    }, [evalData]);

    const draw = () => {

        const width = ref.current.parentElement.parentElement.offsetWidth;
        const height = ref.current.parentElement.parentElement.offsetHeight;

        const svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", height)
        var selection = svg.selectAll("rect").data(evalData);

        // const reducer = (previousValue, currentValue) => previousValue + currentValue.Value;
        // const maxData = evalData.reduce(reducer, 0)

        svg.selectAll("g").remove();


        const x = d3.scaleBand()
            .range([0, height])
            .domain(evalData.map(d => d.Title))
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // Y axis
        const y = d3.scaleLinear()
            .domain([0, 10])
            .range([0, height]);
        svg.append("g")
            .call(d3.axisLeft(y))
            .selectAll("text")
            .style("text-anchor", "start");



        //Bars

        const fill = (data.orientation === "black" ? "#FFFFFF" : "#000000")

        selection
            .data(evalData)
            .join("rect")
            .attr("x", d => x(d.Title))
            .attr("width", x.bandwidth())
            .attr("fill", fill)

            // // animation
            // .attr("height", d => y(prevDataVal)) // always equal to 0
            // .attr("y", d => y(0))

        selection
            .transition()
            .duration(1000)
            .attr("y", d => y(0))
            .attr("height", d => y(d.Value))
            .delay(function (d, i) { return (i * 200) })

        selection
            .exit()
            .transition().duration(200)
            .attr("x", (d) => width)
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

export default EvalBar;