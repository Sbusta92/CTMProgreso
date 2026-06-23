package ctm.ctmprogreso.model;

import ctm.ctmprogreso.dto.PartidosDTO;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name="partidos")
public class Partidos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_partido;


    @OneToOne(cascade = CascadeType.ALL)
    private Resultados resultados;

    @ManyToOne(cascade = CascadeType.ALL)
    private Usuarios usuarios;


    public Partidos(PartidosDTO partidosDTO){
        this.id_partido = partidosDTO.getId_partido();


    }
}

