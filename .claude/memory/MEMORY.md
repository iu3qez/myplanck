# MyPlanck - Tastiera Planck 4x12 Custom

## Progetto
Tastiera meccanica Planck 4x12 con Raspberry Pi Pico 2, OLED 1.3" SSD1306, encoder rotativo EC11.
PCB generato con **ergogen** (folder mode, footprint ceoloide), editato in **KiCad 9.0**.

## File principali
- `config.yaml` - configurazione ergogen (matrice 4x12, diodi, outline 255x72mm)
- `output/pcbs/p48v2.kicad_pcb` - PCB principale
- `output/pcbs/p48v2.kicad_pro` - progetto KiCad
- `footprints/ceoloide/` - switch_choc_v1_v2.js, led_sk6812mini-e.js, diode_tht_sod123.js
- `thoughts/shared/handoffs/` - handoff dettagliati sessioni precedenti

## Stato attuale (13 Feb 2026)
Vedi [stato-progetto.md](stato-progetto.md) per dettagli completi.

**Completato:** ergogen config, outline 255x72mm, piazzamento Pico THT + OLED + encoder, net assegnate (Pico 32 pad, encoder 6 pad), zone GND F.Cu/B.Cu, design rules.

**Da fare:** net OLED, fill zone, routing, DRC, bypass caps, schematico, reset button.

## Decisioni architetturali
- Matrice 4x12 con diodi (16 GPIO) invece di direct-pin (48 GPIO)
- Pico THT (non SMD) su B.Cu - robustezza meccanica
- OLED su F.Cu ruotato 180°, encoder su B.Cu ruotato -90°
- Estensione 35mm a destra per Pico/OLED/encoder
- LED VCC da VBUS 5V diretto
- Zone GND rame su entrambi i layer

## Pin mapping
Vedi [stato-progetto.md](stato-progetto.md) per mapping completo.

## Blocker noti
- KiCad MCP: `add_zone`, `add_net_class`, `get_board_2d_view` non funzionano
- Non editare PCB manualmente per footprint (corruzione layer)
- MCP `place_component` si rompe dopo cicli delete+re-place
- **MCP `find_component` su footprint cancellata FREEZA l'MCP server** — non cercare mai un componente appena cancellato, serve restart MCP (`/mcp` per riconnettere)
