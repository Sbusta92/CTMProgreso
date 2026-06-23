package ctm.ctmprogreso.controller;


import ctm.ctmprogreso.dto.Historial_ligasDTO;

import ctm.ctmprogreso.model.Historial_ligas;
import ctm.ctmprogreso.service.FabricaHistorial_ligasService;
import ctm.ctmprogreso.service.Historial_ligasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/CTMProgreso/v3/HistorialLigas")

public class Historial_ligasController {

    @Autowired
    private Historial_ligasService historialLigasService;

    @Autowired
    private FabricaHistorial_ligasService fabrica;

    @PostMapping("/incrementar")
    public ResponseEntity<Void> incrementarVictorias(@RequestBody Historial_ligasDTO dto) {
        historialLigasService.incrementarVictorias(dto.getNombreUsuario(), dto.getDivision());
        return ResponseEntity.ok().build();
    }


    @GetMapping("/{usuario}")
    public ResponseEntity<List<Historial_ligasDTO>> getHistorialPorUsuario(@PathVariable String usuario) {
        List<Historial_ligas> historial = historialLigasService.obtenerHistorialPorUsuario(usuario);
        List<Historial_ligasDTO> historialDTO = historial.stream()
                .map(fabrica::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(historialDTO);
    }

    @GetMapping
    public ResponseEntity<List<Historial_ligasDTO>> getHistorialCompleto() {
        List<Historial_ligas> historial = historialLigasService.obtenerHistorialCompleto();
        List<Historial_ligasDTO> historialDTO = historial.stream()
                .map(fabrica::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(historialDTO);
    }
    
}