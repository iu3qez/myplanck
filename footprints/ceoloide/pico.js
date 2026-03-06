// Raspberry Pi Pico / Pico 2 / Pico W footprint for ergogen
// Adapted from AlexSutila/ergogen-footprints, updated to KiCad 8 format
//
// Params:
//   orientation: 'down' (default) = components face PCB, 'up' = components face away
//   castellated: false (default) = THT pads for pin headers
//                true = SMD pads at board edge for castellated mounting (lower profile)
//   side: 'F' (default) = layer for castellated SMD pads (ignored for THT)

module.exports = {
  params: {
    designator: 'U',
    orientation: 'down',
    castellated: false,
    side: 'F',
    GND:        { type: 'net', value: 'GND'      },
    VBUS:       { type: 'net', value: 'VBUS'     },
    VSYS:       { type: 'net', value: 'VSYS'     },
    EN_3V3:     { type: 'net', value: 'EN_3V3'   },
    OUT_3V3:    { type: 'net', value: 'OUT_3V3'  },
    ADC_VREF:   { type: 'net', value: 'ADC_VREF' },
    AGND:       { type: 'net', value: 'AGND'     },
    RUN:        { type: 'net', value: 'RUN'      },
    GP0:        { type: 'net', value: 'GP0'      },
    GP1:        { type: 'net', value: 'GP1'      },
    GP2:        { type: 'net', value: 'GP2'      },
    GP3:        { type: 'net', value: 'GP3'      },
    GP4:        { type: 'net', value: 'GP4'      },
    GP5:        { type: 'net', value: 'GP5'      },
    GP6:        { type: 'net', value: 'GP6'      },
    GP7:        { type: 'net', value: 'GP7'      },
    GP8:        { type: 'net', value: 'GP8'      },
    GP9:        { type: 'net', value: 'GP9'      },
    GP10:       { type: 'net', value: 'GP10'     },
    GP11:       { type: 'net', value: 'GP11'     },
    GP12:       { type: 'net', value: 'GP12'     },
    GP13:       { type: 'net', value: 'GP13'     },
    GP14:       { type: 'net', value: 'GP14'     },
    GP15:       { type: 'net', value: 'GP15'     },
    GP16:       { type: 'net', value: 'GP16'     },
    GP17:       { type: 'net', value: 'GP17'     },
    GP18:       { type: 'net', value: 'GP18'     },
    GP19:       { type: 'net', value: 'GP19'     },
    GP20:       { type: 'net', value: 'GP20'     },
    GP21:       { type: 'net', value: 'GP21'     },
    GP22:       { type: 'net', value: 'GP22'     },
    GP26:       { type: 'net', value: 'GP26'     },
    GP27:       { type: 'net', value: 'GP27'     },
    GP28:       { type: 'net', value: 'GP28'     },
  },
  body: p => {
    const standard = `
    (footprint "ceoloide:pico"
        (layer "F.Cu")
        ${p.at}
        (property "Reference" "${p.ref}"
            (at 0 0 ${p.r})
            (layer "F.SilkS")
            ${p.ref_hide}
            (effects (font (size 1 1) (thickness 0.15)))
        )

        ${''/* USB port overhang */}
        (fp_line (start 21.0 3.5) (end 26.8 3.5) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
        (fp_line (start 26.8 3.5) (end 26.8 -3.5) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
        (fp_line (start 26.8 -3.5) (end 21.0 -3.5) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
        (fp_line (start 21.0 -3.5) (end 21.0 3.5) (layer "F.SilkS") (stroke (width 0.15) (type solid)))

        ${''/* board outline 51x21mm */}
        (fp_line (start -25.5 10.5) (end 25.5 10.5) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
        (fp_line (start 25.5 10.5) (end 25.5 -10.5) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
        (fp_line (start 25.5 -10.5) (end -25.5 -10.5) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
        (fp_line (start -25.5 -10.5) (end -25.5 10.5) (layer "F.SilkS") (stroke (width 0.15) (type solid)))

        ${''/* courtyard */}
        (fp_line (start -26.0 11.0) (end 27.3 11.0) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
        (fp_line (start 27.3 11.0) (end 27.3 -11.0) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
        (fp_line (start 27.3 -11.0) (end -26.0 -11.0) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
        (fp_line (start -26.0 -11.0) (end -26.0 11.0) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))

        ${''/* fab outline */}
        (fp_line (start -25.5 10.5) (end 25.5 10.5) (layer "F.Fab") (stroke (width 0.1) (type solid)))
        (fp_line (start 25.5 10.5) (end 25.5 -10.5) (layer "F.Fab") (stroke (width 0.1) (type solid)))
        (fp_line (start 25.5 -10.5) (end -25.5 -10.5) (layer "F.Fab") (stroke (width 0.1) (type solid)))
        (fp_line (start -25.5 -10.5) (end -25.5 10.5) (layer "F.Fab") (stroke (width 0.1) (type solid)))
      `

    // Castellated SMD pads: at board edge (±10.5mm), 1.6mm x 0.8mm roundrect
    // THT pads: at pin header positions (±8.89mm), 1.75mm circle with 1.09mm drill
    const castellated = p.castellated
    const layer = p.side === 'B' ? 'B' : 'F'
    const cu = `${layer}.Cu`
    const mask = `${layer}.Mask`
    const paste = `${layer}.Paste`

    function pad(num, x, y_sign, y_abs, net) {
      if (castellated) {
        return `(pad "${num}" smd roundrect (at ${x} ${y_sign}10.5 ${p.r}) (size 1.6 0.8) (layers "${cu}" "${mask}" "${paste}") (roundrect_rratio 0.25) ${net})`
      } else {
        return `(pad "${num}" thru_hole circle (at ${x} ${y_sign}${y_abs} ${p.r}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask") ${net})`
      }
    }

    function pins(def_pos, def_neg) {
      return `
        ${''/* pin 1-20: GP side */}
        ${pad("1",  24.13, def_pos, 8.89, p.GP0)}
        ${pad("2",  21.59, def_pos, 8.89, p.GP1)}
        ${pad("3",  19.05, def_pos, 8.89, p.GND)}
        ${pad("4",  16.51, def_pos, 8.89, p.GP2)}
        ${pad("5",  13.97, def_pos, 8.89, p.GP3)}
        ${pad("6",  11.43, def_pos, 8.89, p.GP4)}
        ${pad("7",   8.89, def_pos, 8.89, p.GP5)}
        ${pad("8",   6.35, def_pos, 8.89, p.GND)}
        ${pad("9",   3.81, def_pos, 8.89, p.GP6)}
        ${pad("10",  1.27, def_pos, 8.89, p.GP7)}
        ${pad("11", -1.27, def_pos, 8.89, p.GP8)}
        ${pad("12", -3.81, def_pos, 8.89, p.GP9)}
        ${pad("13", -6.35, def_pos, 8.89, p.GND)}
        ${pad("14", -8.89, def_pos, 8.89, p.GP10)}
        ${pad("15",-11.43, def_pos, 8.89, p.GP11)}
        ${pad("16",-13.97, def_pos, 8.89, p.GP12)}
        ${pad("17",-16.51, def_pos, 8.89, p.GP13)}
        ${pad("18",-19.05, def_pos, 8.89, p.GND)}
        ${pad("19",-21.59, def_pos, 8.89, p.GP14)}
        ${pad("20",-24.13, def_pos, 8.89, p.GP15)}

        ${''/* pin 21-40: power/other side */}
        ${pad("40", 24.13, def_neg, 8.89, p.VBUS)}
        ${pad("39", 21.59, def_neg, 8.89, p.VSYS)}
        ${pad("38", 19.05, def_neg, 8.89, p.GND)}
        ${pad("37", 16.51, def_neg, 8.89, p.EN_3V3)}
        ${pad("36", 13.97, def_neg, 8.89, p.OUT_3V3)}
        ${pad("35", 11.43, def_neg, 8.89, p.ADC_VREF)}
        ${pad("34",  8.89, def_neg, 8.89, p.GP28)}
        ${pad("33",  6.35, def_neg, 8.89, p.GND)}
        ${pad("32",  3.81, def_neg, 8.89, p.GP27)}
        ${pad("31",  1.27, def_neg, 8.89, p.GP26)}
        ${pad("30", -1.27, def_neg, 8.89, p.RUN)}
        ${pad("29", -3.81, def_neg, 8.89, p.GP22)}
        ${pad("28", -6.35, def_neg, 8.89, p.GND)}
        ${pad("27", -8.89, def_neg, 8.89, p.GP21)}
        ${pad("26",-11.43, def_neg, 8.89, p.GP20)}
        ${pad("25",-13.97, def_neg, 8.89, p.GP19)}
        ${pad("24",-16.51, def_neg, 8.89, p.GP18)}
        ${pad("23",-19.05, def_neg, 8.89, p.GND)}
        ${pad("22",-21.59, def_neg, 8.89, p.GP17)}
        ${pad("21",-24.13, def_neg, 8.89, p.GP16)}
      `
    }

    if (p.orientation == 'down') {
      return `${standard}\n${pins('', '-')}\n    )`
    } else {
      return `${standard}\n${pins('-', '')}\n    )`
    }
  }
}
