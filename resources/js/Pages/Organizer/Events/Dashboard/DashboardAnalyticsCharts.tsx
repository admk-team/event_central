import React from 'react';
import ReactApexChart from "react-apexcharts";

import getChartColorsArray from "../../../../Components/Common/ChartsDynamicColor";
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
const AudiencesCharts = ({ dataColors, series, sessionNames }: AudiencesChartsProps) => {
    const chartAudienceColumnChartsColors = getChartColorsArray(dataColors);

    const options: any = {
        chart: {
            type: 'bar',
            height: 309,
            stacked: true,
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '20%',
                borderRadius: 6,
            },
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            fontWeight: 400,
            fontSize: '8px',
            offsetX: 0,
            offsetY: 0,
            markers: {
                width: 9,
                height: 9,
                radius: 4,
            },
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        grid: {
            show: false,
        },
        colors: chartAudienceColumnChartsColors,
        xaxis: {
            categories: sessionNames, // Now ticket names
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: true,
                strokeDashArray: 1,
                height: 1,
                width: '100%',
                offsetX: 0,
                offsetY: 0,
            },
        },
        yaxis: {
            show: false,
        },
        fill: {
            opacity: 1,
        },
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


export { AudiencesCharts, AudiencesSessionsCharts, CountriesCharts, UsersByDeviceCharts };