export default class Color {
  _H: number = 220;
  _S: number = 85;
  _L: number = 85;

  _R: number = 184;
  _G: number = 206;
  _B: number = 249;

  _A: number = 1;

  _hex: string = "#000000";

  //SECTION GETTERS
  get H(): number {
    return this._H;
  }

  get S(): number {
    return this._S;
  }

  get L(): number {
    return this._L;
  }

  get R(): number {
    return this._R;
  }

  get G(): number {
    return this._G;
  }

  get B(): number {
    return this._B;
  }

  get A(): number {
    return this._A;
  }

  get hex(): string {
    this._hex = Color.RGBAtoHEX({ R: this.R, G: this.G, B: this.B, A: this.A });
    return this._hex;
  }
  //!SECTION GETTERS

  //SECTION SETTERS
  set H(value: number) {
    this._H = value;
  }

  set S(value: number) {
    this._S = value;
  }

  set L(value: number) {
    this._L = value;
  }

  set R(value: number) {
    this._R = value;
  }

  set G(value: number) {
    this._G = value;
  }

  set B(value: number) {
    this._B = value;
  }

  set A(value: number) {
    this._A = value;
  }

  set hex(color) {
    this.hex = color;
  }
  //!SECTION SETTERS

  hsla() {
    const { H, S, L, A } = Color.RGBAtoHSLA({
      R: this.R,
      G: this.G,
      B: this.B,
      A: this.A
    });

    this.H = H;
    this.S = S;
    this.L = L;
    this.A = A;

    return { H, S, L, A };
  }

  rgba() {
    const { R, G, B, A } = Color.HSLAtoRGBA({
      H: this.H,
      S: this.S,
      L: this.L,
      A: this.A
    });

    this.R = R;
    this.G = G;
    this.B = B;
    this.A = A;

    return { R, G, B, A };
  }

  complementary() {
    const complementaryHue = (this.H + 180) % 360;

    const complementary = Color.RGBAtoHEX(
      Color.HSLAtoRGBA({ H: complementaryHue, S: this.S, L: this.L, A: this.A })
    );

    return { complementary: complementary };
  }

  splitComplementary() {
    const complementaryHue = (this.H + 180) % 360;
    const split1 = (complementaryHue + 30) % 360;
    const split2 = (complementaryHue - 30) % 360;

    const s1 = Color.RGBAtoHEX(
      Color.HSLAtoRGBA({ H: split1, S: this.S, L: this.L, A: this.A })
    );

    const s2 = Color.RGBAtoHEX(
      Color.HSLAtoRGBA({ H: split2, S: this.S, L: this.L, A: this.A })
    );

    return { "complementary-1": s1, "complementary-2": s2 };
  }

  doubleComplementary() {
    const complementaryHue = (this.H + 180) % 360;
    const adjacentHue = (this.H + 30) % 360;
    const adjacentComplementaryHue = (adjacentHue + 180) % 360;

    const adjacent = Color.RGBAtoHEX(
      Color.HSLAtoRGBA({ H: adjacentHue, S: this.S, L: this.L, A: this.A })
    );

    const complementary = Color.RGBAtoHEX(
      Color.HSLAtoRGBA({ H: complementaryHue, S: this.S, L: this.L, A: this.A })
    );

    const adjacentComplementary = Color.RGBAtoHEX(
      Color.HSLAtoRGBA({
        H: adjacentComplementaryHue,
        S: this.S,
        L: this.L,
        A: this.A
      })
    );

    return {
      adjacent: adjacent,
      complementary: complementary,
      adjacentComplementary: adjacentComplementary
    };
  }

  triad() {
    const triad1 = (this.H + 120) % 360;
    const triad2 = (this.H - 120) % 360;

    const t1 = Color.RGBAtoHEX(
      Color.HSLAtoRGBA({ H: triad1, S: this.S, L: this.L, A: this.A })
    );
    const t2 = Color.RGBAtoHEX(
      Color.HSLAtoRGBA({ H: triad2, S: this.S, L: this.L, A: this.A })
    );

    return { "triad-1": t1, "triad-2": t2 };
  }

  monochromatic() {
    const mono = [];
    for (let l = 0; l < 100; l += 5) {
      mono.push(
        Color.RGBAtoHEX(
          Color.HSLAtoRGBA({ H: this.H, S: this.S, L: l, A: this.A })
        )
      );
    }

    return mono;
  }

  analogous() {
    const analogous = [];
    for (let i = 1; i <= 5; i++) {
      const h = (this.H + i * 15) % 360;
      console.log("h:", h);
      analogous.push(
        Color.RGBAtoHEX(
          Color.HSLAtoRGBA({ H: h, S: this.S, L: this.L, A: this.A })
        )
      );
    }

    console.log("mono:", analogous);
    return analogous;
  }

  static RGBAtoHEX({ R, G, B, A = 100 }) {
    let HEXR =
      R.toString(16).length === 2 ? R.toString(16) : "0" + R.toString(16);
    let HEXG =
      G.toString(16).length === 2 ? G.toString(16) : "0" + G.toString(16);
    let HEXB =
      B.toString(16).length === 2 ? B.toString(16) : "0" + B.toString(16);

    return `#${HEXR}${HEXG}${HEXB}`;
  }

  static HEXtoRGBA(hex: string) {
    const rbgvalues = hex
      .replace("#", "")
      .split(/(\w{2})/)
      .filter(el => el.length !== 0);

    const [ R, G, B, A ] = rbgvalues.map(value => parseInt(value, 16));

    return { R, G, B, A };
  }

  //https://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
  static HSLAtoRGBA({ H, S, L, A = 1 }) {
    let R = 0;
    let G = 0;
    let B = 0;

    let temp1 = 0;
    let temp2 = 0;

    let tempR = 0;
    let tempG = 0;
    let tempB = 0;

    L = L / 100;
    S = S / 100;

    if (S === 0) {
      const value = Math.round(L * 255);

      R = value;
      G = value;
      B = value;

      return { R, G, B, A };
    } else {
      if (L < 0.5) {
        temp1 = L * (1.0 + S);
      } else {
        temp1 = L + S - L * S;
      }

      temp2 = 2 * L - temp1;

      H = H / 360;

      tempR = H + 0.333 > 1 ? H + 0.333 - 1 : H + 0.333;
      tempG = H;
      tempB = H - 0.333 < 0 ? H - 0.333 + 1 : H - 0.333;

      const getColorValue = (tc: number, t1: number, t2: number) => {
        if (6 * tc < 1) {
          return t2 + (t1 - t2) * 6 * tc;
        } else if (2 * tc < 1) {
          return t1;
        } else if (3 * tc < 2) {
          return t2 + (t1 - t2) * (0.666 - tc) * 6;
        } else {
          return t2;
        }
      };

      R = getColorValue(tempR, temp1, temp2);
      R = Math.round(R * 255);
      G = getColorValue(tempG, temp1, temp2);
      G = Math.round(G * 255);
      B = getColorValue(tempB, temp1, temp2);
      B = Math.round(B * 255);

      return { R, G, B, A };
    }
  }

  static RGBAtoHSLA({ R, G, B, A = 100 }) {
    let H, S, L;

    R = R / 255;
    G = G / 255;
    B = B / 255;

    const min = Math.min(R, G, B);
    const max = Math.max(R, G, B);

    L = (min + max) / 2;
    console.log("L:", L);

    S =
      min == max
        ? 0
        : L < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
    console.log("S:", S);

    H =
      max == R
        ? (G - B) / (max - min) * 60
        : max == G
          ? 2.0 + (B - R) / (max - min) * 60
          : 4.0 + (R - G) / (max - min) * 60;

    H = H < 0 ? H + 360 : H;
    console.log("H:", H);

    H = Math.round(H);
    S = Math.round(S * 100);
    L = Math.round(L * 100);

    return { H, S, L, A };
  }
}
