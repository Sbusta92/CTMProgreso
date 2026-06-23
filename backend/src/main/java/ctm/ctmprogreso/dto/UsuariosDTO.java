package ctm.ctmprogreso.dto;

import ctm.ctmprogreso.model.Divisiones;
import ctm.ctmprogreso.model.Partidos;
import ctm.ctmprogreso.model.Resultados;
import ctm.ctmprogreso.model.Usuarios;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuariosDTO {
    private int id_usuario;
    private String nombre;
    private String password;

    private boolean activo;
    private boolean admin;
    private String divisionActual;

    private int id_division;
    private List<Divisiones> divisiones;
    private int id_resultados;
    private Resultados resultados;
    private Partidos partidos;
    private int id_partidos;
    private int ligas_ganadas;

    public UsuariosDTO(Usuarios usuarios) {
        this.id_usuario = usuarios.getId_usuario();
        this.nombre = usuarios.getNombre();
        this.password = usuarios.getPassword();
        this.activo = usuarios.isActivo();
        this.admin = usuarios.isAdmin();
        this.divisionActual = usuarios.getDivisionActual();
        this.ligas_ganadas = usuarios.getLigas_ganadas(); // ✅ Lombok lo genera así por defecto

    }
}

