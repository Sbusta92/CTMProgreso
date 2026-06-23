package ctm.ctmprogreso.dto;

import ctm.ctmprogreso.model.Partidos;
import ctm.ctmprogreso.model.Resultados;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class ResultadosDTO {
    private int id_resultado;
    private int id_partido;
    //private int ganador_id;
    private String puntaje;

    public ResultadosDTO(Resultados resultados) {
        this.id_resultado = resultados.getId_resultado();

        this.puntaje = resultados.getPuntaje();
    }
}





