package ctm.ctmprogreso.dto;

import ctm.ctmprogreso.model.Divisiones;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DivisionesDTO {

    private int id_division;
    private int numero_division;
    private int id_usuario;

    public DivisionesDTO(Divisiones divisiones) {
        this.id_division = divisiones.getId_division();
        this.numero_division = divisiones.getNumero_division();
        this.id_usuario = divisiones.getUsuario() != null ? divisiones.getUsuario().getId_usuario() : 0;
    }
}









