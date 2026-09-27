document.addEventListener("DOMContentLoaded", () => {
  const configPromise = fetch("data/site.json")
    .then(r => r.json())
    .catch(() => ({ githubUrl: "https://github.com/teeeezal/ALVIA" }));

  configPromise.then(config => {
    document.querySelectorAll("[data-github]").forEach(link => {
      link.href = config.githubUrl;
    });
  });

  document.querySelectorAll("#speedSlider").forEach(slider => {
    const output = document.querySelector("#speedValue");
    const update = () => { if (output) output.value = `${slider.value}ms`; };
    slider.addEventListener("input", update);
    update();
  });
});

window.ALVIATools = {
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  },
  randomArray(count = 14) {
    return Array.from({ length: count }, () => Math.floor(Math.random() * 40) + 1);
  },
  createElement(tag, className, text = "") {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== "") el.textContent = text;
    return el;
  }
};
