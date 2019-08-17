import Color from "./modules/Color";

const hueInputs = document.querySelectorAll(".H-input");
const saturationInputs = document.querySelectorAll(".S-input");
const luminanceInputs = document.querySelectorAll(".L-input");
const redInputs = document.querySelectorAll(".R-input");
const greenInputs = document.querySelectorAll(".G-input");
const blueInputs = document.querySelectorAll(".B-input");
const alphaInputs = document.querySelectorAll(".A-input");
const H_number = document.querySelector(".H-number");
const S_number = document.querySelector(".S-number");
const L_number = document.querySelector(".L-number");
const R_number = document.querySelector(".R-number");
const G_number = document.querySelector(".G-number");
const B_number = document.querySelector(".B-number");
const A_number = document.querySelector(".A-number");
const H_slider = document.querySelector(".H-slider");
const S_slider = document.querySelector(".S-slider");
const L_slider = document.querySelector(".L-slider");
const R_slider = document.querySelector(".R-slider");
const G_slider = document.querySelector(".G-slider");
const B_slider = document.querySelector(".B-slider");
const A_slider = document.querySelector(".A-slider");
const color = new Color();
updateRGBA();
updateHSLA();
updateColorPreview(
  Color.RGBAtoHEX(
    Color.HSLAtoRGBA({ H: color.H, S: color.S, L: color.L, A: color.A })
  )
);
hueInputs.forEach(input => {
  input.addEventListener("input", () => {
    color.H = parseInt(input.value);
    color.rgba();
    updateRGBA();
    updateHSLA();
    updateColorPreview(color.hex);
  });
});
saturationInputs.forEach(input => {
  input.addEventListener("input", () => {
    color.S = parseInt(input.value);
    input.value = color.S.toString();
    color.rgba();
    updateRGBA();
    updateHSLA();
    updateColorPreview(color.hex);
  });
});
luminanceInputs.forEach(input => {
  input.addEventListener("input", () => {
    color.L = parseInt(input.value);
    input.value = color.L.toString();
    color.rgba();
    updateRGBA();
    updateHSLA();
    updateColorPreview(color.hex);
  });
});
redInputs.forEach(input => {
  input.addEventListener("input", () => {
    color.R = parseInt(input.value);
    input.value = color.R.toString();
    color.hsla();
    updateRGBA();
    updateHSLA();
    updateColorPreview(color.hex);
  });
});
greenInputs.forEach(input => {
  input.addEventListener("input", () => {
    color.G = parseInt(input.value);
    input.value = color.G.toString();
    color.hsla();
    updateRGBA();
    updateHSLA();
    updateColorPreview(color.hex);
  });
});
blueInputs.forEach(input => {
  input.addEventListener("input", () => {
    color.B = parseInt(input.value);
    input.value = color.B.toString();
    color.hsla();
    updateRGBA();
    updateHSLA();
    updateColorPreview(color.hex);
  });
});
alphaInputs.forEach(input => {
  input.addEventListener("input", () => {
    color.A = parseInt(input.value);
    input.value = color.A.toString();
    updateHSLA();
    updateColorPreview(color.hex);
  });
});
function updateRGBA() {
  R_number.value = color.R;
  R_slider.value = color.R;
  G_number.value = color.G;
  G_slider.value = color.G;
  B_number.value = color.B;
  B_slider.value = color.B;
  A_number.value = color.A;
  A_slider.value = color.A;
}
function updateHSLA() {
  H_number.value = color.H;
  H_slider.value = color.H;
  S_number.value = color.S;
  S_slider.value = color.S;
  L_number.value = color.L;
  L_slider.value = color.L;
  A_number.value = color.A;
  A_slider.value = color.A;
}
function updateColorPreview(hex) {
  document.body.style.backgroundColor = hex;
  document.documentElement.style.setProperty(
    "--bg",
    Color.RGBAtoHEX(
      Color.HSLAtoRGBA({
        H: 0,
        S: 0,
        L: color.L < 50 ? 90 : 10,
        A: 1
      })
    )
  );
  displayColorCombination("monochromatic", color.monochromatic());
  displayColorCombination("analogous", color.analogous());
  displayColorCombination("complementary", color.complementary());
  displayColorCombination("split-complementary", color.splitComplementary());
  displayColorCombination("triad", color.triad());
  displayColorCombination("double-complementary", color.doubleComplementary());
}
function displayColorCombination(name, combination) {
  const container = document.getElementById(name).querySelector(".colors");
  container.innerHTML = "";
  for (const [ key, value ] of Object.entries(combination)) {
    if (combination.hasOwnProperty(key)) {
      const div = document.createElement("div");
      div.className = name;
      div.style.backgroundColor = value.toString();
      container.appendChild(div);
    }
  }
}
