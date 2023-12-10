// Init SpeechSynth API
const synth = window.speechSynthesis;


//DOM Element
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

//Init voices array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();


  //Loop through voice and create an option for each one
  voices.forEach(voice => {
      // Create option element
      const option = document.createElement('option');
      //Fill the option with voice and language
      option.textContent = voice.name + '('+ voice.lang +')';

      // Set needed option attributes
      option.setAttribute('data-lang', voice.lang);
      option.setAttribute('data-name', voice.name);
      voiceSelect.appendChild(option);
  })
}

getVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

// Speak
const speak = () => {
    // Check if speaking
    if(synth.speaking) {
        console.error('Already speaking...');
        return;
    }
    if(textInput.value !=='') {
         // Add background animation 
            body.style.background = '#141414 url(img/wave.webm)';
            body.style.backgroundRepeat = 'repeat-x';
            body.style.backgroundSize = '100% 100%'
        //Get Speak Text
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        // Speak End
        speakText.onend = e => {
            console.log('Done Speaking...');
            body.style.background = '#141414'
        }

        // Speak error
        speakText.onerror = e => {
            console.error('Something Went Wrong...');
        }       

        // Selected voice 
        const SelectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        // Loop through voices
        voices.forEach(voice => {
            if(voice.name === SelectedVoice) {
                speakText.voice = voice;
            }
        });

        // Set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        // Speak
        synth.speak(speakText);
    }
}

// Event Listener


//Text form submit
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur()
});

// Rate Value change
rate.addEventListener('change', e => rateValue.textContent = rate.value)

// pitch Value change
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value)

// voice select change
voiceSelect.addEventListener('change', e => speak());