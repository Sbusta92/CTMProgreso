package ctm.ctmprogreso.service;

import org.springframework.stereotype.Component;

import ctm.ctmprogreso.dto.Historial_ligasDTO;
import ctm.ctmprogreso.model.Historial_ligas;

@Component
public class FabricaHistorial_ligasService {
    public Historial_ligasDTO toDTO(Historial_ligas entity) {
        return new Historial_ligasDTO(
                entity.getNombreUsuario(),
                entity.getDivision(),
                entity.getVictorias()
        );
    }

    public Historial_ligas toEntity(Historial_ligasDTO dto) {
        Historial_ligas entity = new Historial_ligas();
        entity.setNombreUsuario(dto.getNombreUsuario());
        entity.setDivision(dto.getDivision());
        entity.setVictorias(dto.getVictorias());
        return entity;
    }
}

