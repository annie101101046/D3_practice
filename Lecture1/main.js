        const svg = d3.select('#chart')
            .append('svg')
            .attr('width', 600)
            .attr('height', 600);

        const data = [6, 9, 12, 15, 20, 5, 9, 12];

        // 圓形群組
        const circles = svg
            .selectAll('circle')
            .data(data)

        // 取得陣列最大值
        // 預設最大是第一個數字
        let maxR = data[0]
        data.forEach(function (d) {
            // 如果有個數字大於最大的數字
            if (d > maxR) {
                // 設定此數字是最大數
                maxR = d
            }
        });

        circles
            .enter()
            .append('circle')
            .attr('r', function (d, i) {
                // console.log(`第${i + 1}顆半徑是${d}`);
                // d 6,9,12,15
                return d;
            })
            .attr('cx', function (d, i) {
                return (i * 40) + maxR;
            })
            .attr('cy', function (d, i) {
                // 是否為奇數
                // i除2餘數如果不是0
                if (i % 2 !== 0) {
                    return maxR * 3;
                } else {
                    return maxR;
                }
            })
            .attr('fill', function (d, i) {
                if (d > 10) {
                    // 回傳橘色
                    return '#f85a40'
                } else {
                    return '#ffc845'
                }
            });

        // 新增矩形
        /*
        svg.append('rect')
            .attr('width', 120)
            .attr('height', 30)
            .attr('x', 0)
            .attr('y', 0)
            .attr('fill', '#f10025');
        */

        // 新增圓形
        /*
        svg.append('circle')
            .attr('r', 12)
            .attr('cx', 12)
            .attr('cy', 12)
            .attr('fill', '#25f100')
        */