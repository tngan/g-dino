# g-dino
Train Google's dinosaur using neural network

## FAQ 

**Why ?**<br/>
I wish the little dino to get smarter one day.

**Will the little dino grow up as a dinasour ?**<br/>
The answer is NO. He finally learns when to duck, jump and walk only.

**How can I train my dino ?**<br/>
Follow the installation guide, play the game as usual.

## Installation

1. Clone this repository.
1. Make sure you have already installed Node.js (version >= 4.0.0).
1. Run the command `node app.js`.
1. Open Chrome, and your little dino will be appeared in localhost:3000.
1. His brain will send out a signal to tell you when to duck, jump and walk.

## Description

We are using simple neural network to train the dino, to reduce the latency of the game, three workers are used to build the neural system of dino. They are respectively motor, visual and brain. You can find the scripts under the folder `/public/javascripts/systems`.

**Motor** is responsible for receiving the signal from dino's brain in order to do corresponding reaction (e.g. duck, jump, walk) and input the signal of dino's vision to the visual system.

**Visual** is responsible for receiving the signal from dino's motor system in order to translate into brain-known signal and then input it to the brain.

**Brain** is responsible for receiving the visual signal in order to train itself and output the corresponding motor signal back to its motor system.

Currently, the dino has 200 pixels vision range, the visual signal is an 1-D vector consists of 40 values. Each value is computed by the norm of a 1x91 vector which contains the information of color of pixels. The only color of each component in the game is #535353, therefore, we can easily retrieve a vector with 0 and 1, then we can compute its norm.

![g-dino](https://raw.githubusercontent.com/tngan/g-dino/master/public/wiki/vision.png)

Finally the neural network is using 40 inputs, a hidden layer with 20 nodes and an output with 3 nodes indicating the corresponding reaction. Dino's brain determines which output node has the highest rank. 

## What's the next ?

+ The little dino should learn itself instead of manual training.
+ Export and import the trained network in JSON format. (See [here](https://github.com/cazala/synaptic/wiki/Networks#tojsonfromjson))
+ A dashboard will be made to monitor the dino.
+ Customize the configurations (especially the visual range of the dino).
+ Google's dino game has a great API, it's worth to investigate it later on.
+ Improve performance.

## Credits

- [Ivan Seidel](https://github.com/ivanseidel)
- [João Pedro](https://github.com/joaopedrovbs)

They are the first team to implement this idea. [Here](https://github.com/ivanseidel/IAMDinosaur) is their repository.

- [Juan Cazala](https://github.com/cazala) **Creator of synaptic.js**
