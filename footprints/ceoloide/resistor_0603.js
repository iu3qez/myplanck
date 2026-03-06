// SMD 0603 (1608 Metric) resistor - HandSolder pads
// Converted from KiCad: R_0603_1608Metric_Pad0.98x0.95mm_HandSolder

module.exports = {
  params: {
    designator: 'R',
    side: 'F',
    from: { type: 'net', value: '' },
    to:   { type: 'net', value: '' },
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
    (footprint "ceoloide:resistor_0603"
        (layer "${cu}")
        ${p.at}
        (property "Reference" "${p.ref}"
            (at 0 -1.43 ${p.r})
            (layer "${silk}")
            ${p.ref_hide}
            (effects (font (size 1 1) (thickness 0.15)))
        )

        ${''}${/* Silkscreen */''}
        (fp_line (start -0.255 -0.5225) (end 0.255 -0.5225) (layer "${silk}") (stroke (width 0.12) (type solid)))
        (fp_line (start -0.255 0.5225) (end 0.255 0.5225) (layer "${silk}") (stroke (width 0.12) (type solid)))

        ${''}${/* Courtyard */''}
        (fp_line (start -1.65 -0.73) (end -1.65 0.73) (layer "${crtyd}") (stroke (width 0.05) (type solid)))
        (fp_line (start -1.65 -0.73) (end 1.65 -0.73) (layer "${crtyd}") (stroke (width 0.05) (type solid)))
        (fp_line (start -1.65 0.73) (end 1.65 0.73) (layer "${crtyd}") (stroke (width 0.05) (type solid)))
        (fp_line (start 1.65 -0.73) (end 1.65 0.73) (layer "${crtyd}") (stroke (width 0.05) (type solid)))

        ${''}${/* Fab outline */''}
        (fp_line (start -0.8 -0.4125) (end -0.8 0.4125) (layer "${fab}") (stroke (width 0.1) (type solid)))
        (fp_line (start -0.8 -0.4125) (end 0.8 -0.4125) (layer "${fab}") (stroke (width 0.1) (type solid)))
        (fp_line (start -0.8 0.4125) (end 0.8 0.4125) (layer "${fab}") (stroke (width 0.1) (type solid)))
        (fp_line (start 0.8 -0.4125) (end 0.8 0.4125) (layer "${fab}") (stroke (width 0.1) (type solid)))

        ${''}${/* Pads - HandSolder size */''}
        (pad "1" smd roundrect (at -0.9125 0) (size 0.975 0.95) (layers "${cu}" "${mask}" "${paste}") (roundrect_rratio 0.25) ${p.from})
        (pad "2" smd roundrect (at 0.9125 0) (size 0.975 0.95) (layers "${cu}" "${mask}" "${paste}") (roundrect_rratio 0.25) ${p.to})
    )
  `
  }
}
