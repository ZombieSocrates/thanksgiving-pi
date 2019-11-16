


window.onload = function () {

    let axProps = { 
        minimum: 0, 
        maximum: 1,
        tickLength: 0,
        gridThickness: 0,
        stripLines:[ {
            value: 1,
            showOnTop: true,
            color: "grey",
            thickness: 1,
            lineDashType: "dash"
        }]
    };
    let inCircle = [];
    let outCircle = [];
    let circleBounds = [];
    for (let i = 0; i < 101; i++){
        let j = Math.sqrt(1 - Math.pow(i/100, 2))
        circleBounds.push({ x: i/100, y: j})
    }


    let samplingRate = 500;

    let chart = new CanvasJS.Chart("chartContainer",{
        title: {
            horizontalAlign: 'left'
        },
        interactivityEnabled: false,
        axisX: axProps,
        axisY: axProps,
        toolTip: {
            enabled: false
        },
        data: [
        {
            type: "scatter",
            dataPoints: inCircle,
            markerColor: "#f49e56",
            markerSize: 5
        },
        {
            type: "scatter",
            dataPoints: outCircle,
            markerColor: "#2aa6e3",
            markerSize: 5
        },
        {
            type:"line",
            dataPoints: circleBounds,
            markerType: "none",
            lineThickness: 1,
            lineColor: "black"
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
        for (let i = 0; i < count; i ++) {
            let point = { x: Math.random(), y: Math.random() };
            let dist = Math.pow(point.x, 2) + Math.pow(point.y, 2);
            if (dist > 1) {outCircle.push(point)}
            else {inCircle.push(point)}
            chart.options.title.text = `\u03C0 \u2248 ${estimatePi()}` 
            chart.render();
        }
    }

//Initializing with more than 100 points makes the page load slow
rejectionSample();
setInterval(function(){rejectionSample()}, samplingRate);
}