// data
const data = [10, 2, 4, 5, 20, 35];
//size
const width = 400,
    height = 400,
    radius = width / 2;

// SVG
const svg = d3.select('#pieChart')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

// 準備產生圓形資料的函數
const pie = d3.pie()
    //必須回傳跟圓餅圖繪製有關的數字
    .value(function (d) {
        return d;
    });


// 準備產生弧形資料的函數
const arc = d3.arc()
    //內圓半徑
    .innerRadius(radius - 80)
    //外圓半徑
    .outerRadius(radius)

// const testdata = pie(data)[0];

// console.log(pie(data));
// console.log(arc(testdata));

//放入一個 g
const arcs = svg.selectAll('.arc')
    .data(pie(data))
    .enter()
    .append('g')
    .attr('class', 'arc')
    .attr('transform', `translate(${radius},${radius})`)

//顏色
colors = d3.schemeCategory10

//在每個 g 放入 path
arcs.append('path')
    .attr('d', function (d) {
        return arc(d);
    })
    .attr('fill', function (d, i) {
        return colors[i]
    });