package ctm.ctmprogreso.model;

import ctm.ctmprogreso.dto.UsuariosDTO;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List; // Asegúrate de importar java.util.List
import ctm.ctmprogreso.model.Divisiones; // Asegúrate de importar la clase Divisiones

@Data
@NoArgsConstructor
@Entity
@Table(name="usuarios")
public class Usuarios {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private int id_usuario;
    private String nombre;
    private String password;

    private boolean activo;
    private boolean admin;
    private String divisionActual;
    private int ligas_ganadas;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<Divisiones> divisiones; // Cambiamos a OneToMany para el mapeo correcto

    @ManyToOne(cascade = CascadeType.ALL)
    private Partidos partidos;

    @ManyToOne(cascade = CascadeType.ALL)
    private Resultados resultados;

    public Usuarios(UsuariosDTO usuariosDTO) {
        this.id_usuario = usuariosDTO.getId_usuario();
        this.nombre = usuariosDTO.getNombre();
        this.password = usuariosDTO.getPassword();
        this.activo = usuariosDTO.isActivo();
        this.admin = usuariosDTO.isAdmin();
        this.divisionActual = usuariosDTO.getDivisionActual();
        this.ligas_ganadas = usuariosDTO.getLigas_ganadas();
    }
}


