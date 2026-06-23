package ctm.ctmprogreso.model;

import ctm.ctmprogreso.dto.ResultadosDTO;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name="resultados")
public class Resultados {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_resultado;
    private String puntaje;


    @OneToOne (fetch = FetchType.LAZY,optional = false)
    private Partidos partidos;

    @ManyToOne(cascade = CascadeType.ALL)
    private Usuarios usuarios;

    public Resultados(ResultadosDTO resultadosDTO) {
        this.id_resultado = resultadosDTO.getId_resultado();

        this.puntaje = resultadosDTO.getPuntaje();
    }
}




