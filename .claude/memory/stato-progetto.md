# Stato Progetto MyPlanck

## Componenti piazzati
| Ref | Componente | Footprint | Layer | Posizione |
|-----|-----------|-----------|-------|-----------|
| U1 | Pico 2 THT | Module:RaspberryPi_Pico_Common_THT | B.Cu | (330.89, -85.32) rot 180° |
| J1 | FPC ZIF 30pin | Connector_FFC-FPC:Hirose_FH12-30S-0.5SH_1x30-1MP_P0.50mm_Horizontal | F.Cu | (333, -19) |
| C1 | 1uF 0603 (charge pump C1P/C1N) | Capacitor_SMD:C_0603_1608Metric | F.Cu | (327.5, -24) |
| C2 | 1uF 0603 (charge pump C2P/C2N) | Capacitor_SMD:C_0603_1608Metric | F.Cu | (326, -24) |
| C3 | 4.7uF 0603 (VCOMH bypass) | Capacitor_SMD:C_0603_1608Metric | F.Cu | (340, -24) |
| C4 | 2.2uF 0603 (VBAT bypass) | Capacitor_SMD:C_0603_1608Metric | F.Cu | (329, -24) |
| C5 | 100nF 0402 (VDD decoupling) | Capacitor_SMD:C_0402_1005Metric | F.Cu | (330.5, -24) |
| C6 | 100nF 0402 (VCC decoupling) | Capacitor_SMD:C_0402_1005Metric | F.Cu | (341.5, -24) |
| R1 | 910k 0402 (IREF) | Resistor_SMD:R_0402_1005Metric | F.Cu | (339.5, -26) |
| R2 | 4.7k 0402 (I2C SDA pull-up) | Resistor_SMD:R_0402_1005Metric | F.Cu | (336.5, -26) |
| R3 | 4.7k 0402 (I2C SCL pull-up) | Resistor_SMD:R_0402_1005Metric | F.Cu | (334.5, -26) |
| J2 | USB-C power (HRO TYPE-C-31-M-12, C165948) | Connector_USB:USB_C_Receptacle_HRO_TYPE-C-31-M-12 | F.Cu | temp (280, -10) |
| R4 | 5.1k 0402 (CC1 pulldown) | Resistor_SMD:R_0402_1005Metric | F.Cu | temp (295, -10) |
| R5 | 5.1k 0402 (CC2 pulldown) | Resistor_SMD:R_0402_1005Metric | F.Cu | temp (295, -13) |
| D49 | B5819W Schottky (backfeed protection) | Diode_SMD:D_SOD-123 | F.Cu | temp (295, -16) |
| RE1 | Encoder EC11 | RotaryEncoder_Alps_EC11E-Switch_Vertical_H20mm | B.Cu | (318.69, -63.73) rot -90° |
| - | 48x switch Choc | ceoloide switch_choc_v1_v2 | - | griglia 4x12 |
| - | 48x LED SK6812mini-e | ceoloide led_sk6812mini-e | - | sotto switch |
| - | 48x diodo SOD123 | ceoloide diode_tht_sod123 | - | per matrice |

## OLED Circuit (bare panel, no breakout)
- Display: BuyDisplay ER-OLED013-1W, 1.3" 128x64, SSD1306, white
- Connection: 30-pin FPC 0.5mm pitch, top-contact ZIF
- Interface: I2C (BS0=BS1=BS2=GND), address 0x3C (D/C=GND)
- Built-in charge pump (no external boost needed)
- Panel thickness: 1.45mm (well below Choc keycap height ~3mm)

## FPC Pinout (ER-OLED013-1W, I2C mode)
```
Pin 1: NC          Pin 16: GND (R/W#)
Pin 2: OLED_C2P    Pin 17: GND (E/RD#)
Pin 3: OLED_C2N    Pin 18: I2C_SCL (D0)
Pin 4: OLED_C1P    Pin 19: I2C_SDA (D1)
Pin 5: OLED_C1N    Pin 20: I2C_SDA (D2)
Pin 6: OLED_VBAT   Pin 21-25: GND (D3-D7)
Pin 7: NC          Pin 26: OLED_IREF
Pin 8: GND (VSS)   Pin 27: OLED_VCOMH
Pin 9: VCC_3V3     Pin 28: OLED_VCC
Pin 10: GND (BS0)  Pin 29: GND (VLSS)
Pin 11: GND (BS1)  Pin 30: NC
Pin 12: GND (BS2)  MP: GND (shield)
Pin 13: GND (CS#)
Pin 14: OLED_RES
Pin 15: GND (D/C#)
```

## Pin Mapping Pico
```
COL0-COL11: GPIO0-GPIO11 (pin 1,2,4,5,6,7,9,10,11,12,14,15)
ROW0-ROW3:  GPIO12-GPIO15 (pin 16,17,19,20)
LED_DATA:   GPIO16 (pin 21)
ENC_A:      GPIO17 (pin 22)
ENC_B:      GPIO18 (pin 24)
ENC_SW:     GPIO19 (pin 25)
I2C_SDA:    GPIO20 (pin 26)
I2C_SCL:    GPIO21 (pin 27)
VBUS:       pin 40
VCC_3V3:    pin 36
GND:        pin 3,8,13,18,23,28,33,38
```

## Net Names (OLED-related, new)
```
OLED_C1P, OLED_C1N, OLED_C2P, OLED_C2N
OLED_VCOMH, OLED_VBAT, OLED_VCC, OLED_IREF, OLED_RES
VCC_3V3, I2C_SDA, I2C_SCL
```

## Design Rules
- Default: trace 0.25mm, clearance 0.2mm
- Power: trace 0.5mm, clearance 0.3mm

## Board
- Outline: 255x72mm main (220mm switches + 35mm estensione destra)
- Estensione USB-C: tab 11x10.5mm (x=332→343, y=-87→-97.5) sotto il lato destro
- Tutti gli angoli con raggio r=2, incluso raccordo concavo nell'angolo interno (332,-87)
- Zone GND rame su F.Cu e B.Cu (da riempire con tasto B in pcbnew)

## Circuito alimentazione LED 5V
- USB-C power (J2) → VCC (LED 5V rail) diretto
- Pico VBUS → D49 Schottky → VCC (protezione backfeed)
- J2 CC1/CC2 → R4/R5 5.1kΩ → GND (negoziazione USB-C)
- Budget: USB 2.0 = 500mA, esterno USB-C = fino a 3A

## TODO (in ordine)
1. ~~Rimuovere U2 (modulo breakout OLED)~~ FATTO
2. ~~Piazzare J1 (FPC ZIF) e passivi C1-C6, R1-R3~~ FATTO
3. ~~Aggiungere USB-C power (J2, R4, R5, D49)~~ FATTO
4. ~~Ricostruire outline con estensione USB-C e raggi~~ FATTO
5. Posizionare J2/R4/R5/D49 nel PCB (manuale in pcbnew)
6. Riempire zone in pcbnew (B)
4. Routing tracce (I2C, power, charge pump)
5. Run DRC
6. Aggiungere condensatori bypass LED (100nF ogni ~8 LED)
7. Creare schematico (.kicad_sch)
8. Considerare pulsante reset Pico

## Cose che funzionano
- Ergogen folder mode con footprint ceoloide
- MCP: open/save_project, find/move_component
- Script Python per inserimento footprint diretto nel PCB (S-expression)
- Edit diretto PCB per zone, net class, outline

## Cose che NON funzionano
- MCP: add_zone, add_net_class, get_board_2d_view, export_svg
- MCP: place_component (non trova footprint da librerie standard KiCad)
- MCP: find_component su ref cancellato FREEZA il server (richiede restart)
- MCP: add_net crea net in memoria ma non le salva nel file PCB
- Edit manuale footprint nel PCB (corruzione layer)
