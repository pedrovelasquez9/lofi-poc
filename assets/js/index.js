const playButton = document.getElementById("playButton");

    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    synth.set({ "volume": -20, "oscillator": { "type": "sine" }, "envelope": { "attack": 0.5, "decay": 0.5, "sustain": 0.5, "release": 1.5 } });

    const reverb = new Tone.Reverb(5).toDestination();
    synth.connect(reverb);

    const bassSynth = new Tone.Synth().toDestination();
    bassSynth.set({ "volume": -18, "oscillator": { "type": "sine" }, "envelope": { "attack": 0.01, "decay": 0.5, "sustain": 0.2, "release": 0.5 } });

    const drums = new Tone.MembraneSynth().toDestination();
    drums.volume.value = -10;
    const hiHats = new Tone.MetalSynth({ "frequency": 200, "envelope": { "attack": 0.001, "decay": 0.1, "release": 0.01 }, "harmonicity": 5.1, "modulationIndex": 32, "resonance": 4000, "octaves": 1.5 }).toDestination();
    hiHats.volume.value = -30;

    const pluckSynth = new Tone.PluckSynth().toDestination();
    pluckSynth.volume.value = -15;

    const leadSynth = new Tone.Synth().toDestination();
    leadSynth.set({ "volume": -12, "oscillator": { "type": "sine" }, "envelope": { "attack": 0.1, "decay": 0.3, "sustain": 0.2, "release": 1 } });
    leadSynth.connect(reverb);

    // Progresión armónica basada en "Kokiri Forest" de "The Legend of Zelda: Ocarina of Time"
    const chordsProgression = [
      ["A4", "C5", "E5"],
      ["A4", "D5", "F#5"],
      ["G4", "B4", "D5"],
      ["G4", "C5", "E5"],
    ];

    // Notas de bajo para acompañamiento
    const bassNotes = ["A2", "D2", "G2", "C3"];

    const drumNotes = ["C2", "G2"];
    const hiHatNotes = ["C4"];
    const pluckNotes = ["C3", "G3", "E3", "A3"];

    // Melodía principal inspirada en "Kokiri Forest" de "The Legend of Zelda: Ocarina of Time"
    const leadNotes = [
      "A4","C5", "E5", "A4",
      "D5", "F#5", "A5", "D5",
      "G4", "B4", "D5", "G4",
      "C5", "E5", "G5", "C5",
      ];

      const patternLength = chordsProgression.length;
let isPlaying = false;

const generatePattern = () => {
  const pattern = [];
  for (let i = 0; i < patternLength; i++) {
    pattern.push(i);
  }
  return pattern;
};

const generateBassPattern = () => {
  const pattern = [];
  for (let i = 0; i < patternLength; i++) {
    pattern.push(i);
  }
  return pattern;
};

const generateDrumPattern = () => {
  const pattern = [];
  for (let i = 0; i < patternLength; i++) {
    pattern.push(Math.floor(Math.random() * drumNotes.length));
  }
  return pattern;
};

const generateHiHatPattern = () => {
  const pattern = [];
  for (let i = 0; i < patternLength * 2; i++) {
    pattern.push(Math.floor(Math.random() * hiHatNotes.length));
  }
  return pattern;
};

const generateLeadPattern = () => {
  const pattern = [];
  for (let i = 0; i < patternLength * 4; i++) {
    pattern.push(Math.floor(Math.random() * leadNotes.length));
  }
  return pattern;
};

const playPattern = (pattern, startTime, tempo) => {
  const noteDuration = 60 / tempo;

  pattern.forEach((chordIndex, index) => {
    const chordStartTime = startTime + index * noteDuration * 2;
    synth.triggerAttackRelease(chordsProgression[chordIndex], noteDuration, chordStartTime);
  });
};

const playBassPattern = (pattern, startTime, tempo) => {
  const noteDuration = 60 / tempo;

  pattern.forEach((bassNoteIndex, index) => {
    const bassNoteStartTime = startTime + index * noteDuration * 2;
    bassSynth.triggerAttackRelease(bassNotes[bassNoteIndex], noteDuration, bassNoteStartTime);
  });
};

const playDrumPattern = (pattern, startTime, tempo) => {
  const noteDuration = 60 / tempo;

  pattern.forEach((drumNoteIndex, index) => {
    const drumNoteStartTime = startTime + index * noteDuration * 2;
    drums.triggerAttackRelease(drumNotes[drumNoteIndex], noteDuration / 2, drumNoteStartTime);
  });
};

const playHiHatPattern = (pattern, startTime, tempo) => {
  const noteDuration = 60 / tempo;

  pattern.forEach((hiHatNoteIndex, index) => {
    const hiHatNoteStartTime = startTime + index * noteDuration;
    hiHats.triggerAttackRelease(hiHatNotes[hiHatNoteIndex], noteDuration / 8, hiHatNoteStartTime);
  });
};

const playLeadPattern = (pattern, startTime, tempo) => {
  const noteDuration = 60 / tempo;

  pattern.forEach((leadNoteIndex, index) => {
    const leadNoteStartTime = startTime + index * noteDuration / 2;
    leadSynth.triggerAttackRelease(leadNotes[leadNoteIndex], noteDuration, leadNoteStartTime);
  });
};

const playMusic = () => {
  if (!isPlaying) {
    return;
  }

  const startTime = Tone.now();
  const tempo= 60;
  const chordPattern = generatePattern();
  const bassPattern = generateBassPattern();
  const drumPattern = generateDrumPattern();
  const hiHatPattern = generateHiHatPattern();
  const leadPattern = generateLeadPattern();

  playPattern(chordPattern, startTime, tempo);
  playBassPattern(bassPattern, startTime, tempo);
  playDrumPattern(drumPattern, startTime, tempo);
  playHiHatPattern(hiHatPattern, startTime, tempo);
  playLeadPattern(leadPattern, startTime, tempo);

  setTimeout(playMusic, (60 / tempo) * patternLength * 1000 * 2 - 50); // Ajustado el tiempo de espera para eliminar el delay
};

playButton.addEventListener("click", async () => {
  if (Tone.context.state !== "running") {
    await Tone.start();
  }
  isPlaying = !isPlaying;
  playButton.textContent = isPlaying ? "Detener" : "Reproducir";
  playMusic();
});

