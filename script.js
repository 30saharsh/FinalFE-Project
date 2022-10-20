var ctrh , ctrw;
if(window.innerWidth>500){
  ctrh = 1.5;
  ctrw = .7;
}
else{
  ctrh = 1.2;
  ctrw = 2.2;
}


function init() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });


  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
init();

function initialanimation() {
  var h1 = document.querySelector("#fs h1");

  var clutter = "";

  var j = 0;

  for (var i = 0; i <= Math.floor(h1.textContent.length / 2); i++) {
    clutter += `<span data-delay ="${i}">${h1.textContent.charAt(j)}</span>`;
    j++;
  }
  for (var i = Math.floor(h1.textContent.length / 2) - 1; i >= 0; i--) {
    clutter += `<span data-delay ="${i}">${h1.textContent.charAt(j)}</span>`;
    j++;
  }
  h1.innerHTML = clutter;
  document.querySelectorAll("#fs h1 span").forEach(function (elem) {
    gsap.from(elem, {
      y: "100%",
      duration: 1.8,
      ease: Expo.easeInOut,
      delay: elem.dataset.delay * .15
    })
  })
}
initialanimation();


function animateAllHeadings(){
document.querySelectorAll(".text p").forEach(function(harp){
  var clutter = "";
  harp.textContent.split("").forEach(function(char){
    clutter+=`<span>${char}</span>`
  })
  harp.innerHTML = clutter;
})
document.querySelectorAll(".text p").forEach(function(harp){
  gsap.to(harp.children,{
    scrollTrigger:{
      scroller:"#main",
      trigger:harp,
      start:"top 80%",
      // markers:true
    },
    y:0,
    ease:Power3.easeInOut,
    duration:0.6,
    stagger:.07
  })
})

}

var tl = gsap.timeline();

gsap.to("#cube img", {
  stagger: 1,
  opacity: 1,
  duration: .8 * 3,
  ease: Expo.easeInOut
})
tl.to("#fs #cube", {
  width: "30%",
  delay: .5,
  ease: Power3.easeInOut,
  duration: .8
})
  .to("#fs #cube", {
    height: `${30 * ctrh}%`,
    width: `${ctrw * 40}%`,
    ease: Power3.easeInOut,
    duration: .8
  })
  .to("#fs #cube", {
    height: `${20 * 2}%`,
    width: `${ctrw * 30}%`,
    ease: Power3.easeInOut,
    duration: .8
  })
  .to("#fs #cube", {
    height: `${30 * ctrh}%`,
    width: `${ctrw * 40}%`,
    ease: Power3.easeInOut,
    duration: .8
  })
  .to("#fs h1 span", {
    y: "-150%",
    ease: Expo.easeInOut,
    duration: 1
  })
  .to("#fs #cube", {
    height: "100%",
    width: "100%",
    delay: -.7,
    ease: Circ.easeInOut,
    onComplete: function () {
      document.querySelector("#fs").style.display = "none";
      animateAllHeadings();
    },
    duration: 1
  })
document.querySelector("#nav")
  .addEventListener("mouseenter", function () {
    gsap.to(".cover", {
      stagger: .005,
      ease: Expo.easeInOut,
      duration: .6,
      height: "100%"
    })
    gsap.to(".cover p", {
      stagger: .1,
      ease: Expo.easeInOut,
      duration: 0.9,
      opacity: 1
    })
  });
document.querySelector("#nav")
  .addEventListener("mouseleave", function () {
    gsap.to("#one", {
      stagger: .005,
      ease: Expo.easeInOut,
      duration: .6,
      height: "3%"
    })
    gsap.to("#two,#three", {
      stagger: .005,
      ease: Expo.easeInOut,
      duration: .6,
      height: "0.1%"
    })
    gsap.to(".cover p", {
      stagger: .1,
      ease: Expo.easeInOut,
      duration: .9,
      opacity: 0
    })
  })
document.querySelectorAll(".text")
  .forEach(function (text) {
    text.addEventListener("mouseenter", function (dets) {
      gsap.to(dets.target.children[1], {
        width: "100%",
        ease: Expo.easeOut,
        duration: 0.5
      })
    })
    text.addEventListener("mouseleave", function (dets) {
      gsap.to(dets.target.children[1], {
        width: "0%",
        left: "100%",
        ease: Expo.easeOut,
        duration: 0.5,
        onComplete: function () {
          dets.target.children[1].style.left = "0%"
        }
      })
    })
  })

