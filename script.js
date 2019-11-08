const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

msg.text = document.querySelector('[name=text]').value;

// Populates voices from built in voices from device and only get languages that includes 'en'
function populateVoices() {
    voices = this.getVoices();
    voicesDropdown.innerHTML = voices
        .filter(voice => voice.lang.includes('en'))
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join('');
    // console.log(voices)
};
// Allow the voice from the dropdown to be applied
function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
    console.log(this.value)
};

// Create a function that will restart the Speech Synthesis on voice change
function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
        speechSynthesis.speak(msg);
    }
};

// Create a function to control the varios options, Rate and Pitch

function setOption(e) {
    msg[this.name] = this.value;
    toggle();
    console.log(this.name, this.value);
};



speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));