// Copyright (C) 2015 Tony Ngan, released under the MIT License.
var visualSystem = new Worker("visual.js");
var brain = new Worker("brain.js");
var canvas = _sys.canvas;
var context = _sys.canvasCtx;
var gDino = _sys.tRex;
// hard code configuration first
var vision = 40;
var si = 5;
var reactionTime = 500;

var dashboard = document.getElementById('dino-vision');

// Communicate with visual system
visualSystem.onmessage = function(event) {
    var neuronInfo = event.data;
    if(neuronInfo.status === 'DONE') {
        // Send the visual data and training output to the brain worker
        brain.postMessage({
            input: neuronInfo.input,
            output: neuronInfo.output
        });
    }
};
visualSystem.onerror = function(error) {
    throw error;
};
setInterval(function() { 
    // Can be optimized
    if(gDino.status !== 'WAITING') {
        var visualData = [];
        for(var i=1; i<=vision; ++i) {
            // Fetch what dino sees
            // xPos + 21 is the edge of dino's face
            // xs : samplings on x-axis, value is the offset+_sys.tRex.xPos + 21
            var pixels = context.getImageData(gDino.xPos + 21 + i*si, 40, 1, 91);
            visualData.push(pixels.data); 
        }
        visualSystem.postMessage({
            visualData: visualData,
            crashed: _sys.crashed,
            ducking: gDino.ducking,
            jumping: gDino.jumping
        });
    }
}, reactionTime);

// Communicate with the brain worker
// 
brain.onmessage = function(event) {
    var neuronInfo = event.data;
    dashboard.innerHTML = neuronInfo.reaction;
};
brain.onerror = function(error) {
    throw error;
};
