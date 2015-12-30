// Copyright (C) 2015 Tony Ngan, released under the MIT License.
var self = this; // lexical 
var b2i = function(b) { return b ? 1: 0; }
var brainProcess = function(gDino) {
    if(gDino.crashed){
        // When the dino is crashed, stop to fetch the data
    } else { 
        var featureVectors = [];
        var output = [];
        var visualData = gDino.visualData;
        // vision in pixel = vision * si;
        for(var i=0; i<visualData.length; ++i) {
            var nzCount = 0;
            for(var j=0; j<visualData[i].length; ++j) {
                // Add to the feature vectors
                // length of input featureVectors
                if(visualData[i][4*j] === 83) nzCount++;
            }
            featureVectors.push(Math.sqrt(nzCount)); 
        }
        // The last means the dino is walking if 1
        output.push(b2i(gDino.ducking),b2i(gDino.jumping),b2i(!gDino.ducking && !gDino.jumping)); 
        return {
            from: 'VISUAL',
            status: 'DONE',
            input: featureVectors,
            output: output
        };
    }
    return { 
        from: 'VISUAL',
        status: 'NODATA' 
    };
}

self.onmessage = function(event) {
    var data = event.data;
    self.postMessage(brainProcess(data));    
};
self.onerror = function(error) {
    throw error;
};
