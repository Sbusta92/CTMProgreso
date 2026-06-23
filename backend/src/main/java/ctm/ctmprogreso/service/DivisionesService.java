package ctm.ctmprogreso.service;

import ctm.ctmprogreso.model.Divisiones;
import ctm.ctmprogreso.repository.DivisionesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DivisionesService {

    @Autowired
    private DivisionesRepository divisionesRepository;

    public List<Divisiones> getAllDivisiones() {
        return divisionesRepository.findAll();
    }

    public Divisiones getDivisionById(int id) {
        return divisionesRepository.findById(id).orElse(null);
    }

    public Divisiones createDivision(Divisiones division) {
        System.out.println("Creando división: " + division);
        return divisionesRepository.save(division);
    }

    public Divisiones updateDivision(int id, Divisiones division) {
        Divisiones existingDivision = divisionesRepository.findById(id).orElse(null);
        if (existingDivision != null) {
            existingDivision.setNumero_division(division.getNumero_division());
            existingDivision.setUsuario(division.getUsuario());
            System.out.println("Actualizando división: " + existingDivision);
            return divisionesRepository.save(existingDivision);
        }
        System.out.println("División no encontrada con ID: " + id);
        return null;
    }

    public void deleteDivision(int id) {
        divisionesRepository.deleteById(id);
    }
}

