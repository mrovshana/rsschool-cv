const virtualPiano = {
    isNotes: true,
    isFullScreen: false,
    isMouseDown: false,
    pianoKeyEn: ['r', 't', 'u', 'i', 'o', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    pianoKeyRu: ['К', 'Е', 'Г', 'Ш', 'Щ', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д']
  }
  
  
  const buttonLttrs = document.querySelector('.btn-letters');
  const buttonNts = document.querySelector('.btn-notes');
  
  
  window.addEventListener('keydown', (e) => {
    let keyLetter = e.key.toUpperCase();
    if (virtualPiano.pianoKeyRu.indexOf(keyLetter) >= 0) {
     keyLetter = virtualPiano.pianoKeyEn[virtualPiano.pianoKeyRu.indexOf(keyLetter)].toUpperCase();
    }
    const audio = document.querySelector(`audio[data-letter="${keyLetter}"]`)
    const key = document.querySelector(`div[data-letter="${keyLetter}"]`)
    if (!audio) {return;}
    key.classList.add('piano-key-active');
    audio.currentTime = 0;
    audio.play();
  })
  
  window.addEventListener('keyup', (e) => {
    let keyLetter = e.key.toUpperCase();
    if (virtualPiano.pianoKeyRu.indexOf(keyLetter) >= 0) {
     keyLetter = virtualPiano.pianoKeyEn[virtualPiano.pianoKeyRu.indexOf(keyLetter)].toUpperCase();
    }
    const key = document.querySelector(`div[data-letter="${keyLetter}"]`)
    if (!key) { return;}
    key.classList.remove('piano-key-active');
  
  })
  
  document.querySelectorAll('.piano-key').forEach((key) => {
    key.addEventListener('mousedown', (e) => {
    const audio = document.querySelector(`audio[data-letter="${e.target.getAttribute('data-letter')}"]`);
    audio.currentTime = 0;
    audio.play();
    key.classList.add('piano-key-active');
    virtualPiano.isMouseDown = true;
  
    key.addEventListener('mouseup', (e) => {
      key.classList.remove('piano-key-active');
      virtualPiano.isMouseDown = false;
    })
  })
    key.addEventListener('mouseover', (e) => {
      if (virtualPiano.isMouseDown) {
      e.target.classList.add('piano-key-active');
      const audio = document.querySelector(`audio[data-letter="${e.target.getAttribute('data-letter')}"]`);
      audio.play();
      }
    })
    key.addEventListener('mouseout', (e) => {
      e.target.classList.remove('piano-key-active');
    })
  }
  )
  
  document.documentElement.addEventListener('mouseup', () => {
    virtualPiano.isMouseDown = false;
  })
    
  
  buttonNts.addEventListener('click', (e) => {
    if (virtualPiano.isNotes) { return; }
    else {
      virtualPiano.isNotes = true;
    }
    buttonNts.classList.add('btn-active');
    buttonLttrs.classList.remove('btn-active');
  
    const pianoKeyAll = document.querySelectorAll('.piano-key');
    pianoKeyAll.forEach((key) => {
      key.classList.remove('letter');
    });
  
  
  })
  
  buttonLttrs.addEventListener('click', (e) => {
    if (!virtualPiano.isNotes) { return; }
    else {
      virtualPiano.isNotes = false;
    }
  
    buttonNts.classList.remove('btn-active');
    buttonLttrs.classList.add('btn-active');
  
    const pianoKeyAll = document.querySelectorAll('.piano-key');
    pianoKeyAll.forEach((key) => {
      key.classList.add('letter');
    });
  })
  
  document.querySelector('.fullscreen').addEventListener('click', () => {
    if (!virtualPiano.isFullScreen) {
      fullScreen(document.documentElement);
    }
    else {
      fullScreenCancel();
    }
  
    virtualPiano.isFullScreen = !virtualPiano.isFullScreen;
  })
  
  const fullScreen = (element) => {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.webkitrequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.mozRequestFullscreen) {
      element.mozRequestFullScreen();
    }
  }
  
  function fullScreenCancel() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen ) {
      document.webkitExitFullscreen();
    } else if(document.mozExitFullscreen) {
      document.mozExitFullScreen();
    }
  }