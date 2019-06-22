// 建立兩個常數
const width = 500,
    height = 500;

// 在容器裡放入 svg
const svg = d3.select('#chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

// 在svg 放入一個 group
const group = svg.append('g');

// 讀取 csv 檔案
const csv = d3.csv('sorce.csv')
    // console.log(csv) // 會發現是一個 promise
    // 當成功讀取檔案後
    .then(function (data) {
        // console.log(data); 會得到 array
        data.forEach(function (d) {
            // console.log(d); //每個物件印出來
            // 資料整數格式化
            d.sale = parseFloat(d.sale);
        });

        // 計算出最高的 sale
        const maxSale = d3.max(data, function (d) {
            //d 代表每個在 data 裡的物件，只要 return 需要比對大小的屬性
            return d.sale;
        });

        // 得到最大值
        // console.log('maxSale', maxSale);

        // 建立 y 軸比例尺
        const y = d3.scaleLinear()
            //原始資料範圍，填入最小到最大
            .domain([0, maxSale])
            // 圖表顯示最小與最大的像素大小範圍
            .range([0, height]);

        //d3 會隨著傳入值換算成畫面的大小
        // console.log(y(0));
        // console.log(y(10000)); //會得到 238.09523809523807
        // console.log(y(21000));

        // console.log(data) 會是物件以及 sales 是數字
        //定義長條的群組並且賦予資料
        const bars = group.selectAll('rect').data(data);

        //繪製長條圖型
        bars.enter()
            .append('rect')
            .attr('x', function (d, i) {
                return i * 30
            })
            .attr('y', 0)
            .attr('width', 20)
            .attr('height', function (d) {
                return d.sale;
                // 一種做法是 d.sale/100 ，但會有一些比照上的問題
            })
    });




// 運用上週的練習畫出長條圖
// const data = [10, 5, 6, 7, 15];
// // 將 group 內的 rect 標籤對應到 data 內的資料
// const bars = group.selectAll('rect').data(data);
// bars.enter()
//     .append('rect')
//     .attr('width', 10)
//     .attr('height', function (d) {
//         return d * 10;
//     })

//     .attr('y', 20)
//     .attr('x', function (d, i) {
//         return i * 20;
//     })