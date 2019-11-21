
window.onload = function () {

    let axProps = { 
        minimum: 0, 
        maximum: 1,
        tickLength: 0,
        gridThickness: 0,
        stripLines:[ {
            value: 1,
            showOnTop: true,
            color: "black",
            thickness: 2,
            lineDashType: "dash"
        }],
        labelFontFamily: "Helvetica Neue",
        labelFormatter: function(e) {
            return e.value == 0 ? '' : e.value
        }
    };

    let inCircle = [];
    let outCircle = [];
    let circleBounds = [];
    for (let i = 0; i < 101; i++){
        let j = Math.sqrt(1 - Math.pow(i/100, 2))
        circleBounds.push({ x: i/100, y: j})
    };


    let samplingRate = 100;

    let chart = new CanvasJS.Chart("chartContainer",{
        title: {
            horizontalAlign: 'center',
            fontColor: "#F8B12C",
            fontFamily: 'Helvetica Neue',
            fontWeight: 'bold'
        },
        subtitles:[
        {
            fontColor: "#F8B12C",
            fontFamily: 'Helvetica Neue',
            fontSize: 16,
            fontWeight: 'bold'
        },
        {
            fontColor: "#ED732E",
            fontFamily: 'Helvetica Neue',
            fontSize: 16,
            fontWeight: 'bold'
        }
        ],
        interactivityEnabled: false,
        axisX: axProps,
        axisY: axProps,
        backgroundColor: "#996236",
        toolTip: {
            enabled: false
        },
        data: [
        {
            type: "scatter",
            dataPoints: inCircle,
            markerColor: "#F8B12C",
            markerSize: 5
        },
        {
            type: "scatter",
            dataPoints: outCircle,
            markerColor: "#ED732E",
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

    function getTotalPoints(){
        return inCircle.length + outCircle.length;
    }

    function estimatePi() {
        let nPoints = getTotalPoints();
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
            chart.options.subtitles[0].text = `Points In Circle: ${inCircle.length.toLocaleString()}`
            chart.options.subtitles[1].text = `Total Points Sampled: ${getTotalPoints().toLocaleString()}`
            chart.render();
        }
    }

//Initializing with more than 100 points makes the page load slow
rejectionSample();
setInterval(function(){rejectionSample()}, samplingRate);
}