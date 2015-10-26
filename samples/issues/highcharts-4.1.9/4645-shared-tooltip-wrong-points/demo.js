
$(function () {
    QUnit.test("Shared tooltip should compare point.distX, not point.dist to find absolute closest point." , function (assert) {
        var chart = $('#container').highcharts({
                chart: {
                    type: 'column'  
                },
                tooltip: {
                    shared: true
                },
                series: [{
                    data: [
                        [Date.UTC(2015, 1, 1), 5],
                        [Date.UTC(2015, 2, 1), 5],
                        [Date.UTC(2015, 3, 1), 5],
                        [Date.UTC(2015, 4, 1), 5],
                        [Date.UTC(2015, 5, 1), 5],
                        [Date.UTC(2015, 6, 1), 5]
                    ]
                }, {
                    data: [
                        [Date.UTC(2015, 1, 1), 5],
                        [Date.UTC(2015, 2, 1), 5],
                        [Date.UTC(2015, 3, 1), 5]
                    ]
                }, {
                    data: [
                        [Date.UTC(2015, 4, 1), 1],
                        [Date.UTC(2015, 5, 1), 1],
                        [Date.UTC(2015, 6, 1), 1]
                    ]
                }]
            }).highcharts(),
            offset = $("#container").offset(),
            series = chart.series[1],
            point = series.points[2],
            x = offset.left + point.plotX + chart.plotLeft,
            y = offset.top + chart.plotTop + 5;

        chart.pointer.onContainerMouseMove({ 
            pageX: x, 
            pageY: y, // from the top 
            target: point.graphic.element 
        });

        chart.pointer.onContainerMouseMove({ 
            pageX: x, 
            pageY: y + chart.plotHeight - 15, // to the bottom
            target: point.graphic.element 
        });

        assert.strictEqual(
            chart.hoverPoints.indexOf(point) >= 0,
            true,
            "Proper hovered point.");
    });
});