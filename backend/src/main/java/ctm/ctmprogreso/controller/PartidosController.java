package ctm.ctmprogreso.controller;

import ctm.ctmprogreso.dto.PartidosDTO;
import ctm.ctmprogreso.dto.ResultadosDTO;
import ctm.ctmprogreso.service.PartidosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/CTMProgreso/v3/Partidos")
public class PartidosController {

    @Autowired
    private PartidosService partidosService;

    @PostMapping
    public ResponseEntity<PartidosDTO> save(@RequestBody PartidosDTO partidosDTO) {
        return new ResponseEntity<>(partidosService.save(partidosDTO), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<PartidosDTO>> findAll() {
        return new ResponseEntity<>(partidosService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id_partido}")
    public ResponseEntity<PartidosDTO> findById(@PathVariable Integer id_division) {
        try {
            return new ResponseEntity<>(partidosService.findByID(id_division), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id_partido}")
    public ResponseEntity<Void> deleteByID(@PathVariable Integer id_partido) {
        try {
            partidosService.deleteByID(id_partido);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping
    public ResponseEntity<PartidosDTO> update(@RequestBody PartidosDTO partidosDTO) {
        try {
            PartidosDTO updatePartidosDTO = partidosService.update(partidosDTO);
            return new ResponseEntity<>(updatePartidosDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }
}


