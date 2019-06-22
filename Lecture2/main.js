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

        // 計算所有資料的平均數
        //reduce num 是指第一個值 0， d 是裡面所有的數值
        const average = data.reduce(function (num, d) {
            console.log('num', num);
            console.log('d', d);
            return num + d.sale;
        }, 0) / data.length;

        console.log(average);

        // 計算出最高的 sale
        const maxSale = d3.max(data, function (d) {
            //d 代表每個在 data 裡的物件，只要 return 需要比對大小的屬性
            return d.sale;
        });

        // 得到最大值
        // console.log('maxSale', maxSale);

        // 整理 labels
        const labels = data.map(function (d) {
            return d.name;
        });
        // console.log(labels); // 會出現所有人的名字

        // 建立 x 軸的對應，用 scaleBand
        const x = d3.scaleBand()
            // 傳入原始資料需要對照的 key
            .domain(labels)
            // 顯示時最小與最大的值
            .range([0, width])
            // 設定資料間的留白
            .paddingInner(0.2)
            // 最左邊跟最右邊
            .paddingOuter(0.5);



        //顯示的寬度 / 資料的長度 - 留白
        // console.log(x.bandwidth());

        // console.log({
        //     Linda: x('Linda'),
        //     David: x('David'),
        //     Andrew: x('Andrew')
        // })


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
                return x(d.name);
            })
            .attr('y', 0)
            .attr('width', x.bandwidth())
            .attr('height', function (d) {
                return y(d.sale);
                // 一種做法是 d.sale/100 ，但會有一些比照上的問題
            })
            .attr('fill', function (d) {
                if (d.sale >= average) {
                    return 'pink'
                } else {
                    return 'red'
                }
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