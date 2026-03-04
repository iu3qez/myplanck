// Simple M2 NPTH hole (2.1mm drill, no pad)
// From ImStuBTW/revxl, updated to KiCad 8 format

module.exports = {
  params: {
    designator: 'H',
  },
  body: p => `
    (footprint "ceoloide:holem2"
        (layer "F.Cu")
        ${p.at}
        (property "Reference" "${p.ref}"
            (at 0 -3.2 ${p.r})
            (layer "F.SilkS")
            ${p.ref_hide}
            (effects (font (size 1 1) (thickness 0.15)))
        )
        (fp_circle (center 0 0) (end 1.3 0) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
        (pad "" np_thru_hole circle (at 0 0) (size 2.1 2.1) (drill 2.1) (layers "*.Cu" "*.Mask"))
    )
  `
}
