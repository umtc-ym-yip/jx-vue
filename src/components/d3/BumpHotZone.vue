<template>
    <div>
        <p class="mb-0 fw-bold" v-if="props.board === 0">Panel Stack</p>
        <p class="mb-0 fw-bold" v-else>Panel {{ props.board }}</p>
        <div ref="chart"></div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watchEffect, watch, onBeforeUpdate, onUpdated } from 'vue';
import { storeToRefs } from "pinia";
import pinia from "@/stores/index.js";
import * as d3 from 'd3';

const props = defineProps({
    board: {
        type: Number,
        default: 0
    },
    mpltxy: {
        type: Object,
        default: () => ({})
    },
    data: Array
});

const chart = ref(null);

const windowWidth = ref(window.innerWidth);

const rwdWidth = computed(() => {

    if (props.board !== 0) {
        return windowWidth.value * 0.3
    } else {
        return windowWidth.value * 0.4
    }
});
// const rwdWidth = ref(400);

const rwdHeight = computed(() => {
    return props.board === 0 ? rwdWidth.value * 0.7 : rwdWidth.value * 0.5;
});

const margin = 30;

const toTop = margin / 2;

const toBottom = computed(() => {
    return rwdHeight.value - margin / 2
})
const toLeft = margin;

const toRight = computed(() => {
    return props.board === 0 ? rwdWidth.value - margin * 2 : rwdWidth.value - margin * 3;
});

// const legendLength = computed(() => {
//     return rwdHeight.value - margin
// });

const heatvalueAry = computed(() => {
    console.log('mytest',renderData.value);
    const step = renderData.value.map((i) => i.count).sort((a, b) => b - a)[0] / 10;
    const result = [];
    for (let index = 0; index < 11; index++) {
        const element = step * index;
        result.push(element);
    };
    console.log('mytest2',result);
    return result;

});
const xAxisArray = computed(() => {
    if (props.mpltxy.MpX) {
        return Array.from({ length: props.mpltxy.MpX }, (_, index) => index + 1)
    } else {
        return []
    }

});
const yAxisArray = computed(() => {
    if (props.mpltxy.MpY) {
        return Array.from({ length: props.mpltxy.MpY }, (_, index) => index + 1).reverse()
    } else {
        return []
    }
});
const renderData = computed(() => {
    const dataArray = [];
    xAxisArray.value.forEach((x) => {
        yAxisArray.value.forEach((y) => {
            const filterData = props.data.filter((d) =>
                Number(d.Unit_X) === x
                &&
                Number(d.Unit_Y) === y
                &&
                (props.board === 0 ? true : Number(d.Panel) === props.board)
            );

            dataArray.push({
                x, y, count: filterData.length > 0 ? filterData.length : 0
            })
        })
    });
    return dataArray
})

const drawChart = () => {
    let colorYGBScale;
    const coloursYGB = ["#2c7bb6", "#00a6ca", "#00ccbc", "#90eb9d", "#dfdf13", "#f9d057", "#f29e2e", "#e76818", "#d7191c"];


    // if (props.board === 0) {
    if (heatvalueAry.value[heatvalueAry.value.length - 1] !== 0) {
        colorYGBScale = d3.scaleLinear()
            .range(coloursYGB)
            .domain(heatvalueAry.value);
    }

    // } else {
    //     d3.scaleBand()
    //     colorYGBScale = d3.scaleOrdinal(d3.schemePaired).domain(heatvalueAry.value);
    // }
    d3.select(chart.value).select(`.heat-svg`).remove();

    d3.select(chart.value).append('svg')
        .attr('class', `heat-svg`)
        .attr('width', rwdWidth.value)
        .attr('height', rwdHeight.value);


    const heatSvg = d3.select(chart.value).select(`.heat-svg`);

    const xScale = d3.scaleBand()
        .range([toLeft, toRight.value])
        .domain(xAxisArray.value)
        .padding(0.1);
    const yScale = d3.scaleBand()
        .range([toBottom.value, toTop])
        .domain(yAxisArray.value)
        .padding(0.1);

    const xAxis = heatSvg
        .append('g')
        .attr('class', `xAxis`)
        .attr('transform', `translate(0,${toBottom.value})`);
    const yAxis = heatSvg
        .append('g')
        .attr('class', `yAxis`)
        .attr('transform', `translate(${toLeft},0)`);

    xAxis.call(d3.axisBottom(xScale).tickSize(0))
        .select(".domain").remove();
    yAxis.call(d3.axisLeft(yScale).tickSize(0))
        .select(".domain").remove();

    xAxis.selectAll('text')
        .attr('dx', (d) => locAdjust('x', d));

    yAxis.selectAll('text')
        .attr('dy', (d) => locAdjust('y', d) + 4)


    heatSvg
        .append('g')
        .attr('class', 'heat-map')
        .selectAll('rect')
        .data(renderData.value)
        .enter()
        .append("rect")
        .attr("x", d => locAdjust('x', d.x, xScale))
        .attr("y", d => locAdjust('y', d.y, yScale))
        .attr("rx", 1)
        .attr("ry", 1)
        .attr("width", xScale.bandwidth())
        .attr("height", yScale.bandwidth())
        .attr("fill", d => colorYGBScale ? colorYGBScale(d.count) : '#2c7bb6')
        .style("stroke-width", 4)
        .style("stroke", "none")
        .attr("opacity", 0.8)
        .on("mouseover", (e) => {
            if (props.board === 0) {


                const { x, y } = e.target.__data__;
                const filterData = props.data.filter((d) =>
                    Number(d.Unit_X) === x
                    &&
                    Number(d.Unit_Y) === y);

                if (filterData.length > 0) {
                    let htmlStr = '';
                    filterData.forEach((f, index) => {
                        htmlStr += `<p ${index !== filterData.length - 1 ? 'class="mb-1"' : 'class="mb-0"'}>板號 : ${f.Panel}</p>`
                    })

                    d3.select(chart.value)
                        .append('div')
                        .attr('class', 'tooltip rounded shadow shadow-sm p-2 position-fixed')
                        .style("opacity", 1)
                        // .style('position', 'absolute')
                        .style('z-index', 9999)
                        .style("background-color", "white")
                        .style('left', `${(e.clientX + 10)}px`)
                        .style('top', `${(e.clientY)}px`)
                        .html(`
                <div>
                    ${htmlStr}
                </div>
                `)
                }

            }
        })
        .on('mouseleave', (e) => {
            d3.select('.tooltip').remove();
        })


    if (props.board === 0) {
        heatSvg
            .append('g')
            .attr('class', 'heat-map-text')
            .selectAll('text')
            .data(renderData.value)
            .enter()
            .append('text')
            .attr('class', 'heat-text')
            .style('pointer-events', 'none')
            .style('cursor', 'default')
            .style('font-size', '12px')
            .attr('fill', '#fff')
            .attr('text-anchor', 'middle')
            .attr('class', 'fw-bold')
            .text(d => d.count)
            .attr('x', d => xScale.bandwidth() / 2 + locAdjust('x', d.x, xScale))
            .attr('y', d => yScale.bandwidth() / 2 + locAdjust('y', d.y, yScale) + 4)

        // legend
        const legendcolorSacle = d3.scaleLinear()
            .range([margin, rwdHeight.value - margin])
            .domain([heatvalueAry.value[heatvalueAry.value.length - 1], 0])
            .nice()

        const defs = heatSvg.append("defs");

        defs.append("linearGradient")
            .attr("id", "gradient-ygb-colors")
            .attr("x1", "0%")
            .attr("y1", "100%")
            .attr("x2", "0%")
            .attr("y2", "0%")
            .selectAll("stop")
            .data(coloursYGB)
            .enter().append("stop")
            .attr("offset", (d, i) => i / (coloursYGB.length - 1))
            .attr("stop-color", d => d);

        const legendWrap = heatSvg
            .append('g')
            .attr("class", "legendWrapper");

        legendWrap.append("rect")
            .attr("class", "legendRect")
            .attr("x", rwdWidth.value - margin * 2 + 10)
            .attr("y", margin)
            .attr("width", 10)
            .attr("height", rwdHeight.value - margin * 2)
            .style("fill", "none");

        legendWrap.select(".legendRect")
            .style("fill", "url(#gradient-ygb-colors)");

        legendWrap
            .append('g')
            .attr('class', 'color-xAxis')
            .attr("transform", `translate(${rwdWidth.value - margin * 2 + 10 + 10},${0})`)
            .call(d3.axisRight(legendcolorSacle).ticks(5).tickFormat(d => Number.isInteger(d) ? `${d}顆` : '')).attr('font-size', 12);


        legendWrap.selectAll('.color-xAxis .domain,.color-xAxis .tick line')
            .attr('stroke', 'rgba(0,0,0,0.1)');
    }

}

let gapRange = 2
const locAdjust = (type, value, scale) => {
    if (type === 'x') {
        return value > xAxisArray.value.length / 2
            ? scale ? scale(value) + gapRange : gapRange
            : scale ? scale(value) - gapRange : -gapRange
    } else {
        return value > yAxisArray.value.length / 2
            ? scale ? scale(value) + gapRange : gapRange
            : scale ? scale(value) - gapRange : -gapRange
    }

}





onMounted(() => {
    window.addEventListener('resize', (event) => {
        windowWidth.value = event.target.innerWidth;
    });
    watchEffect(() => {
        drawChart();
    })
});

</script>

<style lang="scss" scoped></style>