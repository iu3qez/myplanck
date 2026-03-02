# OLED Bare Panel Integration Design

## Problem
The Adafruit SSD1306 1.3" breakout module (U2) has a ~35x35mm support PCB that protrudes ~8-10mm above the main PCB. With Choc low-profile keycaps at ~3mm, this interferes with the user's hand.

## Solution
Replace the breakout module with a bare 1.3" SSD1306 OLED panel (BuyDisplay ER-OLED013-1W) connected via FPC. The bare panel is only 1.45mm thick — well below keycap height.

## Display Specs
- BuyDisplay ER-OLED013-1W, 1.3" 128x64, SSD1306, white
- Outline: 34.5 x 23 x 1.45mm
- FPC: 30 pin, 0.5mm pitch, ZIF top-contact
- I2C address: 0x3C (D/C pin to GND)
- Built-in charge pump (no external boost converter needed)
- Price: $4.73

## Components to Add

| Ref | Component | Value/Part | Footprint | Purpose |
|-----|-----------|------------|-----------|---------|
| J1 | FPC ZIF connector | 30pin 0.5mm top-contact | Connector_FFC_FPC:* | Panel connection |
| C1, C2 | Capacitor | 1uF 0402/0603 | SMD | Charge pump (C1P/C1N, C2P/C2N) |
| C3 | Capacitor | 4.7uF 0603 | SMD | VCOMH bypass |
| C4 | Capacitor | 2.2uF 0603 | SMD | VBAT bypass |
| C5, C6 | Capacitor | 100nF 0402 | SMD | VDD/VCC decoupling |
| R1 | Resistor | 910kOhm 0402 | SMD | IREF current reference |
| R2, R3 | Resistor | 4.7kOhm 0402 | SMD | I2C pull-ups (SDA, SCL) |

## FPC Pin Connections (I2C Mode)

| FPC Pin | Signal | Connect To |
|---------|--------|------------|
| BS0 | Mode | GND |
| BS1 | Mode | VDD (3.3V) |
| BS2 | Mode | GND |
| CS | Chip select | GND |
| D/C (SA0) | I2C address | GND (0x3C) |
| D0 | SCL | GPIO21 (I2C_SCL, net 119) |
| D1+D2 | SDA | GPIO20 (I2C_SDA, net 118), tied together |
| RES | Reset | VDD via RC or direct |
| IREF | Ref current | R1 910k to GND |
| VDD | Logic supply | 3V3 Pico (pin 36) |
| VBAT | Internal reg | 3.3V + C4 2.2uF |
| C1P/C1N | Charge pump | C1 1uF between them |
| C2P/C2N | Charge pump | C2 1uF between them |
| VCOMH | COM voltage | C3 4.7uF to GND |
| VSS | Ground | GND |

## PCB Changes
1. Remove U2 (Adafruit SSD1306 module footprint)
2. Place J1 (FPC connector) on F.Cu in the right extension area
3. Place passives (C1-C6, R1-R3) grouped around J1
4. Route I2C_SDA (net 118) and I2C_SCL (net 119) from Pico to J1
5. Route VDD, GND, and charge pump traces

## Positioning
- FPC connector on F.Cu, right extension area (where U2 was)
- Passives clustered around connector (~20x8mm area)
- OLED panel inserts into ZIF and lays flat on PCB surface (1.45mm protrusion)
