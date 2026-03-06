// HRO TYPE-C-31-M-12 USB-C receptacle (USB 2.0 / PD, 12-pin)
// Converted from KiCad footprint: Connector_USB:USB_C_Receptacle_HRO_TYPE-C-31-M-12
// Datasheet: http://www.krhro.com/uploads/soft/180320/1-1P320120243.pdf
//
// Pin mapping (USB-C standard):
//   A1/B12 = GND, A4/B9 = VBUS, A5 = CC1, A6 = D+, A7 = D-, A8 = SBU1
//   A9/B4 = VBUS, A12/B1 = GND, B5 = CC2, B6 = D+, B7 = D-, B8 = SBU2
//   S1 = Shield (4 THT pads)
//
// Note: A1/B12, A4/B9, A9/B4, A12/B1 overlap physically (same pad position)

module.exports = {
  params: {
    designator: 'J',
    side: 'F',
    VBUS: { type: 'net', value: 'VBUS' },
    GND:  { type: 'net', value: 'GND' },
    CC1:  { type: 'net', value: 'CC1' },
    CC2:  { type: 'net', value: 'CC2' },
    DP:   { type: 'net', value: 'USB_DP' },
    DN:   { type: 'net', value: 'USB_DN' },
    SBU1: { type: 'net', value: '' },
    SBU2: { type: 'net', value: '' },
    SHIELD: { type: 'net', value: 'GND' },
  },
  body: p => {
    const layer = p.side === 'B' ? 'B' : 'F'
    const silk = `${layer}.SilkS`
    const fab = `${layer}.Fab`
    const crtyd = `${layer}.CrtYd`
    const cu = `${layer}.Cu`
    const paste = `${layer}.Paste`
    const mask = `${layer}.Mask`

    return `
    (footprint "ceoloide:usb_c_hro_type_c_31_m_12"
        (layer "${cu}")
        ${p.at}
        (property "Reference" "${p.ref}"
            (at 0 -5.6 ${p.r})
            (layer "${silk}")
            ${p.ref_hide}
            (effects (font (size 1 1) (thickness 0.15)))
        )

        ${''}${/* Silkscreen */''}
        (fp_line (start -4.7 -1.9) (end -4.7 0.1) (layer "${silk}") (stroke (width 0.12) (type solid)))
        (fp_line (start 4.7 -1.9) (end 4.7 0.1) (layer "${silk}") (stroke (width 0.12) (type solid)))

        ${''}${/* Courtyard */''}
        (fp_line (start -5.32 -5.27) (end -5.32 4.15) (layer "${crtyd}") (stroke (width 0.05) (type solid)))
        (fp_line (start -5.32 -5.27) (end 5.32 -5.27) (layer "${crtyd}") (stroke (width 0.05) (type solid)))
        (fp_line (start -5.32 4.15) (end 5.32 4.15) (layer "${crtyd}") (stroke (width 0.05) (type solid)))
        (fp_line (start 5.32 -5.27) (end 5.32 4.15) (layer "${crtyd}") (stroke (width 0.05) (type solid)))

        ${''}${/* Fab outline */''}
        (fp_line (start -4.47 -3.65) (end -4.47 3.65) (layer "${fab}") (stroke (width 0.1) (type solid)))
        (fp_line (start -4.47 -3.65) (end 4.47 -3.65) (layer "${fab}") (stroke (width 0.1) (type solid)))
        (fp_line (start -4.47 3.65) (end 4.47 3.65) (layer "${fab}") (stroke (width 0.1) (type solid)))
        (fp_line (start 4.47 -3.65) (end 4.47 3.65) (layer "${fab}") (stroke (width 0.1) (type solid)))

        ${''}${/* Alignment holes (non-plated) */''}
        (pad "" np_thru_hole circle (at -2.89 -2.6) (size 0.65 0.65) (drill 0.65) (layers "*.Cu" "*.Mask"))
        (pad "" np_thru_hole circle (at 2.89 -2.6) (size 0.65 0.65) (drill 0.65) (layers "*.Cu" "*.Mask"))

        ${''}${/* A-side pads (active: A1=GND, A4=VBUS, A5=CC1, A6=D+, A7=D-, A8=SBU1, A9=VBUS, A12=GND) */''}
        (pad "A1" smd rect (at -3.25 -4.045) (size 0.6 1.45) (layers "${cu}" "${paste}" "${mask}") ${p.GND})
        (pad "A4" smd rect (at -2.45 -4.045) (size 0.6 1.45) (layers "${cu}" "${paste}" "${mask}") ${p.VBUS})
        (pad "A5" smd rect (at -1.25 -4.045) (size 0.3 1.45) (layers "${cu}" "${paste}" "${mask}") ${p.CC1})
        (pad "A6" smd rect (at -0.25 -4.045) (size 0.3 1.45) (layers "${cu}" "${paste}" "${mask}") ${p.DP})
        (pad "A7" smd rect (at 0.25 -4.045) (size 0.3 1.45) (layers "${cu}" "${paste}" "${mask}") ${p.DN})
        (pad "A8" smd rect (at 1.25 -4.045) (size 0.3 1.45) (layers "${cu}" "${paste}" "${mask}") ${p.SBU1})
        (pad "A9" smd rect (at 2.45 -4.045) (size 0.6 1.45) (layers "${cu}" "${paste}" "${mask}") ${p.VBUS})
        (pad "A12" smd rect (at 3.25 -4.045) (size 0.6 1.45) (layers "${cu}" "${paste}" "${mask}") ${p.GND})

        ${''}${/* B-side pads (active: B1=GND, B4=VBUS, B5=CC2, B6=D+, B7=D-, B8=SBU2, B9=VBUS, B12=GND) */''}
        (pad "B1" smd rect (at 3.25 -4.045) (size 0.6 1.45) (layers "${cu}" "${paste}" "${mask}") ${p.GND})
        (pad "B4" smd rect (at 2.45 -4.045) (size 0.6 1.45) (layers "${cu}" "${paste}" "${mask}") ${p.VBUS})
        (pad "B5" smd rect (at 1.75 -4.045) (size 0.3 1.45) (layers "${cu}" "${paste}" "${mask}") ${p.CC2})
        (pad "B6" smd rect (at 0.75 -4.045) (size 0.3 1.45) (layers "${cu}" "${paste}" "${mask}") ${p.DP})
        (pad "B7" smd rect (at -0.75 -4.045) (size 0.3 1.45) (layers "${cu}" "${paste}" "${mask}") ${p.DN})
        (pad "B8" smd rect (at -1.75 -4.045) (size 0.3 1.45) (layers "${cu}" "${paste}" "${mask}") ${p.SBU2})
        (pad "B9" smd rect (at -2.45 -4.045) (size 0.6 1.45) (layers "${cu}" "${paste}" "${mask}") ${p.VBUS})
        (pad "B12" smd rect (at -3.25 -4.045) (size 0.6 1.45) (layers "${cu}" "${paste}" "${mask}") ${p.GND})

        ${''}${/* Shield pads (THT oval) */''}
        (pad "S1" thru_hole oval (at -4.32 -3.13) (size 1 2.1) (drill oval 0.6 1.7) (layers "*.Cu" "*.Mask") ${p.SHIELD})
        (pad "S1" thru_hole oval (at -4.32 1.05) (size 1 1.6) (drill oval 0.6 1.2) (layers "*.Cu" "*.Mask") ${p.SHIELD})
        (pad "S1" thru_hole oval (at 4.32 -3.13) (size 1 2.1) (drill oval 0.6 1.7) (layers "*.Cu" "*.Mask") ${p.SHIELD})
        (pad "S1" thru_hole oval (at 4.32 1.05) (size 1 1.6) (drill oval 0.6 1.2) (layers "*.Cu" "*.Mask") ${p.SHIELD})
    )
  `
  }
}
