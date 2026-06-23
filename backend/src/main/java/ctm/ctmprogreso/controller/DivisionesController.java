package ctm.ctmprogreso.controller;

import ctm.ctmprogreso.dto.DivisionesDTO;
import ctm.ctmprogreso.model.Divisiones;
import ctm.ctmprogreso.service.DivisionesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/CTMProgreso/v1/Divisiones")
public class DivisionesController {

    @Autowired
    private DivisionesService divisionesService;

    @GetMapping
    public List<DivisionesDTO> getAllDivisiones() {
        List<Divisiones> divisionesList = divisionesService.getAllDivisiones();
        return divisionesList.stream()
                .map(DivisionesDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public DivisionesDTO getDivisionById(@PathVariable int id) {
        Divisiones division = divisionesService.getDivisionById(id);
        return new DivisionesDTO(division);
    }

    @PostMapping
    public DivisionesDTO createDivision(@RequestBody DivisionesDTO divisionesDTO) {
        Divisiones division = divisionesService.createDivision(new Divisiones(divisionesDTO));
        return new DivisionesDTO(division);
    }

    @PutMapping("/{id}")
    public DivisionesDTO updateDivision(@PathVariable int id, @RequestBody DivisionesDTO divisionesDTO) {
        Divisiones division = divisionesService.updateDivision(id, new Divisiones(divisionesDTO));
        return new DivisionesDTO(division);
    }

    @DeleteMapping("/{id}")
    public void deleteDivision(@PathVariable int id) {
        divisionesService.deleteDivision(id);
    }
}






