// 是否第一次載入
let firstLoad = true;

// 定義地圖的寬度與高度
const width = d3.select('#map').node().clientWidth,
    height = width / 2;

// 設定地界投影
const projection = d3
    // 以美國地界投影
    // https://github.com/d3/d3-geo/blob/v1.11.3/README.md#geoAlbersUsa
    .geoAlbersUsa()
    // 設定位移
    .translate([width / 2, height / 2])
    // 設定縮放
    .scale([800]);

// 定義路徑產生器(path generator)
const usa = d3.geoPath()
    .projection(projection);

// 定義色彩列表
const colorScale = d3.scaleLinear()
    .domain([10000, 50000, 100000, 800000, 3000000, 5000000, 7000000, 9000000, 10000000, 15000000, 20000000, 25000000])
    .range(['#546E7A', '#B0BEC5', '#FFF076', '#FCE26A', '#F9D35F', '#F6C255', '#F3B04A', '#F19E40', '#EE8A36', '#EB752C', '#E86022', '#E64919'])

// 渲染畫面流程
function renderMap(features) {

}

// 定義圖表所需資料
let chartData = [];

// 載入真實資料
function loadData() {

}

// 產生隨機數
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// 放置隨機資料
function randomSeed() {

}

// 將所有資料歸零
function setZero() {

}

// 將所有資料+1000000
function increase() {

}

// 將所有資料-1000000
function decrease() {

}