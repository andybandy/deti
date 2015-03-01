var osc0, osc1, isSound = true;
var freq0, freq1, amp0, amp1;

var fm = {
  carrier: null,
  modulator: null,
  init: function(car, mod) {
    this.carrier = car;
    this.modulator = mod;
  },
  connect: function() {
    this.carrier.connect();
    this.modulator.connect();
  },
  disconnect: function() {
    this.carrier.disconnect();
    this.modulator.disconnect();
  },
  note: function(freq, amp) {
    freq0 = freq;
    this.modulator.frequency = freq0;
    this.modulator.amp = amp;
    this.carrier.frequency = Add(freq0, this.modulator);
  }
};

var fft, waveform = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  freq0 = 440;
  amp0 = 0.2;
  freq1 = 20;
  amp1 = 1;
  osc0 = Sine(220, 0.1)._;
  osc1 = Sine(20, 0.1)._;
  fm.init(osc0, osc1);
  colorMode(HSB, 255);

  fft = FFT(512);
  waveform = new Uint8Array(fft.frequencyBinCount);
}

function draw() {
  background();
  fft.getByteTimeDomainData(waveform);
  strokeWeight(1);
  beginShape();
  for (var i = 0; i < waveform.length; i++) {
    var x = map(i, 0, waveform.length, 0, width);
    var y = map(waveform[i], 0, 255, height, 0);
    vertex(x, y);
  }
  endShape();
}

function mousePressed() {
  if (isSound) {
    fm.connect();
  } else {
    fm.disconnect();
  }
  isSound = !isSound;
}

function mouseMoved() {
  console.log(mouseX + ' ' + mouseY);
  fm.note(map(mouseX, 0, width, 20, 1000), map(mouseY, 0, height, 0.2, 1));
}
