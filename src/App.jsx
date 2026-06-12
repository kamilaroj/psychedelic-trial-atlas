@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Inter+Tight:wght@700;800;900&display=swap");

* {
  box-sizing: border-box;
}

html,
body,
#root {
  margin: 0;
  background: #f1f0ec;
  font-family: "Inter", sans-serif;
  color: #1d1d1f;
}

.site {
  width: 100%;
}

/* HERO */

.hero-section {
  height: 760px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 40px;
  position: relative;
}

.hero-inner {
  max-width: 980px;
  transform: translateY(-78px);
}

.title {
  font-family: "Inter Tight", sans-serif;
  font-size: 72px;
  font-weight: 900;
  letter-spacing: -0.07em;
  margin: 0;
}

.subtitle {
  margin-top: 30px;
  font-size: 18px;
  color: #61656f;
  line-height: 1.45;
}

/* JOURNEY */

.journey {
  position: absolute;
  bottom: 182px;
  left: 50%;
  transform: translateX(-50%);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  letter-spacing: 0.18em;
  font-weight: 700;
  color: rgba(29, 29, 31, 0.54);
}

.arrow {
  width: 34px;
  height: 34px;
  position: relative;
}

.arrow::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 0;
  width: 18px;
  height: 18px;
  margin-left: -9px;
  border-left: 2px solid rgba(29, 29, 31, 0.46);
  border-bottom: 2px solid rgba(29, 29, 31, 0.46);
  transform: rotate(-45deg);
  animation: move 1.5s infinite;
}

@keyframes move {
  0% {
    transform: translateY(-8px) rotate(-45deg);
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  70% {
    transform: translateY(6px) rotate(-45deg);
  }
  100% {
    transform: translateY(14px) rotate(-45deg);
    opacity: 0;
  }
}

/* SECTIONS */

.section {
  width: 100%;
  height: 796px;
  overflow: hidden;
}

.section iframe {
  width: 100%;
  height: 796px;
  border: none;
  display: block;
}
