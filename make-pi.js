
window.onload = function () {

    let axLims = { minimum: 0, maximum: 1}
    let inCircle = [{x: 0.25, y: 0.25 }];
    let outCircle = [{x: 0.5, y: 0.8 }];
    let nPoints = inCircle.length + outCircle.length
    let estimPi = 4 * inCircle.length/nPoints

    let chart = new CanvasJS.Chart("chartContainer",
    {
        title:{
            text: `Pi is approximately ${estimPi}`
        },
        axisX: axLims,
        axisY: axLims,
        data: [
        {
         type: "scatter",
         dataPoints: inCircle,
         markerColor: "green"
        },
        {
         type: "scatter",
         dataPoints: outCircle,
         markerColor: "black"   
        }
        ]
        });
chart.render();
}