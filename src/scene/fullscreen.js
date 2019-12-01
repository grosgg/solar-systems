const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.getElementById('scene').requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen(); 
    }
  }
}

const setupFullscreen = (keyCode) => {
  document.addEventListener("keydown", (e => {
    if (e.keyCode == keyCode) {
      toggleFullScreen();
    }
  }), false);
}

export default setupFullscreen;