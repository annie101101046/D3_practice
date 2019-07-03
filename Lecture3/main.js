// // data
// const data = [10, 2, 4, 5, 20, 35];
// //size
// const width = 400,
//     height = 400,
//     radius = width / 2;

// // SVG
// const svg = d3.select('#pieChart')
//     .append('svg')
//     .attr('width', width)
//     .attr('height', height);

// // 準備產生圓形資料的函數
// const pie = d3.pie()
//     //必須回傳跟圓餅圖繪製有關的數字
//     .value(function (d) {
//         return d;
//     });


// // 準備產生弧形資料的函數
// const arc = d3.arc()
//     //內圓半徑
//     .innerRadius(radius - 80)
//     //外圓半徑
//     .outerRadius(radius)

// // const testdata = pie(data)[0];

// // console.log(pie(data));
// // console.log(arc(testdata));

// //放入一個 g
// const arcs = svg.selectAll('.arc')
//     .data(pie(data))
//     .enter()
//     .append('g')
//     .attr('class', 'arc')
//     .attr('transform', `translate(${radius},${radius})`)

// //顏色
// colors = d3.schemeCategory10

// //在每個 g 放入 path
// arcs.append('path')
//     .attr('d', function (d) {
//         return arc(d);
//     })
//     .attr('fill', function (d, i) {
//         return colors[i]
//     });

d3.csv('data.csv')
    .then((data) => {
        //篩選 2019 年 5 月的資料
        data = data.filter(d => {
            return d['日期'] === '2019年05月'
        });
        /* 
        {
            city: '新北市',
            data:[{
                title:'住宅用電'
                value: xxx
            },{},{},{}]
        }
        */

        data = data.map(d => {
            for (let p in d) {
                console.log(p); // 會看到屬性名稱
                //檢查這筆資料是不是數字格式
                if (!isNaN(d[p])) {
                    //把這筆資料轉成數字
                    d[p] = +d[p]
                }
            }
            console.log(d);
            return {
                city: d['縣市'],
                data: [{
                        title: '住宅用電',
                        value: d['住宅部門售電量(度)']
                    },
                    {
                        title: '服務業用電',
                        value: d['服務業部門售電量(度)']
                    },
                    {
                        title: '機關用電',
                        value: d['機關用電售電量(度)']
                    },
                    {
                        title: '農林漁牧用電',
                        value: d['農林漁牧售電量(度)']
                    }
                ]
            }
        })
        console.log(data);

        //選擇 row
        const row = d3.select('#row');
        // 定義欄
        const column = row
            .selectAll('.column')
            .data(data)
            .enter()
            .append('div')
            .attr('class', 'col-md-4')
            .append('div')
            .attr('class', 'column');

        //放置標題
        column.append('h1')
            .attr('class', 'text-center text-primary')
            .text(function (d) {
                return d.city
            })

        //定義尺寸
        const width = d3.select('.column').node().clientWidth,
            height = width,
            radius = width / 2;

        // 取得 .column 的寬度
        // console.log('column:', d3.select('.column').node().clientWidth);

        // 定義形狀等產生器
        const arc = d3.arc()
            .innerRadius(radius - 100)
            .outerRadius(radius)

        const pie = d3.pie()
            .value(function (d) {
                return d.value
            })
        //放置 svg
        const svg = column.append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', `0 0 ${width} ${height}`);

        /* 
        目前 data 格式，所以不能直接丟進去
        {
            title:'xxx'
            data:[{},{},{}]
        }
        */
        const arcs = svg
            .selectAll('.arc')
            .data(function (d) {
                return pie(d.data);
            })
            .enter()
            .append('g')
            .attr('class', 'arc')
            .attr('transform', `translate(${radius},${radius})`)

        const colors = d3.schemeCategory10;

        arcs.append('path')
            .attr('d', function (d) {
                console.log(d);
                console.log(arc(d));
                return arc(d);
            })

            .attr('fill', function (d, i) {
                return colors[i];
            })
        // arcs.attr('test', function (d) {
        //     console.log(d);
        // });
    });