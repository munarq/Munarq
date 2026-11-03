import { describe, it, expect } from "vitest";
import {
  calculateStructuralDeflection,
  MATERIALS,
  type MaterialKey,
} from "../structuralCalc";

describe("ResearchLab: Structural & Embodied Carbon Calculations", () => {
  const materials: MaterialKey[] = ["concrete", "steel", "timber", "stone"];

  materials.forEach((mat) => {
    describe(`Material: ${MATERIALS[mat].label} (${mat})`, () => {
      it(`calculates correct section height, deflection and CO2 for span = 4m`, () => {
        const span = 4;
        const load = 5; // kN/m²
        const res = calculateStructuralDeflection(span, load, mat);

        // h = span / 18
        expect(res.h).toBeCloseTo(4 / 18, 5);

        // Volume = 0.3 * h * span
        const expectedVol = 0.3 * (4 / 18) * 4;
        expect(res.volume).toBeCloseTo(expectedVol, 5);

        // Embodied CO2 = volume * co2PerM3
        expect(res.co2).toBeCloseTo(expectedVol * MATERIALS[mat].co2, 3);

        // Deflection should be positive and structurally coherent
        expect(res.deltaMm).toBeGreaterThan(0);
      });

      it(`calculates correct section height, deflection and CO2 for span = 16m`, () => {
        const span = 16;
        const load = 10; // kN/m²
        const res = calculateStructuralDeflection(span, load, mat);

        expect(res.h).toBeCloseTo(16 / 18, 5);

        const expectedVol = 0.3 * (16 / 18) * 16;
        expect(res.volume).toBeCloseTo(expectedVol, 5);
        expect(res.co2).toBeCloseTo(expectedVol * MATERIALS[mat].co2, 3);

        expect(res.deltaMm).toBeGreaterThan(0);
      });
    });
  });

  it("verifies relative stiffness: steel deflects less than timber for identical span and load", () => {
    const span = 8;
    const load = 6;
    const steelRes = calculateStructuralDeflection(span, load, "steel");
    const timberRes = calculateStructuralDeflection(span, load, "timber");

    // E_steel (210 GPa) is much greater than E_timber (12 GPa)
    expect(steelRes.deltaMm).toBeLessThan(timberRes.deltaMm);
  });

  it("verifies embodied carbon hierarchy: timber has lower embodied carbon than concrete and steel", () => {
    const span = 8;
    const load = 6;
    const timberRes = calculateStructuralDeflection(span, load, "timber");
    const concreteRes = calculateStructuralDeflection(span, load, "concrete");
    const steelRes = calculateStructuralDeflection(span, load, "steel");

    expect(timberRes.co2).toBeLessThan(concreteRes.co2);
    expect(concreteRes.co2).toBeLessThan(steelRes.co2);
  });
});
