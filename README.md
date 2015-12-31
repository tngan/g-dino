# g-dino
Train Google's dinosaur using neural network in browser.

## FAQ 

**Why ?**<br/>
I wish the little dino to get smarter one day.

**Will the little dino grow up as a dinasour ?**<br/>
The answer is NO. It finally learns when to duck, jump and walk only.

**How can I train my dino ?**<br/>
Follow the installation guide, play the game as usual.

## Installation

1. Clone this repository.
1. Make sure you have already installed Node.js (version >= 4.0.0).
1. Run the command `node app.js`.
1. Open Chrome, and your little dino will be appeared in localhost:3000.
1. Its brain will send out a signal to tell you when to duck, jump and walk.

## Description

We are using simple neural network to train the dino, to reduce the latency of the game, three workers are used to build the neural system of dino. They are respectively motor, visual and brain. You can find the scripts under the folder `/public/javascripts/systems`.

**Motor** is responsible for receiving signals from the brain in order to take reactions (e.g. duck, jump and walk) and sending the vision signals to the visual system.

**Visual** is responsible for translating vision signals from the motor system into brain-known signals and sending to the brain.

**Brain** is responsible for receiving signals from visual system in order to do behaviour training, sending feedback signals to the motor system.

Currently, the dino has 200 * 91 pixels visual range and the sampling width is 50 pixels. The visual signal is fetched every half second which is the reaction time of dino. It is an 1-D vector which is composed of 40 values. Each value is computed by the norm of a 1x91 vector which contains the color of pixels. The color of each component in the game is #535353 (except the cloud and high score banner), therefore we can easily retrieve a vector with 0 and 1, then its norm is computed.

![g-dino](https://raw.githubusercontent.com/tngan/g-dino/master/public/wiki/vision.png)

The structure of neural network is as follow:

+ **Input layer** with 40 nodes (norm of forty 1x91 vector)
+ **Single hidden layer** with 20 nodes
+ **Output layer** with 3 nodes (duck, jump and walk)

## Growth plan for the little dino 

+ Build APIs for user-defined learning algorithms to work together with the three system workers.
+ Dashboard will be made for monitoring the dino and customizing the network.
+ The little dino should learn from itself instead of manual training.
+ Performance optimization (Browser training isn't a good choice even worker is used, but it's a challenging task).
+ Export and import the trained network in JSON format. (See [here](https://github.com/cazala/synaptic/wiki/Networks#tojsonfromjson))
+ Introduce one more output which is high jumping. (Long press the jump button)
+ Google actually provides a great API for the dino, it's worth to investigate it later on.
+ The little dino may favor Google's TensorFlow. The alias **tensor-rex** is reversed.

## Credits

- [Ivan Seidel](https://github.com/ivanseidel)
- [João Pedro](https://github.com/joaopedrovbs)

They are the first team to implement this idea. See [IAMDinosaur](https://github.com/ivanseidel/IAMDinosaur). 

- [Juan Cazala](https://github.com/cazala) **Creator of synaptic.js**
