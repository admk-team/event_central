import React from 'react';
import ReactApexChart from "react-apexcharts";
import { useLaravelReactI18n } from "laravel-react-i18n";
import getChartColorsArray from "../../../Components/Common/ChartsDynamicColor";

const AudiencesCharts = ({ dataColors, series }: any) => {
    const { t } = useLaravelReactI18n();
    const chartAudienceColumnChartsColors = getChartColorsArray(dataColors);
    const options: any = {
        chart: { type: 'bar', height: 309, toolbar: { show: false } },
        plotOptions: { bar: { horizontal: false, columnWidth: '20%', borderRadius: 6 } },
        dataLabels: { enabled: false },
        legend: { show: true, position: 'bottom', horizontalAlign: 'center', fontWeight: 400, fontSize: '8px', offsetX: 0, offsetY: 0, markers: { width: 9, height: 9, radius: 4 } },
        stroke: { show: true, width: 2, colors: ['transparent'] },
        grid: { show: false },
        colors: chartAudienceColumnChartsColors,
        xaxis: {
            categories: [
                t("Jan"), t("Feb"), t("Mar"), t("Apr"), t("May"), t("Jun"),
                t("Jul"), t("Aug"), t("Sep"), t("Oct"), t("Nov"), t("Dec")
            ],
            axisTicks: { show: false },
            axisBorder: { show: true, strokeDashArray: 1, height: 1, width: '100%', offsetX: 0, offsetY: 0 },
        },
        yaxis: { show: false },
        fill: { opacity: 1 }
    };

    return <ReactApexChart dir="ltr" options={options} series={series} type="bar" height="309" className="apex-charts" />;
};

// Similarly for other charts
const AudiencesSessionsCharts = ({ dataColors, series }: any) => {
    const { t } = useLaravelReactI18n();
    const chartHeatMapBasicColors = getChartColorsArray(dataColors);
    const options: any = {
        chart: { height: 400, type: 'heatmap', offsetX: 0, offsetY: -8, toolbar: { show: false } },
        plotOptions: { heatmap: { colorScale: { ranges: [{ from: 0, to: 50, color: chartHeatMapBasicColors[0] }, { from: 51, to: 100, color: chartHeatMapBasicColors[1] }] } } },
        dataLabels: { enabled: false },
        legend: { show: true, horizontalAlign: 'center', offsetX: 0, offsetY: 20, markers: { width: 20, height: 6, radius: 2 }, itemMargin: { horizontal: 12, vertical: 0 } },
        colors: chartHeatMapBasicColors,
        tooltip: { y: [{ formatter: (y: any) => y !== undefined ? y.toFixed(0) + t("k") : y }] }
    };
    return <ReactApexChart dir="ltr" options={options} series={series} type="heatmap" height="400" className="apex-charts" />;
};

const CountriesCharts = ({ dataColors, series }: any) => {
    const { t } = useLaravelReactI18n();
    const barchartCountriesColors = getChartColorsArray(dataColors);
    const options: any = {
        chart: { type: 'bar', height: 436, toolbar: { show: false } },
        plotOptions: { bar: { borderRadius: 4, horizontal: true, distributed: true, dataLabels: { position: 'top' } } },
        colors: barchartCountriesColors,
        dataLabels: { enabled: true, offsetX: 32, style: { fontSize: '12px', fontWeight: 400, colors: ['#adb5bd'] } },
        legend: { show: false },
        grid: { show: false },
        xaxis: {
            categories: [
                t("India"), t("United States"), t("China"), t("Indonesia"), t("Russia"),
                t("Bangladesh"), t("Canada"), t("Brazil"), t("Vietnam"), t("UK")
            ]
        }
    };
    return <ReactApexChart dir="ltr" options={options} series={series} type="bar" height="436" className="apex-charts" />;
};

const UsersByDeviceCharts = ({ dataColors, series }: any) => {
    const { t } = useLaravelReactI18n();
    const dountchartUserDeviceColors = getChartColorsArray(dataColors);
    const options: any = {
        labels: [t("Desktop"), t("Mobile"), t("Tablet")],
        chart: { type: "donut", height: 219 },
        plotOptions: { pie: { size: 100, donut: { size: "76%" } } },
        dataLabels: { enabled: false },
        legend: { show: false, position: 'bottom', horizontalAlign: 'center', offsetX: 0, offsetY: 0, markers: { width: 20, height: 6, radius: 2 }, itemMargin: { horizontal: 12, vertical: 0 } },
        stroke: { width: 0 },
        yaxis: { labels: { formatter: (value: any) => value + ' ' + t("k_users") }, tickAmount: 4, min: 0 },
        colors: dountchartUserDeviceColors
    };
    return <ReactApexChart dir="ltr" options={options} series={series} type="donut" height="219" className="apex-charts" />;
};

export { AudiencesCharts, AudiencesSessionsCharts, CountriesCharts, UsersByDeviceCharts };
