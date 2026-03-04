// M2 mounting hole with plated pad + via ring (2.2mm drill, 4.4mm pad)
// From ImStuBTW/revxl, updated to KiCad 8 format

module.exports = {
  params: {
    designator: 'H',
    net: { type: 'net', value: 'GND' },
  },
  body: p => `
    (footprint "ceoloide:mountingholem2"
        (layer "F.Cu")
        ${p.at}
        (property "Reference" "${p.ref}"
            (at 0 -3.2 ${p.r})
            (layer "F.SilkS")
            ${p.ref_hide}
            (effects (font (size 1 1) (thickness 0.15)))
        )
        (fp_circle (center 0 0) (end 2.45 0) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
        (pad "1" thru_hole circle (at 0 0) (size 4.4 4.4) (drill 2.2) (layers "*.Cu" "*.Mask") ${p.net.str})
        (pad "1" thru_hole circle (at 1.65 0) (size 0.7 0.7) (drill 0.4) (layers "*.Cu" "*.Mask") ${p.net.str})
        (pad "1" thru_hole circle (at -1.65 0) (size 0.7 0.7) (drill 0.4) (layers "*.Cu" "*.Mask") ${p.net.str})
        (pad "1" thru_hole circle (at 0 1.65) (size 0.7 0.7) (drill 0.4) (layers "*.Cu" "*.Mask") ${p.net.str})
        (pad "1" thru_hole circle (at 0 -1.65) (size 0.7 0.7) (drill 0.4) (layers "*.Cu" "*.Mask") ${p.net.str})
        (pad "1" thru_hole circle (at 1.166726 1.166726) (size 0.7 0.7) (drill 0.4) (layers "*.Cu" "*.Mask") ${p.net.str})
        (pad "1" thru_hole circle (at 1.166726 -1.166726) (size 0.7 0.7) (drill 0.4) (layers "*.Cu" "*.Mask") ${p.net.str})
        (pad "1" thru_hole circle (at -1.166726 1.166726) (size 0.7 0.7) (drill 0.4) (layers "*.Cu" "*.Mask") ${p.net.str})
        (pad "1" thru_hole circle (at -1.166726 -1.166726) (size 0.7 0.7) (drill 0.4) (layers "*.Cu" "*.Mask") ${p.net.str})
    )
  `
}
