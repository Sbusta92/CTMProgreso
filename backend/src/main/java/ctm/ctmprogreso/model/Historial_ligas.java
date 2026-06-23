package ctm.ctmprogreso.model;

import jakarta.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "Historial_ligas")

public class Historial_ligas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombreUsuario;
    private String division;
    private int victorias;
}
