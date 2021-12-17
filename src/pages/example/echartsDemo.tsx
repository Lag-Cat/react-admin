import { useEffect, useState } from "react"
import echarts, { EChartOption } from 'echarts'
import style from './index.module.scss'
import { Card } from "antd"
const EchartsDemoPage = () => {
    const setEcharts = (dom: HTMLDivElement, options: EChartOption) => {
        let myChart = echarts.init(dom);
        options && myChart.setOption(options);
        myChart.resize();
    }
    useEffect(() => {
        setEcharts((document.getElementById("myChart")! as HTMLDivElement), {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: 'line'
                }
            ]
        })

        setEcharts((document.getElementById("myChart2")! as HTMLDivElement), {
            color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
            title: {
                text: 'Gradient Stacked Area Chart'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Line 1',
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    lineStyle: {
                        width: 0
                    },
                    showSymbol: false,
                    areaStyle: {
                        opacity: 0.8,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgba(128, 255, 165)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(1, 191, 236)'
                            }
                        ])
                    },
                    emphasis: {
                    },
                    data: [140, 232, 101, 264, 90, 340, 250]
                },
                {
                    name: 'Line 2',
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    lineStyle: {
                        width: 0
                    },
                    showSymbol: false,
                    areaStyle: {
                        opacity: 0.8,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgba(0, 221, 255)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(77, 119, 255)'
                            }
                        ])
                    },
                    emphasis: {
                    },
                    data: [120, 282, 111, 234, 220, 340, 310]
                },
                {
                    name: 'Line 3',
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    lineStyle: {
                        width: 0
                    },
                    showSymbol: false,
                    areaStyle: {
                        opacity: 0.8,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgba(55, 162, 255)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(116, 21, 219)'
                            }
                        ])
                    },
                    emphasis: {
                    },
                    data: [320, 132, 201, 334, 190, 130, 220]
                },
                {
                    name: 'Line 4',
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    lineStyle: {
                        width: 0
                    },
                    showSymbol: false,
                    areaStyle: {
                        opacity: 0.8,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgba(255, 0, 135)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(135, 0, 157)'
                            }
                        ])
                    },
                    emphasis: {
                    },
                    data: [220, 402, 231, 134, 190, 230, 120]
                },
                {
                    name: 'Line 5',
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    lineStyle: {
                        width: 0
                    },
                    showSymbol: false,
                    label: {
                        show: true,
                        position: 'top'
                    },
                    areaStyle: {
                        opacity: 0.8,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgba(255, 191, 0)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(224, 62, 76)'
                            }
                        ])
                    },
                    emphasis: {
                    },
                    data: [220, 302, 181, 234, 210, 290, 150]
                }
            ]
        })
    }, [])


    return <div className={style["example"]}>
        <div className={style["example-card"]}>
            <Card className={style["example-card-item"]} title="Default size card" size="small" extra={<a href="#">More</a>} >

                <div id="myChart" style={{ height: "300px", width: "300px" }}></div>
            </Card>
            <Card className={style["example-card-item"]} title="Default size card" size="small" extra={<a href="#">More</a>}>
                <div id="myChart2" style={{ height: "300px", width: "300px" }}></div>
            </Card>
        </div>
    </div>
}

export default EchartsDemoPage