# OLED Bare Panel Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the Adafruit SSD1306 breakout module (U2) with a bare 1.3" OLED panel connected via FPC ZIF connector, adding required passives directly on the PCB.

**Architecture:** Remove THT module footprint, place SMD FPC connector (Hirose FH12-30S-0.5SH) and ~9 passive components on F.Cu in the right extension area. Route I2C (SDA/SCL) from Pico, power from 3V3, and charge pump caps between FPC pins.

**Tech Stack:** KiCad 9.0 (pcbnew), KiCad MCP server, direct PCB S-expression editing for operations MCP can't handle.

---

### Task 1: Remove current OLED module (U2)

**Files:**
- Modify: `output/pcbs/p48v2.kicad_pcb`

**Step 1: Delete U2 via KiCad MCP**

Use `mcp__kicad__delete_component` with reference `U2`.

**Step 2: Save project**

Use `mcp__kicad__save_project`.

**Step 3: Verify removal**

Use `mcp__kicad__find_component` with reference `U2` — should return not found.

**Step 4: Commit**

```bash
git add output/pcbs/p48v2.kicad_pcb
git commit -m "Remove Adafruit SSD1306 module (U2) from PCB"
```

---

### Task 2: Add nets for OLED passive components

**Files:**
- Modify: `output/pcbs/p48v2.kicad_pcb`

**Step 1: Add new nets for internal OLED signals**

These nets are internal to the OLED circuit (between FPC connector and passives). Use `mcp__kicad__add_net` for each:

- `OLED_C1P` — charge pump cap 1 positive
- `OLED_C1N` — charge pump cap 1 negative
- `OLED_C2P` — charge pump cap 2 positive
- `OLED_C2N` — charge pump cap 2 negative
- `OLED_VCOMH` — VCOMH decoupling
- `OLED_VBAT` — VBAT supply
- `OLED_IREF` — current reference
- `OLED_RES` — reset line
- `VCC_3V3` — 3.3V supply (if not already existing)

Existing nets to reuse: `I2C_SDA` (118), `I2C_SCL` (119), `GND` (3), `VCC` (66).

**Step 2: Save project**

**Step 3: Commit**

```bash
git add output/pcbs/p48v2.kicad_pcb
git commit -m "Add OLED internal nets for FPC bare panel circuit"
```

---

### Task 3: Place FPC ZIF connector (J1)

**Files:**
- Modify: `output/pcbs/p48v2.kicad_pcb`

**Step 1: Place FPC connector via KiCad MCP**

Use `mcp__kicad__place_component`:
- Reference: `J1`
- Footprint: `Connector_FFC-FPC:Hirose_FH12-30S-0.5SH_1x30-1MP_P0.50mm_Horizontal`
- Position: approximately (333, -19) on F.Cu (where U2 was)
- Rotation: TBD based on FPC cable exit direction

**Step 2: Verify placement**

Use `mcp__kicad__get_component_properties` with reference `J1`.

**Step 3: Assign nets to J1 pads**

Map FPC connector pins to nets based on SSD1306 datasheet pinout. The exact pin-to-net mapping depends on the display's FPC pinout (consult ER-OLED013-1W datasheet). Key connections:

| J1 Pad | SSD1306 Signal | Net |
|--------|---------------|-----|
| Pin for D0 (SCL) | SCL | I2C_SCL (119) |
| Pin for D1 (SDA) | SDA | I2C_SDA (118) |
| Pin for D2 (SDA) | SDA | I2C_SDA (118) |
| Pin for VDD | Logic supply | VCC_3V3 |
| Pin for VSS | Ground | GND (3) |
| Pin for VBAT | Battery input | OLED_VBAT |
| Pin for C1P | Charge pump | OLED_C1P |
| Pin for C1N | Charge pump | OLED_C1N |
| Pin for C2P | Charge pump | OLED_C2P |
| Pin for C2N | Charge pump | OLED_C2N |
| Pin for VCOMH | COM voltage | OLED_VCOMH |
| Pin for IREF | Current ref | OLED_IREF |
| Pin for RES | Reset | OLED_RES |
| Pin for BS0 | Mode select | GND (3) |
| Pin for BS1 | Mode select | VCC_3V3 |
| Pin for BS2 | Mode select | GND (3) |
| Pin for CS | Chip select | GND (3) |
| Pin for D/C | I2C addr SA0 | GND (3) |

**NOTE:** Exact pin numbers require the ER-OLED013-1W datasheet. Download from BuyDisplay before implementing this task. The SSD1306 datasheet (Figure 14-1) shows the reference application circuit.

**Step 4: Save and commit**

```bash
git add output/pcbs/p48v2.kicad_pcb
git commit -m "Place FPC ZIF connector J1 (Hirose FH12-30S) for bare OLED panel"
```

---

### Task 4: Place passive components

**Files:**
- Modify: `output/pcbs/p48v2.kicad_pcb`

**Step 1: Place capacitors and resistors via KiCad MCP**

Place each component near J1 on F.Cu. Use `mcp__kicad__place_component` for each:

| Ref | Value | Footprint | Position (approx) |
|-----|-------|-----------|-------------------|
| C1 | 1uF | Capacitor_SMD:C_0603_1608Metric | Near C1P/C1N pads |
| C2 | 1uF | Capacitor_SMD:C_0603_1608Metric | Near C2P/C2N pads |
| C3 | 4.7uF | Capacitor_SMD:C_0603_1608Metric | Near VCOMH pad |
| C4 | 2.2uF | Capacitor_SMD:C_0603_1608Metric | Near VBAT pad |
| C5 | 100nF | Capacitor_SMD:C_0402_1005Metric | Near VDD pad |
| C6 | 100nF | Capacitor_SMD:C_0402_1005Metric | Near VCC pad |
| R1 | 910k | Resistor_SMD:R_0402_1005Metric | Near IREF pad |
| R2 | 4.7k | Resistor_SMD:R_0402_1005Metric | Near SDA line |
| R3 | 4.7k | Resistor_SMD:R_0402_1005Metric | Near SCL line |

**Step 2: Assign nets to passive component pads**

Each passive connects between two nets. Use Python script for bulk pad net assignment:

| Ref | Pad 1 Net | Pad 2 Net |
|-----|-----------|-----------|
| C1 | OLED_C1P | OLED_C1N |
| C2 | OLED_C2P | OLED_C2N |
| C3 | OLED_VCOMH | GND |
| C4 | OLED_VBAT | GND |
| C5 | VCC_3V3 | GND |
| C6 | VCC_3V3 | GND |
| R1 | OLED_IREF | GND |
| R2 | I2C_SDA | VCC_3V3 |
| R3 | I2C_SCL | VCC_3V3 |

**Step 3: Verify all components placed**

Use `mcp__kicad__find_component` for each ref.

**Step 4: Save and commit**

```bash
git add output/pcbs/p48v2.kicad_pcb
git commit -m "Place OLED passive components (C1-C6, R1-R3) on F.Cu"
```

---

### Task 5: Verify and adjust layout in pcbnew

**Files:**
- Modify: `output/pcbs/p48v2.kicad_pcb`

**Step 1: Open pcbnew**

```bash
LD_LIBRARY_PATH="/usr/lib/kicad-nightly/lib" nohup /usr/lib/kicad-nightly/bin/pcbnew /home/sf/src/myplanck/output/pcbs/p48v2.kicad_pcb &>/dev/null &
```

**Step 2: Visual verification (manual)**

In pcbnew, verify:
- J1 connector is correctly oriented (FPC cable exits toward board edge)
- Passives are clustered around J1 without overlapping
- No components overlap with existing switch footprints or GND zones
- The OLED panel footprint (34.5x23mm) would fit over the connector area

**Step 3: Adjust positions if needed**

Use `mcp__kicad__move_component` to fine-tune positions.

**Step 4: Refill GND zones**

Press B in pcbnew to refill copper zones after component changes.

**Step 5: Save and commit**

```bash
git add output/pcbs/p48v2.kicad_pcb
git commit -m "Adjust OLED component layout and refill zones"
```

---

### Task 6: Update project documentation

**Files:**
- Modify: `CLAUDE.md`

**Step 1: Update component table in CLAUDE.md**

Replace the U2 OLED entry with:
- J1: FPC ZIF connector (Hirose FH12-30S-0.5SH) on F.Cu
- C1-C6, R1-R3: OLED passives on F.Cu

**Step 2: Update memory files**

Update `stato-progetto.md` with new component list and changed positions.

**Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "Update docs: OLED changed from breakout module to bare FPC panel"
```

---

## Prerequisite: Download Datasheet

Before starting Task 3, download the ER-OLED013-1W datasheet from BuyDisplay to get the exact 30-pin FPC pinout. The pin mapping between the FPC connector pads and SSD1306 signals is critical — wrong mapping will damage the display.

## Known Risks

- **MCP place_component** may fail after multiple delete+re-place cycles. If it breaks, fall back to direct PCB S-expression editing.
- **FPC pinout** must be verified against the exact display panel purchased. SSD1306 panels from different manufacturers may have different pin orderings.
- **I2C pull-ups** (R2, R3): The Pico may already have internal pull-ups. Test without R2/R3 first; add them only if I2C is unreliable.
