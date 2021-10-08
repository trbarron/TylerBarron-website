import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

function EvalBar({ data }) {
    const ref = useRef();

    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

    const value = (5 + parseFloat(data.evalScore * (data.orientation === "black" ? 1 : -1)));

    const text = data.evalText;

    // console.log("Current: ", value, " Next: ", prevDataVal);

    useEffect(() => {
        const width = ref.current.parentElement.parentElement.offsetWidth;
        const height = ref.current.parentElement.parentElement.offsetHeight;

        const svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", height)
        svg.append("glob")
            .attr("transform", `translate(0,0)`);
    }, []);

    useEffect(() => {

        const evalData = [{
            Title: "Eval",
            Value: clamp(value, 0.1, 9.9),
        }];

        const draw = () => {

            const width = ref.current.parentElement.parentElement.offsetWidth;
            const height = ref.current.parentElement.parentElement.offsetHeight;

            const svg = d3.select(ref.current)
                .attr("width", width)
                .attr("height", height)
            var selection = svg.selectAll("rect").data(evalData);

            svg.selectAll("g").remove();


            const x = d3.scaleBand()
                .range([0, height])
                .domain(evalData.map(d => d.Title))
            svg.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x))

            // Y axis
            const y = d3.scaleLinear()
                .domain([0, 10])
                .range([0, height]);
            svg.append("g")
                .selectAll("text.bar")
                .data(evalData)
                .enter()
                .append("text")
                .attr("class", "yAxis-label")
                .attr("text-anchor", "middle")

                .attr("fill", "#888888")
                .attr("x", () => width / 2)
                .attr("y", () => height / 2)
                .text(() => text)


            //Bars

            const fill = (data.orientation === "black" ? "#FFFFFF" : "#000000")

            selection
                .data(evalData)
                .join("rect")
                .attr("x", d => x(d.Title))
                .attr("width", x.bandwidth())
                .attr("fill", fill)
                .transition()
                .duration(1000)
                .attr("y", () => y(0))
                .attr("height", d => y(d.Value))
                .delay(function (d, i) { return (i * 200) })
        }

        draw();
    }, [data, value]);




    return (
        <div className="chart">
            <svg ref={ref}>
            </svg>
        </div>

    )

}

export default EvalBar;