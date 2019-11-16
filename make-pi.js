


window.onload = function () {

    let axLims = { minimum: 0, maximum: 1};
    let inCircle = [];
    let outCircle = [];
    let samplingRate = 1000;

    let chart = new CanvasJS.Chart("chartContainer",{
        title: {
            horizontalAlign: 'left'
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

    function estimatePi() {
        let nPoints = inCircle.length + outCircle.length;
        let estim = nPoints == 0 ? nPoints : 4 * inCircle.length/nPoints;
        return estim;
    }

    function rejectionSample(initCount) {
        count = initCount || 1
        let point = { x: Math.random(), y: Math.random() };
        let dist = Math.pow(point.x, 2) + Math.pow(point.y, 2);
        if (dist > 1) {outCircle.push(point)}
        else {inCircle.push(point)}
        chart.options.title.text = `\u03C0 \u2248 ${estimatePi()}` 
        chart.render();
    }


rejectionSample();
setInterval(function(){rejectionSample()}, samplingRate);
}