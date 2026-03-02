---
name: ergogen-regen
description: Safely regenerate PCB from ergogen config with backup and impact warning. Use when user wants to regenerate the PCB from config.yaml.
disable-model-invocation: true
---

Safely regenerate the PCB from config.yaml.

**WARNING**: This destroys ALL manual KiCad edits (net assignments, component placement for U1/U2/RE1, zones, routing).

## Current State
- Modified files: !`git status --short`
- PCB exists: !`ls -la output/pcbs/p48v2.kicad_pcb 2>/dev/null | tail -1`

## Steps

1. **Show impact** — List what manual edits exist in `output/pcbs/p48v2.kicad_pcb` that will be lost:
   - Component placements (U1 Pico, U2 OLED, RE1 encoder)
   - Net assignments (Pico 32 pads, encoder 6 pads, OLED pads)
   - GND copper zones (F.Cu + B.Cu)
   - Design rules and net classes
   - Any routing/traces

2. **Backup** — Create timestamped backup:
   ```bash
   cp output/pcbs/p48v2.kicad_pcb "output/pcbs/p48v2.kicad_pcb.bak.$(date +%Y%m%d_%H%M%S)"
   ```

3. **Confirm** — Ask the user for explicit confirmation before proceeding. Do NOT proceed without it.

4. **Regenerate** — Run:
   ```bash
   npx ergogen . -o output --clean
   ```

5. **Report** — Show what was regenerated and remind user that:
   - Manual component placement must be redone (Pico, OLED, encoder)
   - Net assignments must be redone (use Python bulk script or KiCad MCP)
   - Zones must be re-added and filled (press B in pcbnew)
   - Routing must be redone
