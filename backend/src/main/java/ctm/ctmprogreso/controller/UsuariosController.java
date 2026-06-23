package ctm.ctmprogreso.controller;

import ctm.ctmprogreso.dto.UsuariosDTO;
import ctm.ctmprogreso.service.UsuariosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/CTMProgreso/v1/Usuario")
public class UsuariosController {

    @Autowired
    UsuariosService usuariosService;

    @PostMapping
    public ResponseEntity<UsuariosDTO> save(@RequestBody UsuariosDTO usuarioDTO) {
        return new ResponseEntity<>(usuariosService.save(usuarioDTO), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<UsuariosDTO>> findAll() {
        return new ResponseEntity<>(usuariosService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id_resultado}")
    public ResponseEntity<UsuariosDTO> findById(@PathVariable Integer id_resultado) {
        try {
            return new ResponseEntity<>(usuariosService.findByID(id_resultado), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{nombre}/{password}")
    public ResponseEntity <List<UsuariosDTO>> findByNombreAndPassword(@PathVariable String nombre, @PathVariable String password) {
        try {
            return new ResponseEntity<>(usuariosService.findByNombreAndPassword(nombre, password), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id_usuario}")
    public ResponseEntity<Void> deleteByID(@PathVariable Integer id_usuario) {
        try {
            usuariosService.deleteByID(id_usuario);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping
    public ResponseEntity<UsuariosDTO> update(@RequestBody UsuariosDTO usuariosDTO) {
        try {
            UsuariosDTO updateUsuariosDTO = usuariosService.update(usuariosDTO);
            return new ResponseEntity<>(updateUsuariosDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/activo/{id}")
    public ResponseEntity<Void> activarUsuario(@PathVariable Integer id) {
        try {
            usuariosService.activarUsuario(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/divisionActual/{id}/{division}")
    public ResponseEntity<Void> asignarDivision(@PathVariable Integer id, @PathVariable String division) {
        try {
            usuariosService.asignarDivision(id, division);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/resetearDivisiones")
    public ResponseEntity<Void> resetearDivisiones() {
        try {
            usuariosService.resetearTodasLasDivisiones();
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/sumarLigaGanada/{id}")
    public ResponseEntity<String> sumarLigaGanada(@PathVariable Integer id) {
        try {
            usuariosService.sumarLigaGanada(id);
            return new ResponseEntity<>("Liga sumada correctamente", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("No se pudo sumar la liga", HttpStatus.NOT_FOUND);
        }
    }



}


