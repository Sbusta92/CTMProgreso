package ctm.ctmprogreso.controller;

import ctm.ctmprogreso.dto.ResultadosDTO;
import ctm.ctmprogreso.service.ResultadosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/CTMProgreso/v4/Resultado")
public class ResultadosController {

    @Autowired
    private ResultadosService resultadosService;

    @PostMapping
    public ResponseEntity<ResultadosDTO> save(@RequestBody ResultadosDTO resultadosDTO) {
        return new ResponseEntity<>(resultadosService.save(resultadosDTO), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ResultadosDTO>> findAll() {
        return new ResponseEntity<>(resultadosService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id_resultado}")
    public ResponseEntity<ResultadosDTO> findById(@PathVariable Integer id_resultado) {
        try {
            return new ResponseEntity<>(resultadosService.findByID(id_resultado), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id_resultado}")
    public ResponseEntity<Void> deleteByID(@PathVariable Integer id_resultado) {
        try {
            resultadosService.deleteByID(id_resultado);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping
    public ResponseEntity<ResultadosDTO> update(@RequestBody ResultadosDTO resultadosDTO) {
        try {
            ResultadosDTO updatedResultadosDTO = resultadosService.update(resultadosDTO);
            return new ResponseEntity<>(updatedResultadosDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
