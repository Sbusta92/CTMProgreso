package ctm.ctmprogreso.model;

import ctm.ctmprogreso.dto.DivisionesDTO;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name="divisiones")
public class Divisiones {

    @Id
    private int id_division;
    private int numero_division;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", referencedColumnName = "id_usuario")
    private Usuarios usuario;

    public Divisiones(DivisionesDTO divisionesDTO) {
        this.id_division = divisionesDTO.getId_division();
        this.numero_division = divisionesDTO.getNumero_division();
        if (divisionesDTO.getId_usuario() != 0) {
            this.usuario = new Usuarios();
            this.usuario.setId_usuario(divisionesDTO.getId_usuario());
        }
    }
}









