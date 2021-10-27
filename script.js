function init() {
  const timeEl = document.getElementById("time")
  const lightEl = document.getElementById("light")

  // state
  let isLightVis = false
  let lightX = 0
  let lightY = 0
  let prevSeconds

  function fadeInLight() {
    isLightVis = true
  }
  function fadeOutLight() {
    isLightVis = false
  }
  function moveLight(x, y) {
    lightX = x
    lightY = y
  }

  // clear time text
  timeEl.innerText = "";

  // render
  const render = () => {
    const time = new Date();
    const seconds = time.getSeconds()

    // update time every second
    if (seconds !== prevSeconds) {
      const text = `(EST) ${time.toLocaleTimeString("en-GB", {
        timeZone: "America/New_York",
      })}`;

      timeEl.setAttribute("data-time", text);
      // setAttribute doesn't cause reflow like innerText.
      // CSS psuedo element can use data-time to update text.
      // https://gist.github.com/paulirish/5d52fb081b3570c81e3a

      prevSeconds = seconds
    }

    // update light position
    if (isLightVis) {
      lightEl.style.transform = `translate3d(calc(-50% + ${lightX}px), calc(-50% + ${lightY}px), 0px)`
      lightEl.style.opacity = 1
    } else {
      lightEl.style.opacity = 0
    }

    // re-render
    requestAnimationFrame(render)
  }

  // initial render
  requestAnimationFrame(render)

  // listen for mouse movement (controls light position)
  document.body.addEventListener("mousemove", (e) => {
    const { pageX, pageY } = e

    moveLight(pageX, pageY)
    fadeInLight()
  })
  document.body.addEventListener("touchmove", (e) => {
    const { changedTouches } = e
    const { pageX, pageY } = changedTouches[0]

    moveLight(pageX, pageY)
    fadeInLight()
  })

  // fade in light only when over (prevents light "jumping")
  document.body.addEventListener("mouseleave", fadeOutLight)
  document.body.addEventListener("touchend", fadeOutLight)
}

init();
