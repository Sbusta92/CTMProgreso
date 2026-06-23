package ctm.ctmprogreso.dto;

import ctm.ctmprogreso.model.Partidos;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class PartidosDTO {
    private int id_partido;
    //private int jugador1_id;
    //private int jugador2_id;


    public PartidosDTO(Partidos partidos) {
        this.id_partido = partidos.getId_partido();

    }
}


