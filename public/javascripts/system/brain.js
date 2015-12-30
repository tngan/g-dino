// Copyright (C) 2015 Tony Ngan, released under the MIT License.
// Brain worker
var window = this;
// Import another library
importScripts('../synaptic.min.js');
var self = this;
var inputLayer = new Layer(40);
var hiddenLayer = new Layer(20);
var outputLayer = new Layer(3);
// Hard code the configuration here
var learningRate = 0.3;

inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

var brain = new Network({
    input: inputLayer,
    hidden: [hiddenLayer],
    output: outputLayer
});

self.getResponse = function(neuronInfo) {
    var reaction = neuronInfo.reduce(function(indexWithMaxVal, currentVal, currentIndex, arr) {
        return currentVal > arr[indexWithMaxVal] ? currentIndex : indexWithMaxVal;
    }, 0);   
    
    switch(reaction) {
        case 0: return 'ducking';
        case 1: return 'jumping';
        case 2: return 'walking';
        default: return 'walking'; // unexpected error
    } 
};

self.onmessage = function(event) {
    var neuronInfo = event.data;
    // Apply synaptic.js
    var result = brain.activate(neuronInfo.input);
    brain.propagate(learningRate, neuronInfo.output);
    self.postMessage({
        from: 'BRAIN',
        status: 'DONE',
        reaction: self.getResponse(result) // it returns the output vector
    });
};
self.onerror = function(error) {
    throw error;
};

