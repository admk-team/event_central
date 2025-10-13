import React from 'react';
import ReactApexChart from "react-apexcharts";
import ReactEcharts from "echarts-for-react";
import getChartColorsArray from "../../../../Components/Common/ChartsDynamicColor";
import { useLaravelReactI18n } from "laravel-react-i18n";
interface CountriesChartsProps {
    dataColors: string; // String of color array (e.g., '["--vz-primary", "--vz-success"]')
    series: { data: number[] }[]; // ApexCharts expects an array of objects with data
    sessionNames: string[]; // Dynamic session names for x-axis categories
}
interface AudiencesChartsProps {
    dataColors: string;
    series: { name: string; data: number[] }[];
    sessionNames: string[]; // Now represents ticket names
}
interface PieChartProps {
    dataColors: string;
    data: { name: string; value: number }[];
}

interface SimpleDonutProps {
    dataColors: string;
    series: number[];
    labels: string[];
}

const AudiencesCharts = ({ dataColors, series, sessionNames }: AudiencesChartsProps) => {
    const chartAudienceColumnChartsColors = getChartColorsArray(dataColors);
    const shortNames = sessionNames.map(name =>
        name.length > 12 ? name.slice(0, 12) + '…' : name
    );
    const options: any = {
        chart: {
            type: 'bar',
            height: 350,
                toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                dataLabels: {
                    position: 'top',
                },
                columnWidth: '40%',
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val: number) {
                return isNaN(val) ? '' : val.toString();
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ['#304758'],
            },
        },

        xaxis: {
            categories: shortNames,
            position: 'top',
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            tooltip: {
                enabled: true,
                formatter: function (val: string, opts: any) {
                    return sessionNames[opts.dataPointIndex] || val;
                },
            },
            labels: {
                rotate: 0,
                style: {
                    fontSize: '10px',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    colors: ['#161718ff'],
                },
            },
        },

        yaxis: {
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
            },
        },
        fill: {
            opacity: 1,
        },
        colors: chartAudienceColumnChartsColors,
    };

    return (
        <React.Fragment>
            <ReactApexChart
                dir="ltr"
                options={options}
                series={series}
                type="bar"
                height="309"
                className="apex-charts"
            />
        </React.Fragment>
    );
};

const AudiencesSessionsCharts = ({ dataColors, series }:any) => {
    var chartHeatMapBasicColors = getChartColorsArray(dataColors);

    var options:any = {
        chart: {
            height: 400,
            type: 'heatmap',
            offsetX: 0,
            offsetY: -8,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            heatmap: {
                colorScale: {
                    ranges: [{
                        from: 0,
                        to: 50,
                        color: chartHeatMapBasicColors[0]
                    },
                    {
                        from: 51,
                        to: 100,
                        color: chartHeatMapBasicColors[1]
                    },
                    ],
                },

            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: true,
            horizontalAlign: 'center',
            offsetX: 0,
            offsetY: 20,
            markers: {
                width: 20,
                height: 6,
                radius: 2,
            },
            itemMargin: {
                horizontal: 12,
                vertical: 0
            },
        },
        colors: chartHeatMapBasicColors,
        tooltip: {
            y: [{
                formatter: function (y:any) {
                    if (typeof y !== "undefined") {
                        return y.toFixed(0) + "k";
                    }
                    return y;
                }
            }]
        }
    };
    return (
        <React.Fragment>
            <ReactApexChart dir="ltr"
                options={options}
                series={series}
                type="heatmap"
                height="400"
                className="apex-charts"
            />
        </React.Fragment>
    );
};

const CountriesCharts = ({ dataColors, series, sessionNames }: CountriesChartsProps) => {
    const barchartCountriesColors = getChartColorsArray(dataColors);
    const options: any = {
        chart: {
            type: 'bar',
            height: 436,
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
                distributed: true,
                dataLabels: {
                    position: 'top',
                },
            },
        },
        colors: barchartCountriesColors,
        dataLabels: {
            enabled: true,
            offsetX: 32,
            style: {
                fontSize: '12px',
                fontWeight: 400,
                colors: ['#adb5bd'],
            },
        },
        legend: {
            show: true,
        },
        grid: {
            show: true,
        },
        xaxis: {
            categories: sessionNames, // Use separate sessionNames prop
        },
    };

    return (
        <React.Fragment>
            <ReactApexChart
                dir="ltr"
                options={options}
                series={series} // Pass series as [{ data: attendanceCounts }]
                type="bar"
                height="436"
                className="apex-charts"
            />
        </React.Fragment>
    );
};

const UsersByDeviceCharts = ({ dataColors, series }:any) => {
    var dountchartUserDeviceColors = getChartColorsArray(dataColors);
    const options:any = {
        labels: ["Desktop", "Mobile", "Tablet"],
        chart: {
            type: "donut",
            height: 219,
        },
        plotOptions: {
            pie: {
                size: 100,
                donut: {
                    size: "76%",
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
            position: 'bottom',
            horizontalAlign: 'center',
            offsetX: 0,
            offsetY: 0,
            markers: {
                width: 20,
                height: 6,
                radius: 2,
            },
            itemMargin: {
                horizontal: 12,
                vertical: 0
            },
        },
        stroke: {
            width: 0
        },
        yaxis: {
            labels: {
                formatter: function (value:any) {
                    return value + 'k Users';
                }
            },
            tickAmount: 4,
            min: 0
        },
        colors: dountchartUserDeviceColors,
    };
    return (
        <React.Fragment>
            <ReactApexChart dir="ltr"
                options={options}
                series={series}
                type="donut"
                height="219"
                className="apex-charts"
            />
        </React.Fragment>
    );
};

//Pie Chart
const PieChart: React.FC<PieChartProps> = ({ dataColors, data }) => {
    var chartPieColors = getChartColorsArray(dataColors);
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: (params: any) => {
                return `${params.name}: $${params.value.toLocaleString()} (${params.percent}%)`;
            },
        },
        legend: {
            orient: 'horizontal',
            top: 'bottom',
            textStyle: {
                color: '#030303ff',
            },
        },
        color: chartPieColors,
        series: [{
            name: 'Access From',
            type: 'pie',
            radius: '40%',
            data: data,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
        }],
        textStyle: {
            fontFamily: 'Poppins, sans-serif'
        },
    };

    return (
        <React.Fragment>
            <ReactEcharts style={{ height: "350px" }} option={option} />
        </React.Fragment>
    )
}

// dount chart
const SimpleDonut = ({ dataColors, series, labels }: SimpleDonutProps) => {
    const { t } = useLaravelReactI18n();
    const chartDonutBasicColors = getChartColorsArray(dataColors);
    const options: any = {
        chart: {
            height: 300,
            type: 'donut',
        },
        labels: labels,
        legend: {
            position: 'left',
            horizontalAlign: 'center',
        },
        dataLabels: {
            dropShadow: {
                enabled: false,
            }
        },
        colors: chartDonutBasicColors,
    };

    return (
        <ReactApexChart
            dir="ltr"
            className="apex-charts"
            series={series}
            options={options}
            type="donut"
            height={300}
        />
    );
};

export { AudiencesCharts, AudiencesSessionsCharts,SimpleDonut, CountriesCharts, UsersByDeviceCharts ,PieChart };
