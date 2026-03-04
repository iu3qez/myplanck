// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: CC-BY-NC-SA-4.0
//
// To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
//
// Authors: @ergogen + (@infused-kim, @ceoloide, @achamian, @im-AMS improvements)
//
// Description:
//  Combined Thru-Hole and SMD diode footprint for SOD-123 package, like the Semtech 1N4148W
//  component sold by Typeractive.xyz or LCSC.
//
//  Modified: added standard SOD-123 fab outline, courtyard, and silkscreen per IPC-7351.
//
// Params:
//    side: default is B for Back
//      the side on which to place the single-side footprint and designator, either F or B
//    reversible: default is false
//      if true, the footprint will be placed on both sides so that the PCB can be
//      reversible
//    include_tht: default is false
//      if true it includes through-hole pads alongside SMD ones
//    diode_3dmodel_filename: default is ''
//      Allows you to specify the path to a 3D model STEP or WRL file to be
//      used when rendering the PCB.
//    diode_3dmodel_xyz_offset: default is [0, 0, 0]
//    diode_3dmodel_xyz_scale: default is [1, 1, 1]
//    diode_3dmodel_xyz_rotation: default is [0, 0, 0]

module.exports = {
  params: {
    designator: 'D',
    side: 'B',
    reversible: false,
    include_tht: false,
    diode_3dmodel_filename: '',
    diode_3dmodel_xyz_offset: [0, 0, 0],
    diode_3dmodel_xyz_rotation: [0, 0, 0],
    diode_3dmodel_xyz_scale: [1, 1, 1],
    from: { type: 'net', value: undefined },
    to: { type: 'net', value: undefined }
  },
  body: p => {
    const standard_opening = `
    (footprint "ceoloide:diode_tht_sod123"
        (layer "${p.reversible ? 'F' : p.side}.Cu")
        ${p.at}
        (property "Reference" "${p.ref}"
            (at 0 0 ${p.r})
            (layer "${p.reversible ? 'F' : p.side}.SilkS")
            ${p.ref_hide}
            (effects (font (size 1 1) (thickness 0.15)))
        )
        `

    // --- Standard SOD-123 fab outline (body 2.8 x 1.6mm, cathode band) ---
    const front_fab = `
      (fp_line (start -1.4 -0.8) (end 1.4 -0.8) (layer "F.Fab") (stroke (width 0.1) (type solid)))
      (fp_line (start 1.4 -0.8) (end 1.4 0.8) (layer "F.Fab") (stroke (width 0.1) (type solid)))
      (fp_line (start 1.4 0.8) (end -1.4 0.8) (layer "F.Fab") (stroke (width 0.1) (type solid)))
      (fp_line (start -1.4 0.8) (end -1.4 -0.8) (layer "F.Fab") (stroke (width 0.1) (type solid)))
      (fp_line (start -0.85 -0.8) (end -0.85 0.8) (layer "F.Fab") (stroke (width 0.1) (type solid)))
        `

    const back_fab = `
      (fp_line (start -1.4 -0.8) (end 1.4 -0.8) (layer "B.Fab") (stroke (width 0.1) (type solid)))
      (fp_line (start 1.4 -0.8) (end 1.4 0.8) (layer "B.Fab") (stroke (width 0.1) (type solid)))
      (fp_line (start 1.4 0.8) (end -1.4 0.8) (layer "B.Fab") (stroke (width 0.1) (type solid)))
      (fp_line (start -1.4 0.8) (end -1.4 -0.8) (layer "B.Fab") (stroke (width 0.1) (type solid)))
      (fp_line (start -0.85 -0.8) (end -0.85 0.8) (layer "B.Fab") (stroke (width 0.1) (type solid)))
        `

    // --- Standard SOD-123 courtyard (0.25mm margin beyond pads) ---
    const front_courtyard = `
      (fp_line (start -2.35 -0.95) (end 2.35 -0.95) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
      (fp_line (start 2.35 -0.95) (end 2.35 0.95) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
      (fp_line (start 2.35 0.95) (end -2.35 0.95) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
      (fp_line (start -2.35 0.95) (end -2.35 -0.95) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
        `

    const back_courtyard = `
      (fp_line (start -2.35 -0.95) (end 2.35 -0.95) (layer "B.CrtYd") (stroke (width 0.05) (type solid)))
      (fp_line (start 2.35 -0.95) (end 2.35 0.95) (layer "B.CrtYd") (stroke (width 0.05) (type solid)))
      (fp_line (start 2.35 0.95) (end -2.35 0.95) (layer "B.CrtYd") (stroke (width 0.05) (type solid)))
      (fp_line (start -2.35 0.95) (end -2.35 -0.95) (layer "B.CrtYd") (stroke (width 0.05) (type solid)))
        `

    // --- Silkscreen: outline + cathode band ---
    const front_silk = `
      (fp_line (start -2.1 -0.86) (end 1.4 -0.86) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
      (fp_line (start -2.1 0.86) (end 1.4 0.86) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
      (fp_line (start -2.1 -0.86) (end -2.1 0.86) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
        `

    const back_silk = `
      (fp_line (start -2.1 -0.86) (end 1.4 -0.86) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
      (fp_line (start -2.1 0.86) (end 1.4 0.86) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
      (fp_line (start -2.1 -0.86) (end -2.1 0.86) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
        `

    // --- SMD pads (standard SOD-123: 0.9 x 1.2mm at ±1.65mm) ---
    const front_smd_pads = `
      (pad "1" smd rect (at -1.65 0 ${p.r}) (size 0.9 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${p.to.str})
      (pad "2" smd rect (at 1.65 0 ${p.r}) (size 0.9 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${p.from.str})
        `

    const back_smd_pads = `
      (pad "1" smd rect (at -1.65 0 ${p.r}) (size 0.9 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${p.to.str})
      (pad "2" smd rect (at 1.65 0 ${p.r}) (size 0.9 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${p.from.str})
        `

    const tht = `
      (pad "1" thru_hole rect (at -3.81 0 ${p.r}) (size 1.778 1.778) (drill 0.9906) (layers "*.Cu" "*.Mask") ${p.to.str})
      (pad "2" thru_hole circle (at 3.81 0 ${p.r}) (size 1.905 1.905) (drill 0.9906) (layers "*.Cu" "*.Mask") ${p.from.str})
        `

    const diode_3dmodel = `
      (model ${p.diode_3dmodel_filename}
          (offset (xyz ${p.diode_3dmodel_xyz_offset[0]} ${p.diode_3dmodel_xyz_offset[1]} ${p.diode_3dmodel_xyz_offset[2]}))
          (scale (xyz ${p.diode_3dmodel_xyz_scale[0]} ${p.diode_3dmodel_xyz_scale[1]} ${p.diode_3dmodel_xyz_scale[2]}))
          (rotate (xyz ${p.diode_3dmodel_xyz_rotation[0]} ${p.diode_3dmodel_xyz_rotation[1]} ${p.diode_3dmodel_xyz_rotation[2]})))
        `

    const standard_closing = `
    )
        `

    let final = standard_opening;

    if (p.side == "F" || p.reversible) {
      final += front_fab;
      final += front_courtyard;
      final += front_silk;
      final += front_smd_pads;
    }
    if (p.side == "B" || p.reversible) {
      final += back_fab;
      final += back_courtyard;
      final += back_silk;
      final += back_smd_pads;
    }
    if (p.include_tht) {
      final += tht;
    }

    if (p.diode_3dmodel_filename) {
      final += diode_3dmodel;
    }

    final += standard_closing;

    return final;
  }
}
