import React from 'react';
import ReactApexChart from "react-apexcharts";
import { dataSeries, githubdata, seriesData } from '../../series';
import moment from "moment";

import getChartColorsArray from "../../../../../../../../Components/Common/ChartsDynamicColor";

const BasicAreaCharts = ({dataColors} : any) => {
    var BasicAreaChartsColors = getChartColorsArray(dataColors);
    const series = [{
        name: "STOCK ABC",
        data: seriesData.monthDataSeries1.prices
    }];
    var options : any = {
        chart: {
            type: 'area',
            height: 350,
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },

        title: {
            text: 'Fundamental Analysis of Stocks',
            align: 'left',
            style: {
                fontWeight: 500,
            },
        },
        subtitle: {
            text: 'Price Movements',
            align: 'left'
        },
        labels: seriesData.monthDataSeries1.dates,
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            opposite: true
        },
        legend: {
            horizontalAlign: 'left'
        },
        colors: BasicAreaChartsColors
    };

    return (
        <React.Fragment>
            <ReactApexChart dir="ltr"
                options={options}
                series={series}
                type="area"
                height="350"
                className="apex-charts"
            />
        </React.Fragment>
    );
};

const SplineAreaChart = ({dataColors} : any) => {
    var areachartSplineColors = getChartColorsArray(dataColors);    
    const series = [{
        name: 'series1',
        data: [31, 40, 28, 51, 42, 109, 100]
    }, {
        name: 'series2',
        data: [11, 32, 45, 32, 34, 52, 41]
    }];
    var options : any = {
        chart: {
            height: 350,
            type: 'area',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        colors: areachartSplineColors,
        xaxis: {
            type: 'datetime',
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
    };

    return (
        <React.Fragment>
            <ReactApexChart dir="ltr"
                options={options}
                series={series}
                type="area"
                height="350"
                className="apex-charts"
            />
        </React.Fragment>
    );
};

const AxisChart = ({dataColors} : any) => {
    var BasicAreaChartsColors = getChartColorsArray(dataColors);
    const series = [{
        data: [
            [1327359600000, 30.95],
            [1327446000000, 31.34],
            [1327532400000, 31.18],
            [1327618800000, 31.05],
            [1327878000000, 31.00],
            [1327964400000, 30.95],
            [1328050800000, 31.24],
            [1328137200000, 31.29],
            [1328223600000, 31.85],
            [1328482800000, 31.86],
            [1328569200000, 32.28],
            [1328655600000, 32.10],
            [1328742000000, 32.65],
            [1328828400000, 32.21],
            [1329087600000, 32.35],
            [1329174000000, 32.44],
            [1329260400000, 32.46],
            [1329346800000, 32.86],
            [1329433200000, 32.75],
            [1329778800000, 32.54],
            [1329865200000, 32.33],
            [1329951600000, 32.97],
            [1330038000000, 33.41],
            [1330297200000, 33.27],
            [1330383600000, 33.27],
            [1330470000000, 32.89],
            [1330556400000, 33.10],
            [1330642800000, 33.73],
            [1330902000000, 33.22],
            [1330988400000, 31.99],
            [1331074800000, 32.41],
            [1331161200000, 33.05],
            [1331247600000, 33.64],
            [1331506800000, 33.56],
            [1331593200000, 34.22],
            [1331679600000, 33.77],
            [1331766000000, 34.17],
            [1331852400000, 33.82],
            [1332111600000, 34.51],
            [1332198000000, 33.16],
            [1332284400000, 33.56],
            [1332370800000, 33.71],
            [1332457200000, 33.81],
            [1332712800000, 34.40],
            [1332799200000, 34.63],
            [1332885600000, 34.46],
            [1332972000000, 34.48],
            [1333058400000, 34.31],
            [1333317600000, 34.70],
            [1333404000000, 34.31],
            [1333490400000, 33.46],
            [1333576800000, 33.59],
            [1333922400000, 33.22],
            [1334008800000, 32.61],
            [1334095200000, 33.01],
            [1334181600000, 33.55],
            [1334268000000, 33.18],
            [1334527200000, 32.84],
            [1334613600000, 33.84],
            [1334700000000, 33.39],
            [1334786400000, 32.91],
            [1334872800000, 33.06],
            [1335132000000, 32.62],
            [1335218400000, 32.40],
            [1335304800000, 33.13],
            [1335391200000, 33.26],
            [1335477600000, 33.58],
            [1335736800000, 33.55],
            [1335823200000, 33.77],
            [1335909600000, 33.76],
            [1335996000000, 33.32],
            [1336082400000, 32.61],
            [1336341600000, 32.52],
            [1336428000000, 32.67],
            [1336514400000, 32.52],
            [1336600800000, 31.92],
            [1336687200000, 32.20],
            [1336946400000, 32.23],
            [1337032800000, 32.33],
            [1337119200000, 32.36],
            [1337205600000, 32.01],
            [1337292000000, 31.31],
            [1337551200000, 32.01],
            [1337637600000, 32.01],
            [1337724000000, 32.18],
            [1337810400000, 31.54],
            [1337896800000, 31.60],
            [1338242400000, 32.05],
            [1338328800000, 31.29],
            [1338415200000, 31.05],
            [1338501600000, 29.82],
            [1338760800000, 30.31],
            [1338847200000, 30.70],
            [1338933600000, 31.69],
            [1339020000000, 31.32],
            [1339106400000, 31.65],
            [1339365600000, 31.13],
            [1339452000000, 31.77],
            [1339538400000, 31.79],
            [1339624800000, 31.67],
            [1339711200000, 32.39],
            [1339970400000, 32.63],
            [1340056800000, 32.89],
            [1340143200000, 31.99],
            [1340229600000, 31.23],
            [1340316000000, 31.57],
            [1340575200000, 30.84],
            [1340661600000, 31.07],
            [1340748000000, 31.41],
            [1340834400000, 31.17],
            [1340920800000, 32.37],
            [1341180000000, 32.19],
            [1341266400000, 32.51],
            [1341439200000, 32.53],
            [1341525600000, 31.37],
            [1341784800000, 30.43],
            [1341871200000, 30.44],
            [1341957600000, 30.20],
            [1342044000000, 30.14],
            [1342130400000, 30.65],
            [1342389600000, 30.40],
            [1342476000000, 30.65],
            [1342562400000, 31.43],
            [1342648800000, 31.89],
            [1342735200000, 31.38],
            [1342994400000, 30.64],
            [1343080800000, 30.02],
            [1343167200000, 30.33],
            [1343253600000, 30.95],
            [1343340000000, 31.89],
            [1343599200000, 31.01],
            [1343685600000, 30.88],
            [1343772000000, 30.69],
            [1343858400000, 30.58],
            [1343944800000, 32.02],
            [1344204000000, 32.14],
            [1344290400000, 32.37],
            [1344376800000, 32.51],
            [1344463200000, 32.65],
            [1344549600000, 32.64],
            [1344808800000, 32.27],
            [1344895200000, 32.10],
            [1344981600000, 32.91],
            [1345068000000, 33.65],
            [1345154400000, 33.80],
            [1345413600000, 33.92],
            [1345500000000, 33.75],
            [1345586400000, 33.84],
            [1345672800000, 33.50],
            [1345759200000, 32.26],
            [1346018400000, 32.32],
            [1346104800000, 32.06],
            [1346191200000, 31.96],
            [1346277600000, 31.46],
            [1346364000000, 31.27],
            [1346709600000, 31.43],
            [1346796000000, 32.26],
            [1346882400000, 32.79],
            [1346968800000, 32.46],
            [1347228000000, 32.13],
            [1347314400000, 32.43],
            [1347400800000, 32.42],
            [1347487200000, 32.81],
            [1347573600000, 33.34],
            [1347832800000, 33.41],
            [1347919200000, 32.57],
            [1348005600000, 33.12],
            [1348092000000, 34.53],
            [1348178400000, 33.83],
            [1348437600000, 33.41],
            [1348524000000, 32.90],
            [1348610400000, 32.53],
            [1348696800000, 32.80],
            [1348783200000, 32.44],
            [1349042400000, 32.62],
            [1349128800000, 32.57],
            [1349215200000, 32.60],
            [1349301600000, 32.68],
            [1349388000000, 32.47],
            [1349647200000, 32.23],
            [1349733600000, 31.68],
            [1349820000000, 31.51],
            [1349906400000, 31.78],
            [1349992800000, 31.94],
            [1350252000000, 32.33],
            [1350338400000, 33.24],
            [1350424800000, 33.44],
            [1350511200000, 33.48],
            [1350597600000, 33.24],
            [1350856800000, 33.49],
            [1350943200000, 33.31],
            [1351029600000, 33.36],
            [1351116000000, 33.40],
            [1351202400000, 34.01],
            [1351638000000, 34.02],
            [1351724400000, 34.36],
            [1351810800000, 34.39],
            [1352070000000, 34.24],
            [1352156400000, 34.39],
            [1352242800000, 33.47],
            [1352329200000, 32.98],
            [1352415600000, 32.90],
            [1352674800000, 32.70],
            [1352761200000, 32.54],
            [1352847600000, 32.23],
            [1352934000000, 32.64],
            [1353020400000, 32.65],
            [1353279600000, 32.92],
            [1353366000000, 32.64],
            [1353452400000, 32.84],
            [1353625200000, 33.40],
            [1353884400000, 33.30],
            [1353970800000, 33.18],
            [1354057200000, 33.88],
            [1354143600000, 34.09],
            [1354230000000, 34.61],
            [1354489200000, 34.70],
            [1354575600000, 35.30],
            [1354662000000, 35.40],
            [1354748400000, 35.14],
            [1354834800000, 35.48],
            [1355094000000, 35.75],
            [1355180400000, 35.54],
            [1355266800000, 35.96],
            [1355353200000, 35.53],
            [1355439600000, 37.56],
            [1355698800000, 37.42],
            [1355785200000, 37.49],
            [1355871600000, 38.09],
            [1355958000000, 37.87],
            [1356044400000, 37.71],
            [1356303600000, 37.53],
            [1356476400000, 37.55],
            [1356562800000, 37.30],
            [1356649200000, 36.90],
            [1356908400000, 37.68],
            [1357081200000, 38.34],
            [1357167600000, 37.75],
            [1357254000000, 38.13],
            [1357513200000, 37.94],
            [1357599600000, 38.14],
            [1357686000000, 38.66],
            [1357772400000, 38.62],
            [1357858800000, 38.09],
            [1358118000000, 38.16],
            [1358204400000, 38.15],
            [1358290800000, 37.88],
            [1358377200000, 37.73],
            [1358463600000, 37.98],
            [1358809200000, 37.95],
            [1358895600000, 38.25],
            [1358982000000, 38.10],
            [1359068400000, 38.32],
            [1359327600000, 38.24],
            [1359414000000, 38.52],
            [1359500400000, 37.94],
            [1359586800000, 37.83],
            [1359673200000, 38.34],
            [1359932400000, 38.10],
            [1360018800000, 38.51],
            [1360105200000, 38.40],
            [1360191600000, 38.07],
            [1360278000000, 39.12],
            [1360537200000, 38.64],
            [1360623600000, 38.89],
            [1360710000000, 38.81],
            [1360796400000, 38.61],
            [1360882800000, 38.63],
            [1361228400000, 38.99],
            [1361314800000, 38.77],
            [1361401200000, 38.34],
            [1361487600000, 38.55],
            [1361746800000, 38.11],
            [1361833200000, 38.59],
            [1361919600000, 39.60],
        ]
    }];
    var options : any = {
        chart: {
            id: 'area-datetime',
            type: 'area',
            height: 320,
            zoom: {
                autoScaleYaxis: true
            },
            toolbar: {
                show: false
            },
        },
        colors: BasicAreaChartsColors,
        annotations: {
            yaxis: [{
                y: 30,
                borderColor: '#999',
                label: {
                    show: true,
                    text: 'Support',
                    style: {
                        color: "#fff",
                        background: '#e83e8c'
                    }
                }
            }],
            xaxis: [{
                x: new Date('14 Nov 2012').getTime(),
                borderColor: '#999',
                yAxisIndex: 0,
                label: {
                    show: true,
                    text: 'Rally',
                    style: {
                        color: "#fff",
                        background: '#564ab1'
                    }
                }
            }]
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
            style: 'hollow',
        },
        xaxis: {
            type: 'datetime',
            min: new Date('01 Mar 2012').getTime(),
            tickAmount: 6,
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy'
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [20, 100, 100, 100]
            },
        },
    };

    return (
        <React.Fragment>
            <ReactApexChart dir="ltr"
                options={options}
                series={series}
                type="area"
                height="320"
                className="apex-charts"
            />
        </React.Fragment>
    );
};

const NegativeAreaChart = ({dataColors} : any) => {
    var areachartNegativeColors = getChartColorsArray(dataColors);
    const series = [{
        name: 'North',
        data: [{
            x: 1996,
            y: 322
        },
        {
            x: 1997,
            y: 324
        },
        {
            x: 1998,
            y: 329
        },
        {
            x: 1999,
            y: 342
        },
        {
            x: 2000,
            y: 348
        },
        {
            x: 2001,
            y: 334
        },
        {
            x: 2002,
            y: 325
        },
        {
            x: 2003,
            y: 316
        },
        {
            x: 2004,
            y: 318
        },
        {
            x: 2005,
            y: 330
        },
        {
            x: 2006,
            y: 355
        },
        {
            x: 2007,
            y: 366
        },
        {
            x: 2008,
            y: 337
        },
        {
            x: 2009,
            y: 352
        },
        {
            x: 2010,
            y: 377
        },
        {
            x: 2011,
            y: 383
        },
        {
            x: 2012,
            y: 344
        },
        {
            x: 2013,
            y: 366
        },
        {
            x: 2014,
            y: 389
        },
        {
            x: 2015,
            y: 334
        }
        ]
    }, {
        name: 'South',
        data: [{
            x: 1996,
            y: 162
        },
        {
            x: 1997,
            y: 90
        },
        {
            x: 1998,
            y: 50
        },
        {
            x: 1999,
            y: 77
        },
        {
            x: 2000,
            y: 35
        },
        {
            x: 2001,
            y: -45
        },
        {
            x: 2002,
            y: -88
        },
        {
            x: 2003,
            y: -120
        },
        {
            x: 2004,
            y: -156
        },
        {
            x: 2005,
            y: -123
        },
        {
            x: 2006,
            y: -88
        },
        {
            x: 2007,
            y: -66
        },
        {
            x: 2008,
            y: -45
        },
        {
            x: 2009,
            y: -29
        },
        {
            x: 2010,
            y: -45
        },
        {
            x: 2011,
            y: -88
        },
        {
            x: 2012,
            y: -132
        },
        {
            x: 2013,
            y: -146
        },
        {
            x: 2014,
            y: -169
        },
        {
            x: 2015,
            y: -184
        }
        ]
    }];
    var options : any = {
        chart: {
            type: 'area',
            height: 350,
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Area with Negative Values',
            align: 'left',

            style: {
                fontSize: '14px',
                fontWeight: 500,
            }
        },
        xaxis: {
            type: 'datetime',
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        colors: areachartNegativeColors,
        yaxis: {
            tickAmount: 4,
            floating: false,

            labels: {
                style: {
                    colors: '#038edc',
                },
                offsetY: -7,
                offsetX: 0,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false
            }
        },
        fill: {
            opacity: 0.5
        },
        tooltip: {
            x: {
                format: "yyyy",
            },
            fixed: {
                enabled: false,
                position: 'topRight'
            }
        },
        grid: {
            yaxis: {
                lines: {
                    offsetX: -30
                }
            },
            padding: {
                left: 20
            }
        }
    };

    return (
        <React.Fragment>
            <ReactApexChart dir="ltr"
                options={options}
                series={series}
                type="area"
                height="350"
                className="apex-charts"
            />
        </React.Fragment>
    );
};

const GithubStyleCharts = ({dataColors} : any) => {
    var areachartMonthsColors = getChartColorsArray(dataColors);
    const series = [{
        name: 'commits',
        data: githubdata.series
    }];
    var options : any = {
        chart: {
            id: 'chartyear',
            type: 'area',
            height: 120,
            toolbar: {
                show: false,
                autoSelected: 'pan'
            },
            events: {
                mounted: function (chart : any) {
                    var commitsEl = document.querySelector('.cmeta span.commits');
                    var commits = chart.getSeriesTotalXRange(chart.w.globals.minX, chart.w.globals.maxX);

                    commitsEl!.innerHTML = commits;
                },
                updated: function (chart : any) {
                    var commitsEl = document.querySelector('.cmeta span.commits');
                    var commits = chart.getSeriesTotalXRange(chart.w.globals.minX, chart.w.globals.maxX);

                    commitsEl!.innerHTML = commits;
                }
            }
        },
        colors: areachartMonthsColors,
        stroke: {
            width: 0,
            curve: 'smooth'
        },
        dataLabels: {
            enabled: false
        },
        fill: {
            opacity: 1,
            type: 'solid'
        },
        yaxis: {
            show: false,
            tickAmount: 3,
        },
        xaxis: {
            type: 'datetime',
        }
    };


    return (
        <React.Fragment>
            <ReactApexChart dir="ltr"
                options={options}
                series={series}
                type="area"
                height="120"
                className="apex-charts"
            />
        </React.Fragment>
    );
};

const GithubStyleCharts1 = ({dataColors} : any) => {
    var BasicAreaChartsColors = getChartColorsArray(dataColors);
    const series = [{
        name: 'commits',
        data: githubdata.series
    }];
    var options : any = {
        chart: {
            height: 170,
            type: 'area',
            toolbar: {
                autoSelected: 'selection',
            },
            brush: {
                enabled: true,
                target: 'chartyear'
            },
            selection: {
                enabled: true,
                xaxis: {
                    min: new Date('26 Jan 2014').getTime(),
                    max: new Date('29 Mar 2015').getTime()
                }
            },
        },
        colors: BasicAreaChartsColors,
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 0,
            curve: 'smooth'
        },
        fill: {
            opacity: 1,
            type: 'solid'
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left'
        },
        xaxis: {
            type: 'datetime'
        },
    };


    return (
        <React.Fragment>
            <ReactApexChart dir="ltr"
                options={options}
                series={series}
                type="area"
                height="170"
                className="apex-charts"
            />
        </React.Fragment>
    );
};

const StackedAreaChart = ({dataColors} : any) => {
    var BasicAreaChartsColors = getChartColorsArray(dataColors);
    var generateDayWiseTimeSeries = function (baseval : any, count : any, yrange : any) {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = baseval;
            var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

            series.push([x, y]);
            baseval += 86400000;
            i++;
        }
        return series;
    };

    const series = [{
        name: 'South',
        data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60
        })
    },
    {
        name: 'North',
        data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 20
        })
    },
    {
        name: 'Central',
        data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 15
        })
    }
    ];
    var options : any = {
        chart: {
            type: 'area',
            height: 350,
            stacked: true,
            toolbar: {
                show: false
            },
            events: {
                selection: function (chart : any, e : any) {
                    // console.log(new Date(e.xaxis.min));
                }
            },
        },
        colors: BasicAreaChartsColors,
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        fill: {
            type: 'gradient',
            gradient: {
                opacityFrom: 0.6,
                opacityTo: 0.8,
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left'
        },
        xaxis: {
            type: 'datetime'
        },
    };

    return (
        <React.Fragment>
            <ReactApexChart dir="ltr"
                options={options}
                series={series}
                type="area"
                height="350"
                className="apex-charts"
            />
        </React.Fragment>
    );
};

const IrregularAreaCharts = ({dataColors} : any) => {
    var BasicAreaChartsColors = getChartColorsArray(dataColors);    
    const dataSeries = [
        [{
            "date": "2014-01-01",
            "value": 20000000
          },
          {
            "date": "2014-01-02",
            "value": 10379978
          },
          {
            "date": "2014-01-03",
            "value": 30493749
          },
          {
            "date": "2014-01-04",
            "value": 10785250
          },
          {
            "date": "2014-01-05",
            "value": 33901904
          },
          {
            "date": "2014-01-06",
            "value": 11576838
          },
          {
            "date": "2014-01-07",
            "value": 14413854
          },
          {
            "date": "2014-01-08",
            "value": 15177211
          },
          {
            "date": "2014-01-09",
            "value": 16622100
          },
          {
            "date": "2014-01-10",
            "value": 17381072
          },
          {
            "date": "2014-01-11",
            "value": 18802310
          },
          {
            "date": "2014-01-12",
            "value": 15531790
          },
          {
            "date": "2014-01-13",
            "value": 15748881
          },
          {
            "date": "2014-01-14",
            "value": 18706437
          },
          {
            "date": "2014-01-15",
            "value": 19752685
          },
          {
            "date": "2014-01-16",
            "value": 21016418
          },
          {
            "date": "2014-01-17",
            "value": 25622924
          },
          {
            "date": "2014-01-18",
            "value": 25337480
          },
          {
            "date": "2014-01-19",
            "value": 22258882
          },
          {
            "date": "2014-01-20",
            "value": 23829538
          },
          {
            "date": "2014-01-21",
            "value": 24245689
          },
          {
            "date": "2014-01-22",
            "value": 26429711
          },
          {
            "date": "2014-01-23",
            "value": 26259017
          },
          {
            "date": "2014-01-24",
            "value": 25396183
          },
          {
            "date": "2014-01-25",
            "value": 23107346
          },
          {
            "date": "2014-01-26",
            "value": 28659852
          },
          {
            "date": "2014-01-27",
            "value": 25270783
          },
          {
            "date": "2014-01-28",
            "value": 26270783
          },
          {
            "date": "2014-01-29",
            "value": 27270783
          },
          {
            "date": "2014-01-30",
            "value": 28270783
          },
          {
            "date": "2014-01-31",
            "value": 29270783
          },
          {
            "date": "2014-02-01",
            "value": 30270783
          },
          {
            "date": "2014-02-02",
            "value": 31270783
          },
          {
            "date": "2014-02-03",
            "value": 32270783
          },
          {
            "date": "2014-02-04",
            "value": 33270783
          },
          {
            "date": "2014-02-05",
            "value": 28270783
          },
          {
            "date": "2014-02-06",
            "value": 27270783
          },
          {
            "date": "2014-02-07",
            "value": 35270783
          },
          {
            "date": "2014-02-08",
            "value": 34270783
          },
          {
            "date": "2014-02-09",
            "value": 28270783
          },
          {
            "date": "2014-02-10",
            "value": 35270783
          },
          {
            "date": "2014-02-11",
            "value": 36270783
          },
          {
            "date": "2014-02-12",
            "value": 34127078
          },
          {
            "date": "2014-02-13",
            "value": 33124078
          },
          {
            "date": "2014-02-14",
            "value": 36227078
          },
          {
            "date": "2014-02-15",
            "value": 37827078
          },
          {
            "date": "2014-02-16",
            "value": 36427073
          },
          {
            "date": "2014-02-17",
            "value": 37570783
          },
          {
            "date": "2014-02-18",
            "value": 38627073
          },
          {
            "date": "2014-02-19",
            "value": 37727078
          },
          {
            "date": "2014-02-20",
            "value": 38827073
          },
          {
            "date": "2014-02-21",
            "value": 40927078
          },
          {
            "date": "2014-02-22",
            "value": 41027078
          },
          {
            "date": "2014-02-23",
            "value": 42127073
          },
          {
            "date": "2014-02-24",
            "value": 43220783
          },
          {
            "date": "2014-02-25",
            "value": 44327078
          },
          {
            "date": "2014-02-26",
            "value": 40427078
          },
          {
            "date": "2014-02-27",
            "value": 41027078
          },
          {
            "date": "2014-02-28",
            "value": 45627078
          },
          {
            "date": "2014-03-01",
            "value": 44727078
          },
          {
            "date": "2014-03-02",
            "value": 44227078
          },
          {
            "date": "2014-03-03",
            "value": 45227078
          },
          {
            "date": "2014-03-04",
            "value": 46027078
          },
          {
            "date": "2014-03-05",
            "value": 46927078
          },
          {
            "date": "2014-03-06",
            "value": 47027078
          },
          {
            "date": "2014-03-07",
            "value": 46227078
          },
          {
            "date": "2014-03-08",
            "value": 47027078
          },
          {
            "date": "2014-03-09",
            "value": 48027078
          },
          {
            "date": "2014-03-10",
            "value": 47027078
          },
          {
            "date": "2014-03-11",
            "value": 47027078
          },
          {
            "date": "2014-03-12",
            "value": 48017078
          },
          {
            "date": "2014-03-13",
            "value": 48077078
          },
          {
            "date": "2014-03-14",
            "value": 48087078
          },
          {
            "date": "2014-03-15",
            "value": 48017078
          },
          {
            "date": "2014-03-16",
            "value": 48047078
          },
          {
            "date": "2014-03-17",
            "value": 48067078
          },
          {
            "date": "2014-03-18",
            "value": 48077078
          },
          {
            "date": "2014-03-19",
            "value": 48027074
          },
          {
            "date": "2014-03-20",
            "value": 48927079
          },
          {
            "date": "2014-03-21",
            "value": 48727071
          },
          {
            "date": "2014-03-22",
            "value": 48127072
          },
          {
            "date": "2014-03-23",
            "value": 48527072
          },
          {
            "date": "2014-03-24",
            "value": 48627027
          },
          {
            "date": "2014-03-25",
            "value": 48027040
          },
          {
            "date": "2014-03-26",
            "value": 48027043
          },
          {
            "date": "2014-03-27",
            "value": 48057022
          },
          {
            "date": "2014-03-28",
            "value": 49057022
          },
          {
            "date": "2014-03-29",
            "value": 50057022
          },
          {
            "date": "2014-03-30",
            "value": 51057022
          },
          {
            "date": "2014-03-31",
            "value": 52057022
          },
          {
            "date": "2014-04-01",
            "value": 53057022
          },
          {
            "date": "2014-04-02",
            "value": 54057022
          },
          {
            "date": "2014-04-03",
            "value": 52057022
          },
          {
            "date": "2014-04-04",
            "value": 55057022
          },
          {
            "date": "2014-04-05",
            "value": 58270783
          },
          {
            "date": "2014-04-06",
            "value": 56270783
          },
          {
            "date": "2014-04-07",
            "value": 55270783
          },
          {
            "date": "2014-04-08",
            "value": 58270783
          },
          {
            "date": "2014-04-09",
            "value": 59270783
          },
          {
            "date": "2014-04-10",
            "value": 60270783
          },
          {
            "date": "2014-04-11",
            "value": 61270783
          },
          {
            "date": "2014-04-12",
            "value": 62270783
          },
          {
            "date": "2014-04-13",
            "value": 63270783
          },
          {
            "date": "2014-04-14",
            "value": 64270783
          },
          {
            "date": "2014-04-15",
            "value": 65270783
          },
          {
            "date": "2014-04-16",
            "value": 66270783
          },
          {
            "date": "2014-04-17",
            "value": 67270783
          },
          {
            "date": "2014-04-18",
            "value": 68270783
          },
          {
            "date": "2014-04-19",
            "value": 69270783
          },
          {
            "date": "2014-04-20",
            "value": 70270783
          },
          {
            "date": "2014-04-21",
            "value": 71270783
          },
          {
            "date": "2014-04-22",
            "value": 72270783
          },
          {
            "date": "2014-04-23",
            "value": 73270783
          },
          {
            "date": "2014-04-24",
            "value": 74270783
          },
          {
            "date": "2014-04-25",
            "value": 75270783
          },
          {
            "date": "2014-04-26",
            "value": 76660783
          },
          {
            "date": "2014-04-27",
            "value": 77270783
          },
          {
            "date": "2014-04-28",
            "value": 78370783
          },
          {
            "date": "2014-04-29",
            "value": 79470783
          },
          {
            "date": "2014-04-30",
            "value": 80170783
          }
        ],
        [{
            "date": "2014-01-01",
            "value": 150000000
          },
          {
            "date": "2014-01-02",
            "value": 160379978
          },
          {
            "date": "2014-01-03",
            "value": 170493749
          },
          {
            "date": "2014-01-04",
            "value": 160785250
          },
          {
            "date": "2014-01-05",
            "value": 167391904
          },
          {
            "date": "2014-01-06",
            "value": 161576838
          },
          {
            "date": "2014-01-07",
            "value": 161413854
          },
          {
            "date": "2014-01-08",
            "value": 152177211
          },
          {
            "date": "2014-01-09",
            "value": 140762210
          },
          {
            "date": "2014-01-10",
            "value": 144381072
          },
          {
            "date": "2014-01-11",
            "value": 154352310
          },
          {
            "date": "2014-01-12",
            "value": 165531790
          },
          {
            "date": "2014-01-13",
            "value": 175748881
          },
          {
            "date": "2014-01-14",
            "value": 187064037
          },
          {
            "date": "2014-01-15",
            "value": 197520685
          },
          {
            "date": "2014-01-16",
            "value": 210176418
          },
          {
            "date": "2014-01-17",
            "value": 196122924
          },
          {
            "date": "2014-01-18",
            "value": 207337480
          },
          {
            "date": "2014-01-19",
            "value": 200258882
          },
          {
            "date": "2014-01-20",
            "value": 186829538
          },
          {
            "date": "2014-01-21",
            "value": 192456897
          },
          {
            "date": "2014-01-22",
            "value": 204299711
          },
          {
            "date": "2014-01-23",
            "value": 192759017
          },
          {
            "date": "2014-01-24",
            "value": 203596183
          },
          {
            "date": "2014-01-25",
            "value": 208107346
          },
          {
            "date": "2014-01-26",
            "value": 196359852
          },
          {
            "date": "2014-01-27",
            "value": 192570783
          },
          {
            "date": "2014-01-28",
            "value": 177967768
          },
          {
            "date": "2014-01-29",
            "value": 190632803
          },
          {
            "date": "2014-01-30",
            "value": 203725316
          },
          {
            "date": "2014-01-31",
            "value": 218226177
          },
          {
            "date": "2014-02-01",
            "value": 210698669
          },
          {
            "date": "2014-02-02",
            "value": 217640656
          },
          {
            "date": "2014-02-03",
            "value": 216142362
          },
          {
            "date": "2014-02-04",
            "value": 201410971
          },
          {
            "date": "2014-02-05",
            "value": 196704289
          },
          {
            "date": "2014-02-06",
            "value": 190436945
          },
          {
            "date": "2014-02-07",
            "value": 178891686
          },
          {
            "date": "2014-02-08",
            "value": 171613962
          },
          {
            "date": "2014-02-09",
            "value": 157579773
          },
          {
            "date": "2014-02-10",
            "value": 158677098
          },
          {
            "date": "2014-02-11",
            "value": 147129977
          },
          {
            "date": "2014-02-12",
            "value": 151561876
          },
          {
            "date": "2014-02-13",
            "value": 151627421
          },
          {
            "date": "2014-02-14",
            "value": 143543872
          },
          {
            "date": "2014-02-15",
            "value": 136581057
          },
          {
            "date": "2014-02-16",
            "value": 135560715
          },
          {
            "date": "2014-02-17",
            "value": 122625263
          },
          {
            "date": "2014-02-18",
            "value": 112091484
          },
          {
            "date": "2014-02-19",
            "value": 98810329
          },
          {
            "date": "2014-02-20",
            "value": 99882912
          },
          {
            "date": "2014-02-21",
            "value": 94943095
          },
          {
            "date": "2014-02-22",
            "value": 104875743
          },
          {
            "date": "2014-02-23",
            "value": 116383678
          },
          {
            "date": "2014-02-24",
            "value": 125028841
          },
          {
            "date": "2014-02-25",
            "value": 123967310
          },
          {
            "date": "2014-02-26",
            "value": 133167029
          },
          {
            "date": "2014-02-27",
            "value": 128577263
          },
          {
            "date": "2014-02-28",
            "value": 115836969
          },
          {
            "date": "2014-03-01",
            "value": 119264529
          },
          {
            "date": "2014-03-02",
            "value": 109363374
          },
          {
            "date": "2014-03-03",
            "value": 113985628
          },
          {
            "date": "2014-03-04",
            "value": 114650999
          },
          {
            "date": "2014-03-05",
            "value": 110866108
          },
          {
            "date": "2014-03-06",
            "value": 96473454
          },
          {
            "date": "2014-03-07",
            "value": 104075886
          },
          {
            "date": "2014-03-08",
            "value": 103568384
          },
          {
            "date": "2014-03-09",
            "value": 101534883
          },
          {
            "date": "2014-03-10",
            "value": 115825447
          },
          {
            "date": "2014-03-11",
            "value": 126133916
          },
          {
            "date": "2014-03-12",
            "value": 116502109
          },
          {
            "date": "2014-03-13",
            "value": 130169411
          },
          {
            "date": "2014-03-14",
            "value": 124296886
          },
          {
            "date": "2014-03-15",
            "value": 126347399
          },
          {
            "date": "2014-03-16",
            "value": 131483669
          },
          {
            "date": "2014-03-17",
            "value": 142811333
          },
          {
            "date": "2014-03-18",
            "value": 129675396
          },
          {
            "date": "2014-03-19",
            "value": 115514483
          },
          {
            "date": "2014-03-20",
            "value": 117630630
          },
          {
            "date": "2014-03-21",
            "value": 122340239
          },
          {
            "date": "2014-03-22",
            "value": 132349091
          },
          {
            "date": "2014-03-23",
            "value": 125613305
          },
          {
            "date": "2014-03-24",
            "value": 135592466
          },
          {
            "date": "2014-03-25",
            "value": 123408762
          },
          {
            "date": "2014-03-26",
            "value": 111991454
          },
          {
            "date": "2014-03-27",
            "value": 116123955
          },
          {
            "date": "2014-03-28",
            "value": 112817214
          },
          {
            "date": "2014-03-29",
            "value": 113029590
          },
          {
            "date": "2014-03-30",
            "value": 108753398
          },
          {
            "date": "2014-03-31",
            "value": 99383763
          },
          {
            "date": "2014-04-01",
            "value": 100151737
          },
          {
            "date": "2014-04-02",
            "value": 94985209
          },
          {
            "date": "2014-04-03",
            "value": 82913669
          },
          {
            "date": "2014-04-04",
            "value": 78748268
          },
          {
            "date": "2014-04-05",
            "value": 63829135
          },
          {
            "date": "2014-04-06",
            "value": 78694727
          },
          {
            "date": "2014-04-07",
            "value": 80868994
          },
          {
            "date": "2014-04-08",
            "value": 93799013
          },
          {
            "date": "2014-04-09",
            "value": 99042416
          },
          {
            "date": "2014-04-10",
            "value": 97298692
          },
          {
            "date": "2014-04-11",
            "value": 83353499
          },
          {
            "date": "2014-04-12",
            "value": 71248129
          },
          {
            "date": "2014-04-13",
            "value": 75253744
          },
          {
            "date": "2014-04-14",
            "value": 68976648
          },
          {
            "date": "2014-04-15",
            "value": 71002284
          },
          {
            "date": "2014-04-16",
            "value": 75052401
          },
          {
            "date": "2014-04-17",
            "value": 83894030
          },
          {
            "date": "2014-04-18",
            "value": 90236528
          },
          {
            "date": "2014-04-19",
            "value": 99739114
          },
          {
            "date": "2014-04-20",
            "value": 96407136
          },
          {
            "date": "2014-04-21",
            "value": 108323177
          },
          {
            "date": "2014-04-22",
            "value": 101578914
          },
          {
            "date": "2014-04-23",
            "value": 115877608
          },
          {
            "date": "2014-04-24",
            "value": 112088857
          },
          {
            "date": "2014-04-25",
            "value": 112071353
          },
          {
            "date": "2014-04-26",
            "value": 101790062
          },
          {
            "date": "2014-04-27",
            "value": 115003761
          },
          {
            "date": "2014-04-28",
            "value": 120457727
          },
          {
            "date": "2014-04-29",
            "value": 118253926
          },
          {
            "date": "2014-04-30",
            "value": 117956992
          }
        ],
        [{
            "date": "2014-01-01",
            "value": 50000000
          },
          {
            "date": "2014-01-02",
            "value": 60379978
          },
          {
            "date": "2014-01-03",
            "value": 40493749
          },
          {
            "date": "2014-01-04",
            "value": 60785250
          },
          {
            "date": "2014-01-05",
            "value": 67391904
          },
          {
            "date": "2014-01-06",
            "value": 61576838
          },
          {
            "date": "2014-01-07",
            "value": 61413854
          },
          {
            "date": "2014-01-08",
            "value": 82177211
          },
          {
            "date": "2014-01-09",
            "value": 103762210
          },
          {
            "date": "2014-01-10",
            "value": 84381072
          },
          {
            "date": "2014-01-11",
            "value": 54352310
          },
          {
            "date": "2014-01-12",
            "value": 65531790
          },
          {
            "date": "2014-01-13",
            "value": 75748881
          },
          {
            "date": "2014-01-14",
            "value": 47064037
          },
          {
            "date": "2014-01-15",
            "value": 67520685
          },
          {
            "date": "2014-01-16",
            "value": 60176418
          },
          {
            "date": "2014-01-17",
            "value": 66122924
          },
          {
            "date": "2014-01-18",
            "value": 57337480
          },
          {
            "date": "2014-01-19",
            "value": 100258882
          },
          {
            "date": "2014-01-20",
            "value": 46829538
          },
          {
            "date": "2014-01-21",
            "value": 92456897
          },
          {
            "date": "2014-01-22",
            "value": 94299711
          },
          {
            "date": "2014-01-23",
            "value": 62759017
          },
          {
            "date": "2014-01-24",
            "value": 103596183
          },
          {
            "date": "2014-01-25",
            "value": 108107346
          },
          {
            "date": "2014-01-26",
            "value": 66359852
          },
          {
            "date": "2014-01-27",
            "value": 62570783
          },
          {
            "date": "2014-01-28",
            "value": 77967768
          },
          {
            "date": "2014-01-29",
            "value": 60632803
          },
          {
            "date": "2014-01-30",
            "value": 103725316
          },
          {
            "date": "2014-01-31",
            "value": 98226177
          },
          {
            "date": "2014-02-01",
            "value": 60698669
          },
          {
            "date": "2014-02-02",
            "value": 67640656
          },
          {
            "date": "2014-02-03",
            "value": 66142362
          },
          {
            "date": "2014-02-04",
            "value": 101410971
          },
          {
            "date": "2014-02-05",
            "value": 66704289
          },
          {
            "date": "2014-02-06",
            "value": 60436945
          },
          {
            "date": "2014-02-07",
            "value": 78891686
          },
          {
            "date": "2014-02-08",
            "value": 71613962
          },
          {
            "date": "2014-02-09",
            "value": 107579773
          },
          {
            "date": "2014-02-10",
            "value": 58677098
          },
          {
            "date": "2014-02-11",
            "value": 87129977
          },
          {
            "date": "2014-02-12",
            "value": 51561876
          },
          {
            "date": "2014-02-13",
            "value": 51627421
          },
          {
            "date": "2014-02-14",
            "value": 83543872
          },
          {
            "date": "2014-02-15",
            "value": 66581057
          },
          {
            "date": "2014-02-16",
            "value": 65560715
          },
          {
            "date": "2014-02-17",
            "value": 62625263
          },
          {
            "date": "2014-02-18",
            "value": 92091484
          },
          {
            "date": "2014-02-19",
            "value": 48810329
          },
          {
            "date": "2014-02-20",
            "value": 49882912
          },
          {
            "date": "2014-02-21",
            "value": 44943095
          },
          {
            "date": "2014-02-22",
            "value": 104875743
          },
          {
            "date": "2014-02-23",
            "value": 96383678
          },
          {
            "date": "2014-02-24",
            "value": 105028841
          },
          {
            "date": "2014-02-25",
            "value": 63967310
          },
          {
            "date": "2014-02-26",
            "value": 63167029
          },
          {
            "date": "2014-02-27",
            "value": 68577263
          },
          {
            "date": "2014-02-28",
            "value": 95836969
          },
          {
            "date": "2014-03-01",
            "value": 99264529
          },
          {
            "date": "2014-03-02",
            "value": 109363374
          },
          {
            "date": "2014-03-03",
            "value": 93985628
          },
          {
            "date": "2014-03-04",
            "value": 94650999
          },
          {
            "date": "2014-03-05",
            "value": 90866108
          },
          {
            "date": "2014-03-06",
            "value": 46473454
          },
          {
            "date": "2014-03-07",
            "value": 84075886
          },
          {
            "date": "2014-03-08",
            "value": 103568384
          },
          {
            "date": "2014-03-09",
            "value": 101534883
          },
          {
            "date": "2014-03-10",
            "value": 95825447
          },
          {
            "date": "2014-03-11",
            "value": 66133916
          },
          {
            "date": "2014-03-12",
            "value": 96502109
          },
          {
            "date": "2014-03-13",
            "value": 80169411
          },
          {
            "date": "2014-03-14",
            "value": 84296886
          },
          {
            "date": "2014-03-15",
            "value": 86347399
          },
          {
            "date": "2014-03-16",
            "value": 31483669
          },
          {
            "date": "2014-03-17",
            "value": 82811333
          },
          {
            "date": "2014-03-18",
            "value": 89675396
          },
          {
            "date": "2014-03-19",
            "value": 95514483
          },
          {
            "date": "2014-03-20",
            "value": 97630630
          },
          {
            "date": "2014-03-21",
            "value": 62340239
          },
          {
            "date": "2014-03-22",
            "value": 62349091
          },
          {
            "date": "2014-03-23",
            "value": 65613305
          },
          {
            "date": "2014-03-24",
            "value": 65592466
          },
          {
            "date": "2014-03-25",
            "value": 63408762
          },
          {
            "date": "2014-03-26",
            "value": 91991454
          },
          {
            "date": "2014-03-27",
            "value": 96123955
          },
          {
            "date": "2014-03-28",
            "value": 92817214
          },
          {
            "date": "2014-03-29",
            "value": 93029590
          },
          {
            "date": "2014-03-30",
            "value": 108753398
          },
          {
            "date": "2014-03-31",
            "value": 49383763
          },
          {
            "date": "2014-04-01",
            "value": 100151737
          },
          {
            "date": "2014-04-02",
            "value": 44985209
          },
          {
            "date": "2014-04-03",
            "value": 52913669
          },
          {
            "date": "2014-04-04",
            "value": 48748268
          },
          {
            "date": "2014-04-05",
            "value": 23829135
          },
          {
            "date": "2014-04-06",
            "value": 58694727
          },
          {
            "date": "2014-04-07",
            "value": 50868994
          },
          {
            "date": "2014-04-08",
            "value": 43799013
          },
          {
            "date": "2014-04-09",
            "value": 4042416
          },
          {
            "date": "2014-04-10",
            "value": 47298692
          },
          {
            "date": "2014-04-11",
            "value": 53353499
          },
          {
            "date": "2014-04-12",
            "value": 71248129
          },
          {
            "date": "2014-04-13",
            "value": 75253744
          },
          {
            "date": "2014-04-14",
            "value": 68976648
          },
          {
            "date": "2014-04-15",
            "value": 71002284
          },
          {
            "date": "2014-04-16",
            "value": 75052401
          },
          {
            "date": "2014-04-17",
            "value": 83894030
          },
          {
            "date": "2014-04-18",
            "value": 50236528
          },
          {
            "date": "2014-04-19",
            "value": 59739114
          },
          {
            "date": "2014-04-20",
            "value": 56407136
          },
          {
            "date": "2014-04-21",
            "value": 108323177
          },
          {
            "date": "2014-04-22",
            "value": 101578914
          },
          {
            "date": "2014-04-23",
            "value": 95877608
          },
          {
            "date": "2014-04-24",
            "value": 62088857
          },
          {
            "date": "2014-04-25",
            "value": 92071353
          },
          {
            "date": "2014-04-26",
            "value": 81790062
          },
          {
            "date": "2014-04-27",
            "value": 105003761
          },
          {
            "date": "2014-04-28",
            "value": 100457727
          },
          {
            "date": "2014-04-29",
            "value": 98253926
          },
          {
            "date": "2014-04-30",
            "value": 67956992
          }
        ]
      ];
    var ts1 = 1388534400000;
    var ts2 = 1388620800000;
    var ts3 = 1389052800000;

    var dataSet : any = [
        [],
        [],
        []
    ];

    for (var i = 0; i < 12; i++) {
        ts1 = ts1 + 86400000;
        var innerArr = [ts1, dataSeries[2][i].value];
        dataSet[0].push(innerArr);
    }
    for (var j = 0; j < 18; j++) {
        ts2 = ts2 + 86400000;
        var innerArr1 = [ts2, dataSeries[1][j].value];
        dataSet[1].push(innerArr1);
    }
    for (var k = 0; k < 12; k++) {
        ts3 = ts3 + 86400000;
        var innerArr3 = [ts3, dataSeries[0][k].value];
        dataSet[2].push(innerArr3);
    }


    const series = [{
        name: 'PRODUCT A',
        data: dataSet[0]
    }, {
        name: 'PRODUCT B',
        data: dataSet[1]
    }, {
        name: 'PRODUCT C',
        data: dataSet[2]
    }];
    var options : any = {
        chart: {
            type: 'area',
            stacked: false,
            height: 350,
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [20, 100, 100, 100]
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#8e8da4',
                },
                offsetX: 0,
                formatter: function (val : any) {
                    return (val / 1000000).toFixed(2);
                },
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false
            }
        },
        xaxis: {
            type: 'datetime',
            tickAmount: 8,
            min: new Date("01/01/2014").getTime(),
            max: new Date("01/20/2014").getTime(),
            labels: {
                rotate: -15,
                rotateAlways: true,
                formatter: function (val : any, timestamp : any) {
                    return moment(new Date(timestamp)).format("DD MMM YYYY");
                }
            }
        },
        title: {
            text: 'Irregular Data in Time Series',
            align: 'left',
            offsetX: 14,
            style: {
                fontWeight: 500,
            },
        },
        tooltip: {
            shared: true
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            offsetX: -10
        },
        colors: BasicAreaChartsColors,
    };

    return (
        <React.Fragment>
            <ReactApexChart dir="ltr"
                options={options}
                series={series}
                type="area"
                height="350"
                className="apex-charts"
            />
        </React.Fragment>
    );
};

const AreaNullValueChart = ({dataColors} : any) => {
    var BasicAreaChartsColors = getChartColorsArray(dataColors);
    const series = [{
        name: 'Network',
        data: [{
            x: 'Dec 23 2017',
            y: null
        },
        {
            x: 'Dec 24 2017',
            y: 44
        },
        {
            x: 'Dec 25 2017',
            y: 31
        },
        {
            x: 'Dec 26 2017',
            y: 38
        },
        {
            x: 'Dec 27 2017',
            y: null
        },
        {
            x: 'Dec 28 2017',
            y: 32
        },
        {
            x: 'Dec 29 2017',
            y: 55
        },
        {
            x: 'Dec 30 2017',
            y: 51
        },
        {
            x: 'Dec 31 2017',
            y: 67
        },
        {
            x: 'Jan 01 2018',
            y: 22
        },
        {
            x: 'Jan 02 2018',
            y: 34
        },
        {
            x: 'Jan 03 2018',
            y: null
        },
        {
            x: 'Jan 04 2018',
            y: null
        },
        {
            x: 'Jan 05 2018',
            y: 11
        },
        {
            x: 'Jan 06 2018',
            y: 4
        },
        {
            x: 'Jan 07 2018',
            y: 15,
        },
        {
            x: 'Jan 08 2018',
            y: null
        },
        {
            x: 'Jan 09 2018',
            y: 9
        },
        {
            x: 'Jan 10 2018',
            y: 34
        },
        {
            x: 'Jan 11 2018',
            y: null
        },
        {
            x: 'Jan 12 2018',
            y: null
        },
        {
            x: 'Jan 13 2018',
            y: 13
        },
        {
            x: 'Jan 14 2018',
            y: null
        }
        ],
    }];
    var options : any = {
        chart: {
            type: 'area',
            height: 350,
            animations: {
                enabled: false
            },
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        fill: {
            opacity: 0.8,
            type: 'pattern',
            pattern: {
                style: ['verticalLines', 'horizontalLines'],
                width: 5,
                height: 6
            },
        },
        markers: {
            size: 5,
            hover: {
                size: 9
            }
        },
        title: {
            text: 'Network Monitoring',
            style: {
                fontWeight: 500,
            },
        },
        tooltip: {
            intersect: true,
            shared: false
        },
        theme: {
            palette: 'palette1'
        },
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            title: {
                text: 'Bytes Received'
            }
        },
        colors: BasicAreaChartsColors,
    };
    return (
        <React.Fragment>
            <ReactApexChart dir="ltr"
                options={options}
                series={series}
                type="area"
                height="350"
                className="apex-charts"
            />
        </React.Fragment>
    );
};


export {
    BasicAreaCharts,
    SplineAreaChart,
    AxisChart,
    NegativeAreaChart,
    GithubStyleCharts,
    GithubStyleCharts1,
    StackedAreaChart,
    IrregularAreaCharts,
    AreaNullValueChart
};