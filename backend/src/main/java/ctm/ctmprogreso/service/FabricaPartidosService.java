package ctm.ctmprogreso.service;

import ctm.ctmprogreso.dto.PartidosDTO;
import ctm.ctmprogreso.model.Partidos;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FabricaPartidosService {

    public Partidos crearPartidos(PartidosDTO partidosDTO) {
           return new Partidos(partidosDTO);
}

    public PartidosDTO crearPartidosDTO(Partidos partidos) {

        return new PartidosDTO(partidos);
   }

    public List<PartidosDTO> crearPartidosDTOS(List<Partidos> partidos) {
        List<PartidosDTO> partidosDTO = new ArrayList<>();
       partidos.stream().forEach(
               partido -> {
                    partidosDTO.add(crearPartidosDTO(partido));
                }
        );
       return partidosDTO;
    }

}


