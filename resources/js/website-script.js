document.addEventListener("DOMContentLoaded", () => {
    // // Mobile menu toggle
    // const menuToggle = document.querySelector(".menu-toggle")
    // const navLinks = document.querySelector(".nav-links")
  
    // if (menuToggle && navLinks) {
    //   menuToggle.addEventListener("click", () => {
    //     navLinks.classList.toggle("active")
  
    //     if (navLinks.classList.contains("active")) {
    //       navLinks.style.display = "flex"
    //       navLinks.style.flexDirection = "column"
    //       navLinks.style.position = "absolute"
    //       navLinks.style.top = "100%"
    //       navLinks.style.left = "0"
    //       navLinks.style.width = "100%"
    //       navLinks.style.padding = "1rem"
    //       navLinks.style.backgroundColor = "var(--color-background)"
    //       navLinks.style.boxShadow = "var(--shadow-lg)"
    //       navLinks.style.zIndex = "50"
    //     } else {
    //       navLinks.style.display = ""
    //     }
    //   })
    // }
  
    // // Theme toggle
    // const themeToggle = document.querySelector(".theme-toggle")
  
    // if (themeToggle) {
    //   // Check for saved theme preference or use system preference
    //   const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")
    //   const savedTheme = localStorage.getItem("theme")
  
    //   if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme.matches)) {
    //     document.documentElement.classList.add("dark")
    //   }
  
    //   themeToggle.addEventListener("click", () => {
    //     document.documentElement.classList.toggle("dark")
  
    //     // Save preference to localStorage
    //     if (document.documentElement.classList.contains("dark")) {
    //       localStorage.setItem("theme", "dark")
    //     } else {
    //       localStorage.setItem("theme", "light")
    //     }
    //   })
    // }
  
    // Schedule tabs
    const tabBtns = document.querySelectorAll(".tab-btn")
    const scheduleDays = document.querySelectorAll(".schedule-day")
  
    if (tabBtns.length && scheduleDays.length) {
      tabBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          // Remove active class from all buttons and days
          tabBtns.forEach((b) => b.classList.remove("active"))
          scheduleDays.forEach((day) => day.classList.remove("active"))
  
          // Add active class to clicked button and corresponding day
          this.classList.add("active")
          const dayId = this.getAttribute("data-day")
          document.getElementById(dayId).classList.add("active")
        })
      })
    }
  
    // Countdown timer
    const countdownElement = document.getElementById("countdown")
  
    if (countdownElement) {
      // Set the event date
      const eventDate = new Date(window.eventStartDate).getTime();
  
      // Update the countdown every second
      const countdownTimer = setInterval(() => {
        // Get current date and time
        const now = new Date().getTime()
  
        // Calculate the time remaining
        const timeRemaining = eventDate - now
  
        // Calculate days, hours, minutes, and seconds
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000)
  
        // Display the countdown
        document.getElementById("countdown-days").textContent = days.toString().padStart(2, "0")
        document.getElementById("countdown-hours").textContent = hours.toString().padStart(2, "0")
        document.getElementById("countdown-minutes").textContent = minutes.toString().padStart(2, "0")
        document.getElementById("countdown-seconds").textContent = seconds.toString().padStart(2, "0")
  
        // If the countdown is over, display a message
        if (timeRemaining < 0) {
          clearInterval(countdownTimer)
          document.getElementById("countdown-days").textContent = "00"
          document.getElementById("countdown-hours").textContent = "00"
          document.getElementById("countdown-minutes").textContent = "00"
          document.getElementById("countdown-seconds").textContent = "00"
        }
      }, 1000)
    }
  
    // Play button for video
    const playButton = document.querySelector(".play-button")
  
    if (playButton) {
      playButton.addEventListener("click", () => {
        // In a real implementation, this would play the video
        alert("Video would play here in a real implementation.")
      })
    }
  
    // Newsletter form submission
    const newsletterForm = document.querySelector(".newsletter-form")
  
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", function (e) {
        e.preventDefault()
        const emailInput = this.querySelector('input[type="email"]')
  
        if (emailInput && emailInput.value) {
          // In a real implementation, this would submit the form to a server
          alert("Thank you for subscribing to our newsletter!")
          emailInput.value = ""
        }
      })
    }
  
    // // Smooth scrolling for anchor links
    // document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    //   anchor.addEventListener("click", function (e) {
    //     if (this.getAttribute("href") !== "#") {
    //       e.preventDefault()
  
    //       const targetId = this.getAttribute("href")
    //       const targetElement = document.querySelector(targetId)
  
    //       if (targetElement) {
    //         // Close mobile menu if open
    //         if (navLinks && navLinks.classList.contains("active")) {
    //           navLinks.classList.remove("active")
    //           navLinks.style.display = ""
    //         }
  
    //         // Scroll to target
    //         window.scrollTo({
    //           top: targetElement.offsetTop - 80, // Adjust for header height
    //           behavior: "smooth",
    //         })
    //       }
    //     }
    //   })
    // })
  
    // Animation on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".feature-item, .speaker-card, .workshop-card, .stat-card")
  
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (elementPosition < windowHeight - 100) {
          element.classList.add("fade-in")
        }
      })
    }
  
    // Run animation on load and scroll
    window.addEventListener("load", animateOnScroll)
    window.addEventListener("scroll", animateOnScroll)
  
    // // Resize handler for mobile menu
    // window.addEventListener("resize", () => {
    //   if (window.innerWidth >= 1024 && navLinks) {
    //     navLinks.style = ""
    //     navLinks.classList.remove("active")
    //   }
    // })
  })
  
  