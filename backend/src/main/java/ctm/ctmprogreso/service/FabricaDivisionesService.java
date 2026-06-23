package ctm.ctmprogreso.service;

import ctm.ctmprogreso.dto.DivisionesDTO;

import ctm.ctmprogreso.model.Divisiones;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FabricaDivisionesService {

    public Divisiones crearDivisiones(DivisionesDTO divisionesDTO) {
        return new Divisiones(divisionesDTO);
    }

    public DivisionesDTO crearDivisionesDTO(Divisiones divisiones) {
        return new DivisionesDTO(divisiones);
    }

    public List<DivisionesDTO> crearDivisionesDTOS(List<Divisiones> divisiones) {
        List<DivisionesDTO> divisionesDTO = new ArrayList<>();
        divisiones.stream().forEach(
                division -> {
                    divisionesDTO.add(crearDivisionesDTO(division));
                }
        );
        return divisionesDTO;
    }

}





